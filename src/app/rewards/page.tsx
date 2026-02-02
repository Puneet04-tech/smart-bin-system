"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  Unlock
} from "lucide-react";

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  level: string;
  points: number;
  totalRecycled: number;
  co2Saved: number;
  joinDate: string;
  streak: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  points: number;
  unlocked: boolean;
  unlockedAt?: string;
  progress?: number;
  maxProgress?: number;
}

interface Reward {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  category: string;
  partner: string;
  image: string;
  available: boolean;
  claimed?: boolean;
}

const mockUserProfile: UserProfile = {
  name: "Alex Johnson",
  email: "alex.johnson@email.com",
  avatar: "/api/placeholder/100/100",
  level: "Gold",
  points: 2840,
  totalRecycled: 47,
  co2Saved: 12.5,
  joinDate: "January 2024",
  streak: 12
};

const mockAchievements: Achievement[] = [
  {
    id: "1",
    title: "First Recycler",
    description: "Complete your first e-waste recycling",
    icon: <Trophy className="w-6 h-6" />,
    points: 50,
    unlocked: true,
    unlockedAt: "2024-01-15"
  },
  {
    id: "2",
    title: "Smartphone Specialist",
    description: "Recycle 10 smartphones",
    icon: <Smartphone className="w-6 h-6" />,
    points: 200,
    unlocked: true,
    unlockedAt: "2024-02-20"
  },
  {
    id: "3",
    title: "Eco Warrior",
    description: "Save 10kg of CO2",
    icon: <Leaf className="w-6 h-6" />,
    points: 300,
    unlocked: true,
    unlockedAt: "2024-03-10"
  },
  {
    id: "4",
    title: "Streak Master",
    description: "Maintain a 30-day recycling streak",
    icon: <Flame className="w-6 h-6" />,
    points: 500,
    unlocked: false,
    progress: 12,
    maxProgress: 30
  },
  {
    id: "5",
    title: "Century Club",
    description: "Recycle 100 items total",
    icon: <Target className="w-6 h-6" />,
    points: 1000,
    unlocked: false,
    progress: 47,
    maxProgress: 100
  },
  {
    id: "6",
    title: "Bin Explorer",
    description: "Use 20 different recycling bins",
    icon: <MapPin className="w-6 h-6" />,
    points: 400,
    unlocked: false,
    progress: 8,
    maxProgress: 20
  }
];

const mockRewards: Reward[] = [
  {
    id: "1",
    title: "Coffee Shop Voucher",
    description: "$5 off at Green Bean Coffee",
    pointsCost: 500,
    category: "Food & Drink",
    partner: "Green Bean Coffee",
    image: "/api/placeholder/200/150",
    available: true
  },
  {
    id: "2",
    title: "Eco Store Discount",
    description: "20% off sustainable products",
    pointsCost: 800,
    category: "Shopping",
    partner: "EcoMart",
    image: "/api/placeholder/200/150",
    available: true
  },
  {
    id: "3",
    title: "Tech Store Credit",
    description: "$10 credit at TechZone",
    pointsCost: 1200,
    category: "Electronics",
    partner: "TechZone",
    image: "/api/placeholder/200/150",
    available: true
  },
  {
    id: "4",
    title: "Plant a Tree",
    description: "Contribute to reforestation",
    pointsCost: 2000,
    category: "Environmental",
    partner: "One Tree Planted",
    image: "/api/placeholder/200/150",
    available: false
  },
  {
    id: "5",
    title: "Movie Ticket",
    description: "Free movie ticket at CineMax",
    pointsCost: 1500,
    category: "Entertainment",
    partner: "CineMax",
    image: "/api/placeholder/200/150",
    available: true
  },
  {
    id: "6",
    title: "Public Transport Pass",
    description: "7-day transit pass",
    pointsCost: 3000,
    category: "Transport",
    partner: "City Transit",
    image: "/api/placeholder/200/150",
    available: false
  }
];

const levelColors = {
  Bronze: "bg-amber-100 text-amber-800 border-amber-200",
  Silver: "bg-gray-100 text-gray-800 border-gray-200",
  Gold: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Platinum: "bg-purple-100 text-purple-800 border-purple-200"
};

const levelIcons = {
  Bronze: <Medal className="w-5 h-5" />,
  Silver: <Award className="w-5 h-5" />,
  Gold: <Crown className="w-5 h-5" />,
  Platinum: <Gem className="w-5 h-5" />
};

export default function RewardsPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);

  const getNextLevel = (currentLevel: string) => {
    const levels = ["Bronze", "Silver", "Gold", "Platinum"];
    const currentIndex = levels.indexOf(currentLevel);
    return currentIndex < levels.length - 1 ? levels[currentIndex + 1] : null;
  };

  const getLevelProgress = (points: number) => {
    const thresholds = { Bronze: 0, Silver: 1000, Gold: 2500, Platinum: 5000 };
    const currentThreshold = thresholds[mockUserProfile.level as keyof typeof thresholds];
    const nextLevel = getNextLevel(mockUserProfile.level);
    
    if (!nextLevel) return 100;
    
    const nextThreshold = thresholds[nextLevel as keyof typeof thresholds];
    const progress = ((points - currentThreshold) / (nextThreshold - currentThreshold)) * 100;
    return Math.min(progress, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                Rewards & Achievements
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
        {/* User Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                <Avatar className="w-24 h-24 border-4 border-white/20">
                  <AvatarImage src={mockUserProfile.avatar} alt={mockUserProfile.name} />
                  <AvatarFallback className="text-2xl bg-white/20">
                    {mockUserProfile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl font-bold mb-2">{mockUserProfile.name}</h1>
                  <p className="text-white/80 mb-4">{mockUserProfile.email}</p>
                  
                  <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      {levelIcons[mockUserProfile.level as keyof typeof levelIcons]}
                      <Badge className={`${levelColors[mockUserProfile.level as keyof typeof levelColors]} text-white border-none bg-white/20`}>
                        {mockUserProfile.level} Level
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Flame className="w-5 h-5" />
                      <span>{mockUserProfile.streak} day streak</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5" />
                      <span>Joined {mockUserProfile.joinDate}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold">{mockUserProfile.points.toLocaleString()}</p>
                      <p className="text-white/80 text-sm">Points</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold">{mockUserProfile.totalRecycled}</p>
                      <p className="text-white/80 text-sm">Items Recycled</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold">{mockUserProfile.co2Saved}kg</p>
                      <p className="text-white/80 text-sm">CO₂ Saved</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold">{mockAchievements.filter(a => a.unlocked).length}</p>
                      <p className="text-white/80 text-sm">Achievements</p>
                    </div>
                  </div>
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
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Level Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{mockUserProfile.level}</span>
                  <span className="text-sm text-gray-600">
                    {getNextLevel(mockUserProfile.level) ? `Next: ${getNextLevel(mockUserProfile.level)}` : "Max Level"}
                  </span>
                </div>
                <Progress value={getLevelProgress(mockUserProfile.points)} className="h-3" />
                <p className="text-sm text-gray-600">
                  {mockUserProfile.points.toLocaleString()} points • 
                  {getNextLevel(mockUserProfile.level) && ` ${2500 - mockUserProfile.points} points to next level`}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your latest recycling actions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { item: "iPhone 12", points: 450, time: "2 hours ago", icon: Smartphone },
                        { item: "Laptop Battery", points: 85, time: "1 day ago", icon: Battery },
                        { item: "Charger", points: 25, time: "3 days ago", icon: Zap }
                      ].map((activity, index) => {
                        const Icon = activity.icon;
                        return (
                          <div key={index} className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                              <Icon className="w-5 h-5 text-emerald-600" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">Recycled {activity.item}</p>
                              <p className="text-sm text-gray-600">{activity.time}</p>
                            </div>
                            <Badge className="bg-emerald-100 text-emerald-800">
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
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="w-5 h-5" />
                      <span>Leaderboard</span>
                    </CardTitle>
                    <CardDescription>Top recyclers this month</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { rank: 1, name: "Sarah Chen", points: 5230, change: "up" },
                        { rank: 2, name: "Mike Johnson", points: 4890, change: "up" },
                        { rank: 3, name: "You", points: 2840, change: "same", highlight: true },
                        { rank: 4, name: "Emma Davis", points: 2650, change: "down" },
                        { rank: 5, name: "James Wilson", points: 2420, change: "up" }
                      ].map((user) => (
                        <div key={user.rank} className={`flex items-center space-x-3 p-2 rounded-lg ${user.highlight ? 'bg-emerald-50' : ''}`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                            user.rank === 1 ? 'bg-yellow-500 text-white' :
                            user.rank === 2 ? 'bg-gray-400 text-white' :
                            user.rank === 3 ? 'bg-amber-600 text-white' :
                            'bg-gray-200 text-gray-700'
                          }`}>
                            {user.rank}
                          </div>
                          <div className="flex-1">
                            <p className={`font-medium ${user.highlight ? 'text-emerald-700' : ''}`}>{user.name}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">{user.points.toLocaleString()}</p>
                            <p className="text-xs text-gray-500">points</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockAchievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className={`h-full ${achievement.unlocked ? 'border-emerald-200 bg-emerald-50/50' : 'border-gray-200'}`}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            achievement.unlocked ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-400'
                          }`}>
                            {achievement.icon}
                          </div>
                          <div className="text-right">
                            <Badge className={achievement.unlocked ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600'}>
                              {achievement.unlocked ? 'Unlocked' : 'Locked'}
                            </Badge>
                            <p className="text-sm font-semibold mt-1">+{achievement.points} pts</p>
                          </div>
                        </div>
                        <CardTitle className="text-lg">{achievement.title}</CardTitle>
                        <CardDescription>{achievement.description}</CardDescription>
                      </CardHeader>
                      {achievement.progress && achievement.maxProgress && (
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span>{achievement.progress}/{achievement.maxProgress}</span>
                            </div>
                            <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-2" />
                          </div>
                          {achievement.unlocked && achievement.unlockedAt && (
                            <p className="text-xs text-gray-500 mt-2">
                              Unlocked on {new Date(achievement.unlockedAt).toLocaleDateString()}
                            </p>
                          )}
                        </CardContent>
                      )}
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          {/* Rewards Tab */}
          <TabsContent value="rewards" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockRewards.map((reward, index) => (
                  <motion.div
                    key={reward.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <div className="relative">
                        <div className="h-32 bg-gray-100 rounded-t-lg flex items-center justify-center">
                          <Gift className="w-12 h-12 text-gray-400" />
                        </div>
                        {!reward.available && (
                          <div className="absolute top-2 right-2">
                            <Badge className="bg-red-100 text-red-800">
                              <Lock className="w-3 h-3 mr-1" />
                              Unavailable
                            </Badge>
                          </div>
                        )}
                        {reward.claimed && (
                          <div className="absolute top-2 right-2">
                            <Badge className="bg-green-100 text-green-800">
                              <Unlock className="w-3 h-3 mr-1" />
                              Claimed
                            </Badge>
                          </div>
                        )}
                      </div>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{reward.title}</CardTitle>
                            <CardDescription>{reward.description}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Badge variant="outline">{reward.category}</Badge>
                            <span className="text-sm text-gray-600">{reward.partner}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Zap className="w-4 h-4 text-emerald-600" />
                              <span className="font-semibold">{reward.pointsCost} points</span>
                            </div>
                            <Button 
                              size="sm" 
                              disabled={!reward.available || mockUserProfile.points < reward.pointsCost || reward.claimed}
                              className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700"
                            >
                              {reward.claimed ? 'Claimed' : mockUserProfile.points >= reward.pointsCost ? 'Claim' : 'Insufficient Points'}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
