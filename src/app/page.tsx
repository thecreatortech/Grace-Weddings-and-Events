import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-primary-foreground py-4">
        <div className="container flex justify-between items-center">
          <h1 className="text-2xl font-bold">FinGenie</h1>
          <div className="space-x-2">
            <Link href="/auth/login">
              <Button variant="secondary" size="sm">Login</Button>
            </Link>
            <Link href="/auth/register">
              <Button size="sm">Register</Button>
            </Link>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        <section className="py-20 bg-gradient-to-b from-primary/10 to-background">
          <div className="container text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Financial Management Made Simple</h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              Invoice generation, client management, and financial tracking for freelancers and small businesses
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/auth/register">
                <Button size="lg" className="px-8">Get Started</Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline" className="px-8">Learn More</Button>
              </Link>
            </div>
          </div>
        </section>
        
        <section id="features" className="py-20">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Everything You Need</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Invoice Generation</h3>
                <p className="text-muted-foreground">Create professional invoices and quotes in seconds. Send them directly via email or WhatsApp.</p>
              </div>
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Client Management</h3>
                <p className="text-muted-foreground">Keep track of all your clients, their contact details, and invoice history in one place.</p>
              </div>
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Financial Tracking</h3>
                <p className="text-muted-foreground">Monitor your income, expenses, and profits with intuitive dashboards and reports.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-muted py-6">
        <div className="container text-center text-muted-foreground">
          <p>© 2025 FinGenie. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
