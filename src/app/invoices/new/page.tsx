"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InvoiceItem {
  description: string;
  quantity: number;
  price: number;
}

export default function NewInvoicePage() {
  const [client, setClient] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [items, setItems] = useState<InvoiceItem[]>([
    { description: "", quantity: 1, price: 0 }
  ]);
  
  const updateItem = (index: number, field: keyof InvoiceItem, value: string | number) => {
    const newItems = [...items];
    newItems[index][field] = value as never; // Type assertion to handle the complex indexing
    setItems(newItems);
  };
  
  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };
  
  const addItem = () => {
    setItems([...items, { description: "", quantity: 1, price: 0 }]);
  };
  
  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  };
  
  const calculateTax = () => {
    return calculateSubtotal() * 0.18; // 18% GST
  };
  
  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically save the invoice to your database
    console.log({
      client,
      issueDate,
      dueDate,
      items,
      subtotal: calculateSubtotal(),
      tax: calculateTax(),
      total: calculateTotal()
    });
    
    // For demo purposes, just show an alert
    alert("Invoice created successfully!");
  };
  
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Create New Invoice</h1>
      </div>
      
      <form onSubmit={handleSubmit}>
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Client Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="client">Client Name</Label>
              <Input 
                id="client" 
                value={client} 
                onChange={(e) => setClient(e.target.value)} 
                required 
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="issueDate">Issue Date</Label>
                <Input 
                  id="issueDate" 
                  type="date" 
                  value={issueDate} 
                  onChange={(e) => setIssueDate(e.target.value)} 
                  required 
                />
              </div>
              <div>
                <Label htmlFor="dueDate">Due Date</Label>
                <Input 
                  id="dueDate" 
                  type="date" 
                  value={dueDate} 
                  onChange={(e) => setDueDate(e.target.value)} 
                  required 
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Invoice Items</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {items.map((item, index) => (
              <div key={index} className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-6">
                  <Label htmlFor={`item-${index}-desc`}>Description</Label>
                  <Input 
                    id={`item-${index}-desc`} 
                    value={item.description} 
                    onChange={(e) => updateItem(index, "description", e.target.value)} 
                    required 
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor={`item-${index}-qty`}>Quantity</Label>
                  <Input 
                    id={`item-${index}-qty`} 
                    type="number" 
                    min="1" 
                    value={item.quantity} 
                    onChange={(e) => updateItem(index, "quantity", parseInt(e.target.value))} 
                    required 
                  />
                </div>
                <div className="col-span-3">
                  <Label htmlFor={`item-${index}-price`}>Price</Label>
                  <Input 
                    id={`item-${index}-price`} 
                    type="number" 
                    min="0" 
                    step="0.01" 
                    value={item.price} 
                    onChange={(e) => updateItem(index, "price", parseFloat(e.target.value))} 
                    required 
                  />
                </div>
                <div className="col-span-1 flex items-end justify-end">
                  {items.length > 1 && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      onClick={() => removeItem(index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              </div>
            ))}
            
            <Button type="button" variant="outline" onClick={addItem}>
              Add Item
            </Button>
            
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₹{calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (18% GST):</span>
                <span>₹{calculateTax().toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>₹{calculateTotal().toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline">Cancel</Button>
          <Button type="submit">Create Invoice</Button>
        </div>
      </form>
    </div>
  );
}
