"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";
import { NotificationCenter } from "@/components/NotificationCenter";
import { getRealisticMetrics, getRealisticUpdateTime, getRealisticCapacity, getRealisticTemperature } from "@/lib/realistic-data";
import {
  LayoutDashboard,
  Database,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Users,
  MapPin,
  Activity,
  BarChart3,
  PieChart,
  RefreshCw,
  Settings,
  Home,
  Menu,
  X,
  Monitor,
  Shield,
  ArrowUp,
} from "lucide-react";

interface BinStats {
  id: string;
  name: string;
  location: string;
  status: "operational" | "maintenance" | "full" | "offline";
  capacity: number;
  lastUpdate: string;
  totalWaste: number;
  temperature: number;
  alerts: number;
}

interface SystemMetrics {
  totalBins: number;
  activeBins: number;
  maintenanceBins: number;
  offlineBins: number;
  totalWasteCollected: number;
  co2Saved: number;
  activeUsers: number;
  todayTransactions: number;
}

export default function AdminDashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [refreshing, setRefreshing] = useState(false);
  const [metrics, setMetrics] = useState(getRealisticMetrics());

  // Auto-refresh metrics every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(getRealisticMetrics());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const bins: BinStats[] = [
    {
      id: "BIN-001",
      name: "Connaught Place E-Waste Hub",
      location: "Delhi NCR",
      status: "operational",
      capacity: 78,
      lastUpdate: "1m",
      totalWaste: 453,
      temperature: 24,
      alerts: 0,
    },
    {
      id: "BIN-002",
      name: "Nehru Place E-Waste Center",
      location: "Delhi NCR",
      status: "full",
      capacity: 97,
      lastUpdate: "3m",
      totalWaste: 892,
      temperature: 26,
      alerts: 1,
    },
    {
      id: "BIN-003",
      name: "Sector 18 Smart Bin",
      location: "Noida",
      status: "operational",
      capacity: 48,
      lastUpdate: "Just now",
      totalWaste: 321,
      temperature: 23,
      alerts: 0,
    },
    {
      id: "BIN-004",
      name: "Cyber City Collection Point",
      location: "Gurgaon",
      status: "maintenance",
      capacity: 63,
      lastUpdate: "22m",
      totalWaste: 541,
      temperature: 28,
      alerts: 2,
    },
    {
      id: "BIN-005",
      name: "Dwarka Smart Bin",
      location: "Delhi NCR",
      status: "operational",
      capacity: 32,
      lastUpdate: "3 mins ago",
      totalWaste: 280,
      temperature: 25,
      alerts: 0,
    },
  ];

  const recentActivities = [
    { id: 1, type: "collection", message: "BIN-001: Waste collected successfully", time: "2 mins ago", severity: "success" },
    { id: 2, type: "alert", message: "BIN-002: Capacity reached 98%", time: "5 mins ago", severity: "warning" },
    { id: 3, type: "maintenance", message: "BIN-004: Scheduled maintenance started", time: "15 mins ago", severity: "info" },
    { id: 4, type: "user", message: "New user registered: user@example.com", time: "20 mins ago", severity: "success" },
    { id: 5, type: "alert", message: "BIN-004: Temperature sensor anomaly", time: "25 mins ago", severity: "error" },
  ];

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      // Update data here
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational": return "bg-green-100 text-green-800 border-green-200";
      case "full": return "bg-orange-100 text-orange-800 border-orange-200";
      case "maintenance": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "offline": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational": return <CheckCircle className="w-4 h-4" />;
      case "full": return <AlertTriangle className="w-4 h-4" />;
      case "maintenance": return <Settings className="w-4 h-4" />;
      case "offline": return <XCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "success": return "text-green-600";
      case "warning": return "text-orange-600";
      case "error": return "text-red-600";
      case "info": return "text-blue-600";
      default: return "text-gray-600";
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
                <LayoutDashboard size={24} />
              </div>
              <span>Admin Dashboard</span>
            </div>
            <div className="nav-links">
              <button onClick={() => window.location.href = "/"} style={{ background: 'none', border: 'none', color: '#16a34a', cursor: 'pointer', fontWeight: '500' }}>
                <Home size={20} style={{ marginRight: '8px' }} />
                Home
              </button>
              <button onClick={() => window.location.href = "/waste-detection"} style={{ background: 'none', border: 'none', color: '#16a34a', cursor: 'pointer', fontWeight: '500' }}>
                Waste Detection
              </button>
              <button onClick={() => window.location.href = "/rewards"} style={{ background: 'none', border: 'none', color: '#16a34a', cursor: 'pointer', fontWeight: '500' }}>
                Rewards
              </button>
              <NotificationCenter />
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
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '8px' }}>
              <span className="text-green">Admin Dashboard</span>
            </h1>
            <p style={{ color: '#64748b', fontSize: '1rem' }}>
              Real-time monitoring and management of smart bin network
            </p>
          </div>
          <button
            onClick={handleRefresh}
            style={{
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.3s',
            }}
          >
            <RefreshCw className={refreshing ? 'animate-spin' : ''} size={20} />
            Refresh Data
          </button>
        </div>

        {/* Metrics Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="content-card"
            style={{ padding: '24px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '8px' }}>Total Bins</p>
                <h3 style={{ fontSize: '2rem', fontWeight: 'bold' }}>{metrics.totalBins}</h3>
              </div>
              <div style={{ padding: '12px', background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)', borderRadius: '12px' }}>
                <Database className="w-6 h-6" style={{ color: 'white' }} />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#10b981', fontSize: '0.875rem' }}>
              <ArrowUp size={16} />
              <span>8% from last month</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="content-card"
            style={{ padding: '24px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '8px' }}>Active Bins</p>
                <h3 style={{ fontSize: '2rem', fontWeight: 'bold' }}>{metrics.activeBins}</h3>
              </div>
              <div style={{ padding: '12px', background: 'linear-gradient(135deg, #22c55e 0%, #10b981 100%)', borderRadius: '12px' }}>
                <CheckCircle className="w-6 h-6" style={{ color: 'white' }} />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#10b981', fontSize: '0.875rem' }}>
              <span>{Math.round((metrics.activeBins / metrics.totalBins) * 100)}% operational</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="content-card"
            style={{ padding: '24px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '8px' }}>Active Users</p>
                <h3 style={{ fontSize: '2rem', fontWeight: 'bold' }}>{metrics.activeUsers.toLocaleString()}</h3>
              </div>
              <div style={{ padding: '12px', background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)', borderRadius: '12px' }}>
                <Users className="w-6 h-6" style={{ color: 'white' }} />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#10b981', fontSize: '0.875rem' }}>
              <ArrowUp size={16} />
              <span>15% from last week</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="content-card"
            style={{ padding: '24px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '8px' }}>CO₂ Saved</p>
                <h3 style={{ fontSize: '2rem', fontWeight: 'bold' }}>{metrics.co2Saved.toLocaleString()}kg</h3>
              </div>
              <div style={{ padding: '12px', background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', borderRadius: '12px' }}>
                <TrendingUp className="w-6 h-6" style={{ color: 'white' }} />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#10b981', fontSize: '0.875rem' }}>
              <span>Environmental impact</span>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '8px', borderBottom: '2px solid #e5e7eb', paddingBottom: '0' }}>
            {['overview', 'bins', 'analytics'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '12px 24px',
                  background: activeTab === tab ? 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)' : 'transparent',
                  color: activeTab === tab ? 'white' : '#64748b',
                  border: 'none',
                  borderRadius: '8px 8px 0 0',
                  cursor: 'pointer',
                  fontWeight: '600',
                  textTransform: 'capitalize',
                  transition: 'all 0.3s',
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
            {/* Bin Status Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="content-card"
              style={{ padding: '24px' }}
            >
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '20px' }}>Bin Status Distribution</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981' }}></div>
                      Operational
                    </span>
                    <span style={{ fontWeight: '600' }}>{metrics.activeBins}</span>
                  </div>
                  <div style={{ height: '8px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${(metrics.activeBins / metrics.totalBins) * 100}%`, height: '100%', background: '#10b981' }}></div>
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b' }}></div>
                      Maintenance
                    </span>
                    <span style={{ fontWeight: '600' }}>{metrics.maintenanceBins}</span>
                  </div>
                  <div style={{ height: '8px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${(metrics.maintenanceBins / metrics.totalBins) * 100}%`, height: '100%', background: '#f59e0b' }}></div>
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }}></div>
                      Offline
                    </span>
                    <span style={{ fontWeight: '600' }}>{metrics.offlineBins}</span>
                  </div>
                  <div style={{ height: '8px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${(metrics.offlineBins / metrics.totalBins) * 100}%`, height: '100%', background: '#ef4444' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Recent Activities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="content-card"
              style={{ padding: '24px' }}
            >
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Activity size={20} />
                Recent Activities
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {recentActivities.map((activity) => (
                  <div key={activity.id} style={{ padding: '12px', background: '#f9fafb', borderRadius: '8px', borderLeft: '4px solid', borderColor: activity.severity === 'error' ? '#ef4444' : activity.severity === 'warning' ? '#f59e0b' : '#10b981' }}>
                    <p style={{ fontSize: '0.875rem', marginBottom: '4px' }}>{activity.message}</p>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{activity.time}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {activeTab === 'bins' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="content-card"
            style={{ padding: '24px' }}
          >
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '20px' }}>Bin Management</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                    <th style={{ textAlign: 'left', padding: '12px', color: '#64748b', fontWeight: '600' }}>Bin ID</th>
                    <th style={{ textAlign: 'left', padding: '12px', color: '#64748b', fontWeight: '600' }}>Location</th>
                    <th style={{ textAlign: 'left', padding: '12px', color: '#64748b', fontWeight: '600' }}>Status</th>
                    <th style={{ textAlign: 'left', padding: '12px', color: '#64748b', fontWeight: '600' }}>Capacity</th>
                    <th style={{ textAlign: 'left', padding: '12px', color: '#64748b', fontWeight: '600' }}>Temp</th>
                    <th style={{ textAlign: 'left', padding: '12px', color: '#64748b', fontWeight: '600' }}>Last Update</th>
                    <th style={{ textAlign: 'left', padding: '12px', color: '#64748b', fontWeight: '600' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bins.map((bin) => (
                    <tr key={bin.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '12px', fontWeight: '600' }}>{bin.id}</td>
                      <td style={{ padding: '12px' }}>
                        <div>
                          <p style={{ fontWeight: '500', marginBottom: '2px' }}>{bin.name}</p>
                          <p style={{ fontSize: '0.75rem', color: '#64748b' }}>{bin.location}</p>
                        </div>
                      </td>
                      <td style={{ padding: '12px' }}>
                        <span style={{ 
                          padding: '4px 12px', 
                          borderRadius: '12px', 
                          fontSize: '0.75rem', 
                          fontWeight: '600',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          border: '1px solid',
                        }} className={getStatusColor(bin.status)}>
                          {getStatusIcon(bin.status)}
                          {bin.status}
                        </span>
                      </td>
                      <td style={{ padding: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ flex: 1, height: '6px', background: '#e5e7eb', borderRadius: '3px', overflow: 'hidden', minWidth: '60px' }}>
                            <div style={{ 
                              width: `${bin.capacity}%`, 
                              height: '100%', 
                              background: bin.capacity > 90 ? '#ef4444' : bin.capacity > 70 ? '#f59e0b' : '#10b981',
                              transition: 'width 0.3s'
                            }}></div>
                          </div>
                          <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>{bin.capacity}%</span>
                        </div>
                      </td>
                      <td style={{ padding: '12px' }}>{bin.temperature}°C</td>
                      <td style={{ padding: '12px', fontSize: '0.875rem', color: '#64748b' }}>{bin.lastUpdate}</td>
                      <td style={{ padding: '12px' }}>
                        <button style={{ 
                          padding: '6px 12px', 
                          background: '#10b981', 
                          color: 'white', 
                          border: 'none', 
                          borderRadius: '6px', 
                          cursor: 'pointer',
                          fontSize: '0.875rem',
                          fontWeight: '500'
                        }}>
                          Manage
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {activeTab === 'analytics' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="content-card"
              style={{ padding: '24px' }}
            >
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BarChart3 size={20} />
                Weekly Waste Collection
              </h3>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', height: '200px' }}>
                {[65, 80, 70, 90, 85, 75, 95].map((height, i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <div style={{ 
                      width: '100%', 
                      height: `${height}%`, 
                      background: 'linear-gradient(180deg, #10b981 0%, #3b82f6 100%)', 
                      borderRadius: '8px 8px 0 0',
                      transition: 'height 0.3s'
                    }}></div>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="content-card"
              style={{ padding: '24px' }}
            >
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <PieChart size={20} />
                Waste Type Distribution
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { type: 'Smartphones', percent: 35, color: '#3b82f6' },
                  { type: 'Laptops', percent: 25, color: '#10b981' },
                  { type: 'Batteries', percent: 20, color: '#f59e0b' },
                  { type: 'Accessories', percent: 15, color: '#8b5cf6' },
                  { type: 'Others', percent: 5, color: '#64748b' },
                ].map((item) => (
                  <div key={item.type}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: item.color }}></div>
                        {item.type}
                      </span>
                      <span style={{ fontWeight: '600' }}>{item.percent}%</span>
                    </div>
                    <div style={{ height: '8px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${item.percent}%`, height: '100%', background: item.color }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
