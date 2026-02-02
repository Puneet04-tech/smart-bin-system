"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Monitor, 
  QrCode, 
  Scan, 
  CheckCircle, 
  AlertCircle, 
  X,
  ArrowRight,
  Smartphone,
  Laptop,
  Battery,
  Zap,
  Cable,
  Monitor as MonitorIcon,
  Wifi,
  Home,
  Settings,
  Info,
  HelpCircle,
  Volume2,
  Globe,
  Users,
  Package,
  TrendingUp,
  Clock,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  Sparkles,
  ZapIcon
} from "lucide-react";

interface BinStatus {
  operational: boolean;
  fillLevel: number;
  temperature: number;
  lastMaintenance: string;
  acceptedTypes: string[];
  qrCode: string;
}

interface DetectionResult {
  itemType: string;
  confidence: number;
  estimatedValue: number;
  pointsEarned: number;
  status: "processing" | "accepted" | "rejected";
}

const wasteTypeIcons = {
  smartphone: Smartphone,
  laptop: Laptop,
  battery: Battery,
  charger: Zap,
  cable: Cable,
  monitor: MonitorIcon,
  wifi: Wifi,
};

const wasteTypeColors = {
  smartphone: "bg-blue-500",
  laptop: "bg-purple-500",
  battery: "bg-green-500",
  charger: "bg-yellow-500",
  cable: "bg-orange-500",
  monitor: "bg-indigo-500",
  wifi: "bg-pink-500",
};

export default function SmartBinInterface() {
  const [currentScreen, setCurrentScreen] = useState<"home" | "scan" | "processing" | "result" | "info" | "settings">("home");
  const [binStatus, setBinStatus] = useState<BinStatus>({
    operational: true,
    fillLevel: 65,
    temperature: 22,
    lastMaintenance: "2024-01-15",
    acceptedTypes: ["smartphone", "laptop", "battery", "charger"],
    qrCode: "SB-001-NYC"
  });
  const [detectionResult, setDetectionResult] = useState<DetectionResult | null>(null);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  useEffect(() => {
    if (currentScreen === "processing") {
      const interval = setInterval(() => {
        setProcessingProgress((prev) => {
          if (prev >= 100) {
            setTimeout(() => {
              const mockResult: DetectionResult = {
                itemType: "smartphone",
                confidence: 0.94,
                estimatedValue: 45.00,
                pointsEarned: 450,
                status: "accepted"
              };
              setDetectionResult(mockResult);
              setCurrentScreen("result");
            }, 500);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
      return () => clearInterval(interval);
    }
  }, [currentScreen]);

  const handleScan = () => {
    setCurrentScreen("scan");
  };

  const handleQRScan = () => {
    setCurrentScreen("processing");
    setProcessingProgress(0);
  };

  const handleComplete = () => {
    setCurrentScreen("home");
    setDetectionResult(null);
    setProcessingProgress(0);
    // Update bin fill level
    setBinStatus(prev => ({
      ...prev,
      fillLevel: Math.min(prev.fillLevel + 2, 100)
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational": return "bg-green-100 text-green-800";
      case "maintenance": return "bg-yellow-100 text-yellow-800";
      case "offline": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getFillLevelColor = (level: number) => {
    if (level < 50) return "bg-green-500";
    if (level < 80) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Smart Bin Frame */}
        <div className="bg-gray-800 rounded-3xl p-6 shadow-2xl border border-gray-700">
          {/* Screen */}
          <div className="bg-black rounded-2xl p-4 mb-4 min-h-[600px] flex flex-col">
            <AnimatePresence mode="wait">
              {/* Home Screen */}
              {currentScreen === "home" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex-1 flex flex-col"
                >
                  {/* Header */}
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                        <Recycle className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-white font-semibold">Smart Bin</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setCurrentScreen("info")}
                        className="text-gray-400 hover:text-white"
                      >
                        <Info className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setCurrentScreen("settings")}
                        className="text-gray-400 hover:text-white"
                      >
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400 text-sm">Status</span>
                      <Badge className={getStatusColor("operational")}>
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Operational
                      </Badge>
                    </div>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Fill Level</span>
                        <span className="text-white">{binStatus.fillLevel}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${getFillLevelColor(binStatus.fillLevel)}`}
                          style={{ width: `${binStatus.fillLevel}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Main Actions */}
                  <div className="flex-1 flex flex-col justify-center space-y-4">
                    <Button
                      onClick={handleScan}
                      className="h-20 bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white text-lg font-semibold rounded-2xl"
                    >
                      <QrCode className="w-8 h-8 mr-3" />
                      Scan QR Code
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="h-16 border-gray-600 text-gray-300 hover:bg-gray-800 rounded-2xl"
                      onClick={() => setCurrentScreen("info")}
                    >
                      <HelpCircle className="w-6 h-6 mr-2" />
                      How to Use
                    </Button>
                  </div>

                  {/* Accepted Items */}
                  <div className="mt-6">
                    <p className="text-gray-400 text-sm mb-3">Accepted Items:</p>
                    <div className="flex flex-wrap gap-2">
                      {binStatus.acceptedTypes.map((type) => {
                        const Icon = wasteTypeIcons[type as keyof typeof wasteTypeIcons];
                        return (
                          <div
                            key={type}
                            className={`px-3 py-2 rounded-lg ${wasteTypeColors[type as keyof typeof wasteTypeColors]} bg-opacity-20 border border-opacity-30 flex items-center space-x-2`}
                          >
                            <Icon className="w-4 h-4 text-white" />
                            <span className="text-white text-sm capitalize">{type}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Bin ID: {binStatus.qrCode}</span>
                      <span>Temp: {binStatus.temperature}°C</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Scan Screen */}
              {currentScreen === "scan" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex-1 flex flex-col"
                >
                  <div className="flex items-center justify-between mb-6">
                    <Button
                      variant="ghost"
                      onClick={() => setCurrentScreen("home")}
                      className="text-gray-400 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                    <h2 className="text-white text-lg font-semibold">Scan QR Code</h2>
                    <div className="w-5" />
                  </div>

                  <div className="flex-1 flex flex-col items-center justify-center">
                    <div className="w-64 h-64 border-2 border-emerald-500 rounded-2xl flex items-center justify-center mb-8 relative">
                      <div className="absolute inset-0 bg-emerald-500 bg-opacity-10 rounded-2xl" />
                      <QrCode className="w-32 h-32 text-emerald-400" />
                      <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-emerald-500" />
                      <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-emerald-500" />
                      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-emerald-500" />
                      <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-emerald-500" />
                    </div>

                    <p className="text-gray-400 text-center mb-8">
                      Position your QR code within the frame to scan
                    </p>

                    <Button
                      onClick={handleQRScan}
                      className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700"
                    >
                      <Scan className="w-5 h-5 mr-2" />
                      Simulate Scan
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Processing Screen */}
              {currentScreen === "processing" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex-1 flex flex-col"
                >
                  <div className="flex items-center justify-center mb-8">
                    <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-white animate-pulse" />
                    </div>
                  </div>

                  <h2 className="text-white text-xl font-semibold text-center mb-4">
                    AI Processing...
                  </h2>

                  <p className="text-gray-400 text-center mb-8">
                    Analyzing your e-waste with advanced AI technology
                  </p>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        processingProgress >= 25 ? 'bg-emerald-500' : 'bg-gray-600'
                      }`}>
                        <Scan className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-sm">Scanning item</p>
                        <div className="w-full bg-gray-700 rounded-full h-1">
                          <div
                            className="bg-emerald-500 h-1 rounded-full transition-all"
                            style={{ width: `${Math.min(processingProgress * 4, 100)}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        processingProgress >= 50 ? 'bg-emerald-500' : 'bg-gray-600'
                      }`}>
                        <Brain className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-sm">AI analysis</p>
                        <div className="w-full bg-gray-700 rounded-full h-1">
                          <div
                            className="bg-emerald-500 h-1 rounded-full transition-all"
                            style={{ width: `${Math.max(0, (processingProgress - 25) * 4)}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        processingProgress >= 75 ? 'bg-emerald-500' : 'bg-gray-600'
                      }`}>
                        <TrendingUp className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-sm">Calculating value</p>
                        <div className="w-full bg-gray-700 rounded-full h-1">
                          <div
                            className="bg-emerald-500 h-1 rounded-full transition-all"
                            style={{ width: `${Math.max(0, (processingProgress - 50) * 4)}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        processingProgress >= 100 ? 'bg-emerald-500' : 'bg-gray-600'
                      }`}>
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-sm">Completing</p>
                        <div className="w-full bg-gray-700 rounded-full h-1">
                          <div
                            className="bg-emerald-500 h-1 rounded-full transition-all"
                            style={{ width: `${Math.max(0, (processingProgress - 75) * 4)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-400 mb-2">
                      {processingProgress}%
                    </div>
                    <p className="text-gray-400 text-sm">Processing complete</p>
                  </div>
                </motion.div>
              )}

              {/* Result Screen */}
              {currentScreen === "result" && detectionResult && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex-1 flex flex-col"
                >
                  <div className="text-center mb-6">
                    <div className={`w-16 h-16 ${
                      detectionResult.status === "accepted" ? "bg-emerald-500" : "bg-red-500"
                    } rounded-full flex items-center justify-center mx-auto mb-4`}>
                      {detectionResult.status === "accepted" ? (
                        <CheckCircle className="w-8 h-8 text-white" />
                      ) : (
                        <X className="w-8 h-8 text-white" />
                      )}
                    </div>
                    <h2 className={`text-xl font-semibold mb-2 ${
                      detectionResult.status === "accepted" ? "text-emerald-400" : "text-red-400"
                    }`}>
                      {detectionResult.status === "accepted" ? "Item Accepted!" : "Item Rejected"}
                    </h2>
                  </div>

                  <div className="bg-gray-800 rounded-xl p-4 mb-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`w-12 h-12 ${wasteTypeColors[detectionResult.itemType as keyof typeof wasteTypeColors]} rounded-lg flex items-center justify-center`}>
                        {React.createElement(wasteTypeIcons[detectionResult.itemType as keyof typeof wasteTypeIcons], { className: "w-6 h-6 text-white" })}
                      </div>
                      <div>
                        <p className="text-white font-semibold capitalize">{detectionResult.itemType}</p>
                        <p className="text-gray-400 text-sm">
                          {(detectionResult.confidence * 100).toFixed(0)}% confidence
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-700 rounded-lg p-3">
                        <p className="text-gray-400 text-xs mb-1">Estimated Value</p>
                        <p className="text-emerald-400 font-bold">
                          ${detectionResult.estimatedValue.toFixed(2)}
                        </p>
                      </div>
                      <div className="bg-gray-700 rounded-lg p-3">
                        <p className="text-gray-400 text-xs mb-1">Points Earned</p>
                        <p className="text-blue-400 font-bold">+{detectionResult.pointsEarned}</p>
                      </div>
                    </div>
                  </div>

                  {detectionResult.status === "accepted" && (
                    <div className="bg-emerald-500 bg-opacity-10 border border-emerald-500 border-opacity-30 rounded-lg p-4 mb-6">
                      <p className="text-emerald-400 text-sm text-center">
                        Thank you for recycling! Your contribution helps protect the environment.
                      </p>
                    </div>
                  )}

                  <Button
                    onClick={handleComplete}
                    className="w-full bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700"
                  >
                    <ArrowRight className="w-5 h-5 mr-2" />
                    Complete
                  </Button>
                </motion.div>
              )}

              {/* Info Screen */}
              {currentScreen === "info" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex-1 flex flex-col"
                >
                  <div className="flex items-center justify-between mb-6">
                    <Button
                      variant="ghost"
                      onClick={() => setCurrentScreen("home")}
                      className="text-gray-400 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                    <h2 className="text-white text-lg font-semibold">Information</h2>
                    <div className="w-5" />
                  </div>

                  <div className="space-y-4 flex-1 overflow-y-auto">
                    <div className="bg-gray-800 rounded-lg p-4">
                      <h3 className="text-white font-semibold mb-2">How to Use</h3>
                      <ol className="text-gray-400 text-sm space-y-2">
                        <li>1. Scan your QR code to identify yourself</li>
                        <li>2. Place your e-waste item in the scanning area</li>
                        <li>3. Wait for AI analysis to complete</li>
                        <li>4. Receive points and rewards</li>
                      </ol>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-4">
                      <h3 className="text-white font-semibold mb-2">Accepted Items</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {binStatus.acceptedTypes.map((type) => {
                          const Icon = wasteTypeIcons[type as keyof typeof wasteTypeIcons];
                          return (
                            <div key={type} className="flex items-center space-x-2">
                              <Icon className="w-4 h-4 text-emerald-400" />
                              <span className="text-gray-300 text-sm capitalize">{type}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-4">
                      <h3 className="text-white font-semibold mb-2">Contact Support</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-300 text-sm">1-800-RECYCLE</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-300 text-sm">support@smartbin.com</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Settings Screen */}
              {currentScreen === "settings" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex-1 flex flex-col"
                >
                  <div className="flex items-center justify-between mb-6">
                    <Button
                      variant="ghost"
                      onClick={() => setCurrentScreen("home")}
                      className="text-gray-400 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                    <h2 className="text-white text-lg font-semibold">Settings</h2>
                    <div className="w-5" />
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gray-800 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Volume2 className="w-5 h-5 text-gray-400" />
                          <span className="text-white">Sound</span>
                        </div>
                        <Button variant="outline" size="sm">On</Button>
                      </div>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Globe className="w-5 h-5 text-gray-400" />
                          <span className="text-white">Language</span>
                        </div>
                        <Button variant="outline" size="sm">{selectedLanguage}</Button>
                      </div>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-4">
                      <h3 className="text-white font-semibold mb-3">System Info</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Bin ID</span>
                          <span className="text-white">{binStatus.qrCode}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Version</span>
                          <span className="text-white">v2.1.0</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Last Update</span>
                          <span className="text-white">{binStatus.lastMaintenance}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Physical Controls */}
          <div className="flex justify-center space-x-4">
            <Button
              size="sm"
              variant="outline"
              className="border-gray-600 text-gray-400"
              onClick={() => setCurrentScreen("home")}
            >
              <Home className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-gray-600 text-gray-400"
              onClick={() => setCurrentScreen("info")}
            >
              <Info className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-gray-600 text-gray-400"
              onClick={() => setCurrentScreen("settings")}
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* External Info Panel */}
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm mb-2">Smart Bin Interface Simulation</p>
          <p className="text-gray-500 text-xs">
            This is a simulation of the smart bin touch screen interface
          </p>
        </div>
      </div>
    </div>
  );
}

// Add missing imports
import { Recycle, Brain } from "lucide-react";
