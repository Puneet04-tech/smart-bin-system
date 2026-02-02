import { NextRequest, NextResponse } from 'next/server';

// Sample transaction data
const sampleTransactions = [
  {
    id: "1",
    userId: "user1",
    binId: "1",
    itemType: "smartphone",
    itemDescription: "iPhone 12 Pro",
    confidence: 0.95,
    estimatedValue: 450,
    pointsEarned: 45,
    image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...",
    weight: 180,
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    user: {
      name: "John Doe",
      email: "john@example.com"
    },
    bin: {
      name: "Tech Hub Station A",
      address: "123 Tech Street, New York, NY 10001"
    }
  },
  {
    id: "2",
    userId: "user2",
    binId: "2",
    itemType: "laptop",
    itemDescription: "MacBook Air 2020",
    confidence: 0.88,
    estimatedValue: 800,
    pointsEarned: 80,
    image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...",
    weight: 1290,
    timestamp: new Date(Date.now() - 7200000), // 2 hours ago
    user: {
      name: "Jane Smith",
      email: "jane@example.com"
    },
    bin: {
      name: "Green Point Center",
      address: "456 Eco Avenue, New York, NY 10019"
    }
  },
  {
    id: "3",
    userId: "user3",
    binId: "3",
    itemType: "battery",
    itemDescription: "Lithium-ion Battery Pack",
    confidence: 0.92,
    estimatedValue: 25,
    pointsEarned: 10,
    weight: 150,
    timestamp: new Date(Date.now() - 10800000), // 3 hours ago
    user: {
      name: "Mike Johnson",
      email: "mike@example.com"
    },
    bin: {
      name: "Central Tech Recycle",
      address: "789 Innovation Blvd, New York, NY 10024"
    }
  }
];

export async function GET() {
  try {
    return NextResponse.json(sampleTransactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch transactions' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { userId, binId, itemType, itemDescription, confidence, estimatedValue, pointsEarned, image, weight } = data;

    const newTransaction = {
      id: Date.now().toString(),
      userId,
      binId,
      itemType,
      itemDescription,
      confidence: parseFloat(confidence),
      estimatedValue: parseFloat(estimatedValue),
      pointsEarned: parseInt(pointsEarned),
      image,
      weight: weight ? parseFloat(weight) : undefined,
      timestamp: new Date(),
      user: {
        name: "Current User",
        email: "current@example.com"
      },
      bin: {
        name: "Selected Bin",
        address: "Selected Address"
      }
    };

    return NextResponse.json(newTransaction, { status: 201 });
  } catch (error) {
    console.error('Error creating transaction:', error);
    return NextResponse.json(
      { error: 'Failed to create transaction' },
      { status: 500 }
    );
  }
}
