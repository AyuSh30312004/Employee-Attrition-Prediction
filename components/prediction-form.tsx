"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, CheckCircle, Brain } from "lucide-react"

interface PredictionResult {
  risk: "low" | "medium" | "high"
  probability: number
  factors: string[]
  recommendations: string[]
}

export function PredictionForm() {
  const [formData, setFormData] = useState({
    age: "",
    department: "",
    jobSatisfaction: "",
    workLifeBalance: "",
    yearsAtCompany: "",
    salary: "",
    overtime: "",
    performanceRating: "",
  })

  const [prediction, setPrediction] = useState<PredictionResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock prediction logic
    const satisfactionScore = Number.parseInt(formData.jobSatisfaction) || 3
    const workLifeScore = Number.parseInt(formData.workLifeBalance) || 3
    const years = Number.parseInt(formData.yearsAtCompany) || 2
    const overtime = formData.overtime === "yes"

    let riskScore = 0
    const factors: string[] = []
    const recommendations: string[] = []

    if (satisfactionScore <= 2) {
      riskScore += 30
      factors.push("Low job satisfaction")
      recommendations.push("Schedule career development discussion")
    }

    if (workLifeScore <= 2) {
      riskScore += 25
      factors.push("Poor work-life balance")
      recommendations.push("Consider flexible work arrangements")
    }

    if (years < 2) {
      riskScore += 20
      factors.push("Low tenure")
      recommendations.push("Implement mentorship program")
    }

    if (overtime) {
      riskScore += 15
      factors.push("Frequent overtime")
      recommendations.push("Review workload distribution")
    }

    let risk: "low" | "medium" | "high" = "low"
    if (riskScore >= 50) risk = "high"
    else if (riskScore >= 25) risk = "medium"

    setPrediction({
      risk,
      probability: Math.min(riskScore + Math.random() * 20, 95),
      factors: factors.length > 0 ? factors : ["No significant risk factors identified"],
      recommendations: recommendations.length > 0 ? recommendations : ["Continue current engagement practices"],
    })

    setIsLoading(false)
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high":
        return "text-red-600 bg-red-50 border-red-200"
      case "medium":
        return "text-orange-600 bg-orange-50 border-orange-200"
      default:
        return "text-green-600 bg-green-50 border-green-200"
    }
  }

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case "high":
        return <AlertTriangle className="w-5 h-5 text-red-600" />
      case "medium":
        return <AlertTriangle className="w-5 h-5 text-orange-600" />
      default:
        return <CheckCircle className="w-5 h-5 text-green-600" />
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Form */}
      <div className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                placeholder="25"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="yearsAtCompany">Years at Company</Label>
              <Input
                id="yearsAtCompany"
                type="number"
                value={formData.yearsAtCompany}
                onChange={(e) => setFormData({ ...formData, yearsAtCompany: e.target.value })}
                placeholder="3"
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="department">Department</Label>
            <Select
              value={formData.department}
              onValueChange={(value) => setFormData({ ...formData, department: value })}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sales">Sales</SelectItem>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="hr">Human Resources</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="jobSatisfaction">Job Satisfaction (1-5)</Label>
              <Select
                value={formData.jobSatisfaction}
                onValueChange={(value) => setFormData({ ...formData, jobSatisfaction: value })}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Rate 1-5" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 - Very Low</SelectItem>
                  <SelectItem value="2">2 - Low</SelectItem>
                  <SelectItem value="3">3 - Medium</SelectItem>
                  <SelectItem value="4">4 - High</SelectItem>
                  <SelectItem value="5">5 - Very High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="workLifeBalance">Work-Life Balance (1-5)</Label>
              <Select
                value={formData.workLifeBalance}
                onValueChange={(value) => setFormData({ ...formData, workLifeBalance: value })}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Rate 1-5" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 - Very Poor</SelectItem>
                  <SelectItem value="2">2 - Poor</SelectItem>
                  <SelectItem value="3">3 - Fair</SelectItem>
                  <SelectItem value="4">4 - Good</SelectItem>
                  <SelectItem value="5">5 - Excellent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="salary">Monthly Salary ($)</Label>
              <Input
                id="salary"
                type="number"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                placeholder="5000"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="overtime">Frequent Overtime</Label>
              <Select
                value={formData.overtime}
                onValueChange={(value) => setFormData({ ...formData, overtime: value })}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="performanceRating">Performance Rating (1-5)</Label>
            <Select
              value={formData.performanceRating}
              onValueChange={(value) => setFormData({ ...formData, performanceRating: value })}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Rate 1-5" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 - Poor</SelectItem>
                <SelectItem value="2">2 - Below Average</SelectItem>
                <SelectItem value="3">3 - Average</SelectItem>
                <SelectItem value="4">4 - Good</SelectItem>
                <SelectItem value="5">5 - Excellent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700 text-white" disabled={isLoading}>
            {isLoading ? (
              <>
                <Brain className="w-4 h-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Brain className="w-4 h-4 mr-2" />
                Predict Attrition Risk
              </>
            )}
          </Button>
        </form>
      </div>

      {/* Results */}
      <div className="space-y-6">
        {prediction && (
          <Card className={`border-2 ${getRiskColor(prediction.risk)} animate-fade-in-up`}>
            <CardHeader>
              <div className="flex items-center gap-3">
                {getRiskIcon(prediction.risk)}
                <div>
                  <CardTitle className="capitalize">{prediction.risk} Risk</CardTitle>
                  <CardDescription>{prediction.probability.toFixed(1)}% probability of attrition</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Risk Level</span>
                  <span>{prediction.probability.toFixed(1)}%</span>
                </div>
                <Progress value={prediction.probability} className="h-3" />
              </div>

              <div>
                <h4 className="font-semibold mb-2">Key Risk Factors:</h4>
                <div className="space-y-1">
                  {prediction.factors.map((factor, index) => (
                    <Badge key={index} variant="outline" className="mr-2 mb-1">
                      {factor}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Recommendations:</h4>
                <ul className="text-sm space-y-1">
                  {prediction.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-cyan-600 mt-1">•</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        )}

        {!prediction && (
          <Card className="border-dashed border-2 border-gray-300">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <Brain className="w-12 h-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">AI Prediction Ready</h3>
              <p className="text-gray-500">Fill out the form to get an AI-powered attrition risk assessment</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
