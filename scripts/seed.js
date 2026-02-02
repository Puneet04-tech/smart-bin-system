import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    // Create sample bins
    const bins = await Promise.all([
      prisma.bin.create({
        data: {
          name: "Tech Hub Station A",
          latitude: 40.7128,
          longitude: -74.0060,
          address: "123 Tech Street, New York, NY 10001",
          acceptedTypes: JSON.stringify(["smartphone", "laptop", "battery", "charger"]),
          currentFill: 65,
          maxCapacity: 100,
          status: "operational",
          qrCode: "SB-001-NYC"
        }
      }),
      prisma.bin.create({
        data: {
          name: "Green Point Center",
          latitude: 40.7580,
          longitude: -73.9855,
          address: "456 Eco Avenue, New York, NY 10019",
          acceptedTypes: JSON.stringify(["smartphone", "battery", "charger"]),
          currentFill: 30,
          maxCapacity: 100,
          status: "operational",
          qrCode: "SB-002-NYC"
        }
      }),
      prisma.bin.create({
        data: {
          name: "Central Tech Recycle",
          latitude: 40.7831,
          longitude: -73.9712,
          address: "789 Innovation Blvd, New York, NY 10024",
          acceptedTypes: JSON.stringify(["laptop", "smartphone", "battery", "charger", "cable"]),
          currentFill: 90,
          maxCapacity: 100,
          status: "operational",
          qrCode: "SB-003-NYC"
        }
      }),
      prisma.bin.create({
        data: {
          name: "Downtown E-Waste Hub",
          latitude: 40.7061,
          longitude: -74.0087,
          address: "321 Sustainability St, New York, NY 10004",
          acceptedTypes: JSON.stringify(["smartphone", "laptop", "battery"]),
          currentFill: 100,
          maxCapacity: 100,
          status: "full",
          qrCode: "SB-004-NYC"
        }
      })
    ]);

    // Create sample users
    const users = await Promise.all([
      prisma.user.create({
        data: {
          email: "alex.johnson@email.com",
          name: "Alex Johnson",
          points: 2840,
          level: "gold",
          totalRecycled: 47,
          co2Saved: 12.5
        }
      }),
      prisma.user.create({
        data: {
          email: "sarah.chen@email.com",
          name: "Sarah Chen",
          points: 1520,
          level: "silver",
          totalRecycled: 23,
          co2Saved: 6.8
        }
      })
    ]);

    // Create sample transactions
    await Promise.all([
      prisma.transaction.create({
        data: {
          userId: users[0].id,
          binId: bins[0].id,
          itemType: "smartphone",
          confidence: 0.94,
          estimatedValue: 45.00,
          pointsEarned: 450,
          weight: 0.18
        }
      }),
      prisma.transaction.create({
        data: {
          userId: users[1].id,
          binId: bins[2].id,
          itemType: "laptop",
          confidence: 0.87,
          estimatedValue: 120.00,
          pointsEarned: 1200,
          weight: 1.4
        }
      })
    ]);

    console.log('Database seeded successfully!');
    console.log(`Created ${bins.length} bins, ${users.length} users, and 2 transactions`);
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
