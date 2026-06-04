"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, SlidersHorizontal, ArrowRight, ShieldAlert, Sparkles, ShieldCheck, HeartPulse, RefreshCw } from "lucide-react";
import AnimatedWrapper from "@/components/AnimatedWrapper";

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", name: "All Solutions" },
    { id: "otc", name: "Over-the-Counter (OTC)" },
    { id: "generic", name: "Generic Medicines" },
    { id: "branded", name: "Branded Pharma" },
    { id: "biopharma", name: "Biopharmaceuticals" },
  ];

  const productsList = [
    {
      id: 1,
      name: "Essential Multi-Vitamins & Wellness",
      category: "otc",
      description: "Comprehensive daily essential micronutrients and dietary supplements formulated to improve general immunity.",
      standards: "USP/BP Certified",
      icon: <Sparkles className="text-accent" size={24} />,
      details: "Available in private pharmacies island-wide. Focused on child and adult nutrition.",
    },
    {
      id: 2,
      name: "OTC Cough & Respiratory Support",
      category: "otc",
      description: "Quick relief bronchodilator syrup and cough suppressants matching international efficacy benchmarks.",
      standards: "GMP Approved",
      icon: <ShieldCheck className="text-primary-light" size={24} />,
      details: "Symptom relief for dry and chesty coughs with pediatric-safe dosing options.",
    },
    {
      id: 3,
      name: "Broad-Spectrum Antibiotics (Generic)",
      category: "generic",
      description: "Quality generic antimicrobial solutions targeting standard bacterial infections in hospital care.",
      standards: "WHO-GMP Compliant",
      icon: <HeartPulse className="text-primary-light" size={24} />,
      details: "Supplied to both public state hospitals and private nursing units diligently.",
    },
    {
      id: 4,
      name: "Cardiovascular Management Solutions",
      category: "generic",
      description: "Reliable beta-blockers and anti-hypertensive therapeutics for long-term chronic care.",
      standards: "USP Standardized",
      icon: <ShieldAlert className="text-accent" size={24} />,
      details: "Ensuring Sri Lankan patients have access to affordable, daily life-saving maintenance drugs.",
    },
    {
      id: 5,
      name: "Specialized Oncology Formulations",
      category: "branded",
      description: "Precision oncology therapies imported directly from leading research laboratories in Europe.",
      standards: "FDA/EMA Approved",
      icon: <HeartPulse className="text-accent" size={24} />,
      details: "Supplied under special licensing frameworks to specialized medical clinics.",
    },
    {
      id: 6,
      name: "Advanced Biologics & Biosimilars",
      category: "biopharma",
      description: "Recombinant therapeutic proteins and monoclonal antibodies representing the cutting edge of medicine.",
      standards: "Cold-chain Verified",
      icon: <RefreshCw className="text-primary-light" size={24} />,
      details: "Managed under strict temperature control logs from import arrival to clinical deployment.",
    },
    {
      id: 7,
      name: "Pediatric Vaccine Packages",
      category: "biopharma",
      description: "Immunological products distributed directly to immunization centers island-wide.",
      standards: "WHO Prequalified",
      icon: <ShieldCheck className="text-primary-light" size={24} />,
      details: "Providing dependable disease prevention options for Sri Lanka's future generations.",
    },
  ];

  const filteredProducts = productsList.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <AnimatedWrapper>
      {/* Page Header */}
      <section className="relative bg-slate-50 border-b border-slate-100 py-20 font-sans">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-accent text-sm font-bold uppercase tracking-widest block mb-2">
            Our Portfolio
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-primary mb-4">
            Healthcare Solutions
          </h1>
          <nav className="flex justify-center items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-400">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-primary-light">Products</span>
          </nav>
        </div>
      </section>

      {/* Product Catalog */}
      <section className="py-24 bg-white relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Section Heading & Copy */}
          <div className="max-w-3xl mb-16" data-animate="fade-up">
            <span className="text-accent text-sm font-bold uppercase tracking-widest block mb-2">
              Integrated Access
            </span>
            <h2 className="text-3xl font-serif font-bold text-primary mb-6">
              Quality Products Accessible & Affordable
            </h2>
            <p className="text-slate-600 font-light leading-relaxed text-base">
              We represent Over-the-counter (OTC), generic and branded pharmaceuticals and biopharmaceuticals, supplying both the private and public healthcare markets diligently. Our supply chain upholds international standards, ensuring patient safety is at the forefront of every distribution link.
            </p>
          </div>

          {/* Search and Filters panel */}
          <div className="mb-12 flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center bg-slate-50 border border-slate-100 rounded-2xl p-6 font-sans" data-animate="fade-up">
            
            {/* Search Input */}
            <div className="relative w-full lg:max-w-md">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                <Search size={18} />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search solutions..."
                className="w-full bg-white border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary-light transition-all"
              />
            </div>

            {/* Filter Pill Row */}
            <div className="flex flex-wrap gap-2 w-full lg:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? "bg-primary text-white"
                      : "bg-white text-slate-600 border border-slate-200 hover:border-primary/30"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm flex flex-col justify-between group hover:border-primary/20 hover:shadow-xl transition-all duration-300"
                  data-animate="fade-up"
                >
                  <div>
                    {/* Header */}
                    <div className="flex justify-between items-start mb-6">
                      <div className="h-12 w-12 rounded-xl bg-slate-50 text-primary flex items-center justify-center transition-all group-hover:bg-primary group-hover:text-accent">
                        {product.icon}
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest text-accent bg-accent/10 px-3 py-1.5 rounded-full">
                        {product.standards}
                      </span>
                    </div>

                    {/* Meta */}
                    <span className="text-xs font-semibold uppercase tracking-widest text-slate-400 block mb-2 font-sans">
                      {product.category === "otc" && "Over-the-Counter"}
                      {product.category === "generic" && "Generic Pharmaceuticals"}
                      {product.category === "branded" && "Branded Pharmaceuticals"}
                      {product.category === "biopharma" && "Biopharmaceuticals"}
                    </span>

                    <h3 className="text-lg font-serif font-bold text-primary mb-3 leading-snug group-hover:text-primary-light transition-colors">
                      {product.name}
                    </h3>
                    
                    <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-light mb-4">
                      {product.description}
                    </p>

                    <p className="text-slate-500 text-sm border-t border-slate-100 pt-4 leading-relaxed font-light italic">
                      {product.details}
                    </p>
                  </div>

                  <div className="mt-8">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-widest text-primary-light hover:text-accent transition-colors group/btn"
                    >
                      Inquire Product
                      <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-16 text-center text-slate-400 font-sans">
                No solutions matching your filter criteria. Please try another search.
              </div>
            )}
          </div>

          {/* Supplier Gateway Section */}
          <div className="mt-24 bg-slate-50 rounded-3xl border border-slate-100 p-8 sm:p-12" data-animate="fade-up">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <span className="text-accent text-sm font-bold uppercase tracking-widest block mb-2">
                  Market Entry
                </span>
                <h3 className="text-2xl font-serif font-bold text-primary mb-4">
                  For International Supply Partners
                </h3>
                <p className="text-slate-600 text-base leading-relaxed font-light">
                  Are you an international pharmaceutical manufacturer looking to enter the Sri Lankan market? Trimed Pharma offers full registration support, warehousing, licensing capabilities, and a robust country-wide distribution channel.
                </p>
              </div>
              <div className="lg:col-span-4 lg:text-right">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white hover:bg-primary-light transition-all duration-300 shadow-md"
                >
                  Connect with Trimed
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>
    </AnimatedWrapper>
  );
}
