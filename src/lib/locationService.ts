/**
 * Location Services Utility
 * Handles geolocation, distance calculation, and nearby bin filtering
 */

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Bin {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  coordinates: Coordinates;
  status: "active" | "maintenance" | "offline";
  fillLevel: number;
  lastUpdated: string;
  acceptedTypes: string[];
  operatingHours: string;
  phone: string;
  features: string[];
}

export interface BinWithDistance extends Bin {
  distance: number;
}

/**
 * Calculate distance between two coordinates using Haversine formula
 * @param point1 - First coordinate (user location)
 * @param point2 - Second coordinate (bin location)
 * @returns Distance in kilometers
 */
export const calculateDistance = (point1: Coordinates, point2: Coordinates): number => {
  const R = 6371; // Earth's radius in km
  const dLat = (point2.lat - point1.lat) * (Math.PI / 180);
  const dLon = (point2.lng - point1.lng) * (Math.PI / 180);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(point1.lat * (Math.PI / 180)) *
    Math.cos(point2.lat * (Math.PI / 180)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

/**
 * Find nearby bins within a specified radius
 * @param userLocation - Current user location
 * @param bins - Array of bins to search
 * @param radiusKm - Search radius in kilometers
 * @returns Array of bins within the specified radius, sorted by distance
 */
export const findNearbyBins = (
  userLocation: Coordinates,
  bins: Bin[],
  radiusKm: number = 50
): BinWithDistance[] => {
  return bins
    .map(bin => ({
      ...bin,
      distance: calculateDistance(userLocation, bin.coordinates)
    }))
    .filter(bin => bin.distance <= radiusKm)
    .sort((a, b) => a.distance - b.distance);
};

/**
 * Get the closest bins to a location
 * @param userLocation - Current user location
 * @param bins - Array of bins to search
 * @param limit - Number of bins to return
 * @returns Array of closest bins
 */
export const getClosestBins = (
  userLocation: Coordinates,
  bins: Bin[],
  limit: number = 10
): BinWithDistance[] => {
  return bins
    .map(bin => ({
      ...bin,
      distance: calculateDistance(userLocation, bin.coordinates)
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit);
};

/**
 * Format distance for display
 * @param distance - Distance in kilometers
 * @returns Formatted distance string
 */
export const formatDistance = (distance: number): string => {
  if (distance < 1) {
    return `${Math.round(distance * 1000)}m away`;
  }
  return `${Math.round(distance * 10) / 10}km away`;
};

/**
 * Get user location using multiple strategies
 * @returns Promise with user coordinates or null if all attempts fail
 */
export const getUserLocationAsync = (): Promise<Coordinates | null> => {
  return new Promise((resolve) => {
    // Try GPS first
    if (navigator.geolocation) {
      const options = {
        enableHighAccuracy: true,
        timeout: 8000,
        maximumAge: 0
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location: Coordinates = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          console.log("✓ GPS location obtained:", location);
          resolve(location);
        },
        (error) => {
          console.warn("GPS location error:", error.message);
          // Fallback to IP-based location
          getLocationFromIPAsync().then(resolve);
        },
        options
      );
    } else {
      // No GPS support, use IP-based location
      getLocationFromIPAsync().then(resolve);
    }
  });
};

/**
 * Get location from IP address using multiple service fallbacks
 * @returns Promise with coordinates or null if all services fail
 */
export const getLocationFromIPAsync = (): Promise<Coordinates | null> => {
  const ipServices = [
    {
      url: 'https://ipapi.co/json/',
      latField: 'latitude',
      lngField: 'longitude'
    },
    {
      url: 'https://ip-api.com/json/',
      latField: 'lat',
      lngField: 'lon'
    },
    {
      url: 'https://geoip-db.com/json/',
      latField: 'latitude',
      lngField: 'longitude'
    }
  ];

  const tryService = (index: number): Promise<Coordinates | null> => {
    if (index >= ipServices.length) {
      // All services failed, return null
      console.warn("All IP geolocation services failed");
      return Promise.resolve(null);
    }

    const service = ipServices[index];
    return fetch(service.url)
      .then(response => response.json())
      .then(data => {
        const lat = data[service.latField];
        const lng = data[service.lngField];

        if (lat && lng) {
          const location: Coordinates = {
            lat: parseFloat(lat),
            lng: parseFloat(lng)
          };
          console.log(`✓ Location from ${service.url.split('/')[2]}:`, location);
          return location;
        }
        throw new Error('Invalid location data');
      })
      .catch(error => {
        console.warn(`IP service ${index + 1} failed:`, error.message);
        return tryService(index + 1);
      });
  };

  return tryService(0);
};

/**
 * Get user location or default to a city location
 * @param fallbackLocation - Default location if all methods fail
 * @returns Promise with user location or fallback
 */
export const getUserLocationWithFallback = (
  fallbackLocation: Coordinates = { lat: 28.6304, lng: 77.2177 } // Delhi default
): Promise<Coordinates> => {
  return getUserLocationAsync().then(location => {
    if (location) {
      return location;
    }
    console.warn("Using fallback location:", fallbackLocation);
    return fallbackLocation;
  });
};

/**
 * Check if two locations are within a certain distance
 * @param location1 - First coordinate
 * @param location2 - Second coordinate
 * @param distanceKm - Maximum distance in kilometers
 * @returns True if locations are within distance
 */
export const isWithinDistance = (
  location1: Coordinates,
  location2: Coordinates,
  distanceKm: number
): boolean => {
  return calculateDistance(location1, location2) <= distanceKm;
};

/**
 * Sort bins by distance from user location
 * @param userLocation - Current user location
 * @param bins - Array of bins to sort
 * @returns Bins sorted by distance
 */
export const sortBinsByDistance = (
  userLocation: Coordinates,
  bins: Bin[]
): BinWithDistance[] => {
  return bins
    .map(bin => ({
      ...bin,
      distance: calculateDistance(userLocation, bin.coordinates)
    }))
    .sort((a, b) => a.distance - b.distance);
};

/**
 * Get location name from coordinates (approximation)
 * @param coordinates - Latitude and longitude
 * @returns Approximate city/region name
 */
export const getApproximateLocation = (coordinates: Coordinates): string => {
  // Major Indian cities reference for approximate location detection
  const majorCities: { [key: string]: { name: string; lat: number; lng: number } } = {
    delhi: { name: 'Delhi', lat: 28.6304, lng: 77.2177 },
    mumbai: { name: 'Mumbai', lat: 19.0760, lng: 72.8777 },
    bangalore: { name: 'Bangalore', lat: 12.9716, lng: 77.5946 },
    hyderabad: { name: 'Hyderabad', lat: 17.3850, lng: 78.4867 },
    kolkata: { name: 'Kolkata', lat: 22.5726, lng: 88.3639 },
    pune: { name: 'Pune', lat: 18.5204, lng: 73.8567 },
    ahmedabad: { name: 'Ahmedabad', lat: 23.0225, lng: 72.5714 },
    jaipur: { name: 'Jaipur', lat: 26.9124, lng: 75.7873 },
    lucknow: { name: 'Lucknow', lat: 26.8467, lng: 80.9462 },
    chandigarh: { name: 'Chandigarh', lat: 30.7333, lng: 76.7794 },
  };

  let closestCity = 'Unknown Location';
  let closestDistance = Infinity;

  Object.values(majorCities).forEach(city => {
    const distance = calculateDistance(coordinates, { lat: city.lat, lng: city.lng });
    if (distance < closestDistance) {
      closestDistance = distance;
      closestCity = city.name;
    }
  });

  return closestCity;
};
