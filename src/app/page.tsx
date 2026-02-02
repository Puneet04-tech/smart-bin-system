"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  Recycle, 
  TrendingUp, 
  Award, 
  Smartphone, 
  Laptop, 
  Battery, 
  Zap,
  Search,
  Navigation,
  Star,
  Users,
  Leaf,
  Target,
  Monitor,
  Cpu,
  HardDrive,
  Camera,
  Headphones,
  Gamepad2,
  Router,
  Mouse,
  Keyboard
} from "lucide-react";

const wasteTypes = [
  { type: "smartphone", icon: Smartphone, label: "Smartphone", color: "bg-gradient-to-br from-green-500 to-green-600" },
  { type: "laptop", icon: Laptop, label: "Laptop", color: "bg-gradient-to-br from-yellow-500 to-yellow-600" },
  { type: "battery", icon: Battery, label: "Battery", color: "bg-gradient-to-br from-green-600 to-lime-500" },
  { type: "charger", icon: Zap, label: "Charger", color: "bg-gradient-to-br from-yellow-400 to-orange-500" },
  { type: "monitor", icon: Monitor, label: "Monitor", color: "bg-gradient-to-br from-green-500 to-emerald-600" },
  { type: "cpu", icon: Cpu, label: "CPU", color: "bg-gradient-to-br from-yellow-500 to-amber-600" },
  { type: "harddrive", icon: HardDrive, label: "Hard Drive", color: "bg-gradient-to-br from-lime-500 to-green-600" },
  { type: "camera", icon: Camera, label: "Camera", color: "bg-gradient-to-br from-green-400 to-yellow-500" },
  { type: "headphones", icon: Headphones, label: "Headphones", color: "bg-gradient-to-br from-yellow-600 to-green-500" },
  { type: "gamepad", icon: Gamepad2, label: "Game Console", color: "bg-gradient-to-br from-green-500 to-yellow-600" },
  { type: "router", icon: Router, label: "Router", color: "bg-gradient-to-br from-lime-400 to-green-600" },
  { type: "mouse", icon: Mouse, label: "Mouse", color: "bg-gradient-to-br from-yellow-500 to-green-500" },
  { type: "keyboard", icon: Keyboard, label: "Keyboard", color: "bg-gradient-to-br from-green-600 to-yellow-600" },
];

const features = [
  {
    icon: MapPin,
    title: "Location-Based Finding",
    description: "Find the nearest e-waste bin that accepts your specific item type"
  },
  {
    icon: Recycle,
    title: "AI-Powered Detection",
    description: "Smart waste classification with confidence scoring and value estimation"
  },
  {
    icon: TrendingUp,
    title: "Rewards & Gamification",
    description: "Earn points, unlock achievements, and track your environmental impact"
  },
  {
    icon: Award,
    title: "Premium Experience",
    description: "CEO-level UI design with smooth animations and intuitive interactions"
  }
];

const stats = [
  { label: "Active Users", value: "10,000+", icon: Users },
  { label: "Items Recycled", value: "50,000+", icon: Recycle },
  { label: "CO2 Saved", value: "2.5 tons", icon: Leaf },
  { label: "Partner Bins", value: "500+", icon: MapPin },
];

export default function Home() {
  const [selectedWasteType, setSelectedWasteType] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-green-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-green-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-lime-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-green-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-yellow-500 rounded-xl flex items-center justify-center animate-pulse">
                <Recycle className="w-6 h-6 text-white animate-spin" />
              </div>
              <span className="text-xl font-bold text-green-600">
                Smart E-Waste Bin
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => window.location.href = "/rewards"} className="hover:text-green-600">
                Rewards
              </Button>
              <Button variant="ghost" onClick={() => window.location.href = "/smart-bin"} className="hover:text-green-600">
                Smart Bin
              </Button>
              <Button variant="ghost" onClick={() => window.location.href = "/admin"} className="hover:text-green-600">
                Admin
              </Button>
              <Button variant="ghost" className="hover:text-green-600">Sign In</Button>
              <Button className="bg-gradient-to-br from-green-500 to-yellow-500 hover:from-green-600 hover:to-yellow-600 hover:shadow-lg transition-all animate-pulse">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-6 bg-gradient-to-r from-green-100 to-yellow-100 text-green-800 border-2 border-green-500/30 animate-pulse">
                🌍 Transforming E-Waste into Environmental Gold
              </Badge>
              <h1 className="text-5xl sm:text-7xl font-bold mb-6">
                <span className="text-green-600">Smart E-Waste</span>
                <br />
                <span className="text-yellow-600">Revolution</span>
              </h1>
              <p className="text-xl text-gray-700 max-w-4xl mx-auto mb-8 leading-relaxed">
                Join the green-tech revolution with AI-powered e-waste detection, 
                intelligent bin location, and a premium recycling experience that rewards your environmental consciousness.
              </p>
            </motion.div>

            {/* Waste Type Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-12"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6">What e-waste are you recycling today?</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
                {wasteTypes.map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.button
                      key={item.type}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedWasteType(item.type)}
                      className={`p-4 rounded-2xl border-2 transition-all ${
                        selectedWasteType === item.type
                          ? 'border-green-500 gradient-ewaste-subtle shadow-xl animate-pulse-glow'
                          : 'border-green-500/20 bg-white/80 hover:border-green-500/50 hover:shadow-lg'
                      }`}
                    >
                      <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center mb-3 mx-auto`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <p className="font-medium text-gray-800 text-sm">{item.label}</p>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <Button 
                size="lg" 
                className="gradient-ewaste text-white px-10 py-6 text-xl font-bold hover:shadow-2xl transition-all animate-pulse-glow disabled:opacity-50"
                disabled={!selectedWasteType}
                onClick={() => window.location.href = "/bin-finder"}
              >
                <Search className="w-6 h-6 mr-3" />
                Find Nearest Bin
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-green-500/50 hover:border-green-500 px-10 py-6 text-xl font-bold hover:bg-green-50 transition-all"
                onClick={() => window.location.href = "/waste-detection"}
              >
                <Navigation className="w-6 h-6 mr-3" />
                Try AI Detection
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 gradient-ewaste-subtle relative overflow-hidden">
        <div className="absolute inset-0 bg-white/40"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Environmental Impact in Numbers
            </h2>
            <p className="text-xl text-gray-700">
              Join thousands making a difference through smart e-waste recycling
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-20 h-20 gradient-ewaste rounded-2xl flex items-center justify-center mb-4 mx-auto animate-pulse-glow">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-4xl font-bold text-gray-900 mb-2 neon-green">{stat.value}</h3>
                  <p className="text-gray-700 font-medium">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-10 right-10 w-64 h-64 bg-green-400/10 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-yellow-400/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '3s' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              <span className="neon-green">Why Choose</span>
              <br />
              <span className="neon-yellow">Smart E-Waste Bin?</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Experience the cutting-edge of e-waste recycling with revolutionary AI technology, 
              gamification, and a user experience designed for the environmentally conscious generation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full hover:shadow-2xl transition-all border-2 border-green-500/20 hover:border-green-500/40 gradient-ewaste-subtle">
                    <CardHeader>
                      <div className="w-16 h-16 gradient-ewaste rounded-xl flex items-center justify-center mb-4 animate-pulse-glow">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-xl font-bold text-gray-900">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-700 leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 gradient-ewaste relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">
              How It Works
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Three revolutionary steps to transform your e-waste into environmental impact
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Select E-Waste Type", description: "Choose from our comprehensive list of electronic devices", icon: Target },
              { step: "2", title: "Locate Smart Bin", description: "Get real-time directions to the nearest compatible recycling bin", icon: MapPin },
              { step: "3", title: "Scan & Earn Rewards", description: "AI detects your item and you earn instant environmental rewards", icon: Award }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-6 mx-auto animate-pulse-glow">
                    {item.step}
                  </div>
                  <div className="w-16 h-16 gradient-ewaste rounded-xl flex items-center justify-center mb-4 mx-auto">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-white/80 leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 gradient-ewaste opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 gradient-ewaste rounded-xl flex items-center justify-center animate-pulse-glow">
                  <Recycle className="w-7 h-7 text-white animate-rotate" />
                </div>
                <span className="text-xl font-bold neon-green">Smart E-Waste Bin</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Revolutionizing e-waste recycling with AI-powered technology and smart bin networks for a sustainable future.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-green-400">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-green-400 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-green-400">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-green-400 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Partners</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-green-400">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-green-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Smart E-Waste Bin System. All rights reserved. | Building a sustainable future, one device at a time.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
