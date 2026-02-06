"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Lightbulb,
  Recycle,
  TrendingUp,
  Target,
  Award,
  Battery,
  Leaf,
  Zap,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

interface WasteRecommendation {
  item: string;
  category: string;
  recycleValue: number;
  co2Impact: number;
  tips: string[];
  nearbyBins: number;
  urgency: "low" | "medium" | "high";
}

interface AIInsight {
  title: string;
  description: string;
  icon: React.ReactNode;
  actionable: boolean;
}

export function AIRecommendations() {
  const [userWasteData] = useState({
    recentItems: ["Smartphone", "Laptop Battery", "Tablet", "Charger"],
    frequency: "weekly",
    preferredLocations: ["Connaught Place", "Nehru Place"],
  });

  const recommendations: WasteRecommendation[] = [
    {
      item: "Old Smartphone",
      category: "High-Value Electronics",
      recycleValue: 250,
      co2Impact: 15,
      tips: [
        "Remove SIM card and SD card",
        "Factory reset the device",
        "Check for data backup",
        "Remove protective case",
      ],
      nearbyBins: 3,
      urgency: "high",
    },
    {
      item: "Laptop Battery",
      category: "Hazardous Components",
      recycleValue: 150,
      co2Impact: 25,
      tips: [
        "Do not dispose in regular trash",
        "Keep away from heat",
        "Tape battery terminals",
        "Bring to designated e-waste bin",
      ],
      nearbyBins: 2,
      urgency: "high",
    },
    {
      item: "USB Cables & Chargers",
      category: "Accessories",
      recycleValue: 50,
      co2Impact: 5,
      tips: [
        "Bundle cables together",
        "Separate by type (USB-C, Lightning, etc.)",
        "Check for working condition",
        "Consider donation if functional",
      ],
      nearbyBins: 5,
      urgency: "medium",
    },
  ];

  const aiInsights: AIInsight[] = [
    {
      title: "Optimal Recycling Time",
      description: "Based on your schedule, we recommend visiting Connaught Place bin on weekends between 10 AM - 4 PM for faster service.",
      icon: <TrendingUp className="w-5 h-5" />,
      actionable: true,
    },
    {
      title: "Reward Multiplier Opportunity",
      description: "Recycling 3+ items in one visit can earn you 1.5x points. You have 4 items ready!",
      icon: <Award className="w-5 h-5" />,
      actionable: true,
    },
    {
      title: "Environmental Milestone",
      description: "You're 2kg away from saving 50kg total CO₂! Keep up the great work.",
      icon: <Leaf className="w-5 h-5" />,
      actionable: false,
    },
    {
      title: "Battery Safety Alert",
      description: "Detected old battery in your recycling queue. Priority recycling recommended within 7 days.",
      icon: <Battery className="w-5 h-5" />,
      actionable: true,
    },
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high": return "#ef4444";
      case "medium": return "#f59e0b";
      case "low": return "#10b981";
      default: return "#64748b";
    }
  };

  const getUrgencyBg = (urgency: string) => {
    switch (urgency) {
      case "high": return "rgba(239, 68, 68, 0.1)";
      case "medium": return "rgba(245, 158, 11, 0.1)";
      case "low": return "rgba(16, 185, 129, 0.1)";
      default: return "rgba(100, 116, 139, 0.1)";
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Header */}
      <div style={{ 
        background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
        borderRadius: '16px',
        padding: '32px',
        color: 'white',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <Sparkles size={32} />
          <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', margin: 0 }}>
            AI-Powered Recommendations
          </h2>
        </div>
        <p style={{ opacity: 0.9, fontSize: '1rem' }}>
          Smart insights based on your recycling patterns and nearby bin availability
        </p>
      </div>

      {/* AI Insights Grid */}
      <div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Lightbulb size={20} style={{ color: '#f59e0b' }} />
          Smart Insights
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {aiInsights.map((insight, index) => (
            <motion.div
              key={insight.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{
                padding: '20px',
                background: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                position: 'relative',
                overflow: 'hidden',
              }}
              className="content-card"
            >
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{
                  padding: '10px',
                  background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
                  borderRadius: '10px',
                  color: 'white',
                  height: 'fit-content',
                }}>
                  {insight.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '8px' }}>
                    {insight.title}
                  </h4>
                  <p style={{ fontSize: '0.75rem', color: '#64748b', lineHeight: '1.5' }}>
                    {insight.description}
                  </p>
                  {insight.actionable && (
                    <button style={{
                      marginTop: '12px',
                      padding: '6px 12px',
                      background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}>
                      Take Action
                      <ArrowRight size={14} />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recommended Items */}
      <div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Target size={20} style={{ color: '#10b981' }} />
          Personalized Recycling Recommendations
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {recommendations.map((rec, index) => (
            <motion.div
              key={rec.item}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 }}
              style={{
                padding: '24px',
                background: 'white',
                borderRadius: '16px',
                border: '2px solid',
                borderColor: getUrgencyColor(rec.urgency),
                position: 'relative',
              }}
              className="content-card"
            >
              {/* Urgency Badge */}
              <div style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                padding: '6px 12px',
                background: getUrgencyBg(rec.urgency),
                color: getUrgencyColor(rec.urgency),
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: '600',
                textTransform: 'uppercase',
              }}>
                {rec.urgency} Priority
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px', alignItems: 'start' }}>
                {/* Left: Item Info */}
                <div>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '8px' }}>
                    {rec.item}
                  </h4>
                  <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '16px' }}>
                    {rec.category}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ 
                      padding: '12px',
                      background: 'rgba(16, 185, 129, 0.1)',
                      borderRadius: '8px',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <Zap size={16} style={{ color: '#10b981' }} />
                        <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Recycle Value</span>
                      </div>
                      <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#10b981' }}>
                        {rec.recycleValue} pts
                      </p>
                    </div>

                    <div style={{ 
                      padding: '12px',
                      background: 'rgba(34, 197, 94, 0.1)',
                      borderRadius: '8px',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <Leaf size={16} style={{ color: '#22c55e' }} />
                        <span style={{ fontSize: '0.75rem', color: '#64748b' }}>CO₂ Saved</span>
                      </div>
                      <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#22c55e' }}>
                        {rec.co2Impact}kg
                      </p>
                    </div>

                    <div style={{ 
                      padding: '12px',
                      background: 'rgba(59, 130, 246, 0.1)',
                      borderRadius: '8px',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <Recycle size={16} style={{ color: '#3b82f6' }} />
                        <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Nearby Bins</span>
                      </div>
                      <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#3b82f6' }}>
                        {rec.nearbyBins} available
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right: Recycling Tips */}
                <div>
                  <h5 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Lightbulb size={18} style={{ color: '#f59e0b' }} />
                    Recycling Tips
                  </h5>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {rec.tips.map((tip, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '10px',
                          padding: '10px',
                          background: '#f9fafb',
                          borderRadius: '8px',
                        }}
                      >
                        <CheckCircle size={16} style={{ color: '#10b981', marginTop: '2px', flexShrink: 0 }} />
                        <span style={{ fontSize: '0.875rem', color: '#64748b' }}>{tip}</span>
                      </div>
                    ))}
                  </div>

                  <button style={{
                    marginTop: '16px',
                    width: '100%',
                    padding: '12px',
                    background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}>
                    Find Nearest Bin
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recycling Pattern Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          padding: '24px',
          background: 'rgba(59, 130, 246, 0.05)',
          borderRadius: '16px',
          border: '1px solid rgba(59, 130, 246, 0.2)',
        }}
      >
        <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <TrendingUp size={20} style={{ color: '#3b82f6' }} />
          Your Recycling Pattern
        </h3>
        <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '16px' }}>
          AI analysis of your recycling behavior over the past 30 days
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <div>
            <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '4px' }}>Most Recycled Category</p>
            <p style={{ fontSize: '1.125rem', fontWeight: '600', color: '#3b82f6' }}>Electronics (65%)</p>
          </div>
          <div>
            <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '4px' }}>Average Frequency</p>
            <p style={{ fontSize: '1.125rem', fontWeight: '600', color: '#3b82f6' }}>2.5 times/week</p>
          </div>
          <div>
            <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '4px' }}>Preferred Time</p>
            <p style={{ fontSize: '1.125rem', fontWeight: '600', color: '#3b82f6' }}>Weekends, 2-5 PM</p>
          </div>
          <div>
            <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '4px' }}>Streak Days</p>
            <p style={{ fontSize: '1.125rem', fontWeight: '600', color: '#3b82f6' }}>12 consecutive</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
