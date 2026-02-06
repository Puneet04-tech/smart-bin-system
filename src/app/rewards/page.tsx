"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AIRecommendations } from "@/components/AIRecommendations";
import { 
  Trophy, 
  Star, 
  Target, 
  Award, 
  TrendingUp, 
  Gift, 
  Zap, 
  Leaf,
  Users,
  Crown,
  Medal,
  Gem,
  Flame,
  Calendar,
  MapPin,
  Smartphone,
  Battery,
  ShoppingCart,
  Coffee,
  Ticket,
  ChevronRight,
  Lock,
  Unlock,
  CheckCircle,
  Share2,
  Menu,
  X,
  Home,
  Monitor,
  Shield
} from "lucide-react";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  level: string;
  points: number;
  totalRecycled: number;
  co2Saved: number;
  joinDate: string;
  streak: number;
  recentActivity: Array<{
    item: string;
    points: number;
    time: string;
  }>;
  unlockedAchievements: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: number;
  rarity: string;
  unlocked: boolean;
  unlockedDate?: string;
  progress?: number;
}

interface Reward {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  category: string;
  partner: string;
  claimed?: boolean;
}

// Helper function to get icon component
const getIconComponent = (iconName: string) => {
  const icons: { [key: string]: React.ReactNode } = {
    'Trophy': <Trophy className="w-6 h-6" />,
    'Zap': <Zap className="w-6 h-6" />,
    'Award': <Award className="w-6 h-6" />,
    'Leaf': <Leaf className="w-6 h-6" />,
    'Flame': <Flame className="w-6 h-6" />,
    'Crown': <Crown className="w-6 h-6" />,
    'Target': <Target className="w-6 h-6" />,
    'Smartphone': <Smartphone className="w-6 h-6" />,
    'Battery': <Battery className="w-6 h-6" />,
    'MapPin': <MapPin className="w-6 h-6" />,
  };
  return icons[iconName] || <Trophy className="w-6 h-6" />;
};

const levelColors = {
  bronze: "bg-amber-100 text-amber-800 border-amber-200",
  silver: "bg-gray-100 text-gray-800 border-gray-200",
  gold: "bg-yellow-100 text-yellow-800 border-yellow-200",
  platinum: "bg-purple-100 text-purple-800 border-purple-200"
};

const levelIcons = {
  bronze: <Medal className="w-5 h-5" />,
  silver: <Award className="w-5 h-5" />,
  gold: <Crown className="w-5 h-5" />,
  platinum: <Gem className="w-5 h-5" />
};

export default function RewardsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);

  const userProfile: UserProfile = {
    id: "usr_2847xm9p",
    name: "Eco Warrior",
    email: "user@smartbin.com",
    level: "gold",
    points: 2840,
    totalRecycled: 156,
    co2Saved: 390,
    joinDate: "2024-01-15",
    streak: 7,
    recentActivity: [
      { item: "E-Waste Bin Deposit", points: 150, time: "2h ago" },
      { item: "Battery Recycling", points: 80, time: "1d ago" },
      { item: "Mobile Phone Recycled", points: 200, time: "3d ago" }
    ],
    unlockedAchievements: 8
  };

  const achievements: Achievement[] = [
    {
      id: "ach-1",
      title: "First Steps",
      description: "Complete your first recycling transaction",
      icon: "Leaf",
      points: 100,
      rarity: "common",
      unlocked: true,
      unlockedDate: "2024-01-20",
      progress: 100
    },
    {
      id: "ach-2",
      title: "Eco Warrior",
      description: "Recycle 50 items",
      icon: "Award",
      points: 500,
      rarity: "rare",
      unlocked: true,
      unlockedDate: "2024-02-10",
      progress: 100
    },
    {
      id: "ach-3",
      title: "Green Champion",
      description: "Recycle 100 items",
      icon: "Trophy",
      points: 1000,
      rarity: "epic",
      unlocked: false,
      progress: 80
    },
    {
      id: "ach-4",
      title: "Streak Master",
      description: "Maintain a 7-day streak",
      icon: "Flame",
      points: 300,
      rarity: "uncommon",
      unlocked: true,
      unlockedDate: "2024-02-25",
      progress: 100
    },
    {
      id: "ach-5",
      title: "Tech Recycler",
      description: "Recycle 10 electronic items",
      icon: "Smartphone",
      points: 400,
      rarity: "uncommon",
      unlocked: false,
      progress: 60
    },
    {
      id: "ach-6",
      title: "Community Leader",
      description: "Refer 5 friends",
      icon: "Crown",
      points: 600,
      rarity: "rare",
      unlocked: false,
      progress: 40
    }
  ];

  const rewards: Reward[] = [
    {
      id: "reward-1",
      title: "₹500 Amazon Voucher",
      description: "Shop sustainable products on Amazon",
      pointsCost: 2500,
      category: "shopping",
      partner: "Amazon",
      claimed: false
    },
    {
      id: "reward-2",
      title: "₹300 Flipkart Gift Card",
      description: "Get a Flipkart gift card for your eco-friendly purchases",
      pointsCost: 1500,
      category: "shopping",
      partner: "Flipkart",
      claimed: false
    },
    {
      id: "reward-3",
      title: "Plant 10 Trees",
      description: "We will plant 10 trees in your name through our NGO partners",
      pointsCost: 1000,
      category: "environment",
      partner: "GreenEarth Foundation",
      claimed: false
    },
    {
      id: "reward-4",
      title: "Free E-Waste Pickup",
      description: "Schedule a free home pickup for your e-waste",
      pointsCost: 500,
      category: "service",
      partner: "SmartBin",
      claimed: false
    },
    {
      id: "reward-5",
      title: "₹200 Swiggy Voucher",
      description: "Order food from eco-friendly restaurants",
      pointsCost: 1000,
      category: "food",
      partner: "Swiggy",
      claimed: false
    },
    {
      id: "reward-6",
      title: "Movie Tickets (2x)",
      description: "Enjoy a movie with a friend at PVR Cinemas",
      pointsCost: 800,
      category: "entertainment",
      partner: "BookMyShow",
      claimed: false
    }
  ];

  const handleClaimReward = (rewardId: string) => {
    const reward = rewards.find(r => r.id === rewardId);
    if (!reward) return;

    if (userProfile.points < reward.pointsCost) {
      toast.error("Insufficient Points", {
        description: "You don't have enough points to claim this reward!",
      });
      return;
    }

    toast.success("Reward Claimed!", {
      description: `Successfully claimed ${reward.title}! Check your email for redemption details.`,
    });
  };

  const handleShareAchievement = () => {
    const shareData = {
      title: 'My E-Waste Recycling Impact 🌱',
      text: `I've recycled ${userProfile.totalRecycled} items and saved ${userProfile.co2Saved}kg of CO₂! Join me in making a difference with Smart E-Waste Bin System. #EcoWarrior #Recycling #Sustainability`,
      url: window.location.href
    };

    if (navigator.share) {
      navigator.share(shareData)
        .then(() => {
          toast.success("Shared Successfully!", {
            description: "Thank you for spreading the word!",
          });
        })
        .catch(() => {
          copyToClipboard(shareData.text);
        });
    } else {
      copyToClipboard(shareData.text);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast.success("Copied to Clipboard!", {
          description: "Achievement text copied. Share it on your social media!",
        });
      })
      .catch(() => {
        toast.error("Copy Failed", {
          description: "Unable to copy. Please try again.",
        });
      });
  };

  const getNextLevel = (currentLevel: string) => {
    const levels = ["bronze", "silver", "gold", "platinum"];
    const currentIndex = levels.indexOf(currentLevel.toLowerCase());
    return currentIndex < levels.length - 1 ? levels[currentIndex + 1] : null;
  };

  const getLevelProgress = (points: number, level: string) => {
    const thresholds = { bronze: 0, silver: 1000, gold: 2500, platinum: 5000 };
    const currentThreshold = thresholds[level.toLowerCase() as keyof typeof thresholds];
    const nextLevel = getNextLevel(level);
    
    if (!nextLevel) return 100;
    
    const nextThreshold = thresholds[nextLevel as keyof typeof thresholds];
    const progress = ((points - currentThreshold) / (nextThreshold - currentThreshold)) * 100;
    return Math.min(progress, 100);
  };

  return (
    <div className="page-gradient-blue">
      {/* Navigation */}
      <nav style={{ 
        position: 'sticky', 
        top: 0, 
        zIndex: 50, 
        backgroundColor: 'rgba(255, 255, 255, 0.9)', 
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #e5e7eb',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '64px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)', 
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Trophy className="w-6 h-6" style={{ color: 'white' }} />
              </div>
              <span style={{ 
                fontSize: '20px', 
                fontWeight: 'bold', 
                background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Rewards & Achievements
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <ThemeToggle />
              <Button 
                variant="ghost" 
                onClick={() => window.history.back()}
                style={{ padding: '8px 16px', borderRadius: '8px' }}
                className="desktop-only"
              >
                Back
              </Button>
              <button 
                className="mobile-nav-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
                style={{ background: 'none', border: 'none', color: '#16a34a', cursor: 'pointer', padding: '8px' }}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
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

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 24px' }}>
        {/* User Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: '32px' }}
        >
          <Card style={{ 
            background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)', 
            color: 'white',
            border: 'none',
            boxShadow: '0 20px 40px rgba(16, 185, 129, 0.3)'
          }}>
            <CardContent style={{ padding: '32px' }}>
              <div style={{ 
                display: 'flex', 
                flexDirection: 'row',
                alignItems: 'flex-start',
                gap: '24px',
                flexWrap: 'wrap'
              }}>
                <Avatar style={{ width: '96px', height: '96px', border: '4px solid rgba(255,255,255,0.3)' }}>
                  <AvatarFallback style={{ fontSize: '24px', background: 'rgba(255,255,255,0.2)' }}>
                    {userProfile.name.split(' ').map((n: string) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>{userProfile.name}</h1>
                  <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '16px' }}>{userProfile.email}</p>
                  
                  <div style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    justifyContent: 'flex-start',
                    gap: '16px',
                    marginBottom: '20px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.2)', padding: '6px 12px', borderRadius: '8px' }}>
                      {levelIcons[userProfile.level.toLowerCase() as keyof typeof levelIcons]}
                      <span style={{ textTransform: 'capitalize' }}>{userProfile.level} Level</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.2)', padding: '6px 12px', borderRadius: '8px' }}>
                      <Flame className="w-5 h-5" />
                      <span>{userProfile.streak} day streak</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.2)', padding: '6px 12px', borderRadius: '8px' }}>
                      <Calendar className="w-5 h-5" />
                      <span>Joined {userProfile.joinDate}</span>
                    </div>
                  </div>
                  
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                    gap: '16px'
                  }}>
                    <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.15)', padding: '16px', borderRadius: '12px' }}>
                      <p style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '4px' }}>{userProfile.points.toLocaleString()}</p>
                      <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px' }}>Points</p>
                    </div>
                    <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.15)', padding: '16px', borderRadius: '12px' }}>
                      <p style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '4px' }}>{userProfile.totalRecycled}</p>
                      <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px' }}>Items Recycled</p>
                    </div>
                    <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.15)', padding: '16px', borderRadius: '12px' }}>
                      <p style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '4px' }}>{userProfile.co2Saved}kg</p>
                      <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px' }}>CO₂ Saved</p>
                    </div>
                    <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.15)', padding: '16px', borderRadius: '12px' }}>
                      <p style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '4px' }}>{userProfile.unlockedAchievements}</p>
                      <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px' }}>Achievements</p>
                    </div>
                  </div>

                  {/* Share Button */}
                  <Button
                    onClick={handleShareAchievement}
                    style={{
                      marginTop: '20px',
                      background: 'white',
                      color: '#10b981',
                      fontWeight: '600',
                      padding: '12px 24px',
                      borderRadius: '12px',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.2)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                    }}
                  >
                    <Share2 className="w-5 h-5" />
                    Share My Impact
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Level Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ marginBottom: '32px' }}
        >
          <Card style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <CardHeader>
              <CardTitle style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <TrendingUp className="w-5 h-5" style={{ color: '#10b981' }} />
                <span>Level Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: '600', fontSize: '16px', textTransform: 'capitalize' }}>{userProfile.level}</span>
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>
                    {getNextLevel(userProfile.level) ? `Next: ${getNextLevel(userProfile.level)}` : "Max Level"}
                  </span>
                </div>
                <Progress value={getLevelProgress(userProfile.points, userProfile.level)} style={{ height: '12px' }} />
                <p style={{ fontSize: '14px', color: '#6b7280' }}>
                  {userProfile.points.toLocaleString()} points
                  {getNextLevel(userProfile.level) && ` • ${2500 - userProfile.points} points to next level`}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} style={{ marginTop: '24px' }}>
          <TabsList style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)',
            width: '100%',
            background: 'white',
            padding: '4px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <TabsTrigger value="overview" style={{ borderRadius: '8px', padding: '12px' }}>Overview</TabsTrigger>
            <TabsTrigger value="achievements" style={{ borderRadius: '8px', padding: '12px' }}>Achievements</TabsTrigger>
            <TabsTrigger value="rewards" style={{ borderRadius: '8px', padding: '12px' }}>Rewards</TabsTrigger>
            <TabsTrigger value="ai-insights" style={{ borderRadius: '8px', padding: '12px' }}>AI Insights</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" style={{ marginTop: '24px' }}>
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px'
            }}>
              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card style={{ height: '100%', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your latest recycling actions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {[
                        { item: "iPhone 12", points: 450, time: "2 hours ago", icon: Smartphone },
                        { item: "Laptop Battery", points: 85, time: "1 day ago", icon: Battery },
                        { item: "Charger", points: 25, time: "3 days ago", icon: Zap }
                      ].map((activity, index) => {
                        const Icon = activity.icon;
                        return (
                          <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: '#f9fafb', borderRadius: '12px' }}>
                            <div style={{ 
                              width: '40px', 
                              height: '40px', 
                              background: '#d1fae5', 
                              borderRadius: '10px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              <Icon className="w-5 h-5" style={{ color: '#10b981' }} />
                            </div>
                            <div style={{ flex: 1 }}>
                              <p style={{ fontWeight: '600', marginBottom: '4px' }}>Recycled {activity.item}</p>
                              <p style={{ fontSize: '14px', color: '#6b7280' }}>{activity.time}</p>
                            </div>
                            <Badge style={{ background: '#d1fae5', color: '#047857', border: 'none', padding: '4px 12px', borderRadius: '8px' }}>
                              +{activity.points} pts
                            </Badge>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Leaderboard */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card style={{ height: '100%', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                  <CardHeader>
                    <CardTitle style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Users className="w-5 h-5" />
                      <span>Leaderboard</span>
                    </CardTitle>
                    <CardDescription>Top recyclers this month</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {[
                        { rank: 1, name: "Sarah Chen", points: 5230, change: "up" },
                        { rank: 2, name: "Mike Johnson", points: 4890, change: "up" },
                        { rank: 3, name: "Alex Johnson (You)", points: 2840, change: "up" }
                      ].map((user, index) => (
                        <div 
                          key={index} 
                          style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '12px',
                            padding: '12px',
                            background: user.name.includes("You") ? '#ecfdf5' : '#f9fafb',
                            borderRadius: '12px',
                            border: user.name.includes("You") ? '2px solid #10b981' : 'none'
                          }}
                        >
                          <div style={{ 
                            width: '40px',
                            height: '40px',
                            background: index === 0 ? 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)' : 
                                       index === 1 ? 'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)' : 
                                       'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '18px'
                          }}>
                            {user.rank}
                          </div>
                          <div style={{ flex: 1 }}>
                            <p style={{ fontWeight: '600', marginBottom: '2px' }}>{user.name}</p>
                            <p style={{ fontSize: '14px', color: '#6b7280' }}>{user.points.toLocaleString()} points</p>
                          </div>
                          <TrendingUp style={{ color: '#10b981', width: '20px', height: '20px' }} />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" style={{ marginTop: '24px' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '20px'
              }}>
                {achievements.map((achievement, index) => {
                  const rarityColors: { [key: string]: string } = {
                    common: '#9ca3af',
                    uncommon: '#10b981',
                    rare: '#3b82f6',
                    epic: '#8b5cf6',
                    legendary: '#f59e0b'
                  };
                  const rarityBg: { [key: string]: string } = {
                    common: '#f3f4f6',
                    uncommon: '#d1fae5',
                    rare: '#dbeafe',
                    epic: '#ede9fe',
                    legendary: '#fef3c7'
                  };
                  
                  return (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card style={{ 
                      height: '100%',
                      boxShadow: achievement.unlocked ? '0 4px 20px rgba(16, 185, 129, 0.2)' : '0 4px 12px rgba(0,0,0,0.1)',
                      background: achievement.unlocked ? 'linear-gradient(135deg, #ecfdf5 0%, #ffffff 100%)' : '#f9fafb',
                      border: achievement.unlocked ? '2px solid #10b981' : '1px solid #e5e7eb',
                      position: 'relative',
                      overflow: 'hidden'
                    }}>
                      {achievement.unlocked && (
                        <div style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          background: '#10b981',
                          color: 'white',
                          padding: '4px 8px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '600',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}>
                          <CheckCircle style={{ width: '14px', height: '14px' }} />
                          Unlocked
                        </div>
                      )}
                      <CardContent style={{ padding: '24px', textAlign: 'center' }}>
                        <div style={{
                          width: '64px',
                          height: '64px',
                          margin: '0 auto 16px',
                          background: achievement.unlocked ? 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)' : '#e5e7eb',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: achievement.unlocked ? 'white' : '#9ca3af'
                        }}>
                          {getIconComponent(achievement.icon)}
                        </div>
                        <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px', color: achievement.unlocked ? '#047857' : '#6b7280' }}>
                          {achievement.title}
                        </h3>
                        <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '12px' }}>
                          {achievement.description}
                        </p>
                        {typeof achievement.progress === 'number' && achievement.progress > 0 && achievement.progress < 100 && (
                          <div style={{ marginTop: '12px' }}>
                            <Progress value={achievement.progress} style={{ height: '8px' }} />
                            <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                              {achievement.progress}% complete
                            </p>
                          </div>
                        )}
                        <Badge style={{
                          marginTop: '12px',
                          background: rarityBg[achievement.rarity] || '#f3f4f6',
                          color: rarityColors[achievement.rarity] || '#6b7280',
                          border: 'none',
                          padding: '6px 12px',
                          textTransform: 'capitalize'
                        }}>
                          <Star style={{ width: '14px', height: '14px', marginRight: '4px' }} />
                          {achievement.rarity} • {achievement.points} points
                        </Badge>
                        {achievement.unlocked && achievement.unlockedDate && (
                          <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '8px' }}>
                            Unlocked {new Date(achievement.unlockedDate).toLocaleDateString()}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </TabsContent>

          {/* Rewards Tab */}
          <TabsContent value="rewards" style={{ marginTop: '24px' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div style={{ marginBottom: '24px', textAlign: 'center' }}>
                <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>Redeem Your Points</h3>
                <p style={{ color: '#6b7280' }}>You have {userProfile.points.toLocaleString()} points available</p>
              </div>
              
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '24px'
              }}>
                {rewards.map((reward, index) => {
                  const canClaim = userProfile.points >= reward.pointsCost && !reward.claimed;
                  
                  return (
                  <motion.div
                    key={reward.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card style={{ 
                      height: '100%',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      position: 'relative',
                      overflow: 'hidden'
                    }}>
                      {reward.claimed && (
                        <div style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          background: '#10b981',
                          color: 'white',
                          padding: '4px 8px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '600',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          zIndex: 10
                        }}>
                          <CheckCircle style={{ width: '12px', height: '12px' }} />
                          Claimed
                        </div>
                      )}
                      <div style={{ 
                        height: '160px', 
                        background: `linear-gradient(135deg, ${index % 3 === 0 ? '#10b981' : index % 3 === 1 ? '#3b82f6' : '#f59e0b'} 0%, ${index % 3 === 0 ? '#059669' : index % 3 === 1 ? '#2563eb' : '#d97706'} 100%)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative'
                      }}>
                        <Gift style={{ width: '64px', height: '64px', color: 'white', opacity: 0.9 }} />
                      </div>
                      <CardHeader style={{ padding: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div>
                            <CardTitle style={{ fontSize: '18px', marginBottom: '4px' }}>{reward.title}</CardTitle>
                            <CardDescription style={{ fontSize: '14px' }}>{reward.description}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent style={{ padding: '0 16px 16px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Badge variant="outline" style={{ padding: '4px 8px', textTransform: 'capitalize' }}>{reward.category}</Badge>
                            <span style={{ fontSize: '14px', color: '#6b7280' }}>{reward.partner}</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <Zap style={{ width: '16px', height: '16px', color: '#10b981' }} />
                              <span style={{ fontWeight: '700', fontSize: '18px', color: '#111827' }}>{reward.pointsCost} points</span>
                            </div>
                            <Button 
                              size="sm" 
                              disabled={!canClaim}
                              onClick={() => handleClaimReward(reward.id)}
                              style={{ 
                                background: canClaim ? 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)' : '#e5e7eb',
                                color: canClaim ? 'white' : '#9ca3af',
                                border: 'none',
                                padding: '8px 16px',
                                borderRadius: '8px',
                                fontWeight: '600',
                                cursor: canClaim ? 'pointer' : 'not-allowed'
                              }}
                            >
                              {reward.claimed ? 'Claimed' : userProfile.points >= reward.pointsCost ? 'Claim' : 'Need More Points'}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </TabsContent>

          {/* AI Insights Tab */}
          <TabsContent value="ai-insights" style={{ marginTop: '24px' }}>
            <AIRecommendations />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
