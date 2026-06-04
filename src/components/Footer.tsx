import Link from "next/link";
import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 border-t border-slate-200 text-slate-600 font-sans pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-12 border-b border-slate-200">
          
          {/* Brand Col */}
          <div className="col-span-1 md:col-span-4 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="flex h-9 w-9 items-center justify-center rounded bg-primary text-accent font-serif text-lg font-bold">
                T
              </span>
              <div className="flex flex-col">
                <span className="font-serif text-lg font-bold tracking-wider text-primary">
                  TRIMED PHARMA
                </span>
                <span className="text-[11px] tracking-widest text-accent font-semibold uppercase">
                  Healthcare Solutions
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-slate-500 font-light">
              Trimed Pharma Pvt Ltd is a dedicated, fully integrated distributor of healthcare solutions, operating in Sri Lanka. Consistently striving to make quality healthcare products accessible and affordable.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <a href="#" className="p-2 bg-white rounded-full border border-slate-200 text-slate-400 hover:text-primary hover:border-primary transition-all flex items-center justify-center" aria-label="Twitter">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" className="p-2 bg-white rounded-full border border-slate-200 text-slate-400 hover:text-primary hover:border-primary transition-all flex items-center justify-center" aria-label="Instagram">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="p-2 bg-white rounded-full border border-slate-200 text-slate-400 hover:text-primary hover:border-primary transition-all flex items-center justify-center" aria-label="LinkedIn">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 md:col-span-2 flex flex-col gap-3">
            <h4 className="font-serif text-base font-bold tracking-wider text-primary uppercase">
              Navigation
            </h4>
            <ul className="flex flex-col gap-2 text-sm sm:text-base font-light">
              <li>
                <Link href="/" className="hover:text-primary hover:underline transition-all inline-flex items-center gap-0.5">
                  Home <ArrowUpRight size={10} className="opacity-0 hover:opacity-100" />
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary hover:underline transition-all inline-flex items-center gap-0.5">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-primary hover:underline transition-all inline-flex items-center gap-0.5">
                  Our Products
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="hover:text-primary hover:underline transition-all inline-flex items-center gap-0.5">
                  Blogs & News
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary hover:underline transition-all inline-flex items-center gap-0.5">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Resource Links */}
          <div className="col-span-1 md:col-span-2 flex flex-col gap-3">
            <h4 className="font-serif text-base font-bold tracking-wider text-primary uppercase">
              Company Focus
            </h4>
            <ul className="flex flex-col gap-2 text-sm sm:text-base font-light text-slate-500">
              <li>
                <Link href="/about#vision" className="hover:text-primary hover:underline transition-all">
                  Vision & Mission
                </Link>
              </li>
              <li>
                <Link href="/about#team" className="hover:text-primary hover:underline transition-all">
                  Trimed Team
                </Link>
              </li>
              <li>
                <Link href="/about#suppliers" className="hover:text-primary hover:underline transition-all">
                  Supplier Community
                </Link>
              </li>
              <li>
                <Link href="/about#social" className="hover:text-primary hover:underline transition-all">
                  Social Focus
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="col-span-1 md:col-span-4 flex flex-col gap-4">
            <h4 className="font-serif text-base font-bold tracking-wider text-primary uppercase">
              Get In Touch
            </h4>
            <ul className="flex flex-col gap-3 text-sm sm:text-base font-light">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-accent mt-0.5 flex-shrink-0" />
                <span>Pamankada, Dehiwala, Sri Lanka</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-accent flex-shrink-0" />
                <a href="mailto:info@trimedpharma.com" className="hover:text-primary transition-colors">
                  info@trimedpharma.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <Phone size={18} className="flex-shrink-0" />
                <span>+94 (11) XXX-XXXX (Toll Free)</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Sub Footer */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-slate-400 font-light">
          <p>
            &copy; {currentYear} Trimed Pharma Pvt Ltd. All Rights Reserved.
          </p>
          <p className="flex items-center gap-1">
            <span>Designed & Developed By</span>
            <a
              href="https://www.arcai.agency"
              target="_blank"
              className="font-semibold text-slate-600 hover:text-primary transition-colors"
            >
              ARC AI
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
