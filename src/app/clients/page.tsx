"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

export default function ClientsPage() {
  const clients = [
    {
      id: "1",
      name: "Amazing Love Church",
      email: "contact@amazinglove.org",
      phone: "+91 9876543210",
      address: "K Narayanapura Main Rd, Bengaluru, Karnataka 560077",
      totalInvoices: 3,
      totalAmount: 8200,
    },
    {
      id: "2",
      name: "Tech Wizards Inc.",
      email: "info@techwizards.com",
      phone: "+91 9876543211",
      address: "MG Road, Bengaluru, Karnataka 560001",
      totalInvoices: 5,
      totalAmount: 25800,
    },
    {
      id: "3",
      name: "Green Solutions",
      email: "contact@greensolutions.in",
      phone: "+91 9876543212",
      address: "Whitefield, Bengaluru, Karnataka 560066",
      totalInvoices: 2,
      totalAmount: 7500,
    },
    {
      id: "4",
      name: "Sunrise Properties",
      email: "info@sunriseproperties.com",
      phone: "+91 9876543213",
      address: "Indiranagar, Bengaluru, Karnataka 560038",
      totalInvoices: 4,
      totalAmount: 32000,
    },
    {
      id: "5",
      name: "Digital Nomads Co.",
      email: "hello@digitalnomads.co",
      phone: "+91 9876543214",
      address: "HSR Layout, Bengaluru, Karnataka 560102",
      totalInvoices: 3,
      totalAmount: 14500,
    },
  ];

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Clients</h2>
        <Button>Add Client</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Client List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left font-medium p-4 pl-0">Name</th>
                  <th className="text-left font-medium p-4">Email</th>
                  <th className="text-left font-medium p-4">Phone</th>
                  <th className="text-left font-medium p-4">Invoices</th>
                  <th className="text-left font-medium p-4">Total Amount</th>
                  <th className="text-right font-medium p-4 pr-0">Actions</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr key={client.id} className="border-b">
                    <td className="p-4 pl-0 font-medium">{client.name}</td>
                    <td className="p-4">{client.email}</td>
                    <td className="p-4">{client.phone}</td>
                    <td className="p-4">{client.totalInvoices}</td>
                    <td className="p-4">{formatCurrency(client.totalAmount)}</td>
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
                            <path d="M2 3h20" />
                            <path d="M21 3v18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" />
                            <path d="M9 3v18" />
                            <path d="M15 3v18" />
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
