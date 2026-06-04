"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, MapPin, Phone, Clock, Send, CheckCircle, ArrowRight } from "lucide-react";
import AnimatedWrapper from "@/components/AnimatedWrapper";

export default function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <AnimatedWrapper>
      {/* Page Header */}
      <section className="relative bg-slate-50 border-b border-slate-100 py-20 font-sans">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-accent text-sm font-bold uppercase tracking-widest block mb-2">
            Get in Touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-primary mb-4">
            Contact Us
          </h1>
          <nav className="flex justify-center items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-400">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-primary-light">Contact</span>
          </nav>
        </div>
      </section>

      {/* Main Section */}
      <section className="py-24 bg-white relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            
            {/* Left Col: Contact Form */}
            <div className="lg:col-span-7 bg-slate-50 border border-slate-100 rounded-3xl p-8 sm:p-12 shadow-xl shadow-slate-100/50" data-animate="fade-up">
              <span className="text-accent text-sm font-bold uppercase tracking-widest block mb-2 font-sans">
                Correspondence
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-6">
                Send a Message
              </h2>
              <p className="text-slate-500 text-base mb-10 font-sans font-light">
                Please complete the form below. Our support team or NMRA registration specialist will respond to your inquiry promptly.
              </p>

              {formSubmitted ? (
                <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center flex flex-col items-center gap-4 animate-fade-in font-sans">
                  <CheckCircle size={48} className="text-primary-light" />
                  <h3 className="font-serif text-lg font-bold text-primary">Message Sent Successfully!</h3>
                  <p className="text-slate-600 text-base font-light max-w-xs leading-relaxed">
                    Thank you for contacting Trimed Pharma. A healthcare solutions representative will reach out to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="mt-2 text-sm font-bold uppercase tracking-wider text-primary hover:text-accent transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-sans">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wider mb-2">Name</label>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary-light transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wider mb-2">Email</label>
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary-light transition-all"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wider mb-2">Subject</label>
                    <input
                      type="text"
                      placeholder="Product Inquiry / Supplier partnership..."
                      className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary-light transition-all"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wider mb-2">Message</label>
                    <textarea
                      rows={5}
                      placeholder="Detailed message..."
                      className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary-light transition-all resize-none"
                      required
                    ></textarea>
                  </div>
                  <div className="sm:col-span-2 mt-2">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-10 py-4 text-sm font-semibold uppercase tracking-wider text-white hover:bg-primary-light transition-all duration-300 cursor-pointer w-full sm:w-auto"
                    >
                      Send message
                      <Send size={14} />
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right Col: Details */}
            <div className="lg:col-span-5 flex flex-col gap-10" data-animate="fade-up">
              
              {/* Info Block */}
              <div>
                <span className="text-accent text-sm font-bold uppercase tracking-widest block mb-2 font-sans">
                  Trimed Headquarters
                </span>
                <h2 className="text-3xl font-serif font-bold text-primary mb-6">
                  Contact Information
                </h2>
                <p className="text-slate-500 text-base leading-relaxed font-light">
                  If you have immediate inquiries regarding distribution partnerships, logistics networks, or product licensing, please contact us directly.
                </p>
              </div>

              {/* Grid lists */}
              <div className="flex flex-col gap-6 font-sans">
                
                {/* Item 1 */}
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary-soft text-primary flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-700 mb-1 font-sans">Postal Address</h4>
                    <p className="text-slate-600 text-base font-light font-sans">
                      Pamankada, Dehiwala, Sri Lanka.
                    </p>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary-soft text-primary flex items-center justify-center flex-shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-700 mb-1 font-sans">Email Connection</h4>
                    <p className="text-slate-600 text-base font-light font-sans">
                      <a href="mailto:info@trimedpharma.com" className="hover:text-primary transition-colors">
                        info@trimedpharma.com
                      </a>
                    </p>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary-soft text-primary flex items-center justify-center flex-shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-700 mb-1 font-sans">Telephone Contact</h4>
                    <p className="text-slate-600 text-base font-light font-sans">
                      +94 (11) 234-5678 <span className="text-xs text-slate-400 block mt-0.5 font-sans">(General Office line)</span>
                    </p>
                  </div>
                </div>

                {/* Item 4 */}
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary-soft text-primary flex items-center justify-center flex-shrink-0">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 18h16V8l-4-4H4v14z"></path>
                      <path d="M12 2v4h4"></path>
                      <circle cx="8" cy="14" r="1"></circle>
                      <circle cx="16" cy="14" r="1"></circle>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-700 mb-1 font-sans">Fax Number</h4>
                    <p className="text-slate-600 text-base font-light font-sans">
                      +94 (11) 234-5679
                    </p>
                  </div>
                </div>

                {/* Item 5 */}
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary-soft text-primary flex items-center justify-center flex-shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-700 mb-1 font-sans">Office Hours</h4>
                    <p className="text-slate-600 text-base font-light font-sans">
                      Monday - Friday: 8:30 AM - 5:30 PM <span className="text-xs text-slate-400 block mt-0.5 font-sans">(Closed on weekends & Poya Holidays)</span>
                    </p>
                  </div>
                </div>

              </div>

            </div>

          </div>

          {/* Interactive Map Visual Mockup */}
          <div className="mt-24" data-animate="scale-up">
            <span className="text-accent text-sm font-bold uppercase tracking-widest block mb-4 text-center font-sans">
              Our Location Map
            </span>
            <div className="relative w-full aspect-16/10 sm:aspect-21/9 bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden shadow-inner p-6 flex flex-col justify-center items-center">
              
              {/* Abstract Map Background grid */}
              <div className="absolute inset-0 bg-grid-pattern opacity-60" />
              
              {/* Map Layout */}
              <div className="relative z-10 text-center flex flex-col items-center gap-3 max-w-sm bg-white border border-slate-100 p-8 rounded-2xl shadow-xl font-sans">
                <div className="h-12 w-12 rounded-full bg-primary text-accent flex items-center justify-center animate-bounce shadow-lg shadow-primary/20">
                  <MapPin size={24} />
                </div>
                <h4 className="font-serif text-base font-bold text-primary font-sans">Trimed Pharma Pvt Ltd</h4>
                <p className="text-slate-500 text-sm font-light leading-relaxed font-sans">
                  Pamankada - Dehiwala Road, Dehiwala, Sri Lanka.
                </p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-primary-light hover:text-accent transition-colors group font-sans"
                >
                  Open in Google Maps
                  <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>
    </AnimatedWrapper>
  );
}
