import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { generateInvoicePDF } from '@/lib/invoice-generator';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    // Authentication check would normally go here
    // For now, we'll proceed without session validation
    
    const body = await req.json();
    const { 
      type, 
      client, 
      items, 
      subtotal, 
      tax, 
      total, 
      notes,
      storedForCalc = true
    } = body;
    
    // Validate input
    if (!type || !client || !items || items.length === 0) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Generate invoice number
    const invoicePrefix = type === 'invoice' ? 'INV#' : 'QT#';
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const invoiceNumber = `${invoicePrefix}${randomNum}`;
    
    // Prepare invoice data for PDF generation
    const invoiceData = {
      invoiceNumber,
      client,
      issueDate: new Date(),
      items,
      subtotal,
      taxRate: 18, // Default GST rate
      tax,
      total,
      business: {
        name: 'Your Business Name',
        address: 'Your Business Address',
        phone: 'Your Phone Number',
        website: 'Your Website',
        bankDetails: {
          bankName: 'Your Bank',
          accountName: 'Your Account Name',
          accountNumber: 'Your Account Number',
          ifscCode: 'Your IFSC Code'
        }
      }
    };
    
    // Generate PDF
    const pdfBuffer = await generateInvoicePDF(invoiceData);
    
    // Instead of using @vercel/blob, we'll store the file path
    const fileUrl = `/invoices/${invoiceNumber}.pdf`;
    
    // Find or create client (simplified without actual DB operation)
    const clientId = "client-" + Date.now();
    
    // Create invoice record (simplified)
    const invoice = {
      id: "invoice-" + Date.now(),
      invoiceNumber,
      type,
      items: items,
      subtotal,
      tax,
      total,
      status: 'pending',
      notes: notes || '',
      issueDate: new Date(),
      dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
      storedForCalc,
      fileUrl: fileUrl,
      clientId: clientId
    };
    
    return NextResponse.json({
      message: `${type.charAt(0).toUpperCase() + type.slice(1)} created successfully`,
      invoice: invoice,
      fileUrl: fileUrl
    });
    
  } catch (error) {
    console.error('Invoice creation error:', error);
    return NextResponse.json(
      { message: 'An error occurred during invoice creation' },
      { status: 500 }
    );
  }
}
