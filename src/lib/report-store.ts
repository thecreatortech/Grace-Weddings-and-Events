import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define types for reports
interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  type: 'revenue' | 'expense' | 'tax' | 'client' | 'custom';
  config: {
    sections: Array<{
      title: string;
      type: 'table' | 'chart' | 'summary';
      dataSource: string;
      options?: Record<string, any>;
    }>;
    filters?: Record<string, any>;
    dateRange?: {
      start: string;
      end: string;
    };
  };
  createdAt: string;
  updatedAt: string;
}

interface SavedReport {
  id: string;
  templateId: string;
  name: string;
  dateGenerated: string;
  dateRange: {
    start: string;
    end: string;
  };
  data: any;
  pdfUrl?: string;
}

interface ReportState {
  templates: ReportTemplate[];
  savedReports: SavedReport[];
  currentReport: SavedReport | null;
  isGenerating: boolean;
  error: string | null;
  
  // Actions
  setTemplates: (templates: ReportTemplate[]) => void;
  addTemplate: (template: Omit<ReportTemplate, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTemplate: (id: string, template: Partial<ReportTemplate>) => void;
  deleteTemplate: (id: string) => void;
  
  setSavedReports: (reports: SavedReport[]) => void;
  addSavedReport: (report: Omit<SavedReport, 'id' | 'dateGenerated'>) => void;
  deleteSavedReport: (id: string) => void;
  
  setCurrentReport: (report: SavedReport | null) => void;
  setGenerating: (isGenerating: boolean) => void;
  setError: (error: string | null) => void;
}

// Create the report store
export const useReportStore = create<ReportState>()(
  persist(
    (set) => ({
      templates: [
        {
          id: '1',
          name: 'Monthly Revenue Report',
          description: 'Overview of revenue for the selected month',
          type: 'revenue',
          config: {
            sections: [
              {
                title: 'Revenue Summary',
                type: 'summary',
                dataSource: 'revenue_summary',
              },
              {
                title: 'Revenue by Client',
                type: 'table',
                dataSource: 'revenue_by_client',
              },
              {
                title: 'Revenue Trend',
                type: 'chart',
                dataSource: 'revenue_trend',
                options: {
                  chartType: 'line',
                },
              },
            ],
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '2',
          name: 'Quarterly Tax Summary',
          description: 'Tax summary for the selected quarter',
          type: 'tax',
          config: {
            sections: [
              {
                title: 'Tax Summary',
                type: 'summary',
                dataSource: 'tax_summary',
              },
              {
                title: 'Taxable Income',
                type: 'table',
                dataSource: 'taxable_income',
              },
              {
                title: 'Tax Deductions',
                type: 'table',
                dataSource: 'tax_deductions',
              },
            ],
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '3',
          name: 'Annual Expense Report',
          description: 'Detailed breakdown of expenses for the year',
          type: 'expense',
          config: {
            sections: [
              {
                title: 'Expense Summary',
                type: 'summary',
                dataSource: 'expense_summary',
              },
              {
                title: 'Expenses by Category',
                type: 'chart',
                dataSource: 'expenses_by_category',
                options: {
                  chartType: 'pie',
                },
              },
              {
                title: 'Monthly Expense Trend',
                type: 'chart',
                dataSource: 'expense_trend',
                options: {
                  chartType: 'bar',
                },
              },
              {
                title: 'Top Expenses',
                type: 'table',
                dataSource: 'top_expenses',
              },
            ],
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '4',
          name: 'Client Revenue Analysis',
          description: 'Analysis of revenue by client',
          type: 'client',
          config: {
            sections: [
              {
                title: 'Client Revenue Summary',
                type: 'summary',
                dataSource: 'client_revenue_summary',
              },
              {
                title: 'Top Clients by Revenue',
                type: 'chart',
                dataSource: 'top_clients_revenue',
                options: {
                  chartType: 'bar',
                },
              },
              {
                title: 'Client Revenue Details',
                type: 'table',
                dataSource: 'client_revenue_details',
              },
            ],
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
      savedReports: [],
      currentReport: null,
      isGenerating: false,
      error: null,
      
      // Template actions
      setTemplates: (templates) => set({ templates }),
      addTemplate: (template) =>
        set((state) => ({
          templates: [
            ...state.templates,
            {
              ...template,
              id: crypto.randomUUID(),
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          ],
        })),
      updateTemplate: (id, template) =>
        set((state) => ({
          templates: state.templates.map((t) =>
            t.id === id
              ? { ...t, ...template, updatedAt: new Date().toISOString() }
              : t
          ),
        })),
      deleteTemplate: (id) =>
        set((state) => ({
          templates: state.templates.filter((t) => t.id !== id),
        })),
      
      // Saved report actions
      setSavedReports: (reports) => set({ savedReports: reports }),
      addSavedReport: (report) =>
        set((state) => ({
          savedReports: [
            ...state.savedReports,
            {
              ...report,
              id: crypto.randomUUID(),
              dateGenerated: new Date().toISOString(),
            },
          ],
        })),
      deleteSavedReport: (id) =>
        set((state) => ({
          savedReports: state.savedReports.filter((r) => r.id !== id),
        })),
      
      // UI state actions
      setCurrentReport: (report) => set({ currentReport: report }),
      setGenerating: (isGenerating) => set({ isGenerating }),
      setError: (error) => set({ error }),
    }),
    {
      name: 'report-storage',
    }
  )
);

// Helper function to generate report data
export const generateReportData = async (template: ReportTemplate, dateRange: { start: string; end: string }, filters: Record<string, any> = {}) => {
  // This would typically fetch data from your API or database
  // For now, we'll generate mock data based on the template type
  
  const mockData: Record<string, any> = {};
  
  // Generate data for each section based on dataSource
  for (const section of template.config.sections) {
    switch (section.dataSource) {
      case 'revenue_summary':
        mockData[section.dataSource] = {
          totalRevenue: 125000,
          paidInvoices: 42,
          unpaidInvoices: 8,
          averageInvoiceValue: 2500,
          revenueGrowth: 15.2,
        };
        break;
        
      case 'revenue_by_client':
        mockData[section.dataSource] = [
          { client: 'Acme Corp', revenue: 35000, invoices: 12, paid: 10, unpaid: 2 },
          { client: 'Globex Inc', revenue: 28500, invoices: 9, paid: 8, unpaid: 1 },
          { client: 'Initech', revenue: 22000, invoices: 7, paid: 6, unpaid: 1 },
          { client: 'Umbrella Corp', revenue: 18500, invoices: 6, paid: 5, unpaid: 1 },
          { client: 'Stark Industries', revenue: 21000, invoices: 8, paid: 7, unpaid: 1 },
        ];
        break;
        
      case 'revenue_trend':
        mockData[section.dataSource] = [
          { month: 'Jan', revenue: 18000 },
          { month: 'Feb', revenue: 20500 },
          { month: 'Mar', revenue: 19800 },
          { month: 'Apr', revenue: 21200 },
          { month: 'May', revenue: 22500 },
          { month: 'Jun', revenue: 23000 },
        ];
        break;
        
      case 'tax_summary':
        mockData[section.dataSource] = {
          totalTaxable: 112000,
          estimatedTax: 28000,
          taxRate: 25,
          deductions: 13000,
          netTaxable: 99000,
        };
        break;
        
      case 'taxable_income':
        mockData[section.dataSource] = [
          { source: 'Services Revenue', amount: 125000 },
          { source: 'Product Sales', amount: 15000 },
          { source: 'Interest Income', amount: 2000 },
          { source: 'Other Income', amount: 5000 },
        ];
        break;
        
      case 'tax_deductions':
        mockData[section.dataSource] = [
          { category: 'Office Expenses', amount: 5000 },
          { category: 'Travel Expenses', amount: 3500 },
          { category: 'Software Subscriptions', amount: 2500 },
          { category: 'Professional Services', amount: 2000 },
        ];
        break;
        
      case 'expense_summary':
        mockData[section.dataSource] = {
          totalExpenses: 68000,
          largestCategory: 'Office Rent',
          largestAmount: 24000,
          expenseCount: 142,
          taxDeductible: 52000,
        };
        break;
        
      case 'expenses_by_category':
        mockData[section.dataSource] = [
          { category: 'Office Rent', amount: 24000 },
          { category: 'Salaries', amount: 18000 },
          { category: 'Software', amount: 8500 },
          { category: 'Marketing', amount: 7500 },
          { category: 'Utilities', amount: 5000 },
          { category: 'Travel', amount: 3500 },
          { category: 'Miscellaneous', amount: 1500 },
        ];
        break;
        
      case 'expense_trend':
        mockData[section.dataSource] = [
          { month: 'Jan', amount: 10500 },
          { month: 'Feb', amount: 11200 },
          { month: 'Mar', amount: 10800 },
          { month: 'Apr', amount: 11500 },
          { month: 'May', amount: 12000 },
          { month: 'Jun', amount: 12000 },
        ];
        break;
        
      case 'top_expenses':
        mockData[section.dataSource] = [
          { date: '2023-06-01', category: 'Office Rent', vendor: 'ABC Properties', amount: 4000, taxDeductible: true },
          { date: '2023-06-15', category: 'Salaries', vendor: 'Payroll', amount: 3000, taxDeductible: true },
          { date: '2023-06-10', category: 'Software', vendor: 'Adobe', amount: 1200, taxDeductible: true },
          { date: '2023-06-05', category: 'Marketing', vendor: 'Google Ads', amount: 1000, taxDeductible: true },
          { date: '2023-06-20', category: 'Utilities', vendor: 'Power Company', amount: 850, taxDeductible: true },
        ];
        break;
        
      case 'client_revenue_summary':
        mockData[section.dataSource] = {
          totalClients: 15,
          activeClients: 12,
          topClient: 'Acme Corp',
          topClientRevenue: 35000,
          averageClientValue: 8333,
        };
        break;
        
      case 'top_clients_revenue':
        mockData[section.dataSource] = [
          { client: 'Acme Corp', revenue: 35000 },
          { client: 'Globex Inc', revenue: 28500 },
          { client: 'Initech', revenue: 22000 },
          { client: 'Stark Industries', revenue: 21000 },
          { client: 'Umbrella Corp', revenue: 18500 },
        ];
        break;
        
      case 'client_revenue_details':
        mockData[section.dataSource] = [
          { client: 'Acme Corp', invoices: 12, paid: 10, unpaid: 2, revenue: 35000, averageValue: 2917 },
          { client: 'Globex Inc', invoices: 9, paid: 8, unpaid: 1, revenue: 28500, averageValue: 3167 },
          { client: 'Initech', invoices: 7, paid: 6, unpaid: 1, revenue: 22000, averageValue: 3143 },
          { client: 'Stark Industries', invoices: 8, paid: 7, unpaid: 1, revenue: 21000, averageValue: 2625 },
          { client: 'Umbrella Corp', invoices: 6, paid: 5, unpaid: 1, revenue: 18500, averageValue: 3083 },
        ];
        break;
        
      default:
        mockData[section.dataSource] = { message: 'No data available' };
    }
  }
  
  return {
    title: template.name,
    type: template.type,
    dateRange,
    filters,
    sections: template.config.sections.map(section => ({
      title: section.title,
      type: section.type,
      data: mockData[section.dataSource] || null,
      options: section.options || {},
    })),
  };
};
