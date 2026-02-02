"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAIDetection } from "@/hooks/useRealTime";
import { 
  Camera, 
  Upload, 
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
  Monitor,
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
  Zap as ZapIcon,
  Scale,
  Box,
  Brain,
  Eye,
  Award,
  RotateCcw,
  CameraOff,
  Video,
  VideoOff
} from "lucide-react";

interface DetectionResult {
  itemType: string;
  confidence: number;
  estimatedValue: number;
  pointsEarned: number;
  weight: number;
  description: string;
  reasoning: string[];
  image: string;
}

const mockDetectionResults: DetectionResult[] = [
  {
    itemType: "smartphone",
    confidence: 0.94,
    estimatedValue: 45.00,
    pointsEarned: 450,
    weight: 0.18,
    description: "iPhone 12 Pro - Good condition",
    reasoning: [
      "Rectangular shape with rounded corners detected",
      "Camera module pattern matches smartphone design",
      "Weight and dimensions consistent with modern smartphone",
      "Screen-to-body ratio indicates mobile device"
    ],
    image: "/api/placeholder/300/200"
  },
  {
    itemType: "laptop",
    confidence: 0.87,
    estimatedValue: 120.00,
    pointsEarned: 1200,
    weight: 1.4,
    description: "Dell Latitude 7400 - Working condition",
    reasoning: [
      "Large rectangular form factor detected",
      "Keyboard layout and trackpad identified",
      "Hinge mechanism visible in image analysis",
      "Weight consistent with ultrabook category"
    ],
    image: "/api/placeholder/300/200"
  },
  {
    itemType: "battery",
    confidence: 0.91,
    estimatedValue: 8.50,
    pointsEarned: 85,
    weight: 0.05,
    description: "Li-ion battery pack - 18650 cells",
    reasoning: [
      "Cylindrical and rectangular battery shapes detected",
      "Terminal connections identified",
      "Voltage markings visible on surface",
      "Weight matches lithium-ion battery specifications"
    ],
    image: "/api/placeholder/300/200"
  }
];

const wasteTypeIcons = {
  smartphone: Smartphone,
  laptop: Laptop,
  battery: Battery,
  charger: Zap,
  cable: Cable,
  monitor: Monitor,
};

const wasteTypeColors = {
  smartphone: "bg-blue-500",
  laptop: "bg-purple-500",
  battery: "bg-green-500",
  charger: "bg-yellow-500",
  cable: "bg-orange-500",
  monitor: "bg-indigo-500",
};

export default function WasteDetectionPage() {
  const [detectionState, setDetectionState] = useState<"idle" | "scanning" | "analyzing" | "complete" | "error">("idle");
  const { isProcessing, progress, result, startDetection } = useAIDetection();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Update detection state based on processing state
  useEffect(() => {
    if (isProcessing && detectionState === "scanning") {
      setDetectionState("analyzing");
    } else if (!isProcessing && result && detectionState === "analyzing") {
      if (result.isEWaste === false) {
        setDetectionState("error");
      } else {
        setDetectionState("complete");
      }
    } else if (!isProcessing && detectionState === "analyzing" && !result) {
      setDetectionState("error");
    }
  }, [isProcessing, result, detectionState]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('File upload triggered'); // Debug log
    const file = event.target.files?.[0];
    if (file) {
      console.log('File selected:', file.name, file.type, file.size); // Debug log
      processFile(file);
    } else {
      console.log('No file selected'); // Debug log
    }
  };

  const processFile = (file: File) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadstart = () => {
      setDetectionState("scanning");
    };
    reader.onloadend = () => {
      try {
        const result = reader.result as string;
        setUploadedImage(result);
        // Start real AI detection
        startDetection(result);
      } catch (error) {
        console.error('Error reading file:', error);
        setDetectionState("error");
      }
    };
    reader.onerror = () => {
      console.error('Error reading file');
      setDetectionState("error");
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  };

  const handleReset = () => {
    setDetectionState("idle");
    setUploadedImage(null);
    stopCamera();
  };

  const startCamera = async () => {
    try {
      console.log('Starting camera...');
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      console.log('Camera stream obtained:', stream);
      setCameraStream(stream);
      setIsCameraActive(true);
      
      // Set video stream after a small delay to ensure DOM is ready
      setTimeout(() => {
        if (videoRef.current) {
          console.log('Setting video stream to element');
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(err => console.log('Video play error:', err));
        } else {
          console.log('Video ref is null');
        }
      }, 100);
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please check permissions.');
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
      setIsCameraActive(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const imageData = canvas.toDataURL('image/jpeg', 0.8);
        setUploadedImage(imageData);
        stopCamera();
        setDetectionState("scanning");
        startDetection(imageData);
      }
    }
  };

  useEffect(() => {
    // Cleanup camera on unmount
    return () => {
      stopCamera();
    };
  }, []);

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return "text-green-600";
    if (confidence >= 0.7) return "text-yellow-600";
    return "text-red-600";
  };

  const getConfidenceBgColor = (confidence: number) => {
    if (confidence >= 0.9) return "bg-green-100";
    if (confidence >= 0.7) return "bg-yellow-100";
    return "bg-red-100";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-green-100">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-yellow-500 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-green-600">
                AI Waste Detection
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => window.history.back()}>
                Back
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Detection Interface */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Scan className="w-5 h-5" />
                    <span>Scan Your E-Waste</span>
                  </CardTitle>
                  <CardDescription>
                    Upload or capture an image for AI-powered detection
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Image Upload Area */}
                  <div className="relative">
                    <AnimatePresence mode="wait">
                      {detectionState === "idle" && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
                            isDragging 
                              ? 'border-green-500 bg-green-50' 
                              : 'border-gray-300 hover:border-green-500'
                          }`}
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                          onClick={() => !isCameraActive && document.getElementById('image-upload')?.click()}
                        >
                          <div className="space-y-4">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                              {isCameraActive ? <Video className="w-8 h-8 text-green-600" /> : <Camera className="w-8 h-8 text-gray-400" />}
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900 mb-2">
                                {isCameraActive ? 'Camera Active' : 'Capture E-Waste'}
                              </h3>
                              <p className="text-sm text-gray-600 mb-4">
                                {isCameraActive 
                                  ? 'Position the item and capture photo' 
                                  : 'Take a photo or upload an image'
                                }
                              </p>
                              
                              {!isCameraActive ? (
                                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    ref={fileInputRef}
                                  />
                                  <Button 
                                    className="bg-gradient-to-br from-green-500 to-yellow-500 hover:from-green-600 hover:to-yellow-600"
                                    onClick={(e) => {
                                      console.log('Upload button clicked'); // Debug log
                                      e.stopPropagation();
                                      fileInputRef.current?.click();
                                    }}
                                  >
                                    <Upload className="w-4 h-4 mr-2" />
                                    Upload File
                                  </Button>
                                  <Button 
                                    className="bg-gradient-to-br from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                                    onClick={(e) => {
                                      console.log('Camera button clicked'); // Debug log
                                      e.stopPropagation();
                                      startCamera();
                                    }}
                                  >
                                    <Camera className="w-4 h-4 mr-2" />
                                    Use Camera
                                  </Button>
                                </div>
                              ) : (
                                <div className="space-y-3">
                                  {isCameraActive && (
                                    <>
                                      <video
                                        ref={videoRef}
                                        autoPlay
                                        playsInline
                                        muted
                                        className="w-full h-64 object-cover rounded-lg bg-black"
                                        style={{ transform: 'scaleX(-1)' }}
                                      />
                                      <canvas ref={canvasRef} className="hidden" />
                                    </>
                                  )}
                                  <div className="flex gap-3 justify-center">
                                    {isCameraActive && (
                                      <>
                                        <Button 
                                          className="bg-gradient-to-br from-green-500 to-yellow-500 hover:from-green-600 hover:to-yellow-600"
                                          onClick={capturePhoto}
                                        >
                                          <Camera className="w-4 h-4 mr-2" />
                                          Capture Photo
                                        </Button>
                                        <Button 
                                          variant="outline"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            stopCamera();
                                          }}
                                        >
                                          <CameraOff className="w-4 h-4 mr-2" />
                                          Cancel
                                        </Button>
                                      </>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {(detectionState === "scanning" || detectionState === "analyzing") && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="text-center"
                        >
                          <div className="relative">
                            {uploadedImage && (
                              <img
                                src={uploadedImage}
                                alt="Uploaded e-waste"
                                className="w-full h-64 object-cover rounded-lg mb-4"
                              />
                            )}
                            <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                              <div className="text-white space-y-4">
                                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                                  <Scan className="w-8 h-8 animate-pulse" />
                                </div>
                                <div>
                                  <h3 className="font-semibold text-lg">
                                    {detectionState === "scanning" ? "Scanning..." : "Analyzing..."}
                                  </h3>
                                  <p className="text-sm opacity-80">
                                    {detectionState === "scanning" 
                                      ? "Capturing image details" 
                                      : "AI is identifying your item"}
                                  </p>
                                </div>
                                {detectionState === "scanning" && (
                                  <div className="w-48 mx-auto">
                                    <Progress value={progress} className="h-2" />
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {detectionState === "complete" && result && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                        >
                          <div className="relative">
                            {uploadedImage && (
                              <img
                                src={uploadedImage}
                                alt="Detected e-waste"
                                className="w-full h-64 object-cover rounded-lg"
                              />
                            )}
                            <div className="absolute top-4 right-4">
                              <Badge className="bg-green-100 text-green-800">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Detected
                              </Badge>
                            </div>
                          </div>
                          <div className="mt-4 flex justify-center">
                            <Button onClick={handleReset} variant="outline">
                              <RotateCcw className="w-4 h-4 mr-2" />
                              Scan Another Item
                            </Button>
                          </div>
                        </motion.div>
                      )}

                      {detectionState === "error" && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="text-center py-8"
                        >
                          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <AlertCircle className="w-8 h-8 text-orange-600" />
                          </div>
                          <h3 className="font-semibold text-orange-900 mb-2">
                            {result?.isEWaste === false ? 'No E-Waste Detected' : 'Detection Failed'}
                          </h3>
                          <p className="text-orange-600 mb-4">
                            {result?.isEWaste === false 
                              ? 'This image does not appear to contain electronic waste. Please upload only electronic devices.'
                              : 'Unable to identify the item. Please try again with a clearer image.'
                            }
                          </p>
                          {result?.reasoning && (
                            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4 text-left">
                              <p className="font-semibold text-orange-800 mb-2">AI Analysis:</p>
                              <ul className="text-sm text-orange-700 space-y-1">
                                {result.reasoning.map((reason: string, index: number) => (
                                  <li key={index} className="flex items-start space-x-2">
                                    <span className="text-orange-500 mt-1">•</span>
                                    <span>{reason}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          <Button onClick={handleReset} variant="outline">
                            <RotateCcw className="w-4 h-4 mr-2" />
                            Try Another Image
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Detection Info */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Info className="w-5 h-5 text-green-600 mt-0.5" />
                      <div className="text-sm text-green-800">
                        <p className="font-semibold mb-1">E-Waste Detection Tips:</p>
                        <ul className="list-disc list-inside space-y-1 text-green-700">
                          <li>Only electronic devices: phones, laptops, batteries, chargers, cables</li>
                          <li>Camera: Position item clearly, ensure good lighting</li>
                          <li>Upload: Ensure good lighting and clear focus on the electronic item</li>
                          <li>Show the entire device without people or other objects</li>
                          <li>Include distinctive features like ports, screens, or logos</li>
                          <li>Avoid blurry images or partially obscured devices</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Results Panel */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5" />
                    <span>Detection Results</span>
                  </CardTitle>
                  <CardDescription>
                    AI analysis and valuation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AnimatePresence mode="wait">
                    {result && result.isEWaste !== false ? (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                      >
                        {/* Item Identification */}
                        <div className="text-center">
                          <div className={`w-20 h-20 ${wasteTypeColors[result.itemType as keyof typeof wasteTypeColors]} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                            {React.createElement(wasteTypeIcons[result.itemType as keyof typeof wasteTypeIcons], { className: "w-10 h-10 text-white" })}
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 capitalize mb-2">
                            {result.itemType}
                          </h3>
                          <p className="text-gray-600">{result.description}</p>
                        </div>

                        {/* Confidence Score */}
                        <div className={`p-4 rounded-lg ${getConfidenceBgColor(result.confidence)}`}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold">AI Confidence</span>
                            <span className={`font-bold ${getConfidenceColor(result.confidence)}`}>
                              {(result.confidence * 100).toFixed(0)}%
                            </span>
                          </div>
                          <Progress value={result.confidence * 100} className="h-2" />
                        </div>

                        {/* Value & Points */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-emerald-50 p-4 rounded-lg">
                            <div className="flex items-center space-x-2 mb-2">
                              <TrendingUp className="w-5 h-5 text-emerald-600" />
                              <span className="font-semibold text-emerald-900">Estimated Value</span>
                            </div>
                            <p className="text-2xl font-bold text-emerald-600">
                              ${result.estimatedValue.toFixed(2)}
                            </p>
                          </div>
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <div className="flex items-center space-x-2 mb-2">
                              <Award className="w-5 h-5 text-blue-600" />
                              <span className="font-semibold text-blue-900">Points Earned</span>
                            </div>
                            <p className="text-2xl font-bold text-blue-600">
                              {result.pointsEarned}
                            </p>
                          </div>
                        </div>

                        {/* Physical Properties */}
                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-900">Physical Properties</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center space-x-3">
                              <Scale className="w-5 h-5 text-gray-400" />
                              <div>
                                <p className="text-sm text-gray-600">Weight</p>
                                <p className="font-semibold">{result.weight} kg</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <Box className="w-5 h-5 text-gray-400" />
                              <div>
                                <p className="text-sm text-gray-600">Category</p>
                                <p className="font-semibold capitalize">{result.itemType}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* AI Reasoning */}
                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
                            <Brain className="w-5 h-5" />
                            <span>AI Analysis</span>
                          </h4>
                          <div className="space-y-2">
                            {result.reasoning.map((reason: string, index: number) => (
                              <div key={index} className="flex items-start space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <p className="text-sm text-gray-600">{reason}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3">
                          <Button className="w-full bg-gradient-to-br from-green-500 to-yellow-500 hover:from-green-600 hover:to-yellow-600">
                            <ArrowRight className="w-4 h-4 mr-2" />
                            Proceed to Recycling
                          </Button>
                          <Button variant="outline" className="w-full">
                            <Eye className="w-4 h-4 mr-2" />
                            View Detailed Analysis
                          </Button>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center py-12"
                      >
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Eye className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">No Detection Yet</h3>
                        <p className="text-gray-600">
                          Upload or capture an image to start AI detection
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
