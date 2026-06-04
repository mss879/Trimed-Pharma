"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Clock, User, ChevronRight } from "lucide-react";
import AnimatedWrapper from "@/components/AnimatedWrapper";

export default function Blogs() {
  const blogsList = [
    {
      id: 1,
      title: "The Evolution of Pharmaceutical Cold Chain Logistics in Sri Lanka",
      excerpt: "Exploring how state-of-the-art climate-controlled storage and temperature-sensitive transport verify efficacy for biopharmaceuticals and vaccines under tropical conditions.",
      content: "Cold chain distribution in tropical climates like Sri Lanka presents unique challenges. Trimed Pharma utilizes specialized insulated vehicles, validated data-loggers, and constant temperature-monitoring in our central Dehiwala storage hub to ensure biopharmaceuticals remain in the strict 2°C to 8°C window from port arrival to clinical delivery.",
      category: "Logistics & Supply",
      date: "May 28, 2026",
      readTime: "6 min read",
      author: "Supply Chain Team",
      image: "/images/logistics_warehouse.png"
    },
    {
      id: 2,
      title: "Democratizing Healthcare Access: The Critical Role of Quality Generics",
      excerpt: "Discussing how WHO-GMP approved generic medicines bridge the clinical access gap, providing affordable therapeutic relief across public state sector hospitals.",
      content: "Affordable healthcare is a fundamental right. By working with certified manufacturers globally, Trimed Pharma ensures Sri Lankan citizens receive therapeutic equivalents to branded drugs at a fraction of the cost, democratizing clinical treatment parameters across the island.",
      category: "Healthcare Access",
      date: "May 15, 2026",
      readTime: "4 min read",
      author: "Regulatory Affairs",
      image: "/images/product_showcase.png"
    },
    {
      id: 3,
      title: "Outreach & Community: Delivering Clean Drinking Water to Rural Areas",
      excerpt: "Detailing Trimed Pharma's recent philanthropic CSR initiatives, installing purification plants and donating medical supplies in underprivileged rural regions.",
      content: "Healthcare goes beyond supplying medicine. Our team recently completed a clean water plant installation project in rural Sri Lanka, providing clean drinking water to over 300 families, which directly mitigates waterborne diseases and elevates standard health indices.",
      category: "Social Focus",
      date: "April 20, 2026",
      readTime: "5 min read",
      author: "CSR Committee",
      image: "/images/social_impact_clinic.png"
    },
    {
      id: 4,
      title: "Establishing Resilient Partnerships: A Guide for Global Manufacturers",
      excerpt: "A detailed breakdown of regulatory frameworks, NMRA registration rules, and local licensing compliance required for medical imports into Sri Lanka.",
      content: "Entering a new pharmaceutical market requires deep local insight. Trimed Pharma acts as an essential gateway for international partners, handling licensing, continuous pharmacovigilance reports, and NMRA registration approvals to build secure market entry pipelines.",
      category: "Industry Insights",
      date: "April 02, 2026",
      readTime: "8 min read",
      author: "Trimed Board",
      image: "/images/team_collaboration.png"
    }
  ];

  return (
    <AnimatedWrapper>
      {/* Page Header */}
      <section className="relative bg-slate-50 border-b border-slate-100 py-20 font-sans">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-accent text-sm font-bold uppercase tracking-widest block mb-2">
            Trimed Newsroom
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-primary mb-4">
            Insights & Media
          </h1>
          <nav className="flex justify-center items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-400">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-primary-light">Blogs</span>
          </nav>
        </div>
      </section>

      {/* Blogs Catalog */}
      <section className="py-24 bg-white relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Featured Post */}
          <div className="mb-20" data-animate="fade-up">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-slate-50 border border-slate-100 rounded-3xl overflow-hidden p-6 sm:p-8 hover:shadow-xl transition-all duration-300">
              
              {/* Image */}
              <div className="lg:col-span-6 relative aspect-16/10 lg:aspect-square w-full rounded-2xl overflow-hidden">
                <Image
                  src={blogsList[0].image}
                  alt={blogsList[0].title}
                  fill
                  className="object-cover object-center"
                />
              </div>

              {/* Text */}
              <div className="lg:col-span-6 flex flex-col justify-center py-4">
                <span className="text-accent text-sm font-bold uppercase tracking-widest block mb-3 font-sans">
                  Featured Article • {blogsList[0].category}
                </span>
                
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-4 leading-tight hover:text-primary-light transition-colors">
                  <Link href={`/blogs`}>{blogsList[0].title}</Link>
                </h2>
                
                <p className="text-slate-600 text-base leading-relaxed font-light mb-6">
                  {blogsList[0].excerpt}
                </p>

                {/* Metadata */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 font-sans mb-8 border-b border-slate-200/60 pb-6">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-accent" /> {blogsList[0].date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} className="text-accent" /> {blogsList[0].readTime}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <User size={14} /> By {blogsList[0].author}
                  </span>
                </div>

                <div>
                  <Link
                    href={`/blogs`}
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white hover:bg-primary-light transition-all duration-300 shadow-md shadow-primary/5"
                  >
                    Read Full Article
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

            </div>
          </div>

          {/* Editorial Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogsList.slice(1).map((blog) => (
              <div
                key={blog.id}
                className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between group hover:border-primary/20 hover:shadow-xl transition-all duration-300"
                data-animate="fade-up"
              >
                <div>
                  {/* Image */}
                  <div className="relative aspect-16/10 w-full overflow-hidden">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-primary text-accent text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-md font-sans">
                      {blog.category}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-8">
                    {/* Metadata */}
                    <div className="flex items-center gap-3 text-xs text-slate-400 font-sans mb-4">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={12} className="text-accent" /> {blog.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={12} /> {blog.readTime}
                      </span>
                    </div>

                    <h3 className="text-lg font-serif font-bold text-primary mb-3 leading-snug group-hover:text-primary-light transition-colors line-clamp-2">
                      <Link href={`/blogs`}>{blog.title}</Link>
                    </h3>
                    
                    <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-light mb-4 line-clamp-3">
                      {blog.excerpt}
                    </p>
                  </div>
                </div>

                {/* Read Link */}
                <div className="px-8 pb-8 pt-0">
                  <Link
                    href={`/blogs`}
                    className="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-widest text-primary-light hover:text-accent transition-colors group/btn"
                  >
                    Read Article
                    <ChevronRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </AnimatedWrapper>
  );
}
