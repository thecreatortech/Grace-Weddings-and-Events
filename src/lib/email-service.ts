// This file provides a simplified email service implementation
// In production, you would use a real email service like Resend

export async function sendEmail({ to, subject, html, text, attachments = [] }) {
  try {
    // This is a mock implementation that would be replaced with actual email sending
    console.log(`Email would be sent to: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Content: ${text || html.substring(0, 100)}...`);
    
    // In production, this would connect to an email service API
    return {
      success: true,
      messageId: `mock-email-${Date.now()}`,
    };
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

export async function sendInvoiceEmail({ to, invoiceNumber, amount, dueDate, pdfBuffer }) {
  const subject = `Invoice #${invoiceNumber} - Payment Required`;
  const text = `
    Dear Customer,
    
    Please find attached invoice #${invoiceNumber} for the amount of ₹${amount}.
    
    Due Date: ${new Date(dueDate).toLocaleDateString()}
    
    Thank you for your business.
    
    Regards,
    FinGenie Team
  `;
  
  return sendEmail({
    to,
    subject,
    text,
    attachments: [
      {
        filename: `Invoice-${invoiceNumber}.pdf`,
        content: pdfBuffer,
      },
    ],
  });
}

export async function sendPaymentReminderEmail({ to, invoiceNumber, amount, dueDate }) {
  const subject = `Payment Reminder: Invoice #${invoiceNumber}`;
  const text = `
    Dear Customer,
    
    This is a friendly reminder that payment for invoice #${invoiceNumber} in the amount of ₹${amount} is due on ${new Date(dueDate).toLocaleDateString()}.
    
    If you have already made the payment, please disregard this message.
    
    Thank you for your business.
    
    Regards,
    FinGenie Team
  `;
  
  return sendEmail({
    to,
    subject,
    text,
  });
}

export async function sendReceiptEmail({ to, invoiceNumber, amount, paymentDate }) {
  const subject = `Receipt for Invoice #${invoiceNumber}`;
  const text = `
    Dear Customer,
    
    Thank you for your payment of ₹${amount} for invoice #${invoiceNumber} received on ${new Date(paymentDate).toLocaleDateString()}.
    
    We appreciate your business.
    
    Regards,
    FinGenie Team
  `;
  
  return sendEmail({
    to,
    subject,
    text,
  });
}

export async function sendWelcomeEmail({ to, name }) {
  const subject = `Welcome to FinGenie!`;
  const text = `
    Dear ${name},
    
    Welcome to FinGenie! We're excited to have you on board.
    
    With FinGenie, you can easily manage your invoices, track expenses, and generate financial reports.
    
    If you have any questions, please don't hesitate to contact our support team.
    
    Regards,
    FinGenie Team
  `;
  
  return sendEmail({
    to,
    subject,
    text,
  });
}
