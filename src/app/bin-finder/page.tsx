"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";
import { 
  Search, 
  MapPin, 
  Navigation, 
  RefreshCw, 
  Filter, 
  Home,
  Menu,
  X, 
  Users,
  Battery,
  Smartphone,
  Laptop,
  Monitor,
  Tablet,
  Headphones,
  Camera,
  Gamepad2,
  HardDrive,
  Router,
  Cpu,
  Mouse,
  Keyboard,
  Speaker,
  Tv,
  Watch,
  Cable,
  Usb,
  Wifi,
  IdCard,
  Printer,
  Webcam,
  Zap,
  Clock,
  Phone,
  Activity,
  AlertTriangle,
  Shield
} from "lucide-react";

interface Bin {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  coordinates: { lat: number; lng: number };
  status: "active" | "maintenance" | "offline";
  fillLevel: number;
  lastUpdated: string;
  acceptedTypes: string[];
  operatingHours: string;
  phone: string;
  features: string[];
}

const bins: Bin[] = [
  // Delhi Bins
  {
    id: "BIN001",
    name: "Connaught Place Smart Bin",
    address: "123 Inner Circle",
    city: "New Delhi",
    state: "Delhi",
    zipCode: "110001",
    coordinates: { lat: 28.6304, lng: 77.2177 },
    status: "active",
    fillLevel: 65,
    lastUpdated: "2024-01-15T10:30:00Z",
    acceptedTypes: ["smartphone", "laptop", "battery", "charger", "tablet"],
    operatingHours: "24/7",
    phone: "+91-11-2345-6789",
    features: ["wifi", "camera", "solar_power"]
  },
  {
    id: "BIN002",
    name: "Nehru Place E-Waste Station",
    address: "456 Nehru Place",
    city: "New Delhi",
    state: "Delhi",
    zipCode: "110019",
    coordinates: { lat: 28.5494, lng: 77.2507 },
    status: "active",
    fillLevel: 45,
    lastUpdated: "2024-01-15T09:15:00Z",
    acceptedTypes: ["smartphone", "laptop", "battery", "charger", "monitor", "printer"],
    operatingHours: "9AM-9PM",
    phone: "+91-11-2345-6780",
    features: ["wifi", "camera", "shelter"]
  },
  {
    id: "BIN003",
    name: "Dwarka Tech Hub",
    address: "789 Sector 21",
    city: "Dwarka",
    state: "Delhi",
    zipCode: "110075",
    coordinates: { lat: 28.5713, lng: 77.0536 },
    status: "maintenance",
    fillLevel: 80,
    lastUpdated: "2024-01-14T14:20:00Z",
    acceptedTypes: ["smartphone", "laptop", "battery", "tablet"],
    operatingHours: "10AM-8PM",
    phone: "+91-11-2345-6781",
    features: ["wifi", "camera"]
  },

  // Mumbai Bins
  {
    id: "BIN004",
    name: "Bandra-Worli Sea Link Recycling Point",
    address: "321 Link Road",
    city: "Mumbai",
    state: "Maharashtra",
    zipCode: "400050",
    coordinates: { lat: 19.0596, lng: 72.8294 },
    status: "active",
    fillLevel: 30,
    lastUpdated: "2024-01-15T11:45:00Z",
    acceptedTypes: ["smartphone", "laptop", "battery", "charger", "monitor", "headphones"],
    operatingHours: "24/7",
    phone: "+91-22-2345-6789",
    features: ["wifi", "camera", "indoor"]
  },
  {
    id: "BIN005",
    name: "Andheri Tech Center",
    address: "1 Andheri Kurla Road",
    city: "Mumbai",
    state: "Maharashtra",
    zipCode: "400059",
    coordinates: { lat: 19.1136, lng: 72.8697 },
    status: "active",
    fillLevel: 55,
    lastUpdated: "2024-01-15T12:00:00Z",
    acceptedTypes: ["smartphone", "laptop", "battery", "charger", "tablet", "printer"],
    operatingHours: "8AM-10PM",
    phone: "+91-22-2345-6780",
    features: ["wifi", "camera", "solar_power"]
  },
  {
    id: "BIN006",
    name: "Powai Recycling Hub",
    address: "5000 Hiranandani Gardens",
    city: "Mumbai",
    state: "Maharashtra",
    zipCode: "400076",
    coordinates: { lat: 19.1198, lng: 72.9050 },
    status: "active",
    fillLevel: 70,
    lastUpdated: "2024-01-15T11:30:00Z",
    acceptedTypes: ["smartphone", "laptop", "battery", "charger", "monitor", "printer", "cpu"],
    operatingHours: "8AM-8PM",
    phone: "+91-22-2345-6781",
    features: ["wifi", "camera", "indoor", "security"]
  },

  // Bangalore Bins
  {
    id: "BIN007",
    name: "Electronic City E-Waste Station",
    address: "777 Hosur Road",
    city: "Bangalore",
    state: "Karnataka",
    zipCode: "560100",
    coordinates: { lat: 12.8399, lng: 77.6770 },
    status: "active",
    fillLevel: 40,
    lastUpdated: "2024-01-15T10:45:00Z",
    acceptedTypes: ["smartphone", "laptop", "battery", "charger", "tablet", "headphones"],
    operatingHours: "9AM-9PM",
    phone: "+91-80-2345-6789",
    features: ["wifi", "camera", "parking"]
  },
  {
    id: "BIN008",
    name: "Whitefield Tech District",
    address: "123 ITPL Road",
    city: "Bangalore",
    state: "Karnataka",
    zipCode: "560066",
    coordinates: { lat: 12.9698, lng: 77.7499 },
    status: "active",
    fillLevel: 35,
    lastUpdated: "2024-01-15T13:15:00Z",
    acceptedTypes: ["smartphone", "laptop", "battery", "charger", "monitor"],
    operatingHours: "24/7",
    phone: "+91-80-2345-6780",
    features: ["wifi", "camera", "solar_power"]
  },
  {
    id: "BIN009",
    name: "Koramangala Recycling Center",
    address: "501 80 Feet Road",
    city: "Bangalore",
    state: "Karnataka",
    zipCode: "560095",
    coordinates: { lat: 12.9345, lng: 77.6240 },
    status: "active",
    fillLevel: 60,
    lastUpdated: "2024-01-15T09:30:00Z",
    acceptedTypes: ["smartphone", "laptop", "battery", "charger", "printer"],
    operatingHours: "10AM-9PM",
    phone: "+91-80-2345-6781",
    features: ["wifi", "camera", "indoor", "mall_access"]
  },

  // Chennai Bins
  {
    id: "BIN010",
    name: "T Nagar Smart Bin",
    address: "100 Pondy Bazaar",
    city: "Chennai",
    state: "Tamil Nadu",
    zipCode: "600017",
    coordinates: { lat: 13.0413, lng: 80.2352 },
    status: "active",
    fillLevel: 50,
    lastUpdated: "2024-01-15T11:00:00Z",
    acceptedTypes: ["smartphone", "laptop", "battery", "charger", "monitor", "keyboard"],
    operatingHours: "10AM-10PM",
    phone: "+91-44-2345-6789",
    features: ["wifi", "camera", "indoor", "security"]
  },
  {
    id: "BIN011",
    name: "OMR Tech Hub",
    address: "1111 Old Mahabalipuram Road",
    city: "Chennai",
    state: "Tamil Nadu",
    zipCode: "600097",
    coordinates: { lat: 12.8455, lng: 80.2254 },
    status: "active",
    fillLevel: 45,
    lastUpdated: "2024-01-15T12:30:00Z",
    acceptedTypes: ["smartphone", "laptop", "battery", "charger", "tablet", "headphones"],
    operatingHours: "8AM-8PM",
    phone: "+91-44-2345-6780",
    features: ["wifi", "camera", "shelter"]
  },

  // Hyderabad Bins
  {
    id: "BIN012",
    name: "HITEC City Recycling Point",
    address: "2000 Cyber Towers",
    city: "Hyderabad",
    state: "Telangana",
    zipCode: "500081",
    coordinates: { lat: 17.4485, lng: 78.3900 },
    status: "active",
    fillLevel: 55,
    lastUpdated: "2024-01-15T10:15:00Z",
    acceptedTypes: ["smartphone", "laptop", "battery", "charger", "monitor", "printer"],
    operatingHours: "9AM-9PM",
    phone: "+91-40-2345-6789",
    features: ["wifi", "camera", "indoor", "security"]
  },
  {
    id: "BIN013",
    name: "Gachibowli E-Waste Center",
    address: "1400 Financial District",
    city: "Hyderabad",
    state: "Telangana",
    zipCode: "500032",
    coordinates: { lat: 17.4359, lng: 78.3695 },
    status: "active",
    fillLevel: 40,
    lastUpdated: "2024-01-15T11:45:00Z",
    acceptedTypes: ["smartphone", "laptop", "battery", "charger", "tablet"],
    operatingHours: "8AM-8PM",
    phone: "+91-40-2345-6780",
    features: ["wifi", "camera", "indoor"]
  },

  // Kolkata Bins
  {
    id: "BIN014",
    name: "Salt Lake Tech District",
    address: "100 Sector 5",
    city: "Kolkata",
    state: "West Bengal",
    zipCode: "700091",
    coordinates: { lat: 22.5726, lng: 88.4205 },
    status: "active",
    fillLevel: 65,
    lastUpdated: "2024-01-15T09:00:00Z",
    acceptedTypes: ["smartphone", "laptop", "battery", "charger", "monitor", "printer", "cpu"],
    operatingHours: "24/7",
    phone: "+91-33-2345-6789",
    features: ["wifi", "camera", "indoor", "security"]
  },
  {
    id: "BIN015",
    name: "Park Street Recycling Hub",
    address: "780 Park Street",
    city: "Kolkata",
    state: "West Bengal",
    zipCode: "700016",
    coordinates: { lat: 22.5588, lng: 88.3521 },
    status: "active",
    fillLevel: 35,
    lastUpdated: "2024-01-15T13:00:00Z",
    acceptedTypes: ["smartphone", "laptop", "battery", "charger", "monitor"],
    operatingHours: "10AM-9PM",
    phone: "+91-33-2345-6780",
    features: ["wifi", "camera", "indoor", "parking"]
  },

  // Pune Bins
  {
    id: "BIN016",
    name: "Hinjewadi IT Park Station",
    address: "1 Rajiv Gandhi Infotech Park",
    city: "Pune",
    state: "Maharashtra",
    zipCode: "411057",
    coordinates: { lat: 18.5997, lng: 73.7397 },
    status: "active",
    fillLevel: 70,
    lastUpdated: "2024-01-15T10:30:00Z",
    acceptedTypes: ["smartphone", "laptop", "battery", "charger", "tablet"],
    operatingHours: "8AM-9PM",
    phone: "+91-20-2345-6789",
    features: ["wifi", "camera", "indoor", "shelter"]
  },
  {
    id: "BIN017",
    name: "Koregaon Park Recycling",
    address: "75 North Main Road",
    city: "Pune",
    state: "Maharashtra",
    zipCode: "411001",
    coordinates: { lat: 18.5314, lng: 73.9046 },
    status: "active",
    fillLevel: 50,
    lastUpdated: "2024-01-15T11:15:00Z",
    acceptedTypes: ["smartphone", "laptop", "battery", "charger", "monitor", "printer"],
    operatingHours: "9AM-8PM",
    phone: "+91-20-2345-6780",
    features: ["wifi", "camera", "indoor", "security"]
  },

  // Ahmedabad Bins
  {
    id: "BIN018",
    name: "SG Highway Smart Bin",
    address: "123 Sarkhej-Gandhinagar Highway",
    city: "Ahmedabad",
    state: "Gujarat",
    zipCode: "380054",
    coordinates: { lat: 23.0793, lng: 72.5178 },
    status: "maintenance",
    fillLevel: 85,
    lastUpdated: "2024-01-14T16:00:00Z",
    acceptedTypes: ["smartphone", "laptop", "battery"],
    operatingHours: "10AM-7PM",
    phone: "+91-79-2345-6789",
    features: ["wifi", "camera"]
  },

  // Jaipur Bins
  {
    id: "BIN019",
    name: "Malviya Nagar Tech Hub",
    address: "9801 Malviya Nagar",
    city: "Jaipur",
    state: "Rajasthan",
    zipCode: "302017",
    coordinates: { lat: 26.8599, lng: 75.8236 },
    status: "active",
    fillLevel: 30,
    lastUpdated: "2024-01-15T12:45:00Z",
    acceptedTypes: ["smartphone", "laptop", "battery", "charger", "monitor", "printer"],
    operatingHours: "9AM-8PM",
    phone: "+91-141-2345-6789",
    features: ["wifi", "camera", "indoor", "parking"]
  },

  // Chandigarh Bins
  {
    id: "BIN020",
    name: "Sector 17 Recycling Center",
    address: "550 Sector 17 Plaza",
    city: "Chandigarh",
    state: "Chandigarh",
    zipCode: "160017",
    coordinates: { lat: 30.7333, lng: 76.7794 },
    status: "active",
    fillLevel: 45,
    lastUpdated: "2024-01-15T10:00:00Z",
    acceptedTypes: ["smartphone", "laptop", "battery", "charger", "tablet", "headphones"],
    operatingHours: "24/7",
    phone: "+91-172-2345-6789",
    features: ["wifi", "camera", "indoor", "security"]
  }
];

const wasteTypeIcons = {
  smartphone: Smartphone,
  laptop: Laptop,
  battery: Battery,
  charger: Zap,
  monitor: Monitor,
  tablet: Monitor,
  headphones: Monitor,
  printer: Monitor,
  other: Monitor,
};

export default function BinFinderPage() {
  const [bins, setBins] = useState<Bin[]>([]);
  const [filteredBins, setFilteredBins] = useState<Bin[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedBin, setSelectedBin] = useState<Bin | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLocationDetected, setIsLocationDetected] = useState(false);
  const [searchRadius, setSearchRadius] = useState<number>(50); // km
  const [showNearbyOnly, setShowNearbyOnly] = useState<boolean>(true);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Icon mapping for products
  const iconMap: { [key: string]: any } = {
    smartphone: Smartphone,
    tablet: Tablet,
    laptop: Laptop,
    battery: Battery,
    charger: Zap,
    monitor: Monitor,
    printer: Printer,
    keyboard: Keyboard,
    mouse: Mouse,
    headphones: Headphones,
    speakers: Speaker,
    tv: Tv,
    camera: Camera,
    webcam: Webcam,
    gamepad2: Gamepad2,
    harddrive: HardDrive,
    router: Router,
    cpu: Cpu,
    watch: Watch,
    cable: Cable,
    usb: Usb,
    idcard: IdCard
  };

  // Icon mapping for bin features
  const featureIconMap: { [key: string]: any } = {
    wifi: Wifi,
    camera: Camera,
    solar_power: Zap,
    shelter: Home,
    indoor: Home,
    outdoor: MapPin,
    charging: Battery,
    security: Shield,
    monitoring: Activity,
    accessible: Users
  };

  // Debug function to ensure Camera icon is available
  const getFeatureIcon = (feature: string) => {
    console.log('Getting icon for feature:', feature);
    console.log('Available icons:', { Camera, Wifi, Zap, Home, MapPin, Battery, Shield, Activity, Users });
    
    if (feature === 'camera') {
      console.log('Returning Camera icon for camera feature');
      return Camera;
    }
    
    const icon = featureIconMap[feature];
    console.log('Mapped icon for', feature, ':', icon);
    
    return icon || Camera; // Always fallback to Camera
  };

  // Fetch bins from API
  useEffect(() => {
    const fetchBins = async () => {
      try {
        const response = await fetch('/api/bins');
        const data = await response.json();
        setBins(data);
      } catch (error) {
        console.error('Error fetching bins:', error);
      }
    };
    fetchBins();
  }, []);

  useEffect(() => {
    if (isLocationDetected && bins.length > 0) {
      filterBins();
    }
  }, [searchQuery, selectedStatus, bins, userLocation, searchRadius, showNearbyOnly, selectedProduct, isLocationDetected]);

  // Auto-get location on page load and check for selected product
  useEffect(() => {
    // Check if there's a selected product from localStorage
    const storedProduct = localStorage.getItem('selectedEwasteProduct');
    if (storedProduct) {
      try {
        const product = JSON.parse(storedProduct);
        // Restore the icon component using the mapping
        if (product.id && iconMap[product.id]) {
          product.icon = iconMap[product.id];
        }
        setSelectedProduct(product);
        // Clear it from localStorage after loading
        localStorage.removeItem('selectedEwasteProduct');
      } catch (error) {
        console.error('Error parsing selected product:', error);
      }
    }

    // Add a small delay to ensure the page is fully loaded
    const timer = setTimeout(() => {
      getUserLocation();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const filterBins = () => {
    let filtered = bins;
    console.log("🔍 filterBins called - bins count:", bins.length, "userLocation:", userLocation, "isLocationDetected:", isLocationDetected);

    // If a product is selected, filter bins that accept this product type
    if (selectedProduct && selectedProduct.binTypes) {
      filtered = filtered.filter(bin => {
        if (!Array.isArray(bin.acceptedTypes)) return false;
        return selectedProduct.binTypes.some((productType: string) => 
          bin.acceptedTypes.includes(productType)
        );
      });
      console.log("📦 Product filter applied, remaining bins:", filtered.length);
    }

    // Filter by location if user location is available
    if (userLocation) {
      // Add distance to all bins
      const binsWithDistance = filtered
        .filter(bin => bin.coordinates && typeof bin.coordinates.lat === 'number' && typeof bin.coordinates.lng === 'number')
        .map(bin => ({
          ...bin,
          distance: calculateDistance(userLocation, bin.coordinates)
        }))
        .sort((a, b) => a.distance - b.distance);

      console.log("📍 Location filter - binsWithDistance count:", binsWithDistance.length, "showNearbyOnly:", showNearbyOnly, "searchRadius:", searchRadius);

      if (showNearbyOnly) {
        // Filter to show only bins within search radius
        const nearbyBins = binsWithDistance.filter(bin => bin.distance <= searchRadius);
        
        console.log("🎯 Nearby bins within", searchRadius, "km:", nearbyBins.length);
        
        if (nearbyBins.length > 0) {
          filtered = nearbyBins;
        } else {
          // No bins within radius, show all bins sorted by distance
          console.log("⚠️ No nearby bins found, showing all bins sorted by distance");
          filtered = binsWithDistance;
        }
      } else {
        // Show all bins sorted by distance
        filtered = binsWithDistance;
      }
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(bin => 
        bin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bin.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bin.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bin.state.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by status
    if (selectedStatus !== "all") {
      filtered = filtered.filter(bin => bin.status === selectedStatus);
    }

    console.log("✅ Final filtered bins count:", filtered.length);
    setFilteredBins(filtered);
  };

  const calculateDistance = (point1: { lat: number; lng: number } | null, point2: { lat: number; lng: number } | undefined): number => {
    // Return infinity if coordinates are invalid
    if (!point1 || !point2 || typeof point2.lat !== 'number' || typeof point2.lng !== 'number') {
      return Infinity;
    }
    
    const R = 6371; // Earth's radius in km
    const dLat = (point2.lat - point1.lat) * Math.PI / 180;
    const dLon = (point2.lng - point1.lng) * Math.PI / 180;
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(point1.lat * Math.PI / 180) * Math.cos(point2.lat * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const getUserLocation = () => {
    setIsLoading(true);
    
    // Check if geolocation is available
    if (!navigator.geolocation) {
      console.warn("Geolocation is not supported by this browser, using IP-based location");
      getLocationFromIP();
      return;
    }

    // Request high accuracy location with multiple fallback strategies
    const options = {
      enableHighAccuracy: true,
      timeout: 8000,
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        console.log("✓ GPS location obtained:", location);
        setUserLocation(location);
        setIsLocationDetected(true);
        setShowNearbyOnly(true);
        setIsLoading(false);
      },
      (error) => {
        console.warn("GPS location error:", error.message);
        // Fallback to IP-based location
        getLocationFromIP();
      },
      options
    );
  };

  const getLocationFromIP = () => {
    // Multiple IP geolocation service fallbacks
    const ipServices = [
      'https://ipapi.co/json/',
      'https://ip-api.com/json/',
      'https://geoip-db.com/json/'
    ];

    const tryNextService = (index: number) => {
      if (index >= ipServices.length) {
        // All services failed, use default Delhi location
        console.log("All IP services failed, using default Delhi location");
        setUserLocation({ lat: 28.6304, lng: 77.2177 });
        setShowNearbyOnly(false);
        setIsLoading(false);
        return;
      }

      fetch(ipServices[index])
        .then(response => response.json())
        .then(data => {
          const lat = data.latitude || data.lat;
          const lng = data.longitude || data.lon || data.lng;
          
          if (lat && lng) {
            const location = {
              lat: parseFloat(lat),
              lng: parseFloat(lng)
            };
            console.log(`✓ Location obtained from ${ipServices[index].split('/')[2]}:`, location);
            setUserLocation(location);
            setIsLocationDetected(true);
            setShowNearbyOnly(false);
            setIsLoading(false);
            return;
          }
          throw new Error('Invalid location data');
        })
        .catch(error => {
          console.warn(`IP service ${index + 1} failed:`, error.message);
          tryNextService(index + 1);
        });
    };

    tryNextService(0);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "#16a34a";
      case "maintenance": return "#eab308";
      case "offline": return "#dc2626";
      default: return "#64748b";
    }
  };

  const getFillLevelColor = (level: number) => {
    if (level < 50) return "#16a34a";
    if (level < 80) return "#eab308";
    return "#dc2626";
  };

  const getDirections = (bin: Bin) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${bin.coordinates.lat},${bin.coordinates.lng}`;
    window.open(url, '_blank');
  };

  const getDistanceText = (bin: Bin): string => {
    if (!userLocation) return "";
    const distance = calculateDistance(userLocation, bin.coordinates);
    if (distance < 1) {
      return `${Math.round(distance * 1000)}m away`;
    }
    return `${Math.round(distance)}km away`;
  };

  const toggleNearbyView = () => {
    if (userLocation) {
      setShowNearbyOnly(!showNearbyOnly);
    }
  };

  return (
    <div className="page-gradient">
      {/* Navigation */}
      <nav className="nav">
        <div className="container">
          <div className="nav-content">
            <div className="logo">
              <div className="logo-icon">
                <MapPin size={24} />
              </div>
              <span>Smart Bin Finder</span>
            </div>
            <div className="nav-links">
              <button onClick={() => window.location.href = "/"} style={{ background: 'none', border: 'none', color: '#16a34a', cursor: 'pointer', fontWeight: '500' }}>
                <Home size={20} style={{ marginRight: '8px' }} />
                Home
              </button>
              <button onClick={() => window.location.href = "/waste-detection"} style={{ background: 'none', border: 'none', color: '#16a34a', cursor: 'pointer', fontWeight: '500' }}>
                Waste Detection
              </button>
              <button onClick={() => window.location.href = "/bin-finder/ewaste-products"} style={{ background: 'none', border: 'none', color: '#16a34a', cursor: 'pointer', fontWeight: '500' }}>
                E-Waste Products
              </button>
              <button onClick={() => window.location.href = "/rewards"} style={{ background: 'none', border: 'none', color: '#16a34a', cursor: 'pointer', fontWeight: '500' }}>
                Rewards
              </button>
              <ThemeToggle />
            </div>
            <button 
              className="mobile-nav-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav">
          <div className="mobile-nav-links">
            <button onClick={() => { window.location.href = "/"; setMobileMenuOpen(false); }}>
              <Home size={20} />
              <span>Home</span>
            </button>
            <button onClick={() => { window.location.href = "/waste-detection"; setMobileMenuOpen(false); }}>
              <Monitor size={20} />
              <span>Waste Detection</span>
            </button>
            <button onClick={() => { window.location.href = "/bin-finder"; setMobileMenuOpen(false); }}>
              <MapPin size={20} />
              <span>Bin Finder</span>
            </button>
            <button onClick={() => { window.location.href = "/bin-finder/ewaste-products"; setMobileMenuOpen(false); }}>
              <Smartphone size={20} />
              <span>E-Waste Products</span>
            </button>
            <button onClick={() => { window.location.href = "/rewards"; setMobileMenuOpen(false); }}>
              <Shield size={20} />
              <span>Rewards</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container" style={{ padding: '40px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '16px' }}>
            <span className="text-green">Find Smart Bins</span>
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>
            Locate the nearest smart e-waste recycling bins in your area. Check real-time status and get directions.
          </p>
        </div>

        {/* Search and Filters */}
        <div style={{ maxWidth: '800px', margin: '0 auto 40px' }}>
          <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '250px' }}>
              <div style={{ position: 'relative' }}>
                <Search size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                <input
                  type="text"
                  placeholder="Search by location, name, or address..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px 12px 44px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '16px',
                    outline: 'none',
                    background: 'white'
                  }}
                />
              </div>
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              style={{
                padding: '12px 16px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '16px',
                background: 'white',
                cursor: 'pointer'
              }}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="maintenance">Maintenance</option>
              <option value="offline">Offline</option>
            </select>
            <button 
              className="btn btn-primary"
              onClick={getUserLocation}
              disabled={isLoading}
            >
              {isLoading ? (
                <RefreshCw size={20} style={{ marginRight: '8px', animation: 'pulse 1s infinite' }} />
              ) : (
                <Navigation size={20} style={{ marginRight: '8px' }} />
              )}
              {isLoading ? 'Getting Location...' : 'Use My Location'}
            </button>
            {userLocation && (
              <button 
                className="btn btn-secondary"
                onClick={toggleNearbyView}
              >
                {showNearbyOnly ? (
                  <>
                    <MapPin size={20} style={{ marginRight: '8px' }} />
                    Nearby Only
                  </>
                ) : (
                  <>
                    <Users size={20} style={{ marginRight: '8px' }} />
                    Nationwide
                  </>
                )}
              </button>
            )}
          </div>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#16a34a', marginBottom: '8px' }}>
              {filteredBins.length}
            </div>
            <div style={{ color: '#64748b' }}>Total Bins</div>
          </div>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#16a34a', marginBottom: '8px' }}>
              {filteredBins.filter(b => b.status === 'active').length}
            </div>
            <div style={{ color: '#64748b' }}>Active Now</div>
          </div>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#eab308', marginBottom: '8px' }}>
              {filteredBins.filter(b => b.fillLevel > 70).length}
            </div>
            <div style={{ color: '#64748b' }}>Nearly Full</div>
          </div>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#16a34a', marginBottom: '8px' }}>
              24/7
            </div>
            <div style={{ color: '#64748b' }}>Always Available</div>
          </div>
        </div>

        {/* Selected Product Info */}
        {selectedProduct && (
          <div style={{ 
            background: '#f0fdf4', 
            borderRadius: '12px', 
            padding: '16px', 
            marginBottom: '24px',
            border: '1px solid #bbf7d0',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#16a34a' }}>
              {selectedProduct.icon && (() => {
                const Icon = selectedProduct.icon;
                return <Icon size={20} />;
              })()}
              <span style={{ fontWeight: 'bold' }}>
                Recycling: {selectedProduct.name}
              </span>
            </div>
            <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
              Showing {filteredBins.length} bins that accept this product
            </div>
            <button 
              className="btn btn-secondary"
              onClick={() => setSelectedProduct(null)}
              style={{ padding: '6px 12px', fontSize: '0.875rem' }}
            >
              Clear Selection
            </button>
          </div>
        )}

        {/* Map Section */}
        <div className="content-card" style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '16px' }}>Interactive Map</h2>
          <div style={{
            height: '400px',
            background: '#f3f4f6',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#64748b'
          }}>
            <div style={{ textAlign: 'center' }}>
              <MapPin size={48} style={{ marginBottom: '16px' }} />
              <p>Interactive map view</p>
              <p style={{ fontSize: '0.875rem' }}>Showing {filteredBins.length} bins in your area</p>
            </div>
          </div>
        </div>

        {/* Bin List */}
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '24px' }}>
            {selectedProduct ? `Bins for ${selectedProduct.name}` : 'Nearby Smart Bins'}
          </h2>

          {/* Loading/Location Detection State */}
          {!isLocationDetected && (
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '48px 20px',
              textAlign: 'center',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}>
              <div style={{ marginBottom: '24px' }}>
                <Navigation size={64} style={{ color: '#16a34a', animation: 'pulse 2s ease-in-out infinite' }} />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '12px' }}>
                Detecting Your Location
              </h3>
              <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '8px' }}>
                {isLoading ? 'Please wait while we find bins near you...' : 'Fetching bin locations...'}
              </p>
              <p style={{ color: '#16a34a', fontSize: '0.875rem' }}>
                Grant location permission for best results
              </p>
            </div>
          )}

          {/* Bins Grid - Only show when location is detected */}
          {isLocationDetected && filteredBins.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px' }}>
              {filteredBins.map((bin) => (
              <motion.div
                key={bin.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="card"
                whileHover={{ scale: 1.02 }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '4px' }}>{bin.name}</h3>
                    <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '4px' }}>{bin.address}</p>
                    <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '4px' }}>{bin.city}, {bin.state} {bin.zipCode}</p>
                    {userLocation && (
                      <div style={{ fontSize: '0.875rem', color: '#16a34a', fontWeight: 'bold' }}>
                        {getDistanceText(bin)}
                      </div>
                    )}
                  </div>
                  <div style={{
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    color: 'white',
                    background: getStatusColor(bin.status)
                  }}>
                    {bin.status}
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Fill Level</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 'bold', color: getFillLevelColor(bin.fillLevel) }}>
                      {bin.fillLevel}%
                    </span>
                  </div>
                  <div style={{
                    height: '8px',
                    background: '#e5e7eb',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${bin.fillLevel}%`,
                      background: getFillLevelColor(bin.fillLevel),
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '6px' }}>
                    <strong>Accepts:</strong>
                  </div>
                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                    {(Array.isArray(bin.acceptedTypes) ? bin.acceptedTypes : []).map((type) => (
                      <div
                        key={type}
                        style={{
                          padding: '2px 6px',
                          background: selectedProduct && selectedProduct.binTypes.includes(type) 
                            ? '#f0fdf4' 
                            : '#f3f4f6',
                          border: selectedProduct && selectedProduct.binTypes.includes(type)
                            ? '1px solid #bbf7d0'
                            : '1px solid #e5e7eb',
                          borderRadius: '8px',
                          fontSize: '0.75rem',
                          color: selectedProduct && selectedProduct.binTypes.includes(type)
                            ? '#16a34a'
                            : '#64748b',
                          textTransform: 'capitalize',
                          fontWeight: selectedProduct && selectedProduct.binTypes.includes(type)
                            ? 'bold'
                            : 'normal'
                        }}
                      >
                        {type}
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: '#64748b' }}>
                    <Clock size={16} />
                    <span>{bin.operatingHours}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: '#64748b' }}>
                    <Phone size={16} />
                    <span>{bin.phone}</span>
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '0.875rem', color: 'var(--neutral-600)', marginBottom: '8px', fontWeight: '600' }}>
                    Features
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {(Array.isArray(bin.features) ? bin.features : []).map((feature) => {
                      const featureConfig = {
                        camera: { icon: Camera, color: '#16a34a', bg: '#dcfce7', border: '#16a34a', emoji: '📷', label: 'Camera' },
                        wifi: { icon: Wifi, color: '#7c3aed', bg: '#ede9fe', border: '#7c3aed', emoji: '📶', label: 'WiFi' },
                        solar_power: { icon: Zap, color: '#ea580c', bg: '#fed7aa', border: '#ea580c', emoji: '⚡', label: 'Solar' },
                        shelter: { icon: Home, color: '#0891b2', bg: '#cffafe', border: '#0891b2', emoji: '🏠', label: 'Shelter' },
                        indoor: { icon: Home, color: '#0891b2', bg: '#cffafe', border: '#0891b2', emoji: '🏠', label: 'Indoor' },
                        outdoor: { icon: MapPin, color: '#dc2626', bg: '#fee2e2', border: '#dc2626', emoji: '📍', label: 'Outdoor' },
                        charging: { icon: Battery, color: '#059669', bg: '#d1fae5', border: '#059669', emoji: '🔋', label: 'Charging' },
                        security: { icon: Shield, color: '#7c2d12', bg: '#fed7aa', border: '#7c2d12', emoji: '🛡️', label: 'Security' },
                        monitoring: { icon: Activity, color: '#4338ca', bg: '#e0e7ff', border: '#4338ca', emoji: '📊', label: 'Monitoring' },
                        accessible: { icon: Users, color: '#be123c', bg: '#fce7f3', border: '#be123c', emoji: '♿', label: 'Accessible' }
                      };
                      
                      const config = featureConfig[feature as keyof typeof featureConfig] || {
                        icon: Camera,
                        color: '#6b7280',
                        bg: '#f3f4f6',
                        border: '#d1d5db',
                        emoji: '📷',
                        label: feature
                      };
                      
                      const Icon = config.icon;
                      
                      return (
                        <div
                          key={feature}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '6px 10px',
                            background: config.bg,
                            border: '1px solid ' + config.border,
                            borderRadius: '8px',
                            fontSize: '0.75rem',
                            color: config.color,
                            fontWeight: '500',
                            transition: 'all 0.2s ease',
                            cursor: 'default'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-1px)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        >
                          <Icon size={14} color={config.color} style={{ flexShrink: 0 }} />
                          <span>{config.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button 
                    className="btn btn-primary"
                    onClick={() => getDirections(bin)}
                    style={{ flex: 1 }}
                  >
                    <Navigation size={16} style={{ marginRight: '8px' }} />
                    Get Directions
                  </button>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => setSelectedBin(bin)}
                  >
                    <Activity size={16} style={{ marginRight: '8px' }} />
                    Details
                  </button>
                </div>
              </motion.div>
            ))}
            </div>
          )}

          {/* No Results - Only show when location is detected */}
          {isLocationDetected && filteredBins.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <AlertTriangle size={48} color="#64748b" style={{ marginBottom: '16px' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '8px' }}>No bins found in your area</h3>
              <p style={{ color: '#64748b', marginBottom: '24px' }}>
                Try adjusting your search criteria or increasing the search radius
              </p>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedStatus("all");
                  setSearchRadius(100);
                }}
              >
                <RefreshCw size={16} style={{ marginRight: '8px' }} />
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
