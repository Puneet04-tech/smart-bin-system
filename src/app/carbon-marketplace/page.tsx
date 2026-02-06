"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";
import { NotificationCenter } from "@/components/NotificationCenter";
import {
  Home,
  Award,
  TrendingUp,
  Leaf,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  ShoppingCart,
  Package,
  Zap,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  Users,
  Menu,
  X,
} from "lucide-react";

interface CarbonCredit {
  id: string;
  seller: string;
  sellerRating: number;
  credits: number;
  pricePerCredit: number;
  totalPrice: number;
  expiryDays: number;
  verified: boolean;
  category: "Premium" | "Standard" | "Basic";
  co2Equivalent: number;
}

interface Transaction {
  id: string;
  type: "buy" | "sell" | "earn";
  amount: number;
  credits: number;
  date: string;
  status: "completed" | "pending" | "failed";
}

export default function CarbonMarketplacePage() {
  const [activeTab, setActiveTab] = useState<"buy" | "sell" | "portfolio">("buy");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCredit, setSelectedCredit] = useState<CarbonCredit | null>(null);

  const myPortfolio = {
    totalCredits: 145.5,
    totalValue: 14550,
    totalCo2Offset: 7275,
    monthlyGrowth: 12.5,
  };

  const marketListings: CarbonCredit[] = [
    {
      id: "1",
      seller: "EcoVision Corp",
      sellerRating: 4.9,
      credits: 100,
      pricePerCredit: 95,
      totalPrice: 9500,
      expiryDays: 45,
      verified: true,
      category: "Premium",
      co2Equivalent: 5000,
    },
    {
      id: "2",
      seller: "Green Energy Ltd",
      sellerRating: 4.7,
      credits: 250,
      pricePerCredit: 88,
      totalPrice: 22000,
      expiryDays: 30,
      verified: true,
      category: "Premium",
      co2Equivalent: 12500,
    },
    {
      id: "3",
      seller: "Sustainable Future",
      sellerRating: 4.5,
      credits: 50,
      pricePerCredit: 82,
      totalPrice: 4100,
      expiryDays: 60,
      verified: false,
      category: "Standard",
      co2Equivalent: 2500,
    },
    {
      id: "4",
      seller: "Carbon Neutral Co",
      sellerRating: 4.8,
      credits: 175,
      pricePerCredit: 90,
      totalPrice: 15750,
      expiryDays: 25,
      verified: true,
      category: "Premium",
      co2Equivalent: 8750,
    },
    {
      id: "5",
      seller: "Eco Warriors",
      sellerRating: 4.3,
      credits: 80,
      pricePerCredit: 75,
      totalPrice: 6000,
      expiryDays: 90,
      verified: false,
      category: "Basic",
      co2Equivalent: 4000,
    },
  ];

  const transactions: Transaction[] = [
    {
      id: "1",
      type: "earn",
      amount: 250,
      credits: 2.5,
      date: "2 hours ago",
      status: "completed",
    },
    {
      id: "2",
      type: "buy",
      amount: 4500,
      credits: 50,
      date: "1 day ago",
      status: "completed",
    },
    {
      id: "3",
      type: "sell",
      amount: 3200,
      credits: 35,
      date: "3 days ago",
      status: "completed",
    },
    {
      id: "4",
      type: "earn",
      amount: 150,
      credits: 1.5,
      date: "5 days ago",
      status: "completed",
    },
    {
      id: "5",
      type: "buy",
      amount: 8800,
      credits: 100,
      date: "1 week ago",
      status: "pending",
    },
  ];

  const marketStats = {
    avgPrice: 87.5,
    priceChange: 3.2,
    totalVolume: 1247500,
    activeListings: 342,
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--neutral-50)" }}>
      {/* Navigation */}
      <nav className="nav">
        <div className="container">
          <div className="nav-content">
            <div className="logo">
              <div className="logo-icon">
                <Leaf size={24} />
              </div>
              <span>Carbon Marketplace</span>
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
              <button onClick={() => (window.location.href = "/rewards")}>
                <Award size={18} />
                Rewards
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
              <button onClick={() => (window.location.href = "/rewards")}>
                <Award size={18} />
                Rewards
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
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: "40px" }}>
          <h1 style={{ fontSize: "2.5rem", fontWeight: "800", marginBottom: "12px", color: "var(--neutral-900)" }}>
            💰 Carbon Credit Marketplace
          </h1>
          <p style={{ fontSize: "1.1rem", color: "var(--neutral-600)" }}>
            Trade your earned carbon credits or invest in verified environmental offsets
          </p>
        </motion.div>

        {/* Market Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <div
            className="card"
            style={{
              padding: "24px",
              background: "var(--gradient-primary)",
              color: "white",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
              <div>
                <div style={{ fontSize: "0.9rem", opacity: 0.9, marginBottom: "8px" }}>Market Price</div>
                <div style={{ fontSize: "2.2rem", fontWeight: "800" }}>₹{marketStats.avgPrice}</div>
              </div>
              <div
                style={{
                  padding: "6px 12px",
                  borderRadius: "8px",
                  background: "rgba(255,255,255,0.2)",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                }}
              >
                <ArrowUpRight size={16} />
                +{marketStats.priceChange}%
              </div>
            </div>
            <div style={{ fontSize: "0.85rem", opacity: 0.8 }}>Per credit • Last 24h</div>
          </div>

          <div className="card" style={{ padding: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
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
                <TrendingUp size={24} style={{ color: "var(--accent-600)" }} />
              </div>
              <div>
                <div style={{ fontSize: "0.85rem", color: "var(--neutral-600)", marginBottom: "4px" }}>Total Volume</div>
                <div style={{ fontSize: "1.5rem", fontWeight: "800", color: "var(--neutral-900)" }}>
                  ₹{(marketStats.totalVolume / 100000).toFixed(1)}L
                </div>
              </div>
            </div>
            <div style={{ fontSize: "0.85rem", color: "var(--neutral-600)" }}>24h trading volume</div>
          </div>

          <div className="card" style={{ padding: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "var(--primary-100)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Package size={24} style={{ color: "var(--primary-600)" }} />
              </div>
              <div>
                <div style={{ fontSize: "0.85rem", color: "var(--neutral-600)", marginBottom: "4px" }}>Active Listings</div>
                <div style={{ fontSize: "1.5rem", fontWeight: "800", color: "var(--neutral-900)" }}>
                  {marketStats.activeListings}
                </div>
              </div>
            </div>
            <div style={{ fontSize: "0.85rem", color: "var(--neutral-600)" }}>Available for purchase</div>
          </div>

          <div
            className="card"
            style={{
              padding: "24px",
              background: "var(--gradient-accent)",
              color: "white",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Leaf size={24} />
              </div>
              <div>
                <div style={{ fontSize: "0.85rem", opacity: 0.9, marginBottom: "4px" }}>Your Credits</div>
                <div style={{ fontSize: "1.5rem", fontWeight: "800" }}>{myPortfolio.totalCredits}</div>
              </div>
            </div>
            <div style={{ fontSize: "0.85rem", opacity: 0.8 }}>Worth ₹{myPortfolio.totalValue.toLocaleString()}</div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 350px", gap: "30px" }}>
          {/* Left Panel */}
          <div>
            {/* Tabs */}
            <div style={{ marginBottom: "30px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
              {[
                { id: "buy", label: "Buy Credits", icon: ShoppingCart },
                { id: "sell", label: "Sell Credits", icon: DollarSign },
                { id: "portfolio", label: "My Portfolio", icon: Package },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as "buy" | "sell" | "portfolio")}
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

            {/* Buy Tab */}
            {activeTab === "buy" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {marketListings.map((listing, index) => (
                  <motion.div
                    key={listing.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="card"
                    style={{ padding: "24px" }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                          <h3 style={{ fontSize: "1.2rem", fontWeight: "800", color: "var(--neutral-900)" }}>
                            {listing.seller}
                          </h3>
                          {listing.verified && (
                            <div
                              style={{
                                padding: "4px 8px",
                                borderRadius: "6px",
                                background: "var(--success)",
                                color: "white",
                                fontSize: "0.7rem",
                                fontWeight: "600",
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                              }}
                            >
                              <CheckCircle size={12} />
                              Verified
                            </div>
                          )}
                          <div
                            style={{
                              padding: "4px 8px",
                              borderRadius: "6px",
                              background:
                                listing.category === "Premium"
                                  ? "var(--accent-500)"
                                  : listing.category === "Standard"
                                  ? "var(--primary-600)"
                                  : "var(--neutral-400)",
                              color: "white",
                              fontSize: "0.7rem",
                              fontWeight: "600",
                            }}
                          >
                            {listing.category}
                          </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.9rem", color: "var(--neutral-600)" }}>
                          <Star size={14} style={{ color: "var(--accent-500)", fill: "var(--accent-500)" }} />
                          <span style={{ fontWeight: "600" }}>{listing.sellerRating}</span>
                          <span>•</span>
                          <Clock size={14} />
                          <span>Expires in {listing.expiryDays} days</span>
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: "2rem", fontWeight: "800", color: "var(--primary-600)", marginBottom: "4px" }}>
                          ₹{listing.pricePerCredit}
                        </div>
                        <div style={{ fontSize: "0.85rem", color: "var(--neutral-600)" }}>per credit</div>
                      </div>
                    </div>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: "12px",
                        padding: "16px",
                        borderRadius: "12px",
                        background: "var(--neutral-100)",
                        marginBottom: "16px",
                      }}
                    >
                      <div>
                        <div style={{ fontSize: "0.85rem", color: "var(--neutral-600)", marginBottom: "4px" }}>Credits Available</div>
                        <div style={{ fontSize: "1.3rem", fontWeight: "800", color: "var(--neutral-900)" }}>
                          {listing.credits}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: "0.85rem", color: "var(--neutral-600)", marginBottom: "4px" }}>Total Price</div>
                        <div style={{ fontSize: "1.3rem", fontWeight: "800", color: "var(--accent-600)" }}>
                          ₹{listing.totalPrice.toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: "0.85rem", color: "var(--neutral-600)", marginBottom: "4px" }}>CO₂ Offset</div>
                        <div style={{ fontSize: "1.3rem", fontWeight: "800", color: "var(--success)" }}>
                          {listing.co2Equivalent}kg
                        </div>
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: "12px" }}>
                      <button
                        style={{
                          flex: 1,
                          padding: "12px",
                          borderRadius: "8px",
                          border: "2px solid var(--primary-600)",
                          background: "white",
                          color: "var(--primary-700)",
                          fontWeight: "600",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                        onClick={() => setSelectedCredit(listing)}
                      >
                        View Details
                      </button>
                      <button
                        style={{
                          flex: 1,
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
                      >
                        <ShoppingCart size={18} />
                        Buy Now
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Sell Tab */}
            {activeTab === "sell" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card" style={{ padding: "30px" }}>
                <h2 style={{ fontSize: "1.5rem", fontWeight: "800", marginBottom: "20px", color: "var(--neutral-900)" }}>
                  List Your Carbon Credits
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  <div>
                    <label style={{ display: "block", fontWeight: "600", marginBottom: "8px", color: "var(--neutral-700)" }}>
                      Number of Credits
                    </label>
                    <input
                      type="number"
                      placeholder="Enter amount"
                      style={{
                        width: "100%",
                        padding: "12px",
                        border: "2px solid var(--neutral-200)",
                        borderRadius: "8px",
                        fontSize: "1rem",
                      }}
                    />
                    <div style={{ fontSize: "0.85rem", color: "var(--neutral-600)", marginTop: "6px" }}>
                      Available: {myPortfolio.totalCredits} credits
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontWeight: "600", marginBottom: "8px", color: "var(--neutral-700)" }}>
                      Price Per Credit (₹)
                    </label>
                    <input
                      type="number"
                      placeholder="Enter price"
                      style={{
                        width: "100%",
                        padding: "12px",
                        border: "2px solid var(--neutral-200)",
                        borderRadius: "8px",
                        fontSize: "1rem",
                      }}
                    />
                    <div style={{ fontSize: "0.85rem", color: "var(--neutral-600)", marginTop: "6px" }}>
                      Market average: ₹{marketStats.avgPrice}
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontWeight: "600", marginBottom: "8px", color: "var(--neutral-700)" }}>
                      Listing Duration
                    </label>
                    <select
                      style={{
                        width: "100%",
                        padding: "12px",
                        border: "2px solid var(--neutral-200)",
                        borderRadius: "8px",
                        fontSize: "1rem",
                      }}
                    >
                      <option>30 days</option>
                      <option>60 days</option>
                      <option>90 days</option>
                    </select>
                  </div>

                  <div
                    style={{
                      padding: "16px",
                      borderRadius: "12px",
                      background: "var(--primary-50)",
                      border: "2px solid var(--primary-200)",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                      <span style={{ color: "var(--neutral-700)" }}>Estimated Earnings</span>
                      <span style={{ fontWeight: "800", fontSize: "1.2rem", color: "var(--primary-700)" }}>₹0</span>
                    </div>
                    <div style={{ fontSize: "0.85rem", color: "var(--neutral-600)" }}>Platform fee: 2.5%</div>
                  </div>

                  <button
                    style={{
                      padding: "14px",
                      borderRadius: "8px",
                      border: "none",
                      background: "var(--gradient-primary)",
                      color: "white",
                      fontWeight: "600",
                      fontSize: "1rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                    }}
                  >
                    <DollarSign size={20} />
                    Create Listing
                  </button>
                </div>
              </motion.div>
            )}

            {/* Portfolio Tab */}
            {activeTab === "portfolio" && (
              <div>
                {/* Portfolio Summary */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card"
                  style={{
                    padding: "30px",
                    marginBottom: "20px",
                    background: "var(--gradient-primary)",
                    color: "white",
                  }}
                >
                  <h2 style={{ fontSize: "1.5rem", fontWeight: "800", marginBottom: "20px" }}>Portfolio Summary</h2>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}>
                    <div>
                      <div style={{ fontSize: "0.9rem", opacity: 0.9, marginBottom: "8px" }}>Total Credits</div>
                      <div style={{ fontSize: "2.5rem", fontWeight: "800" }}>{myPortfolio.totalCredits}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: "0.9rem", opacity: 0.9, marginBottom: "8px" }}>Portfolio Value</div>
                      <div style={{ fontSize: "2.5rem", fontWeight: "800" }}>₹{myPortfolio.totalValue.toLocaleString()}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: "0.9rem", opacity: 0.9, marginBottom: "8px" }}>CO₂ Offset</div>
                      <div style={{ fontSize: "1.8rem", fontWeight: "800" }}>{myPortfolio.totalCo2Offset}kg</div>
                    </div>
                    <div>
                      <div style={{ fontSize: "0.9rem", opacity: 0.9, marginBottom: "8px" }}>Monthly Growth</div>
                      <div style={{ fontSize: "1.8rem", fontWeight: "800", display: "flex", alignItems: "center", gap: "6px" }}>
                        <ArrowUpRight size={24} />
                        +{myPortfolio.monthlyGrowth}%
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Transaction History */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                  <h3 style={{ fontSize: "1.3rem", fontWeight: "800", marginBottom: "16px", color: "var(--neutral-900)" }}>
                    Recent Transactions
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {transactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="card"
                        style={{
                          padding: "20px",
                          display: "flex",
                          alignItems: "center",
                          gap: "16px",
                        }}
                      >
                        <div
                          style={{
                            width: "48px",
                            height: "48px",
                            borderRadius: "12px",
                            background:
                              transaction.type === "earn"
                                ? "var(--primary-100)"
                                : transaction.type === "buy"
                                ? "var(--accent-100)"
                                : "var(--success)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {transaction.type === "earn" && <Zap size={24} style={{ color: "var(--primary-600)" }} />}
                          {transaction.type === "buy" && <ShoppingCart size={24} style={{ color: "var(--accent-600)" }} />}
                          {transaction.type === "sell" && <DollarSign size={24} style={{ color: "white" }} />}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: "700", fontSize: "1rem", marginBottom: "4px", color: "var(--neutral-900)" }}>
                            {transaction.type === "earn" && "Credits Earned"}
                            {transaction.type === "buy" && "Credits Purchased"}
                            {transaction.type === "sell" && "Credits Sold"}
                          </div>
                          <div style={{ fontSize: "0.85rem", color: "var(--neutral-600)" }}>
                            {transaction.credits} credits • {transaction.date}
                          </div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div
                            style={{
                              fontSize: "1.3rem",
                              fontWeight: "800",
                              color:
                                transaction.type === "sell" || transaction.type === "earn"
                                  ? "var(--success)"
                                  : "var(--error)",
                            }}
                          >
                            {transaction.type === "sell" || transaction.type === "earn" ? "+" : "-"}₹
                            {transaction.amount.toLocaleString()}
                          </div>
                          <div
                            style={{
                              fontSize: "0.75rem",
                              padding: "4px 8px",
                              borderRadius: "6px",
                              background:
                                transaction.status === "completed"
                                  ? "var(--success)"
                                  : transaction.status === "pending"
                                  ? "var(--accent-500)"
                                  : "var(--error)",
                              color: "white",
                              fontWeight: "600",
                              display: "inline-block",
                              marginTop: "4px",
                            }}
                          >
                            {transaction.status}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Quick Actions */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="card" style={{ padding: "20px" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: "800", marginBottom: "16px", color: "var(--neutral-900)" }}>
                Quick Actions
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <button
                  style={{
                    padding: "12px",
                    borderRadius: "8px",
                    border: "none",
                    background: "var(--gradient-primary)",
                    color: "white",
                    fontWeight: "600",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    justifyContent: "center",
                  }}
                  onClick={() => (window.location.href = "/bin-finder/ewaste-products")}
                >
                  <Leaf size={18} />
                  Recycle & Earn Credits
                </button>
                <button
                  style={{
                    padding: "12px",
                    borderRadius: "8px",
                    border: "2px solid var(--neutral-200)",
                    background: "white",
                    color: "var(--neutral-700)",
                    fontWeight: "600",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    justifyContent: "center",
                  }}
                >
                  <TrendingUp size={18} />
                  View Market Trends
                </button>
              </div>
            </motion.div>

            {/* Market Insights */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="card"
              style={{ padding: "20px" }}
            >
              <h3 style={{ fontSize: "1.2rem", fontWeight: "800", marginBottom: "16px", color: "var(--neutral-900)" }}>
                💡 Market Insights
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div
                  style={{
                    padding: "16px",
                    borderRadius: "12px",
                    background: "var(--primary-50)",
                    border: "1px solid var(--primary-200)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                    <TrendingUp size={16} style={{ color: "var(--success)" }} />
                    <span style={{ fontWeight: "700", fontSize: "0.9rem", color: "var(--primary-700)" }}>Price Rising</span>
                  </div>
                  <p style={{ fontSize: "0.85rem", color: "var(--neutral-700)", lineHeight: "1.5" }}>
                    Credits are up 3.2% in the last 24 hours. Consider selling if you have surplus.
                  </p>
                </div>

                <div
                  style={{
                    padding: "16px",
                    borderRadius: "12px",
                    background: "var(--accent-50)",
                    border: "1px solid var(--accent-200)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                    <AlertCircle size={16} style={{ color: "var(--accent-600)" }} />
                    <span style={{ fontWeight: "700", fontSize: "0.9rem", color: "var(--accent-700)" }}>High Demand</span>
                  </div>
                  <p style={{ fontSize: "0.85rem", color: "var(--neutral-700)", lineHeight: "1.5" }}>
                    Premium verified credits are selling 40% faster this week.
                  </p>
                </div>

                <div
                  style={{
                    padding: "16px",
                    borderRadius: "12px",
                    background: "var(--primary-50)",
                    border: "1px solid var(--primary-200)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                    <Leaf size={16} style={{ color: "var(--success)" }} />
                    <span style={{ fontWeight: "700", fontSize: "0.9rem", color: "var(--primary-700)" }}>Eco Tip</span>
                  </div>
                  <p style={{ fontSize: "0.85rem", color: "var(--neutral-700)", lineHeight: "1.5" }}>
                    Recycle 5 more items to unlock bonus credits this month!
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Top Sellers */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="card"
              style={{ padding: "20px" }}
            >
              <h3 style={{ fontSize: "1.2rem", fontWeight: "800", marginBottom: "16px", color: "var(--neutral-900)" }}>
                ⭐ Top Sellers
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {marketListings.slice(0, 3).map((listing, idx) => (
                  <div key={listing.id} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ fontSize: "1.2rem", width: "24px" }}>
                      {idx === 0 ? "🥇" : idx === 1 ? "🥈" : "🥉"}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: "600", fontSize: "0.9rem", marginBottom: "2px", color: "var(--neutral-900)" }}>
                        {listing.seller}
                      </div>
                      <div style={{ fontSize: "0.8rem", color: "var(--neutral-600)" }}>
                        <Star size={12} style={{ color: "var(--accent-500)", fill: "var(--accent-500)" }} /> {listing.sellerRating}
                      </div>
                    </div>
                    <div style={{ fontSize: "0.9rem", fontWeight: "700", color: "var(--primary-600)" }}>
                      {listing.credits} credits
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
