import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header } from '@/components/header'
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "LingoLoop - Learn Modern Slang",
  description: "Test and improve your knowledge of modern slang across generations",
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
        <div className="min-h-screen flex flex-col bg-background">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <footer className="bg-muted text-muted-foreground py-4">
            <div className="container mx-auto px-4 text-center">
              <p>&copy; 2024 LingoLoop. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
