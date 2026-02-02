import { NextRequest, NextResponse } from 'next/server';

// Comprehensive bin data across major Indian cities
const sampleBins = [
  // Delhi NCR
  {
    id: "1",
    name: "Connaught Place E-Waste Center",
    latitude: 28.6304,
    longitude: 77.2177,
    address: "Connaught Place, New Delhi, Delhi 110001",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "battery", "charger"]),
    currentFill: 25,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 86400000),
    qrCode: "BIN-DEL-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  {
    id: "2",
    name: "Gurgaon Tech Hub",
    latitude: 28.4595,
    longitude: 77.0266,
    address: "Cyber City, Gurgaon, Haryana 122001",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "tablet", "headphones"]),
    currentFill: 45,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 43200000),
    qrCode: "BIN-GUR-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Mumbai
  {
    id: "3",
    name: "Bandra-Worli Sea Link Recycling",
    latitude: 19.0635,
    longitude: 72.8235,
    address: "Bandra West, Mumbai, Maharashtra 400050",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "battery", "charger"]),
    currentFill: 60,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 7200000),
    qrCode: "BIN-MUM-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  {
    id: "4",
    name: "Andheri Tech Recycle",
    latitude: 19.1196,
    longitude: 72.8465,
    address: "Andheri East, Mumbai, Maharashtra 400069",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "printer", "monitor"]),
    currentFill: 35,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 172800000),
    qrCode: "BIN-MUM-002",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Bangalore
  {
    id: "5",
    name: "Electronic City Recycling Hub",
    latitude: 12.8442,
    longitude: 77.6763,
    address: "Electronic City, Bangalore, Karnataka 560100",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "desktop", "printer"]),
    currentFill: 70,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 3600000),
    qrCode: "BIN-BLR-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  {
    id: "6",
    name: "Whitefield E-Waste Center",
    latitude: 12.9698,
    longitude: 77.7499,
    address: "Whitefield, Bangalore, Karnataka 560066",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "tablet", "battery"]),
    currentFill: 40,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 28800000),
    qrCode: "BIN-BLR-002",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Chennai
  {
    id: "7",
    name: "T Nagar Electronics Recycling",
    latitude: 13.0403,
    longitude: 80.2336,
    address: "T Nagar, Chennai, Tamil Nadu 600017",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "battery", "charger"]),
    currentFill: 55,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 50400000),
    qrCode: "BIN-CHE-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Kolkata
  {
    id: "8",
    name: "Salt Lake Tech Recycle",
    latitude: 22.5808,
    longitude: 88.4161,
    address: "Salt Lake City, Kolkata, West Bengal 700091",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "printer", "scanner"]),
    currentFill: 30,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 86400000),
    qrCode: "BIN-KOL-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Hyderabad
  {
    id: "9",
    name: "HITEC City E-Waste",
    latitude: 17.4483,
    longitude: 78.3915,
    address: "HITEC City, Hyderabad, Telangana 500081",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "tablet", "headphones"]),
    currentFill: 50,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 43200000),
    qrCode: "BIN-HYD-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Pune
  {
    id: "10",
    name: "Hinjewadi IT Park Recycling",
    latitude: 18.5992,
    longitude: 73.7392,
    address: "Hinjewadi, Pune, Maharashtra 411057",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "desktop", "monitor"]),
    currentFill: 65,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 7200000),
    qrCode: "BIN-PUN-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Ahmedabad
  {
    id: "11",
    name: "GIFT City E-Waste Center",
    latitude: 23.2179,
    longitude: 72.6369,
    address: "GIFT City, Gandhinagar, Gujarat 382355",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "battery", "cable"]),
    currentFill: 25,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 86400000),
    qrCode: "BIN-AHD-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Jaipur
  {
    id: "12",
    name: "Malviya Nagar Tech Recycle",
    latitude: 26.8467,
    longitude: 75.8084,
    address: "Malviya Nagar, Jaipur, Rajasthan 302017",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "charger", "earphones"]),
    currentFill: 45,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 28800000),
    qrCode: "BIN-JAI-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Bhopal (existing locations)
  {
    id: "13",
    name: "Bhopal City Center",
    latitude: 23.2599,
    longitude: 77.4126,
    address: "MP Nagar, Bhopal, Madhya Pradesh 462011",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "battery", "charger"]),
    currentFill: 25,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 86400000),
    qrCode: "BIN-BPL-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  {
    id: "14",
    name: "Habibganj Recycling Point",
    latitude: 23.2306,
    longitude: 77.4127,
    address: "Habibganj, Bhopal, Madhya Pradesh 462016",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "tablet", "headphones"]),
    currentFill: 60,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 43200000),
    qrCode: "BIN-BPL-002",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Indore
  {
    id: "15",
    name: "Indore Tech Park Recycling",
    latitude: 22.7196,
    longitude: 75.8577,
    address: "Super Corridor, Indore, Madhya Pradesh 452010",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "printer", "monitor"]),
    currentFill: 35,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 172800000),
    qrCode: "BIN-IDR-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Lucknow
  {
    id: "16",
    name: "Gomti Nagar E-Waste Center",
    latitude: 26.8467,
    longitude: 80.9462,
    address: "Gomti Nagar, Lucknow, Uttar Pradesh 226010",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "battery", "charger"]),
    currentFill: 40,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 50400000),
    qrCode: "BIN-LKO-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  }
];

export async function GET() {
  try {
    return NextResponse.json(sampleBins);
  } catch (error) {
    console.error('Error fetching bins:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bins' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { name, latitude, longitude, address, acceptedTypes, maxCapacity, qrCode } = data;

    const newBin = {
      id: Date.now().toString(),
      name,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      address,
      acceptedTypes: JSON.stringify(acceptedTypes),
      currentFill: 0,
      maxCapacity: parseInt(maxCapacity),
      status: 'operational',
      lastEmptied: new Date(),
      qrCode,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    return NextResponse.json(newBin, { status: 201 });
  } catch (error) {
    console.error('Error creating bin:', error);
    return NextResponse.json(
      { error: 'Failed to create bin' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const { id, ...updateData } = data;

    const binIndex = sampleBins.findIndex(bin => bin.id === id);
    if (binIndex === -1) {
      return NextResponse.json(
        { error: 'Bin not found' },
        { status: 404 }
      );
    }

    const updatedBin = { ...sampleBins[binIndex], ...updateData, updatedAt: new Date() };
    return NextResponse.json(updatedBin);
  } catch (error) {
    console.error('Error updating bin:', error);
    return NextResponse.json(
      { error: 'Failed to update bin' },
      { status: 500 }
    );
  }
}
