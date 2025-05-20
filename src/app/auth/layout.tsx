import { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-background h-14 flex items-center px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="text-primary text-xl">FinGenie</span>
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="mx-auto w-full max-w-md space-y-6">
          {children}
        </div>
      </main>
      <footer className="border-t py-4 px-6 text-center text-sm text-muted-foreground">
        <p>© 2025 FinGenie. All rights reserved.</p>
      </footer>
    </div>
  );
}
