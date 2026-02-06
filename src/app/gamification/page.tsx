"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";
import { NotificationCenter } from "@/components/NotificationCenter";
import {
  Home,
  Award,
  TrendingUp,
  Zap,
  Crown,
  Target,
  Flame,
  Star,
  Trophy,
  Medal,
  Gift,
  Compass,
  Volume2,
  Users,
  Calendar,
  Clock,
  CheckCircle,
  Lock,
  Unlock,
  ArrowUp,
  Heart,
  Sparkles,
  Menu,
  X,
} from "lucide-react";

interface Challenge {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  status: "active" | "completed" | "locked";
  difficulty: "Easy" | "Medium" | "Hard" | "Legendary";
  reward: number;
  days: number;
  participants: number;
  badge: string;
  requirement?: string;
}

interface Daily {
  id: string;
  title: string;
  points: number;
  status: "completed" | "in-progress" | "locked";
  progress: number;
}

export default function GamificationPage() {
  const [activeTab, setActiveTab] = useState<"challenges" | "tournaments" | "leaderboard">("challenges");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const challenges: Challenge[] = [
    {
      id: "1",
      title: "Eco Warrior - Week 1",
      description: "Recycle 25 items this week",
      progress: 18,
      target: 25,
      status: "active",
      difficulty: "Medium",
      reward: 500,
      days: 3,
      participants: 2847,
      badge: "⚔️",
    },
    {
      id: "2",
      title: "Battery Master",
      description: "Recycle 10 batteries",
      progress: 7,
      target: 10,
      status: "active",
      difficulty: "Hard",
      reward: 750,
      days: 5,
      participants: 1256,
      badge: "🔋",
    },
    {
      id: "3",
      title: "Green Guardian",
      description: "Offset 100kg CO₂ in a month",
      progress: 67,
      target: 100,
      status: "active",
      difficulty: "Hard",
      reward: 1000,
      days: 8,
      participants: 892,
      badge: "🌿",
    },
    {
      id: "4",
      title: "Speed Recycler",
      description: "Recycle 5 items within 24 hours",
      progress: 2,
      target: 5,
      status: "active",
      difficulty: "Medium",
      reward: 400,
      days: 1,
      participants: 1534,
      badge: "⚡",
    },
    {
      id: "5",
      title: "Social Butterfly",
      description: "Refer 3 friends to the platform",
      progress: 1,
      target: 3,
      status: "active",
      difficulty: "Easy",
      reward: 300,
      days: 14,
      participants: 3421,
      badge: "🦋",
    },
    {
      id: "6",
      title: "Legend Status",
      description: "Reach level 50 and 50,000 points",
      progress: 42000,
      target: 50000,
      status: "locked",
      difficulty: "Legendary",
      reward: 5000,
      days: 45,
      participants: 156,
      badge: "👑",
      requirement: "Level 40+",
    },
  ];

  const tournaments = [
    {
      id: "1",
      name: "February Recycling Championship",
      phase: "Round 1",
      participants: 548,
      prize: "₹50,000",
      topReward: "🥇 ₹25,000",
      entries: 3,
      status: "active",
      daysLeft: 12,
    },
    {
      id: "2",
      name: "Eco-Warrior Elite Series",
      phase: "Registration",
      participants: 0,
      prize: "₹100,000",
      topReward: "🥇 ₹50,000",
      entries: 0,
      status: "upcoming",
      daysLeft: 7,
    },
    {
      id: "3",
      name: "January Speed Challenge",
      phase: "Finished",
      participants: 1247,
      prize: "₹30,000",
      topReward: "🥇 ₹15,000",
      entries: 5,
      status: "completed",
      daysLeft: 0,
    },
  ];

  const leaderboard = [
    {
      rank: 1,
      name: "Vikram Singh",
      avatar: "VS",
      points: 45280,
      level: 47,
      badges: 12,
      streak: 67,
      trend: "up",
    },
    {
      rank: 2,
      name: "Priya Sharma",
      avatar: "PS",
      points: 38950,
      level: 42,
      badges: 10,
      streak: 52,
      trend: "up",
    },
    {
      rank: 3,
      name: "Rahul Verma",
      avatar: "RV",
      points: 35720,
      level: 39,
      badges: 9,
      streak: 48,
      trend: "same",
    },
    {
      rank: 4,
      name: "Ananya Gupta",
      avatar: "AG",
      points: 32100,
      level: 36,
      badges: 8,
      streak: 42,
      trend: "up",
    },
    {
      rank: 5,
      name: "Arjun Patel",
      avatar: "AP",
      points: 28450,
      level: 32,
      badges: 7,
      streak: 38,
      trend: "down",
    },
  ];

  const dailyChallenges: Daily[] = [
    {
      id: "1",
      title: "First Recycle of the Day",
      points: 50,
      status: "completed",
      progress: 1,
    },
    {
      id: "2",
      title: "Recycle 3 Items",
      points: 150,
      status: "in-progress",
      progress: 2,
    },
    {
      id: "3",
      title: "Share Achievement",
      points: 100,
      status: "locked",
      progress: 0,
    },
    {
      id: "4",
      title: "Visit Community Hub",
      points: 75,
      status: "locked",
      progress: 0,
    },
  ];

  const yourStats = {
    level: 28,
    nextLevel: 30,
    experience: 8450,
    experienceToNextLevel: 10000,
    totalPointsEarned: 28450,
    currentStreak: 24,
    badges: 11,
    tournaments: 3,
    challenge: "Complete 3 more challenges",
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--neutral-50)" }}>
      {/* Navigation */}
      <nav className="nav">
        <div className="container">
          <div className="nav-content">
            <div className="logo">
              <div className="logo-icon">
                <Crown size={24} />
              </div>
              <span>Gamification Hub</span>
            </div>
            <div className="nav-links desktop-only">
              <button onClick={() => (window.location.href = "/")}>
                <Home size={18} />
                Home
              </button>
              <button onClick={() => (window.location.href = "/analytics")}>
                <TrendingUp size={18} />
                Analytics
              </button>
              <button onClick={() => (window.location.href = "/carbon-marketplace")}>
                <Award size={18} />
                Marketplace
              </button>
              <button onClick={() => (window.location.href = "/admin")}>
                <Zap size={18} />
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
              <button onClick={() => (window.location.href = "/analytics")}>
                <TrendingUp size={18} />
                Analytics
              </button>
              <button onClick={() => (window.location.href = "/carbon-marketplace")}>
                <Award size={18} />
                Marketplace
              </button>
              <button onClick={() => (window.location.href = "/admin")}>
                <Zap size={18} />
                Admin
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container" style={{ padding: "100px 20px 40px", maxWidth: "1600px" }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: "40px" }}>
          <h1 style={{ fontSize: "2.5rem", fontWeight: "800", marginBottom: "12px", color: "var(--neutral-900)" }}>
            🎮 Gamification Hub
          </h1>
          <p style={{ fontSize: "1.1rem", color: "var(--neutral-600)" }}>
            Compete, challenge yourself, and reach the top of the leaderboard!
          </p>
        </motion.div>

        {/* Your Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          <div className="card" style={{ padding: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "var(--gradient-primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: "800",
                  fontSize: "1.5rem",
                }}
              >
                {yourStats.level}
              </div>
              <div>
                <div style={{ fontSize: "0.85rem", color: "var(--neutral-600)" }}>Current Level</div>
                <div style={{ fontSize: "1.3rem", fontWeight: "800", color: "var(--neutral-900)" }}>Level {yourStats.level}</div>
              </div>
            </div>
            <div style={{ fontSize: "0.8rem", color: "var(--neutral-600)", marginBottom: "8px" }}>
              {yourStats.experience} / {yourStats.experienceToNextLevel} XP
            </div>
            <div
              style={{
                width: "100%",
                height: "10px",
                background: "var(--neutral-200)",
                borderRadius: "999px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${(yourStats.experience / yourStats.experienceToNextLevel) * 100}%`,
                  height: "100%",
                  background: "var(--gradient-primary)",
                  transition: "width 0.3s ease",
                }}
              />
            </div>
          </div>

          <div className="card" style={{ padding: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "var(--accent-100)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Zap size={24} style={{ color: "var(--accent-600)" }} />
              </div>
              <div>
                <div style={{ fontSize: "0.85rem", color: "var(--neutral-600)" }}>Total Points</div>
                <div style={{ fontSize: "1.3rem", fontWeight: "800", color: "var(--accent-600)" }}>
                  {yourStats.totalPointsEarned.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "var(--success)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                }}
              >
                <Flame size={24} />
              </div>
              <div>
                <div style={{ fontSize: "0.85rem", color: "var(--neutral-600)" }}>Streak Days</div>
                <div style={{ fontSize: "1.3rem", fontWeight: "800", color: "var(--success)" }}>
                  🔥 {yourStats.currentStreak}
                </div>
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "var(--gradient-accent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                }}
              >
                <Star size={24} />
              </div>
              <div>
                <div style={{ fontSize: "0.85rem", color: "var(--neutral-600)" }}>Badges Earned</div>
                <div style={{ fontSize: "1.3rem", fontWeight: "800", color: "var(--accent-600)" }}>
                  ⭐ {yourStats.badges}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Daily Challenges */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "800", marginBottom: "16px", color: "var(--neutral-900)" }}>
            📅 Daily Challenges
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "16px" }}>
            {dailyChallenges.map((daily) => (
              <div
                key={daily.id}
                className="card"
                style={{
                  padding: "20px",
                  opacity: daily.status === "locked" ? 0.6 : 1,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {daily.status === "locked" && (
                  <div
                    style={{
                      position: "absolute",
                      top: "8px",
                      right: "8px",
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background: "var(--neutral-200)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Lock size={16} style={{ color: "var(--neutral-600)" }} />
                  </div>
                )}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "12px" }}>
                  <h3 style={{ fontSize: "1rem", fontWeight: "700", color: "var(--neutral-900)" }}>{daily.title}</h3>
                  <div
                    style={{
                      padding: "4px 10px",
                      borderRadius: "6px",
                      background: "var(--accent-100)",
                      color: "var(--accent-700)",
                      fontSize: "0.75rem",
                      fontWeight: "700",
                    }}
                  >
                    +{daily.points} pts
                  </div>
                </div>
                {daily.status === "completed" && (
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--success)", fontWeight: "600" }}>
                    <CheckCircle size={16} />
                    Completed
                  </div>
                )}
                {daily.status === "in-progress" && (
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--primary-600)", fontWeight: "600" }}>
                    <Zap size={16} />
                    In Progress
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tabs */}
        <div style={{ marginBottom: "30px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {[
            { id: "challenges", label: "Challenges", icon: Target },
            { id: "tournaments", label: "Tournaments", icon: Trophy },
            { id: "leaderboard", label: "Leaderboard", icon: Crown },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as "challenges" | "tournaments" | "leaderboard")}
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

        {/* Challenges Tab */}
        {activeTab === "challenges" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {challenges.map((challenge, index) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card"
                style={{
                  padding: "24px",
                  position: "relative",
                  borderLeft: `4px solid ${
                    challenge.difficulty === "Easy"
                      ? "var(--success)"
                      : challenge.difficulty === "Medium"
                      ? "var(--accent-500)"
                      : challenge.difficulty === "Hard"
                      ? "var(--error)"
                      : "var(--accent-600)"
                  }`,
                }}
              >
                {challenge.status === "locked" && (
                  <div
                    style={{
                      position: "absolute",
                      top: "16px",
                      right: "16px",
                      padding: "6px 12px",
                      borderRadius: "6px",
                      background: "var(--neutral-200)",
                      color: "var(--neutral-700)",
                      fontSize: "0.75rem",
                      fontWeight: "600",
                    }}
                  >
                    🔒 Locked - {challenge.requirement}
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                      <span style={{ fontSize: "2rem" }}>{challenge.badge}</span>
                      <div>
                        <h3 style={{ fontSize: "1.2rem", fontWeight: "800", color: "var(--neutral-900)" }}>{challenge.title}</h3>
                        <p style={{ fontSize: "0.9rem", color: "var(--neutral-600)" }}>{challenge.description}</p>
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div
                      style={{
                        fontSize: "2rem",
                        fontWeight: "800",
                        color: "var(--accent-600)",
                        marginBottom: "4px",
                      }}
                    >
                      +{challenge.reward}
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "var(--neutral-600)" }}>reward points</div>
                  </div>
                </div>

                {/* Difficulty and Info */}
                <div style={{ display: "flex", gap: "16px", marginBottom: "16px", flexWrap: "wrap" }}>
                  <div
                    style={{
                      padding: "6px 12px",
                      borderRadius: "6px",
                      background:
                        challenge.difficulty === "Easy"
                          ? "var(--success)"
                          : challenge.difficulty === "Medium"
                          ? "var(--accent-500)"
                          : challenge.difficulty === "Hard"
                          ? "var(--error)"
                          : "var(--accent-600)",
                      color: "white",
                      fontSize: "0.75rem",
                      fontWeight: "600",
                    }}
                  >
                    {challenge.difficulty}
                  </div>
                  <div style={{ fontSize: "0.9rem", color: "var(--neutral-600)" }}>👥 {challenge.participants.toLocaleString()} participants</div>
                  <div style={{ fontSize: "0.9rem", color: "var(--neutral-600)" }}>⏱️ {challenge.days} days left</div>
                </div>

                {/* Progress Bar */}
                {challenge.status !== "locked" && (
                  <div style={{ marginBottom: "12px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "8px",
                        fontSize: "0.9rem",
                      }}
                    >
                      <span style={{ color: "var(--neutral-600)" }}>
                        {challenge.progress} / {challenge.target}
                      </span>
                      <span style={{ fontWeight: "600", color: "var(--primary-600)" }}>
                        {Math.round((challenge.progress / challenge.target) * 100)}%
                      </span>
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
                        animate={{ width: `${(challenge.progress / challenge.target) * 100}%` }}
                        transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                        style={{
                          height: "100%",
                          background: "var(--gradient-primary)",
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <div style={{ display: "flex", gap: "12px" }}>
                  <button
                    style={{
                      flex: 1,
                      padding: "12px",
                      borderRadius: "8px",
                      border: "none",
                      background: challenge.status === "locked" ? "var(--neutral-200)" : "var(--gradient-primary)",
                      color: challenge.status === "locked" ? "var(--neutral-600)" : "white",
                      fontWeight: "600",
                      cursor: challenge.status === "locked" ? "not-allowed" : "pointer",
                      opacity: challenge.status === "locked" ? 0.7 : 1,
                    }}
                  >
                    {challenge.status === "completed" ? "✅ Claim Reward" : challenge.status === "locked" ? "Unlock Challenge" : "Join Challenge"}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Tournaments Tab */}
        {activeTab === "tournaments" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {tournaments.map((tournament, index) => (
              <motion.div
                key={tournament.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card"
                style={{ padding: "24px" }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                  <div>
                    <h3 style={{ fontSize: "1.3rem", fontWeight: "800", marginBottom: "8px", color: "var(--neutral-900)" }}>
                      {tournament.name}
                    </h3>
                    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.9rem", color: "var(--neutral-600)" }}>
                        <Medal size={16} />
                        Phase: {tournament.phase}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.9rem", color: "var(--neutral-600)" }}>
                        <Users size={16} />
                        {tournament.participants} participants
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      padding: "10px 16px",
                      borderRadius: "8px",
                      background:
                        tournament.status === "active"
                          ? "var(--success)"
                          : tournament.status === "upcoming"
                          ? "var(--accent-500)"
                          : "var(--neutral-400)",
                      color: "white",
                      fontSize: "0.8rem",
                      fontWeight: "600",
                      textTransform: "uppercase",
                    }}
                  >
                    {tournament.status}
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                    gap: "16px",
                    padding: "16px",
                    borderRadius: "12px",
                    background: "var(--neutral-100)",
                    marginBottom: "16px",
                  }}
                >
                  <div>
                    <div style={{ fontSize: "0.85rem", color: "var(--neutral-600)", marginBottom: "4px" }}>Prize Pool</div>
                    <div style={{ fontSize: "1.5rem", fontWeight: "800", color: "var(--accent-600)" }}>{tournament.prize}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: "0.85rem", color: "var(--neutral-600)", marginBottom: "4px" }}>Top Prize</div>
                    <div style={{ fontSize: "1.2rem", fontWeight: "800", color: "var(--neutral-900)" }}>{tournament.topReward}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: "0.85rem", color: "var(--neutral-600)", marginBottom: "4px" }}>Your Entries</div>
                    <div style={{ fontSize: "1.5rem", fontWeight: "800", color: "var(--primary-600)" }}>{tournament.entries}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: "0.85rem", color: "var(--neutral-600)", marginBottom: "4px" }}>Time Left</div>
                    <div style={{ fontSize: "1.2rem", fontWeight: "800", color: "var(--neutral-900)" }}>
                      {tournament.daysLeft} days
                    </div>
                  </div>
                </div>

                <button
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "8px",
                    border: "none",
                    background: "var(--gradient-primary)",
                    color: "white",
                    fontWeight: "600",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                  disabled={tournament.status === "completed"}
                >
                  <Trophy size={18} />
                  {tournament.status === "completed" ? "Tournament Ended" : tournament.status === "upcoming" ? "Register Now" : "View Standings"}
                </button>
              </motion.div>
            ))}
          </div>
        )}

        {/* Leaderboard Tab */}
        {activeTab === "leaderboard" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="card" style={{ padding: "0", overflow: "hidden" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                  gap: "0",
                  padding: "20px",
                  borderBottom: "1px solid var(--neutral-200)",
                  background: "var(--neutral-100)",
                }}
              >
                <div style={{ fontWeight: "700", color: "var(--neutral-700)" }}>Rank</div>
                <div style={{ fontWeight: "700", color: "var(--neutral-700)" }}>Player</div>
                <div style={{ fontWeight: "700", color: "var(--neutral-700)" }}>Points</div>
                <div style={{ fontWeight: "700", color: "var(--neutral-700)" }}>Level</div>
                <div style={{ fontWeight: "700", color: "var(--neutral-700)" }}>Streak</div>
              </div>

              {leaderboard.map((user) => (
                <div
                  key={user.rank}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                    gap: "0",
                    padding: "20px",
                    borderBottom: "1px solid var(--neutral-200)",
                    alignItems: "center",
                  }}
                >
                  <div style={{ fontSize: "1.5rem", fontWeight: "800" }}>
                    {user.rank === 1 ? "🥇" : user.rank === 2 ? "🥈" : user.rank === 3 ? "🥉" : `#${user.rank}`}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
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
                    <div>
                      <div style={{ fontWeight: "700", color: "var(--neutral-900)" }}>{user.name}</div>
                      <div style={{ fontSize: "0.8rem", color: "var(--neutral-600)" }}>⭐ {user.badges} badges</div>
                    </div>
                  </div>
                  <div style={{ fontSize: "1.3rem", fontWeight: "800", color: "var(--primary-600)" }}>
                    {user.points.toLocaleString()}
                  </div>
                  <div style={{ fontSize: "1.1rem", fontWeight: "800", color: "var(--accent-600)" }}>Lv {user.level}</div>
                  <div style={{ fontSize: "1rem", fontWeight: "700", color: "var(--success)" }}>🔥 {user.streak}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
