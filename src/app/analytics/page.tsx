"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";
import { NotificationCenter } from "@/components/NotificationCenter";
import {
  Home,
  Award,
  TrendingUp,
  TrendingDown,
  Brain,
  Zap,
  BarChart3,
  PieChart,
  Activity,
  AlertTriangle,
  CheckCircle,
  Target,
  Clock,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  MapPin,
  Battery,
  Sparkles,
  Menu,
  X,
} from "lucide-react";
import { AnimatePresence } from "framer-motion";

interface Prediction {
  binId: string;
  location: string;
  currentCapacity: number;
  predictedFull: string;
  confidence: number;
  urgency: "high" | "medium" | "low";
  recommendation: string;
}

interface WastePattern {
  category: string;
  trend: "increasing" | "decreasing" | "stable";
  percentage: number;
  prediction: string;
  color: string;
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "quarter">("month");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // AI Predictions
  const predictions: Prediction[] = [
    {
      binId: "BIN-002",
      location: "Nehru Place",
      currentCapacity: 87,
      predictedFull: "4 hours",
      confidence: 94,
      urgency: "high",
      recommendation: "Schedule immediate collection",
    },
    {
      binId: "BIN-005",
      location: "Saket",
      currentCapacity: 72,
      predictedFull: "12 hours",
      confidence: 89,
      urgency: "medium",
      recommendation: "Plan collection for today",
    },
    {
      binId: "BIN-003",
      location: "Hauz Khas",
      currentCapacity: 45,
      predictedFull: "2 days",
      confidence: 85,
      urgency: "low",
      recommendation: "Normal schedule sufficient",
    },
    {
      binId: "BIN-007",
      location: "Dwarka",
      currentCapacity: 91,
      predictedFull: "2 hours",
      confidence: 96,
      urgency: "high",
      recommendation: "URGENT: Immediate attention required",
    },
  ];

  const wastePatterns: WastePattern[] = [
    {
      category: "Smartphones",
      trend: "increasing",
      percentage: 35,
      prediction: "+8% next month",
      color: "var(--primary-600)",
    },
    {
      category: "Laptops",
      trend: "stable",
      percentage: 25,
      prediction: "Steady growth",
      color: "var(--accent-500)",
    },
    {
      category: "Batteries",
      trend: "increasing",
      percentage: 20,
      prediction: "+12% next month",
      color: "var(--success)",
    },
    {
      category: "Cables & Accessories",
      trend: "decreasing",
      percentage: 15,
      prediction: "-5% next month",
      color: "var(--error)",
    },
    {
      category: "Other E-Waste",
      trend: "stable",
      percentage: 5,
      prediction: "No change",
      color: "var(--neutral-400)",
    },
  ];

  const mlInsights = [
    {
      title: "Peak Collection Times",
      insight: "Highest traffic between 2 PM - 6 PM on weekdays",
      action: "Optimize collection schedules",
      impact: "25% efficiency gain",
      icon: Clock,
      color: "var(--primary-600)",
    },
    {
      title: "User Behavior Pattern",
      insight: "87% users recycle within 2km of home/work",
      action: "Strategic bin placement",
      impact: "40% more participation",
      icon: Users,
      color: "var(--accent-500)",
    },
    {
      title: "Weather Correlation",
      insight: "20% drop in recycling on rainy days",
      action: "Indoor bin alternatives",
      impact: "Consistent volume",
      icon: AlertTriangle,
      color: "var(--warning)",
    },
    {
      title: "Seasonal Trends",
      insight: "Electronics peak in Jan-Feb (post holidays)",
      action: "Prepare extra capacity",
      impact: "45% better handling",
      icon: Calendar,
      color: "var(--success)",
    },
  ];

  const routeOptimization = {
    currentRoute: {
      distance: 45.2,
      time: 3.5,
      bins: 12,
      fuel: 18.5,
      co2: 42.3,
    },
    optimizedRoute: {
      distance: 32.8,
      time: 2.3,
      bins: 12,
      fuel: 13.2,
      co2: 30.1,
    },
    savings: {
      distance: 27,
      time: 34,
      fuel: 29,
      co2: 29,
    },
  };

  const forecastData = {
    nextWeek: {
      totalVolume: 3250,
      growth: 8.5,
      peakDay: "Wednesday",
      alerts: 3,
    },
    nextMonth: {
      totalVolume: 14680,
      growth: 12.3,
      newUsers: 450,
      revenue: 175000,
    },
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--neutral-50)" }}>
      {/* Navigation */}
      <nav className="nav">
        <div className="container">
          <div className="nav-content">
            <div className="logo">
              <div className="logo-icon">
                <Brain size={24} />
              </div>
              <span>Predictive Analytics</span>
            </div>
            <div className="nav-links desktop-only">
              <button onClick={() => (window.location.href = "/")}>
                <Home size={18} />
                Home
              </button>
              <button onClick={() => (window.location.href = "/community")}>
                <Users size={18} />
                Community
              </button>
              <button onClick={() => (window.location.href = "/carbon-marketplace")}>
                <Award size={18} />
                Marketplace
              </button>
              <button onClick={() => (window.location.href = "/admin")}>
                <TrendingUp size={18} />
                Admin
              </button>
              <NotificationCenter />
              <ThemeToggle />
            </div>
            <button
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "8px",
                display: "none",
              }}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween" }}
            className="mobile-nav"
          >
            <div className="mobile-nav-links">
              <button onClick={() => (window.location.href = "/")}>
                <Home size={18} />
                Home
              </button>
              <button onClick={() => (window.location.href = "/community")}>
                <Users size={18} />
                Community
              </button>
              <button onClick={() => (window.location.href = "/carbon-marketplace")}>
                <Award size={18} />
                Marketplace
              </button>
              <button onClick={() => (window.location.href = "/admin")}>
                <TrendingUp size={18} />
                Admin
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container" style={{ padding: "100px 20px 40px", maxWidth: "1600px" }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: "40px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "12px" }}>
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "16px",
                background: "var(--gradient-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Brain size={32} style={{ color: "white" }} />
            </div>
            <div>
              <h1 style={{ fontSize: "2.5rem", fontWeight: "800", marginBottom: "4px", color: "var(--neutral-900)" }}>
                AI-Powered Analytics
              </h1>
              <p style={{ fontSize: "1.1rem", color: "var(--neutral-600)" }}>
                Machine learning insights for optimal waste management
              </p>
            </div>
          </div>
        </motion.div>

        {/* Time Range Selector */}
        <div style={{ marginBottom: "30px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {[
            { id: "week" as const, label: "Last Week" },
            { id: "month" as const, label: "Last Month" },
            { id: "quarter" as const, label: "Last Quarter" },
          ].map((range) => (
            <button
              key={range.id}
              onClick={() => setTimeRange(range.id)}
              style={{
                padding: "10px 20px",
                borderRadius: "10px",
                border: "none",
                background: timeRange === range.id ? "var(--gradient-primary)" : "white",
                color: timeRange === range.id ? "white" : "var(--neutral-700)",
                fontWeight: "600",
                cursor: "pointer",
                boxShadow: timeRange === range.id ? "var(--shadow-md)" : "var(--shadow-sm)",
                transition: "all 0.3s ease",
              }}
            >
              {range.label}
            </button>
          ))}
        </div>

        {/* AI Insights Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          {mlInsights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card"
                style={{ padding: "24px" }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: insight.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "16px",
                  }}
                >
                  <Icon size={24} style={{ color: "white" }} />
                </div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: "800", marginBottom: "8px", color: "var(--neutral-900)" }}>
                  {insight.title}
                </h3>
                <p style={{ fontSize: "0.9rem", color: "var(--neutral-600)", marginBottom: "12px", lineHeight: "1.5" }}>
                  {insight.insight}
                </p>
                <div
                  style={{
                    padding: "12px",
                    borderRadius: "8px",
                    background: "var(--neutral-100)",
                    marginBottom: "8px",
                  }}
                >
                  <div style={{ fontSize: "0.85rem", color: "var(--neutral-700)", marginBottom: "4px" }}>
                    <strong>Action:</strong> {insight.action}
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "var(--success)", fontWeight: "600" }}>
                    💡 Impact: {insight.impact}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Main Content Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "30px", marginBottom: "30px" }}>
          {/* Bin Capacity Predictions */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "800", marginBottom: "20px", color: "var(--neutral-900)" }}>
              🎯 Live Capacity Predictions
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {predictions.map((pred, index) => (
                <motion.div
                  key={pred.binId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="card"
                  style={{
                    padding: "20px",
                    borderLeft: `4px solid ${
                      pred.urgency === "high" ? "var(--error)" : pred.urgency === "medium" ? "var(--warning)" : "var(--success)"
                    }`,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                        <h3 style={{ fontSize: "1.1rem", fontWeight: "800", color: "var(--neutral-900)" }}>{pred.binId}</h3>
                        <div
                          style={{
                            padding: "4px 10px",
                            borderRadius: "6px",
                            background:
                              pred.urgency === "high"
                                ? "var(--error)"
                                : pred.urgency === "medium"
                                ? "var(--warning)"
                                : "var(--success)",
                            color: "white",
                            fontSize: "0.75rem",
                            fontWeight: "600",
                            textTransform: "uppercase",
                          }}
                        >
                          {pred.urgency}
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.9rem", color: "var(--neutral-600)" }}>
                        <MapPin size={14} />
                        {pred.location}
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "2rem", fontWeight: "800", color: "var(--primary-600)" }}>{pred.currentCapacity}%</div>
                      <div style={{ fontSize: "0.8rem", color: "var(--neutral-600)" }}>Current</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div
                    style={{
                      width: "100%",
                      height: "8px",
                      background: "var(--neutral-200)",
                      borderRadius: "999px",
                      overflow: "hidden",
                      marginBottom: "12px",
                    }}
                  >
                    <div
                      style={{
                        width: `${pred.currentCapacity}%`,
                        height: "100%",
                        background:
                          pred.currentCapacity >= 85
                            ? "var(--error)"
                            : pred.currentCapacity >= 70
                            ? "var(--warning)"
                            : "var(--success)",
                        transition: "width 0.3s ease",
                      }}
                    />
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr",
                      gap: "12px",
                      padding: "12px",
                      borderRadius: "8px",
                      background: "var(--neutral-100)",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: "0.8rem", color: "var(--neutral-600)", marginBottom: "4px" }}>Predicted Full</div>
                      <div style={{ fontWeight: "700", fontSize: "0.95rem", color: "var(--neutral-900)" }}>{pred.predictedFull}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: "0.8rem", color: "var(--neutral-600)", marginBottom: "4px" }}>Confidence</div>
                      <div style={{ fontWeight: "700", fontSize: "0.95rem", color: "var(--primary-600)" }}>{pred.confidence}%</div>
                    </div>
                    <div>
                      <div style={{ fontSize: "0.8rem", color: "var(--neutral-600)", marginBottom: "4px" }}>AI Model</div>
                      <div style={{ fontWeight: "700", fontSize: "0.95rem", color: "var(--accent-600)" }}>LSTM</div>
                    </div>
                  </div>

                  <div
                    style={{
                      marginTop: "12px",
                      padding: "10px",
                      borderRadius: "8px",
                      background: "var(--primary-50)",
                      fontSize: "0.85rem",
                      color: "var(--primary-700)",
                      fontWeight: "600",
                    }}
                  >
                    💡 {pred.recommendation}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Forecast Summary */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="card"
              style={{
                padding: "24px",
                background: "var(--gradient-accent)",
                color: "white",
              }}
            >
              <h3 style={{ fontSize: "1.2rem", fontWeight: "800", marginBottom: "20px" }}>📊 Next Week Forecast</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <div style={{ fontSize: "0.85rem", opacity: 0.9, marginBottom: "6px" }}>Total Volume</div>
                  <div style={{ fontSize: "2rem", fontWeight: "800" }}>{forecastData.nextWeek.totalVolume}kg</div>
                  <div style={{ fontSize: "0.8rem", opacity: 0.8, display: "flex", alignItems: "center", gap: "4px", marginTop: "4px" }}>
                    <ArrowUpRight size={14} />
                    +{forecastData.nextWeek.growth}% from last week
                  </div>
                </div>
                <div
                  style={{
                    padding: "12px",
                    borderRadius: "8px",
                    background: "rgba(255,255,255,0.2)",
                  }}
                >
                  <div style={{ fontSize: "0.85rem", marginBottom: "4px" }}>Peak Day</div>
                  <div style={{ fontSize: "1.1rem", fontWeight: "700" }}>{forecastData.nextWeek.peakDay}</div>
                </div>
                <div
                  style={{
                    padding: "12px",
                    borderRadius: "8px",
                    background: "rgba(255,255,255,0.2)",
                  }}
                >
                  <div style={{ fontSize: "0.85rem", marginBottom: "4px" }}>Predicted Alerts</div>
                  <div style={{ fontSize: "1.1rem", fontWeight: "700" }}>{forecastData.nextWeek.alerts} bins need attention</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="card"
              style={{ padding: "24px" }}
            >
              <h3 style={{ fontSize: "1.2rem", fontWeight: "800", marginBottom: "16px", color: "var(--neutral-900)" }}>
                📅 Monthly Outlook
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div
                  style={{
                    padding: "12px",
                    borderRadius: "8px",
                    background: "var(--primary-50)",
                  }}
                >
                  <div style={{ fontSize: "0.85rem", color: "var(--neutral-600)", marginBottom: "4px" }}>Volume Growth</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ fontSize: "1.5rem", fontWeight: "800", color: "var(--primary-600)" }}>
                      {forecastData.nextMonth.totalVolume}kg
                    </div>
                    <div
                      style={{
                        padding: "4px 8px",
                        borderRadius: "6px",
                        background: "var(--success)",
                        color: "white",
                        fontSize: "0.75rem",
                        fontWeight: "600",
                      }}
                    >
                      +{forecastData.nextMonth.growth}%
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    padding: "12px",
                    borderRadius: "8px",
                    background: "var(--accent-50)",
                  }}
                >
                  <div style={{ fontSize: "0.85rem", color: "var(--neutral-600)", marginBottom: "4px" }}>New Users Expected</div>
                  <div style={{ fontSize: "1.5rem", fontWeight: "800", color: "var(--accent-600)" }}>
                    +{forecastData.nextMonth.newUsers}
                  </div>
                </div>
                <div
                  style={{
                    padding: "12px",
                    borderRadius: "8px",
                    background: "var(--primary-50)",
                  }}
                >
                  <div style={{ fontSize: "0.85rem", color: "var(--neutral-600)", marginBottom: "4px" }}>Revenue Forecast</div>
                  <div style={{ fontSize: "1.5rem", fontWeight: "800", color: "var(--primary-600)" }}>
                    ₹{(forecastData.nextMonth.revenue / 1000).toFixed(0)}K
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Waste Pattern Analysis */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} style={{ marginBottom: "30px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "800", marginBottom: "20px", color: "var(--neutral-900)" }}>
            📈 Waste Category Trends
          </h2>
          <div className="card" style={{ padding: "30px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {wastePatterns.map((pattern, index) => (
                <div key={index}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{ fontSize: "1rem", fontWeight: "700", color: "var(--neutral-900)" }}>{pattern.category}</div>
                      {pattern.trend === "increasing" && (
                        <div
                          style={{
                            padding: "4px 10px",
                            borderRadius: "6px",
                            background: "var(--success)",
                            color: "white",
                            fontSize: "0.75rem",
                            fontWeight: "600",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          <TrendingUp size={12} />
                          Growing
                        </div>
                      )}
                      {pattern.trend === "decreasing" && (
                        <div
                          style={{
                            padding: "4px 10px",
                            borderRadius: "6px",
                            background: "var(--error)",
                            color: "white",
                            fontSize: "0.75rem",
                            fontWeight: "600",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          <TrendingDown size={12} />
                          Declining
                        </div>
                      )}
                      {pattern.trend === "stable" && (
                        <div
                          style={{
                            padding: "4px 10px",
                            borderRadius: "6px",
                            background: "var(--neutral-400)",
                            color: "white",
                            fontSize: "0.75rem",
                            fontWeight: "600",
                          }}
                        >
                          Stable
                        </div>
                      )}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                      <div style={{ fontSize: "0.9rem", color: "var(--neutral-600)" }}>{pattern.prediction}</div>
                      <div style={{ fontSize: "1.2rem", fontWeight: "800", color: pattern.color }}>{pattern.percentage}%</div>
                    </div>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: "12px",
                      background: "var(--neutral-200)",
                      borderRadius: "999px",
                      overflow: "hidden",
                    }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pattern.percentage}%` }}
                      transition={{ duration: 1, delay: 0.6 + index * 0.1 }}
                      style={{
                        height: "100%",
                        background: pattern.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Route Optimization */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "800", marginBottom: "20px", color: "var(--neutral-900)" }}>
            🚛 AI Route Optimization
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px" }}>
            <div className="card" style={{ padding: "24px" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: "800", marginBottom: "16px", color: "var(--neutral-900)" }}>
                Current Route
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--neutral-600)", fontSize: "0.9rem" }}>Distance</span>
                  <span style={{ fontWeight: "700", color: "var(--neutral-900)" }}>{routeOptimization.currentRoute.distance} km</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--neutral-600)", fontSize: "0.9rem" }}>Time</span>
                  <span style={{ fontWeight: "700", color: "var(--neutral-900)" }}>{routeOptimization.currentRoute.time} hrs</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--neutral-600)", fontSize: "0.9rem" }}>Fuel</span>
                  <span style={{ fontWeight: "700", color: "var(--neutral-900)" }}>{routeOptimization.currentRoute.fuel} L</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--neutral-600)", fontSize: "0.9rem" }}>CO₂</span>
                  <span style={{ fontWeight: "700", color: "var(--error)" }}>{routeOptimization.currentRoute.co2} kg</span>
                </div>
              </div>
            </div>

            <div className="card" style={{ padding: "24px", background: "var(--gradient-primary)", color: "white" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: "800", marginBottom: "16px" }}>AI Optimized Route</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ opacity: 0.9, fontSize: "0.9rem" }}>Distance</span>
                  <span style={{ fontWeight: "700" }}>{routeOptimization.optimizedRoute.distance} km</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ opacity: 0.9, fontSize: "0.9rem" }}>Time</span>
                  <span style={{ fontWeight: "700" }}>{routeOptimization.optimizedRoute.time} hrs</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ opacity: 0.9, fontSize: "0.9rem" }}>Fuel</span>
                  <span style={{ fontWeight: "700" }}>{routeOptimization.optimizedRoute.fuel} L</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ opacity: 0.9, fontSize: "0.9rem" }}>CO₂</span>
                  <span style={{ fontWeight: "700" }}>{routeOptimization.optimizedRoute.co2} kg</span>
                </div>
              </div>
            </div>

            <div className="card" style={{ padding: "24px", background: "var(--success)", color: "white" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: "800", marginBottom: "16px" }}>💰 Savings</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ opacity: 0.9, fontSize: "0.9rem" }}>Distance</span>
                  <span style={{ fontWeight: "700", fontSize: "1.1rem" }}>-{routeOptimization.savings.distance}%</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ opacity: 0.9, fontSize: "0.9rem" }}>Time</span>
                  <span style={{ fontWeight: "700", fontSize: "1.1rem" }}>-{routeOptimization.savings.time}%</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ opacity: 0.9, fontSize: "0.9rem" }}>Fuel Cost</span>
                  <span style={{ fontWeight: "700", fontSize: "1.1rem" }}>-{routeOptimization.savings.fuel}%</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ opacity: 0.9, fontSize: "0.9rem" }}>Emissions</span>
                  <span style={{ fontWeight: "700", fontSize: "1.1rem" }}>-{routeOptimization.savings.co2}%</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
