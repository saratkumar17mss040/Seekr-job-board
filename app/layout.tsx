import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Seekr Job board App",
  description:
    "A full‑stack job board with Candidate and Company flows - Seek your future",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col h-screen bg-gray-50">
        <header className="bg-white shadow py-4">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">
              <Link href="/">Seekr Job Board</Link>
            </h1>
            <nav>
              <Link
                href="/candidate/jobs"
                className="text-blue-600 mr-4 hover:underline"
              >
                Candidate
              </Link>
              <Link
                href="/company/jobs"
                className="text-blue-600 hover:underline"
              >
                Company
              </Link>
            </nav>
          </div>
        </header>
        <div className="flex-grow h-full">
          <main className="flex flex-col justify-center h-full flex-grow align-middle container mx-auto px-4 py-6">
            {children}
          </main>
        </div>
        <Toaster />
        
      </body>
    </html>
  );
}
