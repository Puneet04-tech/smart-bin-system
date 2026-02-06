# Smart Bin System - Location & Database Expansion Guide

## Overview
This document describes the enhancements made to the Smart Bin System for expanding the bin database across India and improving location-based bin discovery.

## What's New

### 1. Expanded Bin Database (40+ Locations)

The bin database has been significantly expanded to cover 30+ major Indian cities with multiple bins in key metropolitan areas:

#### Metropolitan Regions Covered:
- **Delhi NCR** - Connaught Place, Nehru Place, Dwarka, Gurgaon (5 bins)
- **Mumbai** - Bandra, Andheri, Powai (3 bins)
- **Bangalore** - Electronic City, Whitefield, Koramangala (3 bins)
- **Chennai** - T Nagar, OMR Tech Hub (2 bins)
- **Hyderabad** - HITEC City, Gachibowli (2 bins)
- **Kolkata** - Salt Lake, New Town (2 bins)
- **Pune** - Hinjewadi, Magarpatta (2 bins)
- **Jaipur** - Malviya Nagar, RIICO IT Park (2 bins)
- **Ahmedabad** - GIFT City, Ahmedabad Center (2 bins)

#### Additional Cities:
- Chandigarh
- Surat
- Vadodara
- Kochi
- Lucknow
- Indore
- Bhopal
- Nagpur
- Coimbatore
- Ludhiana
- Visakhapatnam
- Mysore
- Guwahati
- Patna
- Raipur

Each bin includes:
- Unique QR code for identification
- Accepted waste types (smartphones, laptops, batteries, etc.)
- Current fill level and capacity
- Operating status
- Contact information
- Last emptied date

### 2. Enhanced Geolocation System

#### Multi-Strategy Location Detection:
1. **Primary: GPS-based Geolocation** (Most Accurate)
   - Requests high accuracy location data
   - 8-second timeout with optimized settings
   - Provides real-time location for nearby bin detection

2. **Fallback 1: IP-based Geolocation (ipapi.co)**
   - Accurate city/region level location
   - Works without GPS permission

3. **Fallback 2: Alternative IP Services**
   - ip-api.com as secondary fallback
   - geoip-db.com as tertiary fallback
   - Ensures location detection across different network conditions

4. **Default Fallback: Delhi Location**
   - `coordinates: { lat: 28.6304, lng: 77.2177 }`
   - Used when all other methods fail

#### Features:
- Automatic retry with multiple services
- Intelligent error handling
- Minimal timeout impact on UX
- Console logging for debugging

### 3. Advanced Distance Calculation

**Algorithm: Haversine Formula**
- Calculates great-circle distance between two points on Earth
- Accuracy: ±0.5% for most distances
- Efficient computation without external API calls

```
Distance = 2R × arcsin(√[sin²(Δlat/2) + cos(lat₁) × cos(lat₂) × sin²(Δlng/2)])
where R = Earth's radius (6,371 km)
```

### 4. Nearby Bin Filtering

The bin finder intelligently shows:
- Bins within user-specified radius (default: 50km)
- Distance displayed in meters (<1km) or kilometers
- Automatic sorting by distance (closest first)
- Fallback to nearest 10 bins nationwide if none found in radius

### 5. Location Service Utility Library

**File:** `src/lib/locationService.ts`

Exported functions:
- `calculateDistance()` - Haversine distance calculation
- `findNearbyBins()` - Find bins within radius
- `getClosestBins()` - Get N closest bins
- `formatDistance()` - Format distance for display
- `getUserLocationAsync()` - Async location detection
- `getLocationFromIPAsync()` - IP-based location
- `getUserLocationWithFallback()` - Location with fallback
- `isWithinDistance()` - Check distance threshold
- `sortBinsByDistance()` - Sort bins by distance
- `getApproximateLocation()` - Get city name from coordinates

## Database Seeding

### Setup Instructions

1. **Install Dependencies** (if not already done):
```bash
npm install
```

2. **Configure Prisma Database:**
```bash
npx prisma generate
npx prisma migrate dev --name init
```

3. **Run the Bin Seeding Script:**
```bash
npx ts-node prisma/seed-bins.ts
```

This will:
- Create all 40+ bins across India
- Skip duplicates based on QR code
- Log progress to console
- Handle errors gracefully

### Alternative: Using Prisma Seed

Add to `package.json`:
```json
"prisma": {
  "seed": "ts-node prisma/seed-bins.ts"
}
```

Then run:
```bash
npx prisma db seed
```

## API Endpoints

### Get All Bins
```
GET /api/bins
Response: Array of 40+ bin objects with coordinates, status, accepted types
```

### Create New Bin
```
POST /api/bins
Body: {
  name: string,
  latitude: number,
  longitude: number,
  address: string,
  acceptedTypes: string[],
  maxCapacity: number,
  qrCode: string
}
```

### Update Bin Status
```
PUT /api/bins
Body: {
  id: string,
  currentFill: number,
  status: "operational" | "maintenance" | "full"
}
```

## Using the Bin Finder

### User Experience Flow:

1. **Visit Bin Finder Page**
   - Page automatically requests GPS permission
   - Shows loading indicator while detecting location

2. **Location Detection**
   - GPS location detected (if permitted)
   - Falls back to IP-based location
   - Default to Delhi if all fail

3. **View Nearby Bins**
   - Shows bins within 50km radius
   - Displays distance from user
   - Can toggle between nearby-only and nationwide view

4. **Filter by Product Type**
   - Select e-waste product type
   - Shows only bins that accept that type
   - Auto-expands radius if no nearby bins match

5. **Get Directions**
   - Click "Get Directions" button
   - Opens Google Maps with bin location
   - Shows route from current location

## Data Structure

### Bin Model (Prisma Schema)
```typescript
model Bin {
  id              String         @id @default(cuid())
  name            String
  latitude        Float
  longitude       Float
  address         String
  acceptedTypes   String         // JSON array
  currentFill     Int            @default(0)
  maxCapacity     Int
  status          String         @default("operational")
  lastEmptied     DateTime?
  qrCode          String         @unique
  createdAt       DateTime       @default(now())
  updatedAt       DateTime       @updatedAt
  
  transactions    Transaction[]
  maintenance     Maintenance[]
}
```

## Performance Optimization

1. **Caching Strategy**
   - GPS location cached for 0 seconds (always fresh)
   - IP location cached for session
   - Bin data cached in component state

2. **Distance Calculation**
   - Computed client-side (no API calls)
   - Lazy evaluated when filtering
   - Memoized for performance

3. **API Optimization**
   - All bins fetched once on component mount
   - Filtering done client-side
   - Minimal re-renders with React hooks

## Troubleshooting

### GPS Location Not Working
1. Check browser location permissions
2. Ensure HTTPS connection (required for GPS)
3. Check browser console for error messages
4. System will automatically fallback to IP-based location

### Wrong Location Detected
1. Verify GPS is enabled on device
2. Try allowing high accuracy location in settings
3. IP-based location is city-level accurate
4. Can manually search by city name

### Missing Bins in Area
1. Check if radius filter is too small
2. Expand search radius to 100km
3. Switch to nationwide view
4. Add new bins via POST API

## Future Enhancements

1. **Real-time Bin Status Updates**
   - WebSocket integration for live fill level
   - Notification when bin is full

2. **User-Reported Locations**
   - Allow users to add new bins
   - Community-driven database expansion

3. **Route Optimization**
   - Multi-bin route planning
   - Schedule deliveries

4. **Offline Support**
   - Service worker caching
   - Offline maps

5. **Advanced Analytics**
   - Heatmap of e-waste density
   - Prediction of bin overflow

## Contact & Support

For issues with location detection or bin database:
1. Check browser console (F12) for detailed error logs
2. Verify network connectivity
3. Review this documentation
4. Check API response with developer tools

---

**Last Updated:** February 2026
**Database Version:** 1.0 (40+ bins, 30+ cities)
**Location Services:** v1.0 (Multi-strategy geolocation)
