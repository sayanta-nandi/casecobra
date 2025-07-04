import type { Metadata } from "next";
// import localFont from "next/font/local";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "./globals.css";
// import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/components/AuthProvider";
import Provider from "@/components/Provider";
import { Toaster } from "@/components/ui/sonner";
import { Recursive } from "next/font/google";
import { constructMetadata } from "@/lib/utils";

const recursive = Recursive({ subsets: ["latin"] });

export const metadata: Metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={recursive.className}>
          <Navbar />
          <main className="flex flex-col grainy-light min-h-[calc(100vh-3.5rem-1px)]">
            <div className="flex-1 flex flex-col h-full">
              <Provider>{children}</Provider>
            </div>
            <Footer />
          </main>
          <Toaster position="bottom-right" />
        </body>
      </html>
    </AuthProvider>
  );
}
