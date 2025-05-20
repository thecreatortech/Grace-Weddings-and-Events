import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}

export function generateInvoiceNumber(): string {
  const prefix = "INV";
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `${prefix}#${randomNum}`;
}

export function calculateTotals(items: any[]) {
  const subtotal = items.reduce((sum, item) => sum + (parseFloat(item.price) * parseFloat(item.quantity)), 0);
  const tax = subtotal * 0.18; // 18% GST (9% CGST + 9% SGST)
  const total = subtotal + tax;
  
  return { subtotal, tax, total };
}
