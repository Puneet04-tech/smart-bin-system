"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  MapPin, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Package,
  DollarSign,
  Leaf,
  Clock,
  Calendar,
  Filter,
  Download,
  Settings,
  Bell,
  Search,
  Eye,
  Edit,
  Trash2,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Truck,
  Wrench,
  Zap,
  Target,
  Award,
  Globe,
  Smartphone,
  Laptop,
  Battery,
  RefreshCw
} from "lucide-react";

interface DashboardStats {
  totalBins: number;
  operationalBins: number;
  totalUsers: number;
  activeUsers: number;
  totalItems: number;
  totalValue: number;
  co2Saved: number;
  alertsCount: number;
}

interface BinData {
  id: string;
  name: string;
  location: string;
  status: "operational" | "maintenance" | "offline" | "full";
  fillLevel: number;
  lastActivity: string;
  totalItems: number;
  value: number;
}

interface Alert {
  id: string;
  type: "maintenance" | "full" | "offline" | "error";
  binId: string;
  binName: string;
  message: string;
  timestamp: string;
  severity: "low" | "medium" | "high" | "critical";
}

interface Transaction {
  id: string;
  userId: string;
  userName: string;
  binId: string;
  binName: string;
  itemType: string;
  value: number;
  points: number;
  timestamp: string;
}

const mockStats: DashboardStats = {
  totalBins: 156,
  operationalBins: 142,
  totalUsers: 12480,
  activeUsers: 3240,
  totalItems: 48920,
  totalValue: 1245600,
  co2Saved: 2450.5,
  alertsCount: 8
};

const mockBins: BinData[] = [
  {
    id: "BIN-001",
    name: "Tech Hub Station A",
    location: "123 Tech Street, NYC",
    status: "operational",
    fillLevel: 65,
    lastActivity: "2 hours ago",
    totalItems: 1240,
    value: 45600
  },
  {
    id: "BIN-002",
    name: "Green Point Center",
    location: "456 Eco Avenue, NYC",
    status: "maintenance",
    fillLevel: 30,
    lastActivity: "1 day ago",
    totalItems: 890,
    value: 32100
  },
  {
    id: "BIN-003",
    name: "Central Tech Recycle",
    location: "789 Innovation Blvd, NYC",
    status: "full",
    fillLevel: 100,
    lastActivity: "30 minutes ago",
    totalItems: 1560,
    value: 67800
  },
  {
    id: "BIN-004",
    name: "Downtown E-Waste Hub",
    location: "321 Sustainability St, NYC",
    status: "offline",
    fillLevel: 45,
    lastActivity: "3 days ago",
    totalItems: 670,
    value: 23400
  }
];

const mockAlerts: Alert[] = [
  {
    id: "ALT-001",
    type: "full",
    binId: "BIN-003",
    binName: "Central Tech Recycle",
    message: "Bin is at 100% capacity and needs immediate emptying",
    timestamp: "30 minutes ago",
    severity: "high"
  },
  {
    id: "ALT-002",
    type: "maintenance",
    binId: "BIN-002",
    binName: "Green Point Center",
    message: "Scheduled maintenance required - sensor calibration",
    timestamp: "2 hours ago",
    severity: "medium"
  },
  {
    id: "ALT-003",
    type: "offline",
    binId: "BIN-004",
    binName: "Downtown E-Waste Hub",
    message: "Bin offline - connectivity issues detected",
    timestamp: "3 hours ago",
    severity: "critical"
  }
];

const mockTransactions: Transaction[] = [
  {
    id: "TXN-001",
    userId: "USR-1234",
    userName: "Alex Johnson",
    binId: "BIN-001",
    binName: "Tech Hub Station A",
    itemType: "smartphone",
    value: 45.00,
    points: 450,
    timestamp: "5 minutes ago"
  },
  {
    id: "TXN-002",
    userId: "USR-5678",
    userName: "Sarah Chen",
    binId: "BIN-003",
    binName: "Central Tech Recycle",
    itemType: "laptop",
    value: 120.00,
    points: 1200,
    timestamp: "15 minutes ago"
  },
  {
    id: "TXN-003",
    userId: "USR-9012",
    userName: "Mike Davis",
    binId: "BIN-001",
    binName: "Tech Hub Station A",
    itemType: "battery",
    value: 8.50,
    points: 85,
    timestamp: "1 hour ago"
  }
];

const wasteTypeIcons = {
  smartphone: Smartphone,
  laptop: Laptop,
  battery: Battery,
  charger: Zap,
  cable: Package,
  monitor: Monitor,
};

const wasteTypeColors = {
  smartphone: "bg-blue-500",
  laptop: "bg-purple-500",
  battery: "bg-green-500",
  charger: "bg-yellow-500",
  cable: "bg-orange-500",
  monitor: "bg-indigo-500",
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedBin, setSelectedBin] = useState<BinData | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational": return "bg-green-100 text-green-800";
      case "maintenance": return "bg-yellow-100 text-yellow-800";
      case "offline": return "bg-red-100 text-red-800";
      case "full": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low": return "bg-blue-100 text-blue-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "high": return "bg-orange-100 text-orange-800";
      case "critical": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "maintenance": return <Wrench className="w-4 h-4" />;
      case "full": return <Package className="w-4 h-4" />;
      case "offline": return <XCircle className="w-4 h-4" />;
      case "error": return <AlertTriangle className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const getFillLevelColor = (level: number) => {
    if (level < 50) return "bg-green-500";
    if (level < 80) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-500">Smart E-Waste Bin Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search bins, users..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                Alerts ({mockStats.alertsCount})
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8"
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-emerald-600" />
                </div>
                <Badge className="bg-emerald-100 text-emerald-800">
                  {((mockStats.operationalBins / mockStats.totalBins) * 100).toFixed(0)}% active
                </Badge>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{mockStats.totalBins}</h3>
              <p className="text-gray-600 text-sm">Total Bins</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <Badge className="bg-blue-100 text-blue-800">
                  {((mockStats.activeUsers / mockStats.totalUsers) * 100).toFixed(0)}% active
                </Badge>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{mockStats.totalUsers.toLocaleString()}</h3>
              <p className="text-gray-600 text-sm">Total Users</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex items-center text-green-600 text-sm">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  12%
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{mockStats.totalItems.toLocaleString()}</h3>
              <p className="text-gray-600 text-sm">Items Recycled</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="flex items-center text-green-600 text-sm">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  8%
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{mockStats.co2Saved.toFixed(1)} kg</h3>
              <p className="text-gray-600 text-sm">CO₂ Saved</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="bins">Bins</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="w-5 h-5" />
                    <span>Recent Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockTransactions.slice(0, 5).map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 ${wasteTypeColors[transaction.itemType as keyof typeof wasteTypeColors]} rounded-lg flex items-center justify-center`}>
                            {React.createElement(wasteTypeIcons[transaction.itemType as keyof typeof wasteTypeIcons], { className: "w-5 h-5 text-white" })}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{transaction.userName}</p>
                            <p className="text-sm text-gray-600">{transaction.itemType} • {transaction.binName}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-emerald-600">${transaction.value.toFixed(2)}</p>
                          <p className="text-xs text-gray-500">{transaction.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* System Health */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>System Health</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Operational Bins</span>
                        <span className="font-medium">{mockStats.operationalBins}/{mockStats.totalBins}</span>
                      </div>
                      <Progress value={(mockStats.operationalBins / mockStats.totalBins) * 100} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Active Users</span>
                        <span className="font-medium">{mockStats.activeUsers}/{mockStats.totalUsers}</span>
                      </div>
                      <Progress value={(mockStats.activeUsers / mockStats.totalUsers) * 100} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">System Uptime</span>
                        <span className="font-medium">99.8%</span>
                      </div>
                      <Progress value={99.8} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Response Time</span>
                        <span className="font-medium">120ms</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Map View */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="w-5 h-5" />
                  <span>Geographic Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Interactive Map View</p>
                    <p className="text-sm text-gray-500">Showing {mockStats.totalBins} bins across the city</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bins Tab */}
          <TabsContent value="bins" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center space-x-2">
                    <Package className="w-5 h-5" />
                    <span>Bin Management</span>
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                    <Button size="sm" className="bg-gradient-to-r from-emerald-500 to-blue-600">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Bin
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Bin ID</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Name</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Location</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Fill Level</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Items</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Value</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockBins.map((bin) => (
                        <tr key={bin.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">{bin.id}</td>
                          <td className="py-3 px-4">{bin.name}</td>
                          <td className="py-3 px-4 text-gray-600">{bin.location}</td>
                          <td className="py-3 px-4">
                            <Badge className={getStatusColor(bin.status)}>
                              {bin.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              <div className="w-16 bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${getFillLevelColor(bin.fillLevel)}`}
                                  style={{ width: `${bin.fillLevel}%` }}
                                />
                              </div>
                              <span className="text-sm">{bin.fillLevel}%</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">{bin.totalItems.toLocaleString()}</td>
                          <td className="py-3 px-4 font-medium">${bin.value.toLocaleString()}</td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Settings className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Alerts Tab */}
          <TabsContent value="alerts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5" />
                  <span>System Alerts</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAlerts.map((alert) => (
                    <div key={alert.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            alert.severity === "critical" ? "bg-red-100" :
                            alert.severity === "high" ? "bg-orange-100" :
                            alert.severity === "medium" ? "bg-yellow-100" :
                            "bg-blue-100"
                          }`}>
                            {getAlertIcon(alert.type)}
                          </div>
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="font-semibold text-gray-900">{alert.binName}</h4>
                              <Badge className={getSeverityColor(alert.severity)}>
                                {alert.severity}
                              </Badge>
                            </div>
                            <p className="text-gray-600 mb-2">{alert.message}</p>
                            <p className="text-sm text-gray-500">{alert.timestamp}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Transactions Tab */}
          <TabsContent value="transactions" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center space-x-2">
                    <DollarSign className="w-5 h-5" />
                    <span>Recent Transactions</span>
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Transaction ID</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">User</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Bin</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Item Type</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Value</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Points</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockTransactions.map((transaction) => (
                        <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">{transaction.id}</td>
                          <td className="py-3 px-4">{transaction.userName}</td>
                          <td className="py-3 px-4 text-gray-600">{transaction.binName}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              <div className={`w-6 h-6 ${wasteTypeColors[transaction.itemType as keyof typeof wasteTypeColors]} rounded flex items-center justify-center`}>
                                {React.createElement(wasteTypeIcons[transaction.itemType as keyof typeof wasteTypeIcons], { className: "w-3 h-3 text-white" })}
                              </div>
                              <span className="capitalize">{transaction.itemType}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 font-medium text-emerald-600">${transaction.value.toFixed(2)}</td>
                          <td className="py-3 px-4 font-medium text-blue-600">{transaction.points}</td>
                          <td className="py-3 px-4 text-gray-600">{transaction.timestamp}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Performance Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5" />
                    <span>Performance Metrics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Performance Chart</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Waste Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5" />
                    <span>Waste Distribution</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Award className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Distribution Chart</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Route Optimization */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Truck className="w-5 h-5" />
                    <span>Collection Routes</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">Route A - Downtown</p>
                        <p className="text-sm text-gray-600">12 bins • 45.2 km</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Optimal</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">Route B - Uptown</p>
                        <p className="text-sm text-gray-600">8 bins • 32.1 km</p>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800">Moderate</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">Route C - Suburbs</p>
                        <p className="text-sm text-gray-600">15 bins • 67.8 km</p>
                      </div>
                      <Badge className="bg-orange-100 text-orange-800">Needs Review</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* User Engagement */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span>User Engagement</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Daily Active Users</span>
                        <span className="font-medium">324</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Weekly Active Users</span>
                        <span className="font-medium">1,892</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Monthly Active Users</span>
                        <span className="font-medium">3,240</span>
                      </div>
                      <Progress value={90} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Add missing imports
import { Monitor } from "lucide-react";
