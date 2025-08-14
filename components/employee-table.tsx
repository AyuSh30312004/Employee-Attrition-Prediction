"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter } from "lucide-react"

const employeeData = [
  {
    id: 1,
    name: "Sarah Johnson",
    department: "Engineering",
    role: "Senior Developer",
    tenure: "3.2 years",
    satisfaction: 4,
    riskLevel: "low",
    lastReview: "2024-01-15",
  },
  {
    id: 2,
    name: "Michael Chen",
    department: "Sales",
    role: "Account Manager",
    tenure: "1.8 years",
    satisfaction: 2,
    riskLevel: "high",
    lastReview: "2024-01-10",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    department: "Marketing",
    role: "Marketing Specialist",
    tenure: "2.5 years",
    satisfaction: 3,
    riskLevel: "medium",
    lastReview: "2024-01-20",
  },
  {
    id: 4,
    name: "David Kim",
    department: "Engineering",
    role: "Tech Lead",
    tenure: "4.1 years",
    satisfaction: 5,
    riskLevel: "low",
    lastReview: "2024-01-12",
  },
  {
    id: 5,
    name: "Lisa Thompson",
    department: "HR",
    role: "HR Specialist",
    tenure: "0.9 years",
    satisfaction: 2,
    riskLevel: "high",
    lastReview: "2024-01-18",
  },
  {
    id: 6,
    name: "James Wilson",
    department: "Finance",
    role: "Financial Analyst",
    tenure: "2.8 years",
    satisfaction: 4,
    riskLevel: "low",
    lastReview: "2024-01-14",
  },
]

export function EmployeeTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [riskFilter, setRiskFilter] = useState("all")

  const filteredEmployees = employeeData.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = departmentFilter === "all" || employee.department === departmentFilter
    const matchesRisk = riskFilter === "all" || employee.riskLevel === riskFilter

    return matchesSearch && matchesDepartment && matchesRisk
  })

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "high":
        return <Badge variant="destructive">High Risk</Badge>
      case "medium":
        return (
          <Badge variant="secondary" className="bg-orange-100 text-orange-800">
            Medium Risk
          </Badge>
        )
      case "low":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Low Risk
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getSatisfactionStars = (rating: number) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating)
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            <SelectItem value="Engineering">Engineering</SelectItem>
            <SelectItem value="Sales">Sales</SelectItem>
            <SelectItem value="Marketing">Marketing</SelectItem>
            <SelectItem value="HR">HR</SelectItem>
            <SelectItem value="Finance">Finance</SelectItem>
          </SelectContent>
        </Select>

        <Select value={riskFilter} onValueChange={setRiskFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Risk Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Risk Levels</SelectItem>
            <SelectItem value="high">High Risk</SelectItem>
            <SelectItem value="medium">Medium Risk</SelectItem>
            <SelectItem value="low">Low Risk</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold">Employee</TableHead>
              <TableHead className="font-semibold">Department</TableHead>
              <TableHead className="font-semibold">Tenure</TableHead>
              <TableHead className="font-semibold">Satisfaction</TableHead>
              <TableHead className="font-semibold">Risk Level</TableHead>
              <TableHead className="font-semibold">Last Review</TableHead>
              <TableHead className="font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.map((employee) => (
              <TableRow key={employee.id} className="hover:bg-gray-50 transition-colors">
                <TableCell>
                  <div>
                    <div className="font-medium text-gray-900">{employee.name}</div>
                    <div className="text-sm text-gray-500">{employee.role}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{employee.department}</Badge>
                </TableCell>
                <TableCell className="text-gray-600">{employee.tenure}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-500">{getSatisfactionStars(employee.satisfaction)}</span>
                    <span className="text-sm text-gray-500">({employee.satisfaction}/5)</span>
                  </div>
                </TableCell>
                <TableCell>{getRiskBadge(employee.riskLevel)}</TableCell>
                <TableCell className="text-gray-600">{employee.lastReview}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-cyan-600 border-cyan-600 hover:bg-cyan-50 bg-transparent"
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredEmployees.length === 0 && (
        <div className="text-center py-8 text-gray-500">No employees found matching your criteria.</div>
      )}
    </div>
  )
}
