import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TopNav from "./components/TopNav";
import SideNav from "./components/SideNav";
import AgentChat from "./components/AgentChat";
import { AuthProvider } from "./components/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nexa AI Ops Center",
  description: "Intelligent Real Estate Operations Platform",
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
        <AuthProvider>
          <TopNav />
          <SideNav />
          <main className="ml-64 pt-20 p-8 circuit-pattern min-h-screen">
            {children}
          </main>
          <AgentChat />
        </AuthProvider>
      </body>
    </html>
  );
}
