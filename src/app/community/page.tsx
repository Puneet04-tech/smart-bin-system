"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";
import { NotificationCenter } from "@/components/NotificationCenter";
import { getRealisticTimestamp, getRealisticEngagement } from "@/lib/realistic-data";
import {
  Home,
  Users,
  TrendingUp,
  Award,
  Heart,
  MessageCircle,
  Share2,
  Trophy,
  Zap,
  Leaf,
  Target,
  Flame,
  Crown,
  ChevronDown,
  Image as ImageIcon,
  Send,
  Filter,
  Menu,
  X,
} from "lucide-react";

interface Post {
  id: string;
  user: {
    name: string;
    avatar: string;
    level: number;
    badge: string;
  };
  content: string;
  image?: string;
  recycledItem: {
    name: string;
    category: string;
    points: number;
    co2Saved: number;
  };
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
}

interface LeaderboardUser {
  rank: number;
  name: string;
  avatar: string;
  points: number;
  co2Saved: number;
  itemsRecycled: number;
  streak: number;
  badge: string;
  trend: "up" | "down" | "same";
}

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<"feed" | "leaderboard" | "challenges">("feed");
  const [filterType, setFilterType] = useState<"all" | "friends" | "trending">("all");
  const [showComments, setShowComments] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const posts: Post[] = [
    {
      id: "1",
      user: {
        name: "Priya Sharma",
        avatar: "PS",
        level: 24,
        badge: "Eco Warrior",
      },
      content: "Just recycled my old laptop battery! 🔋 Every small action counts towards a greener planet. Who else is making a difference today?",
      image: "https://images.unsplash.com/photo-1591799265444-d66432b91588?w=400",
      recycledItem: {
        name: "Laptop Battery",
        category: "Batteries",
        points: 250,
        co2Saved: 12.5,
      },
      timestamp: "1h",
      likes: 127,
      comments: 19,
      shares: 8,
      isLiked: true,
    },
    {
      id: "2",
      user: {
        name: "Rahul Verma",
        avatar: "RV",
        level: 31,
        badge: "Green Champion",
      },
      content: "Milestone achievement! 🎉 100kg of e-waste recycled this year. Together we can make a difference! #SustainableLiving #EWasteHero",
      recycledItem: {
        name: "Multiple Items",
        category: "Mixed E-Waste",
        points: 1500,
        co2Saved: 75.0,
      },
      timestamp: "4h",
      likes: 348,
      comments: 47,
      shares: 24,
      isLiked: false,
    },
    {
      id: "3",
      user: {
        name: "Ananya Gupta",
        avatar: "AG",
        level: 18,
        badge: "Rising Star",
      },
      content: "Found 3 old smartphones in my drawer! Time to recycle and earn some rewards. Visit your nearest smart bin today! 📱",
      recycledItem: {
        name: "3x Smartphones",
        category: "Mobile Devices",
        points: 750,
        co2Saved: 45.0,
      },
      timestamp: "18h",
      likes: 94,
      comments: 14,
      shares: 6,
      isLiked: true,
    },
  ];

  const leaderboard: LeaderboardUser[] = [
    {
      rank: 1,
      name: "Vikram Singh",
      avatar: "VS",
      points: 15750,
      co2Saved: 892.5,
      itemsRecycled: 347,
      streak: 45,
      badge: "Eco Legend",
      trend: "up",
    },
    {
      rank: 2,
      name: "Priya Sharma",
      avatar: "PS",
      points: 12340,
      co2Saved: 678.2,
      itemsRecycled: 256,
      streak: 32,
      badge: "Eco Warrior",
      trend: "same",
    },
    {
      rank: 3,
      name: "Rahul Verma",
      avatar: "RV",
      points: 11890,
      co2Saved: 645.8,
      itemsRecycled: 234,
      streak: 28,
      badge: "Green Champion",
      trend: "up",
    },
    {
      rank: 4,
      name: "Ananya Gupta",
      avatar: "AG",
      points: 9560,
      co2Saved: 512.3,
      itemsRecycled: 189,
      streak: 21,
      badge: "Rising Star",
      trend: "down",
    },
    {
      rank: 5,
      name: "Arjun Patel",
      avatar: "AP",
      points: 8920,
      co2Saved: 478.9,
      itemsRecycled: 167,
      streak: 19,
      badge: "Eco Fighter",
      trend: "up",
    },
  ];

  const challenges = [
    {
      id: "1",
      title: "Weekend Warrior",
      description: "Recycle 5 items this weekend",
      progress: 3,
      target: 5,
      reward: 500,
      timeLeft: "2 days",
      difficulty: "Medium",
      participants: 1247,
    },
    {
      id: "2",
      title: "Battery Bonanza",
      description: "Recycle 10 batteries in 7 days",
      progress: 7,
      target: 10,
      reward: 750,
      timeLeft: "4 days",
      difficulty: "Hard",
      participants: 856,
    },
    {
      id: "3",
      title: "First Timer",
      description: "Complete your first recycling",
      progress: 1,
      target: 1,
      reward: 100,
      timeLeft: "Complete",
      difficulty: "Easy",
      participants: 3421,
    },
  ];

  const handleLike = (postId: string) => {
    console.log("Liked post:", postId);
  };

  const handleComment = (postId: string) => {
    setShowComments(showComments === postId ? null : postId);
  };

  const handleShare = (postId: string) => {
    console.log("Shared post:", postId);
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--neutral-50)" }}>
      {/* Navigation */}
      <nav className="nav">
        <div className="container">
          <div className="nav-content">
            <div className="logo">
              <div className="logo-icon">
                <Users size={24} />
              </div>
              <span>Community Hub</span>
            </div>
            <div className="nav-links desktop-only">
              <button onClick={() => (window.location.href = "/")}>
                <Home size={18} />
                Home
              </button>
              <button onClick={() => (window.location.href = "/rewards")}>
                <Award size={18} />
                Rewards
              </button>
              <button onClick={() => (window.location.href = "/waste-detection")}>
                <Zap size={18} />
                Detection
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
              <button onClick={() => (window.location.href = "/rewards")}>
                <Award size={18} />
                Rewards
              </button>
              <button onClick={() => (window.location.href = "/waste-detection")}>
                <Zap size={18} />
                Detection
              </button>
              <button onClick={() => (window.location.href = "/admin")}>
                <TrendingUp size={18} />
                Admin
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container" style={{ padding: "100px 20px 40px", maxWidth: "1400px" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: "40px" }}
        >
          <h1 style={{ fontSize: "2.5rem", fontWeight: "800", marginBottom: "12px", color: "var(--neutral-900)" }}>
            🌍 Community Hub
          </h1>
          <p style={{ fontSize: "1.1rem", color: "var(--neutral-600)" }}>
            Connect with eco-warriors, share your journey, and compete for the top spot!
          </p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
          style={{
            marginBottom: "30px",
            padding: "20px 30px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "4px" }}>
              <Users size={20} style={{ color: "var(--primary-600)" }} />
              <span style={{ fontSize: "1.8rem", fontWeight: "800", color: "var(--primary-600)" }}>12,847</span>
            </div>
            <div style={{ fontSize: "0.9rem", color: "var(--neutral-600)" }}>Active Members</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "4px" }}>
              <Leaf size={20} style={{ color: "var(--success)" }} />
              <span style={{ fontSize: "1.8rem", fontWeight: "800", color: "var(--success)" }}>247.5 tons</span>
            </div>
            <div style={{ fontSize: "0.9rem", color: "var(--neutral-600)" }}>CO₂ Saved Together</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "4px" }}>
              <Flame size={20} style={{ color: "var(--accent-500)" }} />
              <span style={{ fontSize: "1.8rem", fontWeight: "800", color: "var(--accent-500)" }}>156</span>
            </div>
            <div style={{ fontSize: "0.9rem", color: "var(--neutral-600)" }}>Active Challenges</div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div style={{ marginBottom: "30px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {[
            { id: "feed", label: "Community Feed", icon: Users },
            { id: "leaderboard", label: "Leaderboard", icon: Trophy },
            { id: "challenges", label: "Challenges", icon: Target },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as "feed" | "leaderboard" | "challenges")}
                style={{
                  padding: "12px 24px",
                  borderRadius: "12px",
                  border: "none",
                  background: activeTab === tab.id ? "var(--gradient-primary)" : "white",
                  color: activeTab === tab.id ? "white" : "var(--neutral-700)",
                  fontWeight: "600",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  boxShadow: activeTab === tab.id ? "var(--shadow-md)" : "var(--shadow-sm)",
                  transition: "all 0.3s ease",
                }}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 350px", gap: "30px" }}>
          {/* Main Content */}
          <div>
            {activeTab === "feed" && (
              <div>
                {/* Filter Options */}
                <div style={{ marginBottom: "20px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  {[
                    { id: "all", label: "All Posts" },
                    { id: "friends", label: "Friends" },
                    { id: "trending", label: "Trending" },
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setFilterType(filter.id as "all" | "friends" | "trending")}
                      style={{
                        padding: "8px 16px",
                        borderRadius: "8px",
                        border: `2px solid ${filterType === filter.id ? "var(--primary-600)" : "var(--neutral-200)"}`,
                        background: filterType === filter.id ? "var(--primary-50)" : "white",
                        color: filterType === filter.id ? "var(--primary-700)" : "var(--neutral-600)",
                        fontWeight: "600",
                        fontSize: "0.9rem",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {filter.label}
                    </button>
                  ))}
                  <button
                    style={{
                      padding: "8px 16px",
                      borderRadius: "8px",
                      border: "2px solid var(--neutral-200)",
                      background: "white",
                      color: "var(--neutral-600)",
                      fontWeight: "600",
                      fontSize: "0.9rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <Filter size={16} />
                    More Filters
                  </button>
                </div>

                {/* Create Post */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card"
                  style={{ marginBottom: "20px", padding: "20px" }}
                >
                  <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "50%",
                        background: "var(--gradient-primary)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontWeight: "700",
                        fontSize: "1.1rem",
                        flexShrink: 0,
                      }}
                    >
                      YU
                    </div>
                    <div style={{ flex: 1 }}>
                      <textarea
                        placeholder="Share your recycling journey..."
                        style={{
                          width: "100%",
                          minHeight: "80px",
                          padding: "12px",
                          border: "2px solid var(--neutral-200)",
                          borderRadius: "12px",
                          fontSize: "1rem",
                          resize: "vertical",
                          marginBottom: "12px",
                        }}
                      />
                      <div style={{ display: "flex", gap: "12px", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", gap: "12px" }}>
                          <button
                            style={{
                              padding: "8px 16px",
                              borderRadius: "8px",
                              border: "2px solid var(--neutral-200)",
                              background: "white",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                              fontSize: "0.9rem",
                              fontWeight: "500",
                            }}
                          >
                            <ImageIcon size={16} />
                            Photo
                          </button>
                        </div>
                        <button
                          style={{
                            padding: "8px 24px",
                            borderRadius: "8px",
                            border: "none",
                            background: "var(--gradient-primary)",
                            color: "white",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            fontSize: "0.9rem",
                            fontWeight: "600",
                          }}
                        >
                          <Send size={16} />
                          Post
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Posts Feed */}
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {posts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="card"
                      style={{ padding: "24px" }}
                    >
                      {/* Post Header */}
                      <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
                        <div
                          style={{
                            width: "48px",
                            height: "48px",
                            borderRadius: "50%",
                            background: "var(--gradient-accent)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            fontWeight: "700",
                            fontSize: "1.1rem",
                            flexShrink: 0,
                          }}
                        >
                          {post.user.avatar}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "2px" }}>
                            <span style={{ fontWeight: "700", fontSize: "1.05rem", color: "var(--neutral-900)" }}>
                              {post.user.name}
                            </span>
                            <span
                              style={{
                                padding: "2px 8px",
                                borderRadius: "6px",
                                background: "var(--primary-100)",
                                color: "var(--primary-700)",
                                fontSize: "0.75rem",
                                fontWeight: "600",
                              }}
                            >
                              Lv {post.user.level}
                            </span>
                            <span
                              style={{
                                padding: "2px 8px",
                                borderRadius: "6px",
                                background: "var(--accent-100)",
                                color: "var(--accent-700)",
                                fontSize: "0.75rem",
                                fontWeight: "600",
                              }}
                            >
                              {post.user.badge}
                            </span>
                          </div>
                          <div style={{ fontSize: "0.85rem", color: "var(--neutral-500)" }}>{post.timestamp}</div>
                        </div>
                      </div>

                      {/* Post Content */}
                      <p style={{ marginBottom: "16px", lineHeight: "1.6", color: "var(--neutral-800)" }}>{post.content}</p>

                      {/* Recycled Item Card */}
                      <div
                        style={{
                          padding: "16px",
                          borderRadius: "12px",
                          background: "var(--primary-50)",
                          border: "2px solid var(--primary-200)",
                          marginBottom: "16px",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                          <div style={{ fontWeight: "700", fontSize: "1.05rem", color: "var(--primary-700)" }}>
                            {post.recycledItem.name}
                          </div>
                          <div
                            style={{
                              padding: "4px 10px",
                              borderRadius: "6px",
                              background: "var(--primary-600)",
                              color: "white",
                              fontSize: "0.8rem",
                              fontWeight: "600",
                            }}
                          >
                            {post.recycledItem.category}
                          </div>
                        </div>
                        <div style={{ display: "flex", gap: "20px", fontSize: "0.9rem" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <Zap size={16} style={{ color: "var(--accent-500)" }} />
                            <span style={{ fontWeight: "600", color: "var(--accent-600)" }}>
                              {post.recycledItem.points} pts
                            </span>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <Leaf size={16} style={{ color: "var(--success)" }} />
                            <span style={{ fontWeight: "600", color: "var(--success)" }}>
                              {post.recycledItem.co2Saved}kg CO₂
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Post Actions */}
                      <div
                        style={{
                          display: "flex",
                          gap: "20px",
                          paddingTop: "16px",
                          borderTop: "1px solid var(--neutral-200)",
                        }}
                      >
                        <button
                          onClick={() => handleLike(post.id)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            padding: "8px 16px",
                            borderRadius: "8px",
                            border: "none",
                            background: post.isLiked ? "var(--error)" : "var(--neutral-100)",
                            color: post.isLiked ? "white" : "var(--neutral-700)",
                            cursor: "pointer",
                            fontWeight: "600",
                            fontSize: "0.9rem",
                            transition: "all 0.2s ease",
                          }}
                        >
                          <Heart size={18} fill={post.isLiked ? "white" : "none"} />
                          {post.likes}
                        </button>
                        <button
                          onClick={() => handleComment(post.id)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            padding: "8px 16px",
                            borderRadius: "8px",
                            border: "none",
                            background: "var(--neutral-100)",
                            color: "var(--neutral-700)",
                            cursor: "pointer",
                            fontWeight: "600",
                            fontSize: "0.9rem",
                          }}
                        >
                          <MessageCircle size={18} />
                          {post.comments}
                        </button>
                        <button
                          onClick={() => handleShare(post.id)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            padding: "8px 16px",
                            borderRadius: "8px",
                            border: "none",
                            background: "var(--neutral-100)",
                            color: "var(--neutral-700)",
                            cursor: "pointer",
                            fontWeight: "600",
                            fontSize: "0.9rem",
                          }}
                        >
                          <Share2 size={18} />
                          {post.shares}
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "leaderboard" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="card" style={{ padding: "0", overflow: "hidden" }}>
                  {/* Top 3 Podium */}
                  <div
                    style={{
                      background: "var(--gradient-primary)",
                      padding: "40px 20px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "flex-end",
                      gap: "20px",
                    }}
                  >
                    {[leaderboard[1], leaderboard[0], leaderboard[2]].map((user, idx) => {
                      const heights = ["120px", "160px", "100px"];
                      const medals = ["🥈", "🥇", "🥉"];
                      const realIdx = idx === 1 ? 0 : idx === 0 ? 1 : 2;
                      return (
                        <div
                          key={user.rank}
                          style={{
                            textAlign: "center",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <div style={{ fontSize: "2.5rem", marginBottom: "8px" }}>{medals[idx]}</div>
                          <div
                            style={{
                              width: "64px",
                              height: "64px",
                              borderRadius: "50%",
                              background: "white",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "var(--primary-600)",
                              fontWeight: "800",
                              fontSize: "1.3rem",
                              marginBottom: "12px",
                              boxShadow: "var(--shadow-lg)",
                            }}
                          >
                            {user.avatar}
                          </div>
                          <div style={{ color: "white", fontWeight: "700", fontSize: "1rem", marginBottom: "4px" }}>
                            {user.name}
                          </div>
                          <div style={{ color: "rgba(255,255,255,0.9)", fontSize: "1.3rem", fontWeight: "800" }}>
                            {user.points.toLocaleString()}
                          </div>
                          <div
                            style={{
                              width: "100px",
                              height: heights[idx],
                              background: "rgba(255,255,255,0.3)",
                              borderRadius: "8px 8px 0 0",
                              marginTop: "16px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "white",
                              fontWeight: "800",
                              fontSize: "2rem",
                            }}
                          >
                            #{user.rank}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Rest of Leaderboard */}
                  <div style={{ padding: "20px" }}>
                    {leaderboard.slice(3).map((user) => (
                      <div
                        key={user.rank}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "16px",
                          padding: "16px",
                          borderBottom: "1px solid var(--neutral-200)",
                        }}
                      >
                        <div style={{ fontSize: "1.5rem", fontWeight: "800", color: "var(--neutral-400)", width: "40px" }}>
                          #{user.rank}
                        </div>
                        <div
                          style={{
                            width: "48px",
                            height: "48px",
                            borderRadius: "50%",
                            background: "var(--gradient-accent)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            fontWeight: "700",
                            fontSize: "1.1rem",
                          }}
                        >
                          {user.avatar}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: "700", fontSize: "1.05rem", marginBottom: "4px", color: "var(--neutral-900)" }}>
                            {user.name}
                          </div>
                          <div style={{ display: "flex", gap: "12px", fontSize: "0.85rem", color: "var(--neutral-600)" }}>
                            <span>🔥 {user.streak} day streak</span>
                            <span>♻️ {user.itemsRecycled} items</span>
                          </div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontSize: "1.3rem", fontWeight: "800", color: "var(--accent-600)" }}>
                            {user.points.toLocaleString()}
                          </div>
                          <div style={{ fontSize: "0.85rem", color: "var(--success)" }}>{user.co2Saved}kg CO₂</div>
                        </div>
                        <div>
                          {user.trend === "up" && <TrendingUp size={20} style={{ color: "var(--success)" }} />}
                          {user.trend === "down" && <ChevronDown size={20} style={{ color: "var(--error)" }} />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "challenges" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {challenges.map((challenge, index) => (
                  <motion.div
                    key={challenge.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="card"
                    style={{ padding: "24px" }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                      <div>
                        <h3 style={{ fontSize: "1.3rem", fontWeight: "800", marginBottom: "8px", color: "var(--neutral-900)" }}>
                          {challenge.title}
                        </h3>
                        <p style={{ color: "var(--neutral-600)", marginBottom: "8px" }}>{challenge.description}</p>
                        <div style={{ display: "flex", gap: "12px", fontSize: "0.85rem" }}>
                          <span
                            style={{
                              padding: "4px 10px",
                              borderRadius: "6px",
                              background:
                                challenge.difficulty === "Easy"
                                  ? "var(--success)"
                                  : challenge.difficulty === "Medium"
                                  ? "var(--accent-500)"
                                  : "var(--error)",
                              color: "white",
                              fontWeight: "600",
                            }}
                          >
                            {challenge.difficulty}
                          </span>
                          <span style={{ color: "var(--neutral-600)" }}>👥 {challenge.participants} participants</span>
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                          <Trophy size={20} style={{ color: "var(--accent-500)" }} />
                          <span style={{ fontSize: "1.5rem", fontWeight: "800", color: "var(--accent-600)" }}>
                            {challenge.reward}
                          </span>
                        </div>
                        <div style={{ fontSize: "0.85rem", color: "var(--neutral-600)" }}>reward points</div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div style={{ marginBottom: "12px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "0.9rem" }}>
                        <span style={{ color: "var(--neutral-600)" }}>
                          Progress: {challenge.progress}/{challenge.target}
                        </span>
                        <span style={{ color: "var(--neutral-600)" }}>⏱️ {challenge.timeLeft}</span>
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
                        <div
                          style={{
                            width: `${(challenge.progress / challenge.target) * 100}%`,
                            height: "100%",
                            background: "var(--gradient-primary)",
                            transition: "width 0.3s ease",
                          }}
                        />
                      </div>
                    </div>

                    <button
                      style={{
                        width: "100%",
                        padding: "12px",
                        borderRadius: "8px",
                        border: "none",
                        background: challenge.progress >= challenge.target ? "var(--success)" : "var(--gradient-primary)",
                        color: "white",
                        fontWeight: "600",
                        cursor: "pointer",
                      }}
                    >
                      {challenge.progress >= challenge.target ? "Claim Reward" : "View Details"}
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Your Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card"
              style={{ padding: "20px" }}
            >
              <h3 style={{ fontSize: "1.2rem", fontWeight: "800", marginBottom: "16px", color: "var(--neutral-900)" }}>
                Your Stats
              </h3>
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background: "var(--gradient-primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: "800",
                  fontSize: "2rem",
                  margin: "0 auto 16px",
                }}
              >
                YU
              </div>
              <div style={{ textAlign: "center", marginBottom: "16px" }}>
                <div style={{ fontWeight: "700", fontSize: "1.2rem", marginBottom: "4px", color: "var(--neutral-900)" }}>
                  Your Name
                </div>
                <div style={{ fontSize: "0.9rem", color: "var(--neutral-600)" }}>Level 15 • Eco Explorer</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div
                  style={{
                    padding: "12px",
                    borderRadius: "8px",
                    background: "var(--primary-50)",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ color: "var(--neutral-700)" }}>Rank</span>
                  <span style={{ fontWeight: "700", color: "var(--primary-700)" }}>#42</span>
                </div>
                <div
                  style={{
                    padding: "12px",
                    borderRadius: "8px",
                    background: "var(--accent-50)",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ color: "var(--neutral-700)" }}>Points</span>
                  <span style={{ fontWeight: "700", color: "var(--accent-700)" }}>7,450</span>
                </div>
                <div
                  style={{
                    padding: "12px",
                    borderRadius: "8px",
                    background: "var(--primary-50)",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ color: "var(--neutral-700)" }}>Streak</span>
                  <span style={{ fontWeight: "700", color: "var(--primary-700)" }}>🔥 14 days</span>
                </div>
              </div>
            </motion.div>

            {/* Top Contributors */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="card"
              style={{ padding: "20px" }}
            >
              <h3 style={{ fontSize: "1.2rem", fontWeight: "800", marginBottom: "16px", color: "var(--neutral-900)" }}>
                🏆 Top Contributors
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {leaderboard.slice(0, 3).map((user, idx) => (
                  <div key={user.rank} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ fontSize: "1.5rem", width: "24px" }}>{["🥇", "🥈", "🥉"][idx]}</div>
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        background: "var(--gradient-accent)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontWeight: "700",
                        fontSize: "0.9rem",
                      }}
                    >
                      {user.avatar}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: "600", fontSize: "0.9rem", color: "var(--neutral-900)" }}>{user.name}</div>
                      <div style={{ fontSize: "0.8rem", color: "var(--accent-600)" }}>{user.points.toLocaleString()} pts</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Trending Topics */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="card"
              style={{ padding: "20px" }}
            >
              <h3 style={{ fontSize: "1.2rem", fontWeight: "800", marginBottom: "16px", color: "var(--neutral-900)" }}>
                🔥 Trending Topics
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {["#SustainableLiving", "#EWasteHero", "#GreenChallenge", "#ZeroWaste", "#RecycleMore"].map((tag) => (
                  <button
                    key={tag}
                    style={{
                      padding: "10px 12px",
                      borderRadius: "8px",
                      border: "none",
                      background: "var(--primary-50)",
                      color: "var(--primary-700)",
                      fontWeight: "600",
                      fontSize: "0.9rem",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
