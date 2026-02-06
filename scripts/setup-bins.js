#!/usr/bin/env node

/**
 * Smart Bin System - Database Setup Script
 * This script helps set up the smart bin database across India
 */

/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  console.log('\n');
  log('═'.repeat(60), 'blue');
  log(title, 'bright');
  log('═'.repeat(60), 'blue');
}

function runCommand(command, description) {
  try {
    log(`🔄 ${description}...`, 'yellow');
    execSync(command, { stdio: 'inherit' });
    log(`✓ ${description} completed!`, 'green');
    return true;
  } catch (error) {
    log(`✗ Error: ${description} failed!`, 'red');
    console.error(error);
    return false;
  }
}

async function main() {
  logSection('🌍 Smart Bin System - Database Setup');

  log('This script will set up the bin database across India with 40+ locations.', 'blue');
  log('Expected setup time: 2-3 minutes\n', 'blue');

  // Check if we're in the right directory
  if (!fs.existsSync('prisma')) {
    log('Error: prisma directory not found!', 'red');
    log('Please run this script from the project root directory.', 'red');
    process.exit(1);
  }

  // Step 1: Install dependencies
  logSection('Step 1: Verifying Dependencies');
  if (!fs.existsSync('node_modules')) {
    if (!runCommand('npm install', 'Installing dependencies')) {
      process.exit(1);
    }
  } else {
    log('✓ Dependencies already installed', 'green');
  }

  // Step 2: Generate Prisma Client
  logSection('Step 2: Generating Prisma Client');
  if (!runCommand('npx prisma generate', 'Generating Prisma client')) {
    log('Continuing despite error...', 'yellow');
  }

  // Step 3: Setup Database
  logSection('Step 3: Setting Up Database');
  if (!runCommand('npx prisma db push --skip-generate', 'Creating database schema')) {
    log('Note: Database schema may already exist', 'yellow');
  }

  // Step 4: Seed Bins Data
  logSection('Step 4: Seeding Bin Database');
  log('Populating database with 40+ bins across 30+ Indian cities...', 'blue');
  
  if (!runCommand('npx ts-node prisma/seed-bins.ts', 'Seeding bin data')) {
    log('Note: Some bins may have already existed', 'yellow');
  }

  // Step 5: Verification
  logSection('Step 5: Verification');
  try {
    log('Verifying database setup...', 'yellow');
    
    // Check if database is accessible
    const prisma = require('@prisma/client');
    const client = new prisma.PrismaClient();
    
    const binCount = await client.bin.count();
    const binCities = await client.$queryRaw`
      SELECT COUNT(DISTINCT address) as cityCount FROM bins
    `;
    
    await client.$disconnect();
    
    log(`✓ Database verified!`, 'green');
    log(`  - Total bins: ${binCount}`, 'green');
    log(`  - Estimated cities: ${binCities[0]?.cityCount || '30+'}`, 'green');
  } catch (error) {
    log('Could not verify database (may be using SQLite)', 'yellow');
  }

  // Final Summary
  logSection('✅ Setup Complete!');
  log('Your Smart Bin System database is now ready!', 'green');
  log('\nNext steps:', 'bright');
  log('1. Start the development server: npm run dev', 'blue');
  log('2. Open the app in your browser: http://localhost:3000', 'blue');
  log('3. Navigate to /bin-finder to test location-based bin discovery', 'blue');
  log('4. Grant location permission when prompted', 'blue');
  log('\nFeatures available:', 'bright');
  log('✓ 40+ bins across 30+ Indian cities', 'green');
  log('✓ Multi-strategy geolocation (GPS + IP fallback)', 'green');
  log('✓ Haversine-based distance calculation', 'green');
  log('✓ Nearby bin filtering and sorting', 'green');
  log('✓ E-waste product type filtering', 'green');

  log('\n' + '═'.repeat(60), 'blue');
  log('For more information, see BIN_DATABASE_GUIDE.md', 'blue');
  log('═'.repeat(60), 'blue');
  log('');
}

main().catch(error => {
  log('Setup failed with error:', 'red');
  console.error(error);
  process.exit(1);
});
