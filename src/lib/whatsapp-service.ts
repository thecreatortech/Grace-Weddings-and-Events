// This file provides a simplified WhatsApp messaging service implementation
// In production, you would use a real service like Twilio

export async function sendWhatsAppMessage({ to, body }) {
  try {
    // This is a mock implementation that would be replaced with actual WhatsApp integration
    console.log(`WhatsApp message would be sent to: ${to}`);
    console.log(`Message: ${body}`);
    
    // In production, this would connect to Twilio or another WhatsApp API
    return {
      success: true,
      messageId: `mock-whatsapp-${Date.now()}`,
    };
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    throw error;
  }
}

export async function sendInvoiceWhatsApp({ to, invoiceNumber, amount, dueDate, pdfUrl }) {
  const body = `
    Dear Customer,
    
    Your invoice #${invoiceNumber} for ₹${amount} has been generated.
    Due Date: ${new Date(dueDate).toLocaleDateString()}
    
    You can view and download your invoice here: ${pdfUrl}
    
    Thank you for your business.
    
    Regards,
    FinGenie Team
  `;
  
  return sendWhatsAppMessage({
    to,
    body,
  });
}

export async function sendPaymentReminderWhatsApp({ to, invoiceNumber, amount, dueDate }) {
  const body = `
    Dear Customer,
    
    This is a friendly reminder that payment for invoice #${invoiceNumber} in the amount of ₹${amount} is due on ${new Date(dueDate).toLocaleDateString()}.
    
    If you have already made the payment, please disregard this message.
    
    Thank you for your business.
    
    Regards,
    FinGenie Team
  `;
  
  return sendWhatsAppMessage({
    to,
    body,
  });
}

export async function sendReceiptWhatsApp({ to, invoiceNumber, amount, paymentDate }) {
  const body = `
    Dear Customer,
    
    Thank you for your payment of ₹${amount} for invoice #${invoiceNumber} received on ${new Date(paymentDate).toLocaleDateString()}.
    
    We appreciate your business.
    
    Regards,
    FinGenie Team
  `;
  
  return sendWhatsAppMessage({
    to,
    body,
  });
}
