import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
                <nav className="bg-gray-800 text-white p-4">
          <div className="container mx-auto flex gap-6">
            <Link 
              href="/" 
              className="hover:text-gray-300 transition-colors"
            >
              Accueil
            </Link>
            <Link 
              href="/about" 
              className="hover:text-gray-300 transition-colors"
            >
              À propos
            </Link>
            <Link 
              href="/contact" 
              className="hover:text-gray-300 transition-colors"
            >
              Contact
            </Link>
            <Link 
              href="/coffee" 
              className="hover:text-gray-300 transition-colors"
            >
              Nos Cafés (SSR)
            </Link>
            <Link 
              href="/beers" 
              className="hover:text-gray-300 transition-colors"
            >
              Nos Bières (CSR)
            </Link>
          </div>
        </nav>
        <main>
        {children}
        </main>
      </body>
    </html>
  );
}
