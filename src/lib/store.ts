import { create } from 'zustand';

interface DashboardStore {
  totalIncome: number;
  totalExpenses: number;
  pendingInvoices: number;
  setTotalIncome: (amount: number) => void;
  setTotalExpenses: (amount: number) => void;
  setPendingInvoices: (count: number) => void;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  totalIncome: 0,
  totalExpenses: 0,
  pendingInvoices: 0,
  setTotalIncome: (amount) => set({ totalIncome: amount }),
  setTotalExpenses: (amount) => set({ totalExpenses: amount }),
  setPendingInvoices: (count) => set({ pendingInvoices: count }),
}));
