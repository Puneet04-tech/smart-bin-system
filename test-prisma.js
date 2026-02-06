require('dotenv').config();
const { prisma } = require('./src/lib/prisma.ts');

async function test() {
  try {
    console.log('Testing Prisma connection...');
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('Success! Prisma is connected:', result);
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

test();
