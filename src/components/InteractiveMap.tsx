'use client';

import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Zap, Recycle, AlertTriangle, Wifi, WifiOff } from 'lucide-react';

interface BinData {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  acceptedTypes: string;
  currentFill: number;
  maxCapacity: number;
  status: 'operational' | 'maintenance' | 'offline' | 'full';
  lastEmptied?: Date;
  qrCode: string;
  createdAt: Date;
  updatedAt: Date;
  distance?: number;
}

interface UserLocation {
  lat: number;
  lng: number;
}

interface InteractiveMapProps {
  bins: BinData[];
  userLocation?: UserLocation | null;
  selectedBin?: BinData | null;
  onBinSelect?: (bin: BinData) => void;
}

export default function InteractiveMap({ bins, userLocation, selectedBin, onBinSelect }: InteractiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hoveredBin, setHoveredBin] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'bg-green-500';
      case 'full': return 'bg-red-500';
      case 'maintenance': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-green-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return <Recycle className="w-3 h-3" />;
      case 'full': return <AlertTriangle className="w-3 h-3" />;
      case 'maintenance': return <Zap className="w-3 h-3" />;
      case 'offline': return <WifiOff className="w-3 h-3" />;
      default: return <Recycle className="w-3 h-3" />;
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const loadMap = async () => {
      try {
        setIsLoaded(true);
        if (mapRef.current) {
          mapRef.current.innerHTML = `
            <div class="relative w-full h-96 rounded-xl overflow-hidden border-2 border-green-500/20">
              <div class="absolute inset-0 gradient-ewaste opacity-90"></div>
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="text-center text-green-100 p-8 glass-ewaste rounded-xl">
                  <div class="animate-rotate mb-6">
                    <div class="w-20 h-20 mx-auto border-4 border-white/30 border-t-white rounded-full"></div>
                  </div>
                  <h3 class="text-3xl font-bold mb-4 neon-green">E-Waste Smart Map</h3>
                  <p class="text-xl mb-2 opacity-90">Showing ${bins.length} Recycling Bins</p>
                  ${userLocation ? `
                    <p class="text-sm mb-4 opacity-80">
                      <span class="inline-flex items-center gap-2">
                        <MapPin class="w-4 h-4" />
                        Your Location: ${userLocation.lat.toFixed(4)}, ${userLocation.lng.toFixed(4)}
                      </span>
                    </p>
                  ` : ''}
                  ${selectedBin ? `
                    <p class="text-sm opacity-80">
                      <span class="inline-flex items-center gap-2">
                        <Zap class="w-4 h-4" />
                        Selected: ${selectedBin.name}
                      </span>
                    </p>
                  ` : ''}
                  <div class="mt-6 animate-pulse-glow inline-block">
                    <p class="text-sm opacity-70">🔄 Interactive map loading...</p>
                  </div>
                </div>
              </div>
              
              <!-- Bin Markers -->
              ${bins.map((bin, index) => {
                const angle = (index * 360 / bins.length) * Math.PI / 180;
                const radius = 120;
                const x = 50 + radius * Math.cos(angle);
                const y = 50 + radius * Math.sin(angle);
                
                return `
                  <div 
                    class="absolute w-8 h-8 ${getStatusColor(bin.status)} border-3 border-green-300 rounded-full shadow-xl transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-125 cursor-pointer flex items-center justify-center animate-float"
                    style="top: ${y}%; left: ${x}%; z-index: ${bin === selectedBin ? 20 : 10};"
                    title="${bin.name} - ${bin.address} (${bin.status})"
                  >
                    <span class="text-white text-xs">♻</span>
                  </div>
                `;
              }).join('')}
              
              <!-- User Location -->
              ${userLocation ? `
                <div 
                  class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-blue-500 border-3 border-green-300 rounded-full shadow-xl animate-pulse-glow"
                  style="z-index: 15;"
                  title="Your Location"
                >
                  <div class="absolute inset-0 bg-blue-400 rounded-full animate-ping"></div>
                </div>
              ` : ''}
              
              <!-- Legend -->
              <div class="absolute bottom-4 right-4 bg-green-50/95 backdrop-blur-sm p-4 rounded-xl shadow-xl border border-green-500/20">
                <h4 class="font-bold text-sm mb-3 text-gray-800">Bin Status</h4>
                <div class="space-y-2">
                  <div class="flex items-center gap-2">
                    <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span class="text-xs text-gray-600">Operational</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span class="text-xs text-gray-600">Maintenance</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span class="text-xs text-gray-600">Full</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <div class="w-3 h-3 bg-gray-500 rounded-full"></div>
                    <span class="text-xs text-gray-600">Offline</span>
                  </div>
                </div>
              </div>
            </div>
          `;
        }
      } catch (err) {
        console.error('Error loading map:', err);
        setError('Failed to load map');
      }
    };

    loadMap();
  }, [bins, userLocation, selectedBin]);

  if (error) {
    return (
      <div className="w-full h-96 rounded-xl overflow-hidden border-2 border-red-500/20 flex items-center justify-center gradient-ewaste-subtle">
        <div className="text-center p-6 glass-ewaste rounded-xl">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4 animate-pulse-glow" />
          <p className="text-red-600 font-bold mb-2">Map Error</p>
          <p className="text-sm text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={mapRef} 
      className="w-full h-96 rounded-xl overflow-hidden border-2 border-green-500/20 animate-shimmer"
      style={{ minHeight: '384px' }}
    />
  );
}
