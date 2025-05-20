"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

export default function InvoicesPage() {
  const invoices = [
    {
      id: "INV#14349",
      client: "Amazing Love Church",
      date: "18/05/2025",
      amount: 2200,
      status: "paid",
    },
    {
      id: "INV#14348",
      client: "Tech Wizards Inc.",
      date: "15/05/2025",
      amount: 5800,
      status: "pending",
    },
    {
      id: "INV#14347",
      client: "Green Solutions",
      date: "10/05/2025",
      amount: 3500,
      status: "pending",
    },
    {
      id: "INV#14346",
      client: "Sunrise Properties",
      date: "05/05/2025",
      amount: 12000,
      status: "paid",
    },
    {
      id: "INV#14345",
      client: "Digital Nomads Co.",
      date: "01/05/2025",
      amount: 4500,
      status: "pending",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "text-green-600 bg-green-100";
      case "pending":
        return "text-amber-600 bg-amber-100";
      case "overdue":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Invoices</h2>
        <Button asChild>
          <a href="/invoices/new">Create Invoice</a>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left font-medium p-4 pl-0">Invoice</th>
                  <th className="text-left font-medium p-4">Client</th>
                  <th className="text-left font-medium p-4">Date</th>
                  <th className="text-left font-medium p-4">Amount</th>
                  <th className="text-left font-medium p-4">Status</th>
                  <th className="text-right font-medium p-4 pr-0">Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b">
                    <td className="p-4 pl-0">{invoice.id}</td>
                    <td className="p-4">{invoice.client}</td>
                    <td className="p-4">{invoice.date}</td>
                    <td className="p-4">{formatCurrency(invoice.amount)}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(invoice.status)}`}>
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                      </span>
                    </td>
                    <td className="p-4 pr-0 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                          >
                            <path d="M12 20h9" />
                            <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                          </svg>
                        </Button>
                        <Button variant="ghost" size="icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                          >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" x2="12" y1="15" y2="3" />
                          </svg>
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
    </div>
  );
}
