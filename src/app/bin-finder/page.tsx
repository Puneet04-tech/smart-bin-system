"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useRealTimeBins, useRealTimeLocation } from "@/hooks/useRealTime";
import InteractiveMap from "@/components/InteractiveMap";
import { 
  MapPin, 
  Navigation, 
  Phone, 
  Clock, 
  Filter,
  Search,
  Smartphone,
  Laptop,
  Battery,
  Zap,
  Tablet,
  Headphones,
  Monitor,
  Printer,
  AlertTriangle,
  RefreshCw,
  Cable,
  Wifi,
  Cpu,
  HardDrive,
  Activity,
  Stethoscope,
  Factory
} from "lucide-react";

const wasteTypeIcons = {
  smartphone: Smartphone,
  laptop: Laptop,
  battery: Battery,
  charger: Zap,
  cable: Cable,
  monitor: Monitor,
  wifi: Wifi,
  tablet: Tablet,
  headphones: Headphones,
  printer: Printer,
  scanner: HardDrive,
  desktop: Cpu,
  motor: Activity,
  medical_devices: Stethoscope,
  industrial_electronics: Factory,
  earphones: Headphones,
};

const wasteTypeColors = {
  smartphone: "bg-blue-500",
  laptop: "bg-purple-500",
  battery: "bg-green-500",
  charger: "bg-yellow-500",
  cable: "bg-orange-500",
  monitor: "bg-indigo-500",
  wifi: "bg-pink-500",
  tablet: "bg-teal-500",
  headphones: "bg-cyan-500",
  printer: "bg-red-500",
  scanner: "bg-rose-500",
  desktop: "bg-violet-500",
  motor: "bg-amber-500",
  medical_devices: "bg-emerald-500",
  industrial_electronics: "bg-slate-500",
  earphones: "bg-cyan-500",
};

interface BinData {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  acceptedTypes: string; // JSON string of array
  currentFill: number;
  maxCapacity: number;
  status: 'operational' | 'maintenance' | 'offline' | 'full';
  lastEmptied?: Date;
  qrCode: string;
  createdAt: Date;
  updatedAt: Date;
  distance?: number; // Added for distance calculation
}

export default function BinFinderPage() {
  const [selectedWasteType, setSelectedWasteType] = useState<string>("smartphone");
  const { bins, loading, updateBinStatus } = useRealTimeBins();
  const { userLocation } = useRealTimeLocation();
  const [viewMode, setViewMode] = useState<"map" | "list">("map");
  const [selectedBin, setSelectedBin] = useState<BinData | null>(null);

  // Default user location (will be overridden by GPS)
  const defaultLocation = { lat: 23.2599, lng: 77.4126 }; // Bhopal as fallback
  const currentUserLocation = userLocation || defaultLocation;
  const isUsingRealLocation = !!userLocation;

  // Filter bins based on selected waste type and real-time data
  const filteredBins = bins.filter(bin => {
    try {
      const acceptedTypes = JSON.parse(bin.acceptedTypes || '[]') as string[];
      return Array.isArray(acceptedTypes) && acceptedTypes.includes(selectedWasteType) && bin.status === 'operational';
    } catch {
      return false;
    }
  });

  // Calculate distance from user location to each bin
  const binsWithDistance = filteredBins.map(bin => {
    if (!currentUserLocation) return { ...bin, distance: 0 };
    
    const distance = calculateDistance(
      currentUserLocation.lat, 
      currentUserLocation.lng, 
      bin.latitude, 
      bin.longitude
    );
    
    return { ...bin, distance };
  }).sort((a, b) => (a.distance || 0) - (b.distance || 0));

  // Check if there are bins nearby (within 50km)
  const nearbyBins = binsWithDistance.filter(bin => (bin.distance || 0) <= 50);
  const hasNearbyBins = nearbyBins.length > 0;
  const nearestBin = binsWithDistance[0];

  useEffect(() => {
    if (binsWithDistance.length > 0 && !selectedBin) {
      // Ensure the selected bin matches the BinData interface
      const firstBin = binsWithDistance[0];
      setSelectedBin({
        ...firstBin,
        acceptedTypes: typeof firstBin.acceptedTypes === 'string' 
          ? firstBin.acceptedTypes 
          : JSON.stringify(firstBin.acceptedTypes)
      });
    }
  }, [binsWithDistance, selectedBin]);

  function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c; // Distance in km
    return distance;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational": return "bg-green-100 text-green-800";
      case "full": return "bg-red-100 text-red-800";
      case "maintenance": return "bg-yellow-100 text-yellow-800";
      case "offline": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getFillLevelColor = (fillPercentage: number) => {
    if (fillPercentage < 50) return "bg-green-500";
    if (fillPercentage < 80) return "bg-yellow-500";
    return "bg-red-500";
  };

  const handleRefresh = () => {
    // Trigger real-time refresh
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-emerald-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading real-time bin data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-linear-to-br from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-linear-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                Live Bin Finder
              </span>
              <Badge className="bg-emerald-100 text-emerald-800">
                {bins.length} bins live
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={handleRefresh}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button variant="ghost" onClick={() => window.history.back()}>
                Back
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Location Status */}
        {/* Location Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Card className="bg-emerald-50 border-emerald-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-emerald-600" />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-emerald-800 font-medium">
                      {isUsingRealLocation ? "📍 Your Live GPS Location" : "📍 Using Default Location"}
                    </span>
                    {!isUsingRealLocation && (
                      <Badge variant="outline" className="text-xs animate-pulse">
                        Enable GPS for accurate results
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-emerald-600">
                    {currentUserLocation.lat.toFixed(4)}, {currentUserLocation.lng.toFixed(4)}
                  </p>
                  {isUsingRealLocation && (
                    <p className="text-xs text-emerald-500">
                      Showing bins near your actual location
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* No Nearby Bins Message */}
        {!hasNearbyBins && binsWithDistance.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Card className="bg-amber-50 border-amber-200">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-medium text-amber-800 mb-1">
                      No bins found within 50km of your location
                    </h4>
                    <p className="text-sm text-amber-700 mb-2">
                      Showing the nearest available bin: <strong>{nearestBin.name}</strong> 
                      <span className="ml-2">({nearestBin.distance?.toFixed(1)} km away)</span>
                    </p>
                    <p className="text-xs text-amber-600">
                      Consider contacting local authorities about e-waste recycling options in your area.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Waste Type Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What are you recycling?</h2>
          <div className="flex flex-wrap gap-3">
            {Object.entries(wasteTypeIcons).map(([type, Icon]) => (
              <motion.button
                key={type}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedWasteType(type)}
                className={`p-4 rounded-xl border-2 transition-all flex items-center space-x-3 ${
                  selectedWasteType === type
                    ? 'border-emerald-500 bg-emerald-50 shadow-lg'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className={`w-8 h-8 ${wasteTypeColors[type as keyof typeof wasteTypeColors]} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium capitalize text-gray-800">{type}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map/List View */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <MapPin className="w-5 h-5" />
                        <span>Live Nearby Bins</span>
                      </CardTitle>
                      <CardDescription>
                        {binsWithDistance.length} bins accepting {selectedWasteType} • Real-time updates
                      </CardDescription>
                    </div>
                    <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "map" | "list")}>
                      <TabsList>
                        <TabsTrigger value="map">Map</TabsTrigger>
                        <TabsTrigger value="list">List</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </CardHeader>
                <CardContent>
                  {viewMode === "map" ? (
                    loading ? (
                      <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <RefreshCw className="w-8 h-8 animate-spin text-emerald-600 mx-auto mb-4" />
                          <p className="text-gray-600">Loading map...</p>
                        </div>
                      </div>
                    ) : (
                      <InteractiveMap 
                        bins={binsWithDistance}
                        userLocation={currentUserLocation}
                        selectedBin={selectedBin}
                        onBinSelect={setSelectedBin}
                      />
                    )
                  ) : (
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {binsWithDistance.map((bin) => (
                        <motion.div
                          key={bin.id}
                          whileHover={{ scale: 1.02 }}
                          onClick={() => setSelectedBin(bin)}
                          className={`p-4 rounded-lg border cursor-pointer transition-all ${
                            selectedBin?.id === bin.id
                              ? 'border-emerald-500 bg-emerald-50'
                              : 'border-gray-200 bg-white hover:border-gray-300'
                          }`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-semibold text-gray-900">{bin.name}</h4>
                              <p className="text-sm text-gray-600">{bin.address}</p>
                            </div>
                            <Badge className={getStatusColor(bin.status)}>
                              {bin.status}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <Navigation className="w-4 h-4" />
                              <span>{bin.distance.toFixed(1)} km</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>Live</span>
                            </div>
                          </div>
                          <div className="mt-3">
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-600">Fill Level</span>
                              <span className="text-gray-900 font-medium">{bin.currentFill}%</span>
                            </div>
                            <Progress value={bin.currentFill} className="h-2" />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Selected Bin Details */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5" />
                    <span>Live Bin Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedBin && (
                    <>
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900 mb-2">{selectedBin.name}</h3>
                        <p className="text-gray-600 text-sm mb-4">{selectedBin.address}</p>
                        
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Status</span>
                            <Badge className={getStatusColor(selectedBin.status)}>
                              {selectedBin.status}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Distance</span>
                            <span className="font-medium">{(selectedBin.distance || 0).toFixed(1)} km</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Last Updated</span>
                            <span className="font-medium">Just now</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Accepted Items</h4>
                        <div className="flex flex-wrap gap-2">
                          {JSON.parse(selectedBin.acceptedTypes || '[]').map((type: string) => {
                            const Icon = wasteTypeIcons[type as keyof typeof wasteTypeIcons];
                            return (
                              <div
                                key={type}
                                className={`px-3 py-2 rounded-lg ${wasteTypeColors[type as keyof typeof wasteTypeColors]} text-white flex items-center space-x-2`}
                              >
                                <Icon className="w-4 h-4" />
                                <span className="text-sm capitalize">{type}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Live Capacity</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Fill Level</span>
                            <span className="font-medium">{selectedBin.currentFill}%</span>
                          </div>
                          <Progress value={selectedBin.currentFill} className="h-3" />
                          <p className="text-xs text-gray-500">
                            {selectedBin.maxCapacity - selectedBin.currentFill} spots available
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Button className="w-full bg-linear-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700">
                          <Navigation className="w-4 h-4 mr-2" />
                          Get Directions
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Phone className="w-4 h-4 mr-2" />
                          Contact Bin
                        </Button>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
