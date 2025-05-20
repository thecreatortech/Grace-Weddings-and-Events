import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCurrency } from "@/lib/utils";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import Link from "next/link";

const revenueData = [
  { name: "Jan", amount: 12000 },
  { name: "Feb", amount: 18000 },
  { name: "Mar", amount: 15000 },
  { name: "Apr", amount: 22000 },
  { name: "May", amount: 19500 },
  { name: "Jun", amount: 24000 },
];

const expenseData = [
  { name: "Jan", amount: 8000 },
  { name: "Feb", amount: 9500 },
  { name: "Mar", amount: 7800 },
  { name: "Apr", amount: 12000 },
  { name: "May", amount: 10500 },
  { name: "Jun", amount: 11200 },
];

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Link href="/invoices/new">
            <Button>New Invoice</Button>
          </Link>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(110500)}</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expenses</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(59000)}</div>
            <p className="text-xs text-muted-foreground">
              +7% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profit</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(51500)}</div>
            <p className="text-xs text-muted-foreground">
              +10.5% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Invoices</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
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
                    <Tooltip formatter={(value) => formatCurrency(value)} />
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
                    <Tooltip formatter={(value) => formatCurrency(value)} />
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
