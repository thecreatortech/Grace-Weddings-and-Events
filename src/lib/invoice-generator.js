import { PrismaClient } from '@prisma/client';
import { generatePDF } from './pdf-generator';

// Create PDF for invoice
export async function generateInvoicePDF(invoiceData) {
  try {
    // Prepare the HTML content for the invoice
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Invoice ${invoiceData.invoiceNumber}</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 20px;
            color: #333;
          }
          .invoice-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
          }
          .company-details {
            text-align: right;
          }
          .invoice-title {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 20px;
            color: #2563eb;
          }
          .invoice-details {
            margin-bottom: 30px;
          }
          .client-details {
            margin-bottom: 30px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
          }
          th, td {
            padding: 10px;
            text-align: left;
            border-bottom: 1px solid #ddd;
          }
          th {
            background-color: #f9fafb;
          }
          .totals {
            text-align: right;
            margin-top: 20px;
          }
          .total {
            font-weight: bold;
            font-size: 18px;
            color: #2563eb;
          }
          .footer {
            margin-top: 50px;
            text-align: center;
            font-size: 12px;
            color: #6b7280;
          }
        </style>
      </head>
      <body>
        <div class="invoice-header">
          <div>
            <div class="invoice-title">INVOICE</div>
            <div>Invoice Number: ${invoiceData.invoiceNumber}</div>
            <div>Date: ${new Date(invoiceData.issueDate).toLocaleDateString()}</div>
          </div>
          <div class="company-details">
            <div><strong>${invoiceData.business.name}</strong></div>
            <div>${invoiceData.business.address}</div>
            <div>Phone: ${invoiceData.business.phone}</div>
            <div>Website: ${invoiceData.business.website}</div>
          </div>
        </div>
        
        <div class="client-details">
          <div><strong>Bill To:</strong></div>
          <div>${invoiceData.client.name}</div>
          <div>${invoiceData.client.address || ''}</div>
          <div>Email: ${invoiceData.client.email || ''}</div>
          <div>Phone: ${invoiceData.client.phone || ''}</div>
        </div>
        
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            ${invoiceData.items.map(item => `
              <tr>
                <td>${item.name}</td>
                <td>${item.description || ''}</td>
                <td>${item.quantity}</td>
                <td>₹${item.price.toFixed(2)}</td>
                <td>₹${item.amount.toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        
        <div class="totals">
          <div>Subtotal: ₹${invoiceData.subtotal.toFixed(2)}</div>
          <div>Tax (${invoiceData.taxRate}%): ₹${invoiceData.tax.toFixed(2)}</div>
          <div class="total">Total: ₹${invoiceData.total.toFixed(2)}</div>
        </div>
        
        <div class="footer">
          <div><strong>Payment Details:</strong></div>
          <div>Bank: ${invoiceData.business.bankDetails.bankName}</div>
          <div>Account Name: ${invoiceData.business.bankDetails.accountName}</div>
          <div>Account Number: ${invoiceData.business.bankDetails.accountNumber}</div>
          <div>IFSC Code: ${invoiceData.business.bankDetails.ifscCode}</div>
          <div style="margin-top: 20px">Thank you for your business!</div>
        </div>
      </body>
      </html>
    `;
    
    // Generate PDF from HTML
    const pdfBuffer = await generatePDF(htmlContent);
    return pdfBuffer;
  } catch (error) {
    console.error('Error generating invoice PDF:', error);
    throw error;
  }
}
