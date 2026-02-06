import { NextRequest, NextResponse } from 'next/server';

// Comprehensive bin data across ALL major Indian cities and state capitals
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
  },
  // Chandigarh
  {
    id: "17",
    name: "Sector 35 Tech Recycling",
    latitude: 30.7333,
    longitude: 76.7794,
    address: "Sector 35, Chandigarh 160001",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "tablet", "battery", "charger"]),
    currentFill: 55,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 43200000),
    qrCode: "BIN-CHD-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Surat
  {
    id: "18",
    name: "APDA Recycling Hub Surat",
    latitude: 21.1702,
    longitude: 72.8311,
    address: "Adajan, Surat, Gujarat 395009",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "printer", "monitor", "battery"]),
    currentFill: 50,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 86400000),
    qrCode: "BIN-SRT-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Vadodara
  {
    id: "19",
    name: "Vadodara Smart Bin Center",
    latitude: 22.3072,
    longitude: 73.1812,
    address: "Gotri, Vadodara, Gujarat 390021",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "battery", "charger", "headphones"]),
    currentFill: 35,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 172800000),
    qrCode: "BIN-VDR-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Kochi
  {
    id: "20",
    name: "Kochi E-Waste Management",
    latitude: 9.9312,
    longitude: 76.2673,
    address: "Infopark, Kochi, Kerala 682030",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "tablet", "monitor", "printer"]),
    currentFill: 45,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 28800000),
    qrCode: "BIN-KCH-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Thiruvananthapuram
  {
    id: "21",
    name: "Technopark Recycling Center",
    latitude: 8.5211,
    longitude: 76.9289,
    address: "Technopark, Trivandrum, Kerala 695581",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "battery", "charger", "tablet"]),
    currentFill: 30,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 86400000),
    qrCode: "BIN-TVM-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Coimbatore
  {
    id: "22",
    name: "Coimbatore E-Waste Facility",
    latitude: 11.0081,
    longitude: 76.9955,
    address: "Peelamedu, Coimbatore, Tamil Nadu 641004",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "printer", "monitor", "keyboard"]),
    currentFill: 55,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 50400000),
    qrCode: "BIN-CBE-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Nagpur
  {
    id: "23",
    name: "Nagpur Tech Recycling",
    latitude: 21.1458,
    longitude: 79.0882,
    address: "Ramdaspeth, Nagpur, Maharashtra 440010",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "battery", "charger", "tablet"]),
    currentFill: 40,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 43200000),
    qrCode: "BIN-NGP-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Nashik
  {
    id: "24",
    name: "Nashik Smart Bin",
    latitude: 19.9975,
    longitude: 73.7898,
    address: "Cidco, Nashik, Maharashtra 422008",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "battery", "charger"]),
    currentFill: 25,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 86400000),
    qrCode: "BIN-NSK-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Aurangabad
  {
    id: "25",
    name: "Aurangabad E-Waste Center",
    latitude: 19.8762,
    longitude: 75.3433,
    address: "CIDCO, Aurangabad, Maharashtra 431003",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "printer", "monitor", "battery"]),
    currentFill: 50,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 28800000),
    qrCode: "BIN-ARB-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Vadodara
  {
    id: "26",
    name: "Guj Tech Recycle Hub",
    latitude: 22.3039,
    longitude: 73.1833,
    address: "Manjalpur, Vadodara, Gujarat 390011",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "tablet", "headphones", "charger"]),
    currentFill: 35,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 172800000),
    qrCode: "BIN-VDR-002",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Rajkot
  {
    id: "27",
    name: "Rajkot E-Waste Facility",
    latitude: 22.3039,
    longitude: 70.7839,
    address: "Rajkot, Gujarat 360001",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "battery", "charger", "monitor"]),
    currentFill: 45,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 86400000),
    qrCode: "BIN-RJK-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Ludhiana
  {
    id: "28",
    name: "Ludhiana Smart Recycling",
    latitude: 30.9010,
    longitude: 75.8573,
    address: "Ludhiana, Punjab 141008",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "printer", "tablet", "battery"]),
    currentFill: 60,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 43200000),
    qrCode: "BIN-LDH-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Visakhapatnam
  {
    id: "29",
    name: "Visakhapatnam E-Waste Hub",
    latitude: 17.6869,
    longitude: 83.2185,
    address: "Vizag, Andhra Pradesh 530003",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "battery", "charger", "monitor"]),
    currentFill: 50,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 50400000),
    qrCode: "BIN-VZG-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Vijayawada
  {
    id: "30",
    name: "Vijayawada Smart Bin",
    latitude: 16.5062,
    longitude: 80.6480,
    address: "Vijayawada, Andhra Pradesh 520008",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "tablet", "headphones", "battery"]),
    currentFill: 35,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 172800000),
    qrCode: "BIN-VJY-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Mysore
  {
    id: "31",
    name: "Mysore E-Waste Recycling",
    latitude: 12.2958,
    longitude: 76.6394,
    address: "Mysore, Karnataka 570001",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "printer", "monitor", "battery"]),
    currentFill: 40,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 86400000),
    qrCode: "BIN-MYS-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Hubballi
  {
    id: "32",
    name: "Hubballi Smart Recycling",
    latitude: 15.3647,
    longitude: 75.1240,
    address: "Hubballi, Karnataka 580025",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "battery", "charger", "tablet"]),
    currentFill: 45,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 28800000),
    qrCode: "BIN-HBL-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Guwahati
  {
    id: "33",
    name: "Guwahati E-Waste Center",
    latitude: 26.1445,
    longitude: 91.7362,
    address: "Guwahati, Assam 781001",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "monitor", "keyboard", "charger"]),
    currentFill: 55,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 50400000),
    qrCode: "BIN-GWL-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Ranchi
  {
    id: "34",
    name: "Ranchi Smart Bin Facility",
    latitude: 23.3441,
    longitude: 85.3096,
    address: "Ranchi, Jharkhand 834001",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "battery", "charger", "printer"]),
    currentFill: 30,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 86400000),
    qrCode: "BIN-RCH-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Patna
  {
    id: "35",
    name: "Patna E-Waste Hub",
    latitude: 25.5941,
    longitude: 85.1376,
    address: "Patna, Bihar 800001",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "tablet", "monitor", "battery"]),
    currentFill: 50,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 43200000),
    qrCode: "BIN-PTN-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Indore (additional)
  {
    id: "36",
    name: "Indore Smart Recycling Hub",
    latitude: 22.7196,
    longitude: 75.8880,
    address: "Rau, Indore, Madhya Pradesh 453337",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "battery", "charger", "tablet"]),
    currentFill: 45,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 28800000),
    qrCode: "BIN-IDR-002",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Raipur
  {
    id: "37",
    name: "Raipur E-Waste Facility",
    latitude: 21.2514,
    longitude: 81.6296,
    address: "Raipur, Chhattisgarh 492001",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "printer", "monitor", "battery"]),
    currentFill: 55,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 86400000),
    qrCode: "BIN-RPR-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Kota
  {
    id: "38",
    name: "Kota Smart Bin",
    latitude: 25.2138,
    longitude: 75.8648,
    address: "Kota, Rajasthan 324009",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "battery", "charger", "tablet"]),
    currentFill: 35,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 172800000),
    qrCode: "BIN-KTA-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Jodhpur
  {
    id: "39",
    name: "Jodhpur E-Waste Center",
    latitude: 26.2389,
    longitude: 73.0243,
    address: "Jodhpur, Rajasthan 342001",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "monitor", "keyboard", "charger"]),
    currentFill: 40,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 50400000),
    qrCode: "BIN-JDH-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Udaipur
  {
    id: "40",
    name: "Udaipur Smart Recycling",
    latitude: 24.5854,
    longitude: 73.7125,
    address: "Udaipur, Rajasthan 313001",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "battery", "charger", "printer"]),
    currentFill: 50,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 28800000),
    qrCode: "BIN-UDI-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Agra
  {
    id: "41",
    name: "Agra E-Waste Center",
    latitude: 27.1767,
    longitude: 78.0081,
    address: "Agra, Uttar Pradesh 282001",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "battery", "charger"]),
    currentFill: 45,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 86400000),
    qrCode: "BIN-AGR-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Varanasi
  {
    id: "42",
    name: "Varanasi Smart Bin",
    latitude: 25.3176,
    longitude: 82.9739,
    address: "Varanasi, Uttar Pradesh 221001",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "tablet", "charger"]),
    currentFill: 35,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 43200000),
    qrCode: "BIN-VNS-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Kanpur
  {
    id: "43",
    name: "Kanpur E-Waste Hub",
    latitude: 26.4499,
    longitude: 80.3319,
    address: "Kanpur, Uttar Pradesh 208001",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "printer", "monitor"]),
    currentFill: 55,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 28800000),
    qrCode: "BIN-KNP-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Meerut
  {
    id: "44",
    name: "Meerut Recycling Center",
    latitude: 28.9845,
    longitude: 77.7064,
    address: "Meerut, Uttar Pradesh 250001",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "battery", "charger"]),
    currentFill: 40,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 172800000),
    qrCode: "BIN-MRT-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Amritsar
  {
    id: "45",
    name: "Amritsar E-Waste Center",
    latitude: 31.6340,
    longitude: 74.8723,
    address: "Amritsar, Punjab 143001",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "tablet", "battery"]),
    currentFill: 30,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 86400000),
    qrCode: "BIN-ATR-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Jalandhar
  {
    id: "46",
    name: "Jalandhar Smart Bin",
    latitude: 31.3260,
    longitude: 75.5762,
    address: "Jalandhar, Punjab 144001",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "charger", "headphones"]),
    currentFill: 50,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 50400000),
    qrCode: "BIN-JLN-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Shimla
  {
    id: "47",
    name: "Shimla E-Waste Facility",
    latitude: 31.1048,
    longitude: 77.1734,
    address: "Shimla, Himachal Pradesh 171001",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "battery", "charger"]),
    currentFill: 25,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 86400000),
    qrCode: "BIN-SML-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Dehradun
  {
    id: "48",
    name: "Dehradun Smart Recycling",
    latitude: 30.3165,
    longitude: 78.0322,
    address: "Dehradun, Uttarakhand 248001",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "tablet", "monitor"]),
    currentFill: 45,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 43200000),
    qrCode: "BIN-DDN-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Jammu
  {
    id: "49",
    name: "Jammu E-Waste Hub",
    latitude: 32.7266,
    longitude: 74.8570,
    address: "Jammu, Jammu & Kashmir 180001",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "battery", "charger"]),
    currentFill: 35,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 28800000),
    qrCode: "BIN-JAM-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Srinagar
  {
    id: "50",
    name: "Srinagar Smart Bin",
    latitude: 34.0837,
    longitude: 74.7973,
    address: "Srinagar, Jammu & Kashmir 190001",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "tablet", "charger"]),
    currentFill: 40,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 172800000),
    qrCode: "BIN-SRG-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Dispur (Guwahati)
  {
    id: "51",
    name: "Dispur E-Waste Center",
    latitude: 26.1433,
    longitude: 91.7898,
    address: "Dispur, Guwahati, Assam 781006",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "battery", "printer"]),
    currentFill: 50,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 50400000),
    qrCode: "BIN-DPR-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Imphal
  {
    id: "52",
    name: "Imphal Smart Recycling",
    latitude: 24.8170,
    longitude: 93.9368,
    address: "Imphal, Manipur 795001",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "tablet", "battery"]),
    currentFill: 30,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 86400000),
    qrCode: "BIN-IMP-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Shillong
  {
    id: "53",
    name: "Shillong E-Waste Hub",
    latitude: 25.5788,
    longitude: 91.8933,
    address: "Shillong, Meghalaya 793001",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "charger", "headphones"]),
    currentFill: 35,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 43200000),
    qrCode: "BIN-SHL-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Aizawl
  {
    id: "54",
    name: "Aizawl Smart Bin",
    latitude: 23.7271,
    longitude: 92.7176,
    address: "Aizawl, Mizoram 796001",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "battery", "charger"]),
    currentFill: 25,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 28800000),
    qrCode: "BIN-AZL-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Kohima
  {
    id: "55",
    name: "Kohima E-Waste Center",
    latitude: 25.6747,
    longitude: 94.1086,
    address: "Kohima, Nagaland 797001",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "tablet", "battery"]),
    currentFill: 40,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 172800000),
    qrCode: "BIN-KHM-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Agartala
  {
    id: "56",
    name: "Agartala Smart Recycling",
    latitude: 23.8315,
    longitude: 91.2868,
    address: "Agartala, Tripura 799001",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "charger", "monitor"]),
    currentFill: 45,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 50400000),
    qrCode: "BIN-AGT-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Itanagar
  {
    id: "57",
    name: "Itanagar E-Waste Hub",
    latitude: 27.0844,
    longitude: 93.6053,
    address: "Itanagar, Arunachal Pradesh 791111",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "battery", "charger"]),
    currentFill: 30,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 86400000),
    qrCode: "BIN-ITR-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Gangtok
  {
    id: "58",
    name: "Gangtok Smart Bin",
    latitude: 27.3389,
    longitude: 88.6065,
    address: "Gangtok, Sikkim 737101",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "tablet", "battery"]),
    currentFill: 35,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 43200000),
    qrCode: "BIN-GNK-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Bhubaneswar
  {
    id: "59",
    name: "Bhubaneswar E-Waste Center",
    latitude: 20.2961,
    longitude: 85.8245,
    address: "Bhubaneswar, Odisha 751001",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "printer", "monitor"]),
    currentFill: 55,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 28800000),
    qrCode: "BIN-BBR-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Cuttack
  {
    id: "60",
    name: "Cuttack Smart Recycling",
    latitude: 20.4625,
    longitude: 85.8828,
    address: "Cuttack, Odisha 753001",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "battery", "charger"]),
    currentFill: 40,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 172800000),
    qrCode: "BIN-CTC-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Jamshedpur
  {
    id: "61",
    name: "Jamshedpur E-Waste Hub",
    latitude: 22.8046,
    longitude: 86.2029,
    address: "Jamshedpur, Jharkhand 831001",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "tablet", "monitor"]),
    currentFill: 50,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 50400000),
    qrCode: "BIN-JSR-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Dhanbad
  {
    id: "62",
    name: "Dhanbad Smart Bin",
    latitude: 23.7957,
    longitude: 86.4304,
    address: "Dhanbad, Jharkhand 826001",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "battery", "charger"]),
    currentFill: 35,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 86400000),
    qrCode: "BIN-DBD-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Gaya
  {
    id: "63",
    name: "Gaya E-Waste Center",
    latitude: 24.7955,
    longitude: 85.0002,
    address: "Gaya, Bihar 823001",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "charger", "headphones"]),
    currentFill: 45,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 43200000),
    qrCode: "BIN-GAY-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Muzaffarpur
  {
    id: "64",
    name: "Muzaffarpur Smart Recycling",
    latitude: 26.1225,
    longitude: 85.3906,
    address: "Muzaffarpur, Bihar 842001",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "tablet", "battery"]),
    currentFill: 30,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 28800000),
    qrCode: "BIN-MZF-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Bhilai
  {
    id: "65",
    name: "Bhilai E-Waste Hub",
    latitude: 21.2176,
    longitude: 81.4307,
    address: "Bhilai, Chhattisgarh 490001",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "printer", "monitor"]),
    currentFill: 55,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 172800000),
    qrCode: "BIN-BHL-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Bilaspur
  {
    id: "66",
    name: "Bilaspur Smart Bin",
    latitude: 22.0797,
    longitude: 82.1409,
    address: "Bilaspur, Chhattisgarh 495001",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "battery", "charger"]),
    currentFill: 40,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 50400000),
    qrCode: "BIN-BLS-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Ujjain
  {
    id: "67",
    name: "Ujjain E-Waste Center",
    latitude: 23.1765,
    longitude: 75.7885,
    address: "Ujjain, Madhya Pradesh 456001",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "tablet", "charger"]),
    currentFill: 35,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 86400000),
    qrCode: "BIN-UJN-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Gwalior
  {
    id: "68",
    name: "Gwalior Smart Recycling",
    latitude: 26.2183,
    longitude: 78.1828,
    address: "Gwalior, Madhya Pradesh 474001",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "monitor", "keyboard"]),
    currentFill: 50,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 43200000),
    qrCode: "BIN-GWL-002",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Jabalpur
  {
    id: "69",
    name: "Jabalpur E-Waste Hub",
    latitude: 23.1815,
    longitude: 79.9864,
    address: "Jabalpur, Madhya Pradesh 482001",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "battery", "charger"]),
    currentFill: 45,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 28800000),
    qrCode: "BIN-JBL-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Allahabad (Prayagraj)
  {
    id: "70",
    name: "Prayagraj Smart Bin",
    latitude: 25.4358,
    longitude: 81.8463,
    address: "Prayagraj, Uttar Pradesh 211001",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "tablet", "battery"]),
    currentFill: 30,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 172800000),
    qrCode: "BIN-PRG-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Bareilly
  {
    id: "71",
    name: "Bareilly E-Waste Center",
    latitude: 28.3670,
    longitude: 79.4304,
    address: "Bareilly, Uttar Pradesh 243001",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "charger", "headphones"]),
    currentFill: 40,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 50400000),
    qrCode: "BIN-BRL-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Aligarh
  {
    id: "72",
    name: "Aligarh Smart Recycling",
    latitude: 27.8974,
    longitude: 78.0880,
    address: "Aligarh, Uttar Pradesh 202001",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "printer", "monitor"]),
    currentFill: 35,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 86400000),
    qrCode: "BIN-ALG-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Moradabad
  {
    id: "73",
    name: "Moradabad E-Waste Hub",
    latitude: 28.8389,
    longitude: 78.7378,
    address: "Moradabad, Uttar Pradesh 244001",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "battery", "charger"]),
    currentFill: 50,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 43200000),
    qrCode: "BIN-MRD-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Gorakhpur
  {
    id: "74",
    name: "Gorakhpur Smart Bin",
    latitude: 26.7606,
    longitude: 83.3732,
    address: "Gorakhpur, Uttar Pradesh 273001",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "tablet", "battery"]),
    currentFill: 45,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 28800000),
    qrCode: "BIN-GKP-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Bikaner
  {
    id: "75",
    name: "Bikaner E-Waste Center",
    latitude: 28.0229,
    longitude: 73.3119,
    address: "Bikaner, Rajasthan 334001",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "charger", "headphones"]),
    currentFill: 25,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 172800000),
    qrCode: "BIN-BKN-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Ajmer
  {
    id: "76",
    name: "Ajmer Smart Recycling",
    latitude: 26.4499,
    longitude: 74.6399,
    address: "Ajmer, Rajasthan 305001",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "battery", "charger"]),
    currentFill: 40,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 50400000),
    qrCode: "BIN-AJM-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Bhavnagar
  {
    id: "77",
    name: "Bhavnagar E-Waste Hub",
    latitude: 21.7645,
    longitude: 72.1519,
    address: "Bhavnagar, Gujarat 364001",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "tablet", "monitor"]),
    currentFill: 35,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 86400000),
    qrCode: "BIN-BHV-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Jamnagar
  {
    id: "78",
    name: "Jamnagar Smart Bin",
    latitude: 22.4707,
    longitude: 70.0577,
    address: "Jamnagar, Gujarat 361001",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "battery", "charger"]),
    currentFill: 30,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 43200000),
    qrCode: "BIN-JMN-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Kolhapur
  {
    id: "79",
    name: "Kolhapur E-Waste Center",
    latitude: 16.7050,
    longitude: 74.2433,
    address: "Kolhapur, Maharashtra 416001",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "charger", "headphones"]),
    currentFill: 45,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 28800000),
    qrCode: "BIN-KLP-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Solapur
  {
    id: "80",
    name: "Solapur Smart Recycling",
    latitude: 17.6599,
    longitude: 75.9064,
    address: "Solapur, Maharashtra 413001",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "printer", "monitor"]),
    currentFill: 50,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 172800000),
    qrCode: "BIN-SLP-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Amravati
  {
    id: "81",
    name: "Amravati E-Waste Hub",
    latitude: 20.9320,
    longitude: 77.7523,
    address: "Amravati, Maharashtra 444601",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "battery", "charger"]),
    currentFill: 40,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 50400000),
    qrCode: "BIN-AMV-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Nanded
  {
    id: "82",
    name: "Nanded Smart Bin",
    latitude: 19.1383,
    longitude: 77.3210,
    address: "Nanded, Maharashtra 431601",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "tablet", "battery"]),
    currentFill: 35,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 86400000),
    qrCode: "BIN-NND-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Warangal
  {
    id: "83",
    name: "Warangal E-Waste Center",
    latitude: 17.9689,
    longitude: 79.5941,
    address: "Warangal, Telangana 506001",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "charger", "headphones"]),
    currentFill: 45,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 43200000),
    qrCode: "BIN-WGL-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Nizamabad
  {
    id: "84",
    name: "Nizamabad Smart Recycling",
    latitude: 18.6725,
    longitude: 78.0941,
    address: "Nizamabad, Telangana 503001",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "printer", "monitor"]),
    currentFill: 30,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 28800000),
    qrCode: "BIN-NZB-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Guntur
  {
    id: "85",
    name: "Guntur E-Waste Hub",
    latitude: 16.3067,
    longitude: 80.4365,
    address: "Guntur, Andhra Pradesh 522001",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "battery", "charger"]),
    currentFill: 55,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 172800000),
    qrCode: "BIN-GNT-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Nellore
  {
    id: "86",
    name: "Nellore Smart Bin",
    latitude: 14.4426,
    longitude: 79.9865,
    address: "Nellore, Andhra Pradesh 524001",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "tablet", "battery"]),
    currentFill: 40,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 50400000),
    qrCode: "BIN-NLR-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Tirupati
  {
    id: "87",
    name: "Tirupati E-Waste Center",
    latitude: 13.6288,
    longitude: 79.4192,
    address: "Tirupati, Andhra Pradesh 517501",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "charger", "headphones"]),
    currentFill: 35,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 86400000),
    qrCode: "BIN-TRP-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Salem
  {
    id: "88",
    name: "Salem Smart Recycling",
    latitude: 11.6643,
    longitude: 78.1460,
    address: "Salem, Tamil Nadu 636001",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "printer", "monitor"]),
    currentFill: 50,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 43200000),
    qrCode: "BIN-SLM-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Tiruchirappalli
  {
    id: "89",
    name: "Trichy E-Waste Hub",
    latitude: 10.7905,
    longitude: 78.7047,
    address: "Tiruchirappalli, Tamil Nadu 620001",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "battery", "charger"]),
    currentFill: 45,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 28800000),
    qrCode: "BIN-TRY-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Madurai
  {
    id: "90",
    name: "Madurai Smart Bin",
    latitude: 9.9252,
    longitude: 78.1198,
    address: "Madurai, Tamil Nadu 625001",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "tablet", "battery"]),
    currentFill: 40,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 172800000),
    qrCode: "BIN-MDU-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Vellore
  {
    id: "91",
    name: "Vellore E-Waste Center",
    latitude: 12.9165,
    longitude: 79.1325,
    address: "Vellore, Tamil Nadu 632001",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "charger", "headphones"]),
    currentFill: 30,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 50400000),
    qrCode: "BIN-VLR-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Mangalore
  {
    id: "92",
    name: "Mangalore Smart Recycling",
    latitude: 12.9141,
    longitude: 74.8560,
    address: "Mangalore, Karnataka 575001",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "printer", "monitor"]),
    currentFill: 55,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 86400000),
    qrCode: "BIN-MNG-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Belgaum
  {
    id: "93",
    name: "Belgaum E-Waste Hub",
    latitude: 15.8497,
    longitude: 74.4977,
    address: "Belgaum, Karnataka 590001",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "battery", "charger"]),
    currentFill: 35,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 43200000),
    qrCode: "BIN-BLG-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Gulbarga
  {
    id: "94",
    name: "Gulbarga Smart Bin",
    latitude: 17.3297,
    longitude: 76.8343,
    address: "Gulbarga, Karnataka 585101",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "tablet", "battery"]),
    currentFill: 40,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 28800000),
    qrCode: "BIN-GLB-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Kollam
  {
    id: "95",
    name: "Kollam E-Waste Center",
    latitude: 8.8932,
    longitude: 76.6141,
    address: "Kollam, Kerala 691001",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "charger", "headphones"]),
    currentFill: 45,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 172800000),
    qrCode: "BIN-KLM-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Thrissur
  {
    id: "96",
    name: "Thrissur Smart Recycling",
    latitude: 10.5276,
    longitude: 76.2144,
    address: "Thrissur, Kerala 680001",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "printer", "monitor"]),
    currentFill: 30,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 50400000),
    qrCode: "BIN-TSR-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Kozhikode
  {
    id: "97",
    name: "Kozhikode E-Waste Hub",
    latitude: 11.2588,
    longitude: 75.7804,
    address: "Kozhikode, Kerala 673001",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "battery", "charger"]),
    currentFill: 50,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 86400000),
    qrCode: "BIN-KZK-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Kannur
  {
    id: "98",
    name: "Kannur Smart Bin",
    latitude: 11.8745,
    longitude: 75.3704,
    address: "Kannur, Kerala 670001",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "tablet", "battery"]),
    currentFill: 35,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 43200000),
    qrCode: "BIN-KNR-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Port Blair
  {
    id: "99",
    name: "Port Blair E-Waste Center",
    latitude: 11.6234,
    longitude: 92.7265,
    address: "Port Blair, Andaman & Nicobar 744101",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "charger", "headphones"]),
    currentFill: 25,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 28800000),
    qrCode: "BIN-PBL-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  },
  // Puducherry
  {
    id: "100",
    name: "Puducherry Smart Recycling",
    latitude: 11.9416,
    longitude: 79.8083,
    address: "Puducherry 605001",
    acceptedTypes: JSON.stringify(["smartphone", "laptop", "printer", "monitor"]),
    currentFill: 40,
    maxCapacity: 100,
    status: "operational" as const,
    lastEmptied: new Date(Date.now() - 172800000),
    qrCode: "BIN-PDY-001",
    createdAt: new Date(Date.now() - 2592000000),
    updatedAt: new Date()
  }
];

export async function GET() {
  try {
    // Transform data to match frontend expected format
    const transformedBins = sampleBins.map(bin => ({
      id: bin.id,
      name: bin.name,
      coordinates: {
        lat: bin.latitude,
        lng: bin.longitude
      },
      address: bin.address,
      city: bin.address.split(',')[1]?.trim() || '',
      state: bin.address.split(',')[2]?.trim() || '',
      acceptedTypes: typeof bin.acceptedTypes === 'string' ? JSON.parse(bin.acceptedTypes) : bin.acceptedTypes,
      fillLevel: Math.round((bin.currentFill / bin.maxCapacity) * 100),
      status: bin.status,
      features: ['camera', 'wifi', 'solar_power'], // Default features
      lastEmptied: bin.lastEmptied,
      qrCode: bin.qrCode
    }));
    
    return NextResponse.json(transformedBins);
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
