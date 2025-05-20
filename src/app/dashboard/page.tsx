"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from "recharts";

// Define types for chart data
interface ChartDataPoint {
  name: string;
  amount: number;
}

// Sample data for charts
const revenueData: ChartDataPoint[] = [
  { name: "Jan", amount: 4000 },
  { name: "Feb", amount: 3000 },
  { name: "Mar", amount: 5000 },
  { name: "Apr", amount: 7000 },
  { name: "May", amount: 6000 },
];

const expenseData: ChartDataPoint[] = [
  { name: "Jan", amount: 2000 },
  { name: "Feb", amount: 2500 },
  { name: "Mar", amount: 3000 },
  { name: "Apr", amount: 2800 },
  { name: "May", amount: 3200 },
];

// Helper function to format currency
const formatCurrency = (value: number | string): string => {
  // Convert string to number if needed
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(numValue);
};

// Custom formatter for Recharts tooltip that handles both number and string values
const customFormatter = (value: any): string => {
  if (typeof value === 'string') {
    // Try to parse the string as a number
    const parsed = parseFloat(value);
    if (!isNaN(parsed)) {
      return formatCurrency(parsed);
    }
    // If it can't be parsed as a number, return as is
    return value;
  }
  return formatCurrency(value);
};

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-muted-foreground">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expenses</CardTitle>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-muted-foreground">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹12,234.59</div>
            <p className="text-xs text-muted-foreground">
              +4.3% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profit</CardTitle>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-muted-foreground">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹32,997.30</div>
            <p className="text-xs text-muted-foreground">
              +10.2% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Invoices</CardTitle>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-muted-foreground">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">
              {formatCurrency(28500)} outstanding
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Financial Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Tabs defaultValue="revenue">
              <TabsList>
                <TabsTrigger value="revenue">Revenue</TabsTrigger>
                <TabsTrigger value="expenses">Expenses</TabsTrigger>
              </TabsList>
              <TabsContent value="revenue" className="space-y-4">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={customFormatter} />
                    <Bar dataKey="amount" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>
              <TabsContent value="expenses" className="space-y-4">
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={expenseData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={customFormatter} />
                    <Line type="monotone" dataKey="amount" stroke="#ef4444" />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Clients</CardTitle>
            <CardDescription>
              You have 12 total clients
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <span className="font-medium text-primary">AC</span>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Amazing Love Church</p>
                  <p className="text-sm text-muted-foreground">
                    Last invoice: 18/05/2025
                  </p>
                </div>
                <div className="ml-auto font-medium">{formatCurrency(2200)}</div>
              </div>
              
              <div className="flex items-center">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <span className="font-medium text-primary">TW</span>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Tech Wizards Inc.</p>
                  <p className="text-sm text-muted-foreground">
                    Last invoice: 15/05/2025
                  </p>
                </div>
                <div className="ml-auto font-medium">{formatCurrency(5800)}</div>
              </div>
              
              <div className="flex items-center">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <span className="font-medium text-primary">GS</span>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Green Solutions</p>
                  <p className="text-sm text-muted-foreground">
                    Last invoice: 10/05/2025
                  </p>
                </div>
                <div className="ml-auto font-medium">{formatCurrency(3500)}</div>
              </div>
              
              <div className="flex items-center">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <span className="font-medium text-primary">SP</span>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Sunrise Properties</p>
                  <p className="text-sm text-muted-foreground">
                    Last invoice: 05/05/2025
                  </p>
                </div>
                <div className="ml-auto font-medium">{formatCurrency(12000)}</div>
              </div>
              
              <Button variant="outline" className="w-full">View All Clients</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
