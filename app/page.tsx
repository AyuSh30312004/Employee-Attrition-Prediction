"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import { Users, TrendingUp, AlertTriangle, Target, Brain, ChevronRight } from "lucide-react"
import { PredictionForm } from "@/components/prediction-form"
import { EmployeeTable } from "@/components/employee-table"

const departmentData = [
  { name: "Sales", attrition: 23, retention: 77 },
  { name: "Engineering", attrition: 12, retention: 88 },
  { name: "Marketing", attrition: 18, retention: 82 },
  { name: "HR", attrition: 15, retention: 85 },
  { name: "Finance", attrition: 8, retention: 92 },
]

const riskFactors = [
  { name: "Low Satisfaction", value: 35, color: "#ef4444" },
  { name: "High Workload", value: 28, color: "#f97316" },
  { name: "Limited Growth", value: 22, color: "#eab308" },
  { name: "Poor Work-Life", value: 15, color: "#0891b2" },
]

const trendData = [
  { month: "Jan", attrition: 12 },
  { month: "Feb", attrition: 15 },
  { month: "Mar", attrition: 18 },
  { month: "Apr", attrition: 14 },
  { month: "May", attrition: 16 },
  { month: "Jun", attrition: 13 },
]

export default function Dashboard() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-600 to-blue-400 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-heading font-bold text-gray-900">AttritionAI</h1>
                <p className="text-sm text-gray-600">Employee Retention Intelligence</p>
              </div>
            </div>
            <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">Export Report</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className={`mb-8 ${isLoaded ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="text-3xl font-heading font-bold text-gray-900 mb-2">
            Welcome to Your Employee Attrition Insights Dashboard
          </h2>
          <p className="text-lg text-gray-600">
            Explore key metrics influencing employee retention and attrition with AI-powered predictions.
          </p>
        </div>

        {/* Key Metrics Cards */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 ${isLoaded ? "animate-slide-in-right" : "opacity-0"}`}
        >
          <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-cyan-600">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Employees</CardTitle>
              <Users className="h-4 w-4 text-cyan-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">1,247</div>
              <p className="text-xs text-green-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +2.5% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-400">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Attrition Rate</CardTitle>
              <AlertTriangle className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">14.2%</div>
              <p className="text-xs text-red-600">-1.2% from last month</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Retention Rate</CardTitle>
              <Target className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">85.8%</div>
              <p className="text-xs text-green-600">+1.2% from last month</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-orange-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">At-Risk Employees</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">89</div>
              <Badge variant="destructive" className="text-xs">
                High Priority
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white border">
            <TabsTrigger value="overview" className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="prediction" className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white">
              AI Prediction
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="employees" className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white">
              Employee Data
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Department Attrition Chart */}
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="font-heading">Department-wise Attrition</CardTitle>
                  <CardDescription>Attrition rates across different departments</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={departmentData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="attrition" fill="#0891b2" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Risk Factors */}
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="font-heading">Top Risk Factors</CardTitle>
                  <CardDescription>Primary reasons for employee attrition</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={riskFactors}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {riskFactors.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Trend Analysis */}
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="font-heading">Attrition Trend</CardTitle>
                <CardDescription>Monthly attrition rate over the past 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="attrition"
                      stroke="#0891b2"
                      strokeWidth={3}
                      dot={{ fill: "#0891b2", strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="prediction">
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="font-heading">Predictive Analytics: Understanding Your Attrition Risks</CardTitle>
                <CardDescription>
                  Use our AI-powered model to predict employee attrition risk based on key factors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PredictionForm />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="font-heading">Retention Strategies Impact</CardTitle>
                  <CardDescription>Effectiveness of different retention initiatives</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Flexible Work Arrangements</span>
                      <span className="text-sm text-green-600">+12% retention</span>
                    </div>
                    <Progress value={85} className="h-2" />

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Professional Development</span>
                      <span className="text-sm text-green-600">+8% retention</span>
                    </div>
                    <Progress value={70} className="h-2" />

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Recognition Programs</span>
                      <span className="text-sm text-green-600">+6% retention</span>
                    </div>
                    <Progress value={60} className="h-2" />

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Competitive Compensation</span>
                      <span className="text-sm text-green-600">+15% retention</span>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="font-heading">Take Action</CardTitle>
                  <CardDescription>Strategies to Improve Retention</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-cyan-50 rounded-lg border-l-4 border-cyan-600">
                    <h4 className="font-semibold text-cyan-900 mb-2">Immediate Actions</h4>
                    <ul className="text-sm text-cyan-800 space-y-1">
                      <li>• Review compensation for at-risk employees</li>
                      <li>• Schedule 1-on-1 meetings with managers</li>
                      <li>• Implement flexible work policies</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                    <h4 className="font-semibold text-blue-900 mb-2">Long-term Strategy</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Develop career progression paths</li>
                      <li>• Enhance learning & development</li>
                      <li>• Improve work-life balance initiatives</li>
                    </ul>
                  </div>

                  <Button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white">
                    Generate Action Plan
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="employees">
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="font-heading">Employee Data Overview</CardTitle>
                <CardDescription>Comprehensive view of employee information and risk assessments</CardDescription>
              </CardHeader>
              <CardContent>
                <EmployeeTable />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
