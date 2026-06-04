import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Trimed Pharma | Patient-Centered Healthcare Solutions in Sri Lanka",
  description: "Trimed Pharma Pvt Ltd is a dedicated, fully integrated distributor of healthcare solutions in Sri Lanka. Making quality healthcare accessible and affordable.",
  keywords: "Trimed Pharma, pharmaceutical distributor, Sri Lanka, healthcare solutions, generic medicine, branded pharmaceuticals, biopharmaceuticals, OTC medicine",
  authors: [{ name: "Trimed Pharma Pvt Ltd" }],
  openGraph: {
    title: "Trimed Pharma | Healthcare Solutions Sri Lanka",
    description: "Dedicated distributor of patient-centered healthcare solutions, generic, OTC and branded pharmaceuticals.",
    type: "website",
    locale: "en_LK",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-white text-slate-900 selection:bg-accent/20 selection:text-primary">
        {/* Top Info Bar (A11y/Info Header) */}
        <div className="bg-primary text-white py-2 px-4 text-xs flex flex-wrap justify-between items-center border-b border-white/10 z-50 relative font-sans">
          <div className="flex gap-4">
            <span>🕒 Opening Hours: Mon - Fri 8.30 - 5.30</span>
            <span className="hidden sm:inline">📍 Pamankada - Dehiwala, Sri Lanka</span>
          </div>
          <div>
            <a href="mailto:info@trimedpharma.com" className="hover:text-accent transition-colors">
              ✉️ info@trimedpharma.com
            </a>
          </div>
        </div>
        
        {/* Navigation */}
        <Navbar />
        
        {/* Main Content */}
        <main className="flex-grow">{children}</main>
        
        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
