"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/utils";

export default function InvoiceCreator() {
  const [items, setItems] = useState([{ description: "", quantity: 1, price: 0 }]);
  const [client, setClient] = useState({ name: "", address: "", email: "", phone: "" });
  const [invoiceType, setInvoiceType] = useState("invoice");

  const addItem = () => {
    setItems([...items, { description: "", quantity: 1, price: 0 }]);
  };

  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const removeItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.18; // 18% GST (9% CGST + 9% SGST)
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Create {invoiceType === "invoice" ? "Invoice" : "Quote"}</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Client Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="client-name">Client Name</Label>
                <Input 
                  id="client-name" 
                  placeholder="Client name" 
                  value={client.name}
                  onChange={(e) => setClient({...client, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="client-email">Email</Label>
                <Input 
                  id="client-email" 
                  type="email" 
                  placeholder="client@example.com"
                  value={client.email}
                  onChange={(e) => setClient({...client, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="client-phone">Phone</Label>
                <Input 
                  id="client-phone" 
                  placeholder="Phone number"
                  value={client.phone}
                  onChange={(e) => setClient({...client, phone: e.target.value})}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="client-address">Address</Label>
                <Input 
                  id="client-address" 
                  placeholder="Client address"
                  value={client.address}
                  onChange={(e) => setClient({...client, address: e.target.value})}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Document Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Button 
                variant={invoiceType === "invoice" ? "default" : "outline"}
                onClick={() => setInvoiceType("invoice")}
                className="flex-1"
              >
                Invoice
              </Button>
              <Button 
                variant={invoiceType === "quote" ? "default" : "outline"}
                onClick={() => setInvoiceType("quote")}
                className="flex-1"
              >
                Quote
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-12 gap-4 font-medium">
              <div className="col-span-6">Description</div>
              <div className="col-span-2">Quantity</div>
              <div className="col-span-3">Price</div>
              <div className="col-span-1"></div>
            </div>
            
            {items.map((item, index) => (
              <div key={index} className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-6">
                  <Input 
                    placeholder="Item description" 
                    value={item.description}
                    onChange={(e) => updateItem(index, "description", e.target.value)}
                  />
                </div>
                <div className="col-span-2">
                  <Input 
                    type="number" 
                    min="1" 
                    value={item.quantity}
                    onChange={(e) => updateItem(index, "quantity", parseInt(e.target.value))}
                  />
                </div>
                <div className="col-span-3">
                  <Input 
                    type="number" 
                    min="0" 
                    value={item.price}
                    onChange={(e) => updateItem(index, "price", parseFloat(e.target.value))}
                  />
                </div>
                <div className="col-span-1">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => removeItem(index)}
                    disabled={items.length === 1}
                  >
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
                      <path d="M3 6h18" />
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    </svg>
                  </Button>
                </div>
              </div>
            ))}
            
            <Button variant="outline" onClick={addItem} className="w-full">
              Add Item
            </Button>
            
            <div className="border-t pt-4">
              <div className="flex justify-between py-2">
                <span>Subtotal:</span>
                <span>{formatCurrency(calculateSubtotal())}</span>
              </div>
              <div className="flex justify-between py-2">
                <span>CGST (9%):</span>
                <span>{formatCurrency(calculateTax() / 2)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span>SGST (9%):</span>
                <span>{formatCurrency(calculateTax() / 2)}</span>
              </div>
              <div className="flex justify-between py-2 font-bold">
                <span>Total:</span>
                <span>{formatCurrency(calculateTotal())}</span>
              </div>
            </div>
            
            <div className="flex gap-4 pt-4">
              <Button className="flex-1">
                Generate {invoiceType === "invoice" ? "Invoice" : "Quote"}
              </Button>
              <Button variant="outline" className="flex-1">
                Save as Draft
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
