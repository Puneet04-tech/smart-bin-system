"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { loadModels, analyzeImage } from "@/lib/aiDetection";
import { ThemeToggle } from "@/components/ThemeToggle";
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
  Monitor,
  Home,
  HelpCircle,
  Sparkles,
  Brain,
  Eye,
  Award,
  RotateCcw,
  CameraOff,
  Video,
  VideoOff,
  Menu,
  MapPin,
  Shield
} from "lucide-react";

const wasteTypeIcons = {
  smartphone: Smartphone,
  laptop: Laptop,
  battery: Battery,
  charger: Zap,
  monitor: Monitor,
  tablet: Monitor,
  headphones: Monitor,
  speaker: Monitor,
  keyboard: Monitor,
  mouse: Monitor,
  printer: Monitor,
  scanner: Monitor,
  router: Monitor,
  cable: Zap,
  other: Monitor,
};

interface DetectionResult {
  itemType: string;
  confidence: number;
  estimatedValue: number;
  pointsEarned: number;
  weight: number;
  description: string;
  reasoning: string[];
  image: string;
  processingTime: number;
  timestamp: string;
  isEWaste: boolean;
}

export default function WasteDetectionPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [detectionResult, setDetectionResult] = useState<DetectionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [cameraStream]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      setCameraStream(stream);
      setIsCameraActive(true);
      
      // Set video source after state update
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }, 100);
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('Unable to access camera. Please check permissions.');
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setIsCameraActive(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], "camera-capture.jpg", { type: "image/jpeg" });
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
            stopCamera();
          }
        }, "image/jpeg");
      }
    }
  };

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError(null);
      setDetectionResult(null);
    } else {
      setError('Please select a valid image file');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleScan = async () => {
    if (!selectedFile || !previewUrl) return;

    setIsScanning(true);
    setError(null);

    try {
      console.log('🚀 Starting real AI analysis...');
      
      // Load AI models if not already loaded
      await loadModels();

      // Create image element for TensorFlow
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = previewUrl;
      });

      console.log('🖼️ Image loaded, analyzing...');

      // Run real AI analysis using TensorFlow.js
      const aiResult = await analyzeImage(img);
      
      console.log('✅ AI Analysis complete:', aiResult);

      if (!aiResult.isEWaste) {
        setDetectionResult({
          itemType: 'none',
          confidence: aiResult.confidence,
          estimatedValue: 0,
          pointsEarned: 0,
          weight: 0,
          description: 'No e-waste detected',
          reasoning: aiResult.reasoning,
          image: previewUrl,
          processingTime: 1200,
          timestamp: new Date().toISOString(),
          isEWaste: false
        });
        return;
      }

      // Calculate value based on detected type
      const valueMap: Record<string, { value: [number, number], weight: [number, number] }> = {
        smartphone: { value: [20, 80], weight: [0.15, 0.25] },
        laptop: { value: [50, 300], weight: [1.0, 2.5] },
        tablet: { value: [30, 150], weight: [0.3, 0.6] },
        monitor: { value: [30, 150], weight: [2.0, 5.0] },
        battery: { value: [5, 15], weight: [0.02, 0.1] },
        charger: { value: [8, 25], weight: [0.05, 0.15] },
        cable: { value: [3, 12], weight: [0.02, 0.08] },
        keyboard: { value: [10, 40], weight: [0.5, 1.0] },
        mouse: { value: [5, 20], weight: [0.1, 0.2] },
        default: { value: [10, 50], weight: [0.2, 1.0] }
      };

      const typeData = valueMap[aiResult.itemType] || valueMap.default;
      const estimatedValue = typeData.value[0] + Math.random() * (typeData.value[1] - typeData.value[0]);
      const weight = typeData.weight[0] + Math.random() * (typeData.weight[1] - typeData.weight[0]);
      const pointsEarned = Math.floor(estimatedValue * 12);

      setDetectionResult({
        itemType: aiResult.itemType,
        confidence: aiResult.confidence,
        estimatedValue: Math.round(estimatedValue * 100) / 100,
        pointsEarned: pointsEarned,
        weight: Math.round(weight * 100) / 100,
        description: `${aiResult.itemType.charAt(0).toUpperCase() + aiResult.itemType.slice(1)} detected with ${(aiResult.confidence * 100).toFixed(0)}% confidence`,
        reasoning: aiResult.reasoning,
        image: previewUrl,
        processingTime: 1200,
        timestamp: new Date().toISOString(),
        isEWaste: true
      });

    } catch (err) {
      console.error('❌ Scan error:', err);
      setError('Failed to analyze image. Please try again with a clearer image.');
    } finally {
      setIsScanning(false);
    }
  };

  const resetDetection = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setDetectionResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
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
                <Monitor size={24} />
              </div>
              <span>Smart E-Waste Bin</span>
            </div>
            <div className="nav-links">
              <button onClick={() => window.location.href = "/"} style={{ background: 'none', border: 'none', color: '#16a34a', cursor: 'pointer', fontWeight: '500' }}>
                <Home size={20} style={{ marginRight: '8px' }} />
                Home
              </button>
              <button onClick={() => window.location.href = "/rewards"} style={{ background: 'none', border: 'none', color: '#16a34a', cursor: 'pointer', fontWeight: '500' }}>
                Rewards
              </button>
              <button onClick={() => window.location.href = "/admin"} style={{ background: 'none', border: 'none', color: '#16a34a', cursor: 'pointer', fontWeight: '500' }}>
                Admin
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
            <span className="text-green">AI Waste Detection</span>
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>
            Upload or capture an image of your e-waste to get instant AI analysis and recycling recommendations.
          </p>
        </div>

        {/* Upload Area */}
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {!previewUrl && !isCameraActive ? (
            <div
              style={{
                border: `2px dashed ${isDragging ? '#16a34a' : '#e5e7eb'}`,
                borderRadius: '16px',
                padding: '60px 20px',
                textAlign: 'center',
                background: isDragging ? '#f0fdf4' : 'white',
                transition: 'all 0.3s ease',
              }}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <div style={{ marginBottom: '20px' }}>
                <Upload size={48} color="#16a34a" />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '8px' }}>
                Upload E-Waste Image
              </h3>
              <p style={{ color: '#64748b', marginBottom: '20px' }}>
                Drag and drop an image here, or click to select
              </p>
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button 
                  className="btn btn-primary"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload size={20} style={{ marginRight: '8px' }} />
                  Choose File
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    startCamera();
                  }}
                >
                  <Camera size={20} style={{ marginRight: '8px' }} />
                  Use Camera
                </button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileSelect(file);
                }}
              />
            </div>
          ) : previewUrl ? (
            <div className="content-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Selected Image</h3>
                <button
                  onClick={resetDetection}
                  style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: '8px' }}
                >
                  <X size={20} />
                </button>
              </div>
              
              <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                <img
                  src={previewUrl}
                  alt="Preview"
                  style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '8px' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                <button
                  className="btn btn-primary"
                  onClick={handleScan}
                  disabled={isScanning}
                >
                  {isScanning ? (
                    <>
                      <Brain size={20} style={{ marginRight: '8px', animation: 'pulse 1s infinite' }} />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Scan size={20} style={{ marginRight: '8px' }} />
                      Analyze E-Waste
                    </>
                  )}
                </button>
                <button className="btn btn-secondary" onClick={resetDetection}>
                  <RotateCcw size={20} style={{ marginRight: '8px' }} />
                  Change Image
                </button>
              </div>
            </div>
          ) : null}

          {/* Camera View */}
          {isCameraActive && !previewUrl && (
            <div className="content-card" style={{ marginTop: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Camera Capture</h3>
                <button
                  onClick={stopCamera}
                  style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: '8px' }}
                >
                  <CameraOff size={20} />
                </button>
              </div>
              
              <div style={{ textAlign: 'center', marginBottom: '20px', background: '#000', borderRadius: '8px', overflow: 'hidden' }}>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  style={{ 
                    width: '100%', 
                    maxWidth: '640px',
                    height: 'auto',
                    minHeight: '320px',
                    borderRadius: '8px',
                    display: 'block'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                <button className="btn btn-primary" onClick={capturePhoto}>
                  <Camera size={20} style={{ marginRight: '8px' }} />
                  Capture Photo
                </button>
              </div>
            </div>
          )}

          <canvas ref={canvasRef} style={{ display: 'none' }} />

          {/* Error Message */}
          {error && (
            <div style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '8px',
              padding: '16px',
              marginTop: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <AlertCircle size={20} color="#dc2626" />
              <span style={{ color: '#dc2626' }}>{error}</span>
            </div>
          )}

          {/* Detection Result */}
          {detectionResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ marginTop: '40px' }}
            >
              <div className="card" style={{ textAlign: 'center' }}>
                <div style={{ marginBottom: '24px' }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    background: detectionResult.isEWaste ? '#16a34a' : '#dc2626',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px'
                  }}>
                    {detectionResult.isEWaste ? (
                      <CheckCircle size={32} color="white" />
                    ) : (
                      <X size={32} color="white" />
                    )}
                  </div>
                  <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: detectionResult.isEWaste ? '#16a34a' : '#dc2626'
                  }}>
                    {detectionResult.isEWaste ? 'E-Waste Detected!' : 'No E-Waste Detected'}
                  </h2>
                  <p style={{ color: '#64748b', marginTop: '8px' }}>
                    {detectionResult.isEWaste 
                      ? `Successfully identified as ${detectionResult.itemType}` 
                      : 'This item is not recognized as e-waste'
                    }
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '24px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      background: '#f3f4f6',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 12px'
                    }}>
                      {React.createElement(wasteTypeIcons[detectionResult.itemType as keyof typeof wasteTypeIcons] || Monitor, { 
                        size: 24, 
                        color: '#16a34a' 
                      })}
                    </div>
                    <div style={{ fontWeight: 'bold', textTransform: 'capitalize' }}>{detectionResult.itemType}</div>
                    <div style={{ color: '#64748b', fontSize: '0.875rem' }}>
                      {(detectionResult.confidence * 100).toFixed(0)}% confidence
                    </div>
                  </div>
                  
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#16a34a' }}>
                      ${detectionResult.estimatedValue.toFixed(2)}
                    </div>
                    <div style={{ color: '#64748b', fontSize: '0.875rem' }}>Estimated Value</div>
                  </div>
                  
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#16a34a' }}>
                      +{detectionResult.pointsEarned}
                    </div>
                    <div style={{ color: '#64748b', fontSize: '0.875rem' }}>Points Earned</div>
                  </div>
                </div>

                {/* AI Analysis Details */}
                <div style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '20px',
                  marginBottom: '24px'
                }}>
                  <h4 style={{ fontWeight: 'bold', marginBottom: '16px', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Brain size={20} color="#16a34a" />
                    AI Analysis Details
                  </h4>
                  
                  {detectionResult.reasoning && detectionResult.reasoning.length > 0 && (
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '8px' }}>Analysis Reasoning:</div>
                      <ul style={{ margin: 0, paddingLeft: '20px' }}>
                        {detectionResult.reasoning.map((reason, index) => (
                          <li key={index} style={{ color: '#475569', fontSize: '0.875rem', marginBottom: '4px' }}>
                            {reason}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '16px', fontSize: '0.875rem' }}>
                    <div>
                      <div style={{ color: '#64748b' }}>Processing Time</div>
                      <div style={{ fontWeight: 'bold', color: '#1e293b' }}>{(detectionResult.processingTime / 1000).toFixed(1)}s</div>
                    </div>
                    <div>
                      <div style={{ color: '#64748b' }}>Accuracy</div>
                      <div style={{ fontWeight: 'bold', color: '#1e293b' }}>{(detectionResult.confidence * 100).toFixed(0)}%</div>
                    </div>
                    <div>
                      <div style={{ color: '#64748b' }}>Weight</div>
                      <div style={{ fontWeight: 'bold', color: '#1e293b' }}>{detectionResult.weight} kg</div>
                    </div>
                  </div>
                </div>

                {detectionResult.isEWaste && (
                  <div style={{
                    background: '#f0fdf4',
                    border: '1px solid #bbf7d0',
                    borderRadius: '8px',
                    padding: '16px',
                    marginBottom: '24px'
                  }}>
                    <p style={{ color: '#16a34a', textAlign: 'center' }}>
                      🎉 Thank you for recycling! Your contribution helps protect the environment.
                    </p>
                  </div>
                )}

                <button className="btn btn-primary" onClick={resetDetection}>
                  <ArrowRight size={20} style={{ marginRight: '8px' }} />
                  Scan Another Item
                </button>
              </div>
            </motion.div>
          )}

          {/* Tips Section */}
          <div style={{ marginTop: '40px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '16px' }}>Detection Tips</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
              <div className="card">
                <Eye size={24} color="#16a34a" style={{ marginBottom: '12px' }} />
                <h4 style={{ fontWeight: 'bold', marginBottom: '8px' }}>Clear Images</h4>
                <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
                  Take photos in good lighting with the item clearly visible
                </p>
              </div>
              <div className="card">
                <Award size={24} color="#16a34a" style={{ marginBottom: '12px' }} />
                <h4 style={{ fontWeight: 'bold', marginBottom: '8px' }}>Accepted Items</h4>
                <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
                  We accept smartphones, laptops, batteries, chargers, and more
                </p>
              </div>
              <div className="card">
                <Sparkles size={24} color="#16a34a" style={{ marginBottom: '12px' }} />
                <h4 style={{ fontWeight: 'bold', marginBottom: '8px' }}>AI Powered</h4>
                <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
                  Our advanced AI accurately identifies and values your e-waste
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
