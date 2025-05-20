import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { auth } from '@/lib/auth';

export async function GET(req) {
  try {
    const session = await auth();
    
    if (!session || !session.user) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Get dashboard data
    
    // Get total income
    const incomeResult = await db.income.aggregate({
      where: {
        userId: session.user.id
      },
      _sum: {
        amount: true
      }
    });
    
    // Get total expenses
    const expenseResult = await db.expense.aggregate({
      where: {
        userId: session.user.id
      },
      _sum: {
        amount: true
      }
    });
    
    // Get pending invoices
    const pendingInvoices = await db.invoice.findMany({
      where: {
        userId: session.user.id,
        status: 'pending'
      },
      include: {
        client: true
      }
    });
    
    // Get recent clients
    const recentClients = await db.client.findMany({
      where: {
        userId: session.user.id
      },
      include: {
        invoices: {
          orderBy: {
            createdAt: 'desc'
          },
          take: 1
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 5
    });
    
    // Calculate totals
    const totalIncome = incomeResult._sum.amount || 0;
    const totalExpenses = expenseResult._sum.amount || 0;
    const profit = totalIncome - totalExpenses;
    
    // Format clients with last invoice data
    const formattedClients = recentClients.map(client => {
      const lastInvoice = client.invoices[0];
      return {
        id: client.id,
        name: client.name,
        email: client.email,
        phone: client.phone,
        lastInvoiceDate: lastInvoice ? lastInvoice.issueDate : null,
        lastInvoiceAmount: lastInvoice ? lastInvoice.total : 0
      };
    });
    
    return NextResponse.json({
      totalIncome,
      totalExpenses,
      profit,
      pendingInvoices: pendingInvoices.map(invoice => ({
        id: invoice.id,
        invoiceNumber: invoice.invoiceNumber,
        clientName: invoice.client.name,
        amount: invoice.total,
        issueDate: invoice.issueDate,
        dueDate: invoice.dueDate
      })),
      recentClients: formattedClients
    });
    
  } catch (error) {
    console.error('Dashboard data error:', error);
    return NextResponse.json(
      { message: 'An error occurred while fetching dashboard data' },
      { status: 500 }
    );
  }
}
