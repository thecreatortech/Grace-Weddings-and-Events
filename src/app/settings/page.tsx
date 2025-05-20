"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SettingsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <Button>Save Changes</Button>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
          <TabsTrigger value="invoice">Invoice</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" defaultValue="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Your email" defaultValue="john@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="Your phone number" defaultValue="+91 9876543210" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="••••••••" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="business" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="business-name">Business Name</Label>
                  <Input id="business-name" placeholder="Your business name" defaultValue="Grace Weddings & Events" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="business-email">Business Email</Label>
                  <Input id="business-email" type="email" placeholder="Business email" defaultValue="info@gracevents.in" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="business-phone">Business Phone</Label>
                  <Input id="business-phone" placeholder="Business phone" defaultValue="+91 9066680216" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="business-website">Website</Label>
                  <Input id="business-website" placeholder="Business website" defaultValue="www.gracevents.in" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="business-address">Address</Label>
                  <Input id="business-address" placeholder="Business address" defaultValue="1st A Main Rd, St Thomas Town, Bengaluru-84" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tax-id">Tax ID</Label>
                  <Input id="tax-id" placeholder="Tax ID" defaultValue="ABCDE1234F" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gst-number">GST Number</Label>
                  <Input id="gst-number" placeholder="GST Number" defaultValue="29ABCDE1234F1Z5" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Bank Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bank-name">Bank Name</Label>
                  <Input id="bank-name" placeholder="Bank name" defaultValue="IndusInd Bank" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="account-name">Account Name</Label>
                  <Input id="account-name" placeholder="Account name" defaultValue="GRACE WEDDING AND EVENTS" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="account-number">Account Number</Label>
                  <Input id="account-number" placeholder="Account number" defaultValue="250306199713" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ifsc-code">IFSC Code</Label>
                  <Input id="ifsc-code" placeholder="IFSC code" defaultValue="INDB0000294" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="invoice" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Invoice Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="invoice-prefix">Invoice Prefix</Label>
                  <Input id="invoice-prefix" placeholder="Invoice prefix" defaultValue="INV#" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quote-prefix">Quote Prefix</Label>
                  <Input id="quote-prefix" placeholder="Quote prefix" defaultValue="QT#" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="default-tax">Default Tax Rate (%)</Label>
                  <Input id="default-tax" type="number" placeholder="Default tax rate" defaultValue="18" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="payment-terms">Default Payment Terms (days)</Label>
                  <Input id="payment-terms" type="number" placeholder="Payment terms" defaultValue="15" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="invoice-notes">Default Invoice Notes</Label>
                <textarea
                  id="invoice-notes"
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Default notes to appear on invoices"
                  defaultValue="Thank you for your business. We appreciate your trust in us."
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Invoice Template</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-md p-2 bg-muted/50 relative">
                  <img 
                    src="/placeholder-invoice-template.png" 
                    alt="Classic Template" 
                    className="w-full h-auto border"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 hover:opacity-100 transition-opacity">
                    <Button variant="secondary" size="sm">Select</Button>
                  </div>
                  <p className="text-center mt-2 text-sm font-medium">Classic</p>
                </div>
                
                <div className="border rounded-md p-2 bg-primary/5 relative">
                  <img 
                    src="/placeholder-invoice-template.png" 
                    alt="Modern Template" 
                    className="w-full h-auto border"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 hover:opacity-100 transition-opacity">
                    <Button variant="secondary" size="sm">Select</Button>
                  </div>
                  <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-sm">
                    Selected
                  </div>
                  <p className="text-center mt-2 text-sm font-medium">Modern</p>
                </div>
                
                <div className="border rounded-md p-2 bg-muted/50 relative">
                  <img 
                    src="/placeholder-invoice-template.png" 
                    alt="Minimal Template" 
                    className="w-full h-auto border"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 hover:opacity-100 transition-opacity">
                    <Button variant="secondary" size="sm">Select</Button>
                  </div>
                  <p className="text-center mt-2 text-sm font-medium">Minimal</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Email Notifications</h3>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <div className="h-6 w-11 rounded-full bg-primary relative">
                    <div className="h-5 w-5 rounded-full bg-white absolute right-0.5 top-0.5"></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Invoice Reminders</h3>
                    <p className="text-sm text-muted-foreground">Get reminders for unpaid invoices</p>
                  </div>
                  <div className="h-6 w-11 rounded-full bg-primary relative">
                    <div className="h-5 w-5 rounded-full bg-white absolute right-0.5 top-0.5"></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Payment Notifications</h3>
                    <p className="text-sm text-muted-foreground">Get notified when you receive payments</p>
                  </div>
                  <div className="h-6 w-11 rounded-full bg-primary relative">
                    <div className="h-5 w-5 rounded-full bg-white absolute right-0.5 top-0.5"></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">WhatsApp Notifications</h3>
                    <p className="text-sm text-muted-foreground">Receive notifications via WhatsApp</p>
                  </div>
                  <div className="h-6 w-11 rounded-full bg-muted relative">
                    <div className="h-5 w-5 rounded-full bg-white absolute left-0.5 top-0.5"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
