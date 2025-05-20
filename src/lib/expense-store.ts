import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define types for expense tracking
interface Expense {
  id: string;
  date: string;
  category: string;
  amount: number;
  description: string;
  receiptUrl?: string;
  taxDeductible: boolean;
  paymentMethod: string;
  vendor: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

interface ExpenseCategory {
  id: string;
  name: string;
  color: string;
  icon?: string;
  budget?: number;
  description?: string;
}

interface ExpenseFilters {
  startDate?: string;
  endDate?: string;
  categories?: string[];
  minAmount?: number;
  maxAmount?: number;
  taxDeductible?: boolean;
  tags?: string[];
  vendors?: string[];
  searchQuery?: string;
}

interface ExpenseState {
  expenses: Expense[];
  categories: ExpenseCategory[];
  filters: ExpenseFilters;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setExpenses: (expenses: Expense[]) => void;
  addExpense: (expense: Omit<Expense, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateExpense: (id: string, expense: Partial<Expense>) => void;
  deleteExpense: (id: string) => void;
  
  setCategories: (categories: ExpenseCategory[]) => void;
  addCategory: (category: Omit<ExpenseCategory, 'id'>) => void;
  updateCategory: (id: string, category: Partial<ExpenseCategory>) => void;
  deleteCategory: (id: string) => void;
  
  setFilters: (filters: ExpenseFilters) => void;
  clearFilters: () => void;
  
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

// Create the expense store
export const useExpenseStore = create<ExpenseState>()(
  persist(
    (set) => ({
      expenses: [],
      categories: [
        { id: '1', name: 'Office Supplies', color: '#3b82f6', icon: 'Briefcase' },
        { id: '2', name: 'Utilities', color: '#10b981', icon: 'Lightbulb' },
        { id: '3', name: 'Rent', color: '#f59e0b', icon: 'Home' },
        { id: '4', name: 'Salaries', color: '#ef4444', icon: 'Users' },
        { id: '5', name: 'Marketing', color: '#8b5cf6', icon: 'TrendingUp' },
        { id: '6', name: 'Travel', color: '#ec4899', icon: 'Plane' },
        { id: '7', name: 'Software', color: '#6366f1', icon: 'Monitor' },
        { id: '8', name: 'Miscellaneous', color: '#71717a', icon: 'MoreHorizontal' },
      ],
      filters: {},
      isLoading: false,
      error: null,
      
      // Expense actions
      setExpenses: (expenses) => set({ expenses }),
      addExpense: (expense) => 
        set((state) => ({
          expenses: [
            ...state.expenses,
            {
              ...expense,
              id: crypto.randomUUID(),
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          ],
        })),
      updateExpense: (id, expense) =>
        set((state) => ({
          expenses: state.expenses.map((e) =>
            e.id === id
              ? { ...e, ...expense, updatedAt: new Date().toISOString() }
              : e
          ),
        })),
      deleteExpense: (id) =>
        set((state) => ({
          expenses: state.expenses.filter((e) => e.id !== id),
        })),
      
      // Category actions
      setCategories: (categories) => set({ categories }),
      addCategory: (category) =>
        set((state) => ({
          categories: [
            ...state.categories,
            {
              ...category,
              id: crypto.randomUUID(),
            },
          ],
        })),
      updateCategory: (id, category) =>
        set((state) => ({
          categories: state.categories.map((c) =>
            c.id === id ? { ...c, ...category } : c
          ),
        })),
      deleteCategory: (id) =>
        set((state) => ({
          categories: state.categories.filter((c) => c.id !== id),
        })),
      
      // Filter actions
      setFilters: (filters) => set({ filters }),
      clearFilters: () => set({ filters: {} }),
      
      // UI state actions
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
    }),
    {
      name: 'expense-storage',
    }
  )
);

// Helper functions for expense analytics
export const getExpenseAnalytics = (expenses: Expense[], filters: ExpenseFilters = {}) => {
  // Filter expenses based on filters
  let filteredExpenses = [...expenses];
  
  if (filters.startDate) {
    filteredExpenses = filteredExpenses.filter(
      (e) => new Date(e.date) >= new Date(filters.startDate!)
    );
  }
  
  if (filters.endDate) {
    filteredExpenses = filteredExpenses.filter(
      (e) => new Date(e.date) <= new Date(filters.endDate!)
    );
  }
  
  if (filters.categories && filters.categories.length > 0) {
    filteredExpenses = filteredExpenses.filter((e) =>
      filters.categories!.includes(e.category)
    );
  }
  
  if (filters.minAmount !== undefined) {
    filteredExpenses = filteredExpenses.filter(
      (e) => e.amount >= filters.minAmount!
    );
  }
  
  if (filters.maxAmount !== undefined) {
    filteredExpenses = filteredExpenses.filter(
      (e) => e.amount <= filters.maxAmount!
    );
  }
  
  if (filters.taxDeductible !== undefined) {
    filteredExpenses = filteredExpenses.filter(
      (e) => e.taxDeductible === filters.taxDeductible
    );
  }
  
  if (filters.tags && filters.tags.length > 0) {
    filteredExpenses = filteredExpenses.filter((e) =>
      e.tags.some((tag) => filters.tags!.includes(tag))
    );
  }
  
  if (filters.vendors && filters.vendors.length > 0) {
    filteredExpenses = filteredExpenses.filter((e) =>
      filters.vendors!.includes(e.vendor)
    );
  }
  
  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase();
    filteredExpenses = filteredExpenses.filter(
      (e) =>
        e.description.toLowerCase().includes(query) ||
        e.vendor.toLowerCase().includes(query) ||
        e.category.toLowerCase().includes(query) ||
        e.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  }
  
  // Calculate analytics
  const totalExpenses = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);
  
  // Group by category
  const expensesByCategory = filteredExpenses.reduce((acc, expense) => {
    const { category, amount } = expense;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += amount;
    return acc;
  }, {} as Record<string, number>);
  
  // Group by month
  const expensesByMonth = filteredExpenses.reduce((acc, expense) => {
    const date = new Date(expense.date);
    const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    if (!acc[monthYear]) {
      acc[monthYear] = 0;
    }
    acc[monthYear] += expense.amount;
    return acc;
  }, {} as Record<string, number>);
  
  // Tax deductible amount
  const taxDeductibleAmount = filteredExpenses
    .filter((e) => e.taxDeductible)
    .reduce((sum, e) => sum + e.amount, 0);
  
  // Top vendors
  const vendorExpenses = filteredExpenses.reduce((acc, expense) => {
    const { vendor, amount } = expense;
    if (!acc[vendor]) {
      acc[vendor] = 0;
    }
    acc[vendor] += amount;
    return acc;
  }, {} as Record<string, number>);
  
  const topVendors = Object.entries(vendorExpenses)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([vendor, amount]) => ({ vendor, amount }));
  
  return {
    totalExpenses,
    expensesByCategory,
    expensesByMonth,
    taxDeductibleAmount,
    topVendors,
    expenseCount: filteredExpenses.length,
  };
};
