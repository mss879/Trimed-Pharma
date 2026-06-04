"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, ShieldCheck, Heart, Users, Scale, Landmark, ChevronRight, 
  Activity, Globe, HeartHandshake, ShieldAlert, Sparkles, ChevronDown, Check, Zap, ClipboardList, Truck, Warehouse
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LiquidImage from "@/components/LiquidImage";
import ColdChainVisualizer from "@/components/ColdChainVisualizer";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideProgress, setSlideProgress] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const heroContainerRef = useRef<HTMLDivElement>(null);

  // Generate stable particle configuration to prevent random values regenerating on slide-change renders
  const particlesConfig = useMemo(() => {
    return Array.from({ length: 14 }).map((_, idx) => ({
      width: Math.random() * 16 + 8,
      height: Math.random() * 16 + 8,
      left: Math.random() * 100,
      top: Math.random() * 100,
      bgClass: idx % 3 === 0 ? "bg-accent/45" : "bg-emerald-400/20"
    }));
  }, []);

  const heroSlides = [
    {
      title: "Patient-Centered Healthcare Solutions",
      subtitle: "Excellence in Quality & Service",
      description: "We are passionate about providing patient-centered healthcare solutions with excellence in quality and service throughout Sri Lanka.",
      ctaText: "Discover Our Services",
      ctaLink: "/products",
      image: "/images/hero_biopharma.png",
      tag: "Biotech & Quality",
      stats: "2.4°C Cold-Chain Verified"
    },
    {
      title: "Promote, Protect & Improve Health",
      subtitle: "Nurturing Lifelong Wellness",
      description: "Our core duty is to promote, protect, and improve the lifelong health of individuals and societies through accessible therapeutics.",
      ctaText: "Explore Our Mission",
      ctaLink: "/about",
      image: "/images/logistics_warehouse.png",
      tag: "Validated Imports",
      stats: "100% NMRA Registered"
    },
    {
      title: "Global Supplier Community",
      subtitle: "Connecting Trust Worldwide",
      description: "We maintain positive, professional interactions with global manufacturing partners to bring advanced medicine to public and private markets.",
      ctaText: "Meet Our Partners",
      ctaLink: "/about#suppliers",
      image: "/images/team_collaboration.png",
      tag: "Global Alliances",
      stats: "25+ Supply Partners"
    },
  ];

  const processSteps = [
    {
      step: "01",
      title: "NMRA Licensing & Registration",
      subtitle: "Regulatory Foundation",
      description: "We handle NMRA dossier submissions, clinical reviews, and product registration compliance to clear local market entry.",
      icon: <ClipboardList size={22} />,
    },
    {
      step: "02",
      title: "Secure Port Clearance & Customs",
      subtitle: "Compliant Importation",
      description: "Experienced logistics clearance handling, compliance validation, and rapid transport from sea/air hubs.",
      icon: <Zap size={22} />,
    },
    {
      step: "03",
      title: "Validated Climate Warehousing",
      subtitle: "Cold Chain Storage",
      description: "Continuous 2°C - 8°C logging and temperature monitoring in our modern storage systems, ensuring product integrity.",
      icon: <Warehouse size={22} />,
    },
    {
      step: "04",
      title: "Island-wide Fleet Distribution",
      subtitle: "Rapid Delivery Care",
      description: "Full supply chain reach across government state hospitals, private pharmacies, and local clinical networks.",
      icon: <Truck size={22} />,
    },
  ];

  const homeProducts = [
    {
      title: "Over-the-Counter (OTC)",
      description: "Everyday clinical remedies, vitamins, skincare, and household wellness essentials directly supplied island-wide.",
      features: ["USP/BP compliant", "High daily safety profile", "Pediatric options"],
      link: "/products?cat=otc",
      icon: <Sparkles className="text-accent" size={24} />,
    },
    {
      title: "Generic Medicines",
      description: "WHO-GMP compliant, high-quality generic therapeutics providing affordable healthcare access to public sectors.",
      features: ["WHO-GMP certified", "Cost-effective relief", "Bio-equivalent formulas"],
      link: "/products?cat=generic",
      icon: <ShieldCheck className="text-primary-light" size={24} />,
    },
    {
      title: "Branded Pharmaceuticals",
      description: "Specialized formulations imported directly from global developers, covering complex chronic disease states.",
      features: ["Imported from USA/EU", "Patented research standard", "Oncology & Specialty"],
      link: "/products?cat=branded",
      icon: <Activity className="text-accent" size={24} />,
    },
    {
      title: "Biopharmaceuticals",
      description: "Monoclonal antibodies, vaccines, and advanced biosimilars requiring strict temperature cold-chain logistics.",
      features: ["Strict cold-chain (2-8°C)", "Immunotherapy treatments", "WHO Prequalified"],
      link: "/products?cat=biopharma",
      icon: <Globe className="text-primary-light" size={24} />,
    },
  ];

  const faqs = [
    {
      q: "What products and therapeutic categories does Trimed Pharma distribute?",
      a: "We distribute a comprehensive portfolio of healthcare products in Sri Lanka including Over-the-counter (OTC) supplements, generic pharmaceuticals, branded medicines, and biopharmaceuticals (vaccines and monoclonal antibodies) across both public hospitals and private pharmacy networks.",
    },
    {
      q: "How does Trimed Pharma ensure cold-chain biopharmaceutical integrity?",
      a: "Our cold-chain logistics operate under strict temperature parameters (typically 2°C to 8°C). We use verified insulation packaging, continuous temperature-monitoring data loggers, and a climate-controlled distribution fleet to ensure products remain safe from port arrival to the patient.",
    },
    {
      q: "Does Trimed Pharma provide NMRA registration and licensing support for suppliers?",
      a: "Yes. Trimed Pharma has a highly skilled in-house regulatory affairs team that handles NMRA (National Medicines Regulatory Authority) dossier submissions, licensing, product registration, and pharmacovigilance on behalf of global manufacturers.",
    },
    {
      q: "Where is Trimed Pharma based and what is its distribution reach?",
      a: "Our headquarters are based in Pamankada, Dehiwala, Sri Lanka. From this central hub, we run a robust distribution network that distributes healthcare solutions island-wide to all major cities, private pharmacies, clinics, and state hospitals.",
    },
    {
      q: "How can global manufacturers partner with Trimed Pharma?",
      a: "Global manufacturers seeking market access in Sri Lanka can contact us via our website form or by emailing info@trimedpharma.com. We provide integrated services covering registration, warehousing, sales & marketing, and logistics network access.",
    },
  ];

  // Auto-play slider
  // Auto-play slider & progress sync
  useEffect(() => {
    setSlideProgress(0);
    const interval = 50; // ms
    const duration = 6000; // ms
    const step = (interval / duration) * 100;
    
    const timer = setInterval(() => {
      setSlideProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlide((current) => (current + 1) % heroSlides.length);
          return 0;
        }
        return prev + step;
      });
    }, interval);
    
    return () => clearInterval(timer);
  }, [currentSlide, heroSlides.length]);

  // Slide content entrance animations when active slide changes
  useEffect(() => {
    if (!heroTextRef.current) return;
    const elements = heroTextRef.current.querySelectorAll(".hero-animate-el");
    gsap.killTweensOf(elements);
    gsap.fromTo(
      elements,
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out"
      }
    );
  }, [currentSlide]);

  // Mouse move parallax inside Hero
  useEffect(() => {
    const container = heroContainerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;

      gsap.to(".hero-parallax-img", {
        x: x * -10,
        y: y * -10,
        duration: 1.2,
        ease: "power2.out",
        overwrite: "auto"
      });
      gsap.to(".hero-parallax-badge-1", {
        x: x * -22,
        y: y * -22,
        duration: 1.5,
        ease: "power2.out",
        overwrite: "auto"
      });
      gsap.to(".hero-parallax-badge-2", {
        x: x * 15,
        y: y * 15,
        duration: 1.5,
        ease: "power2.out",
        overwrite: "auto"
      });
      gsap.to(".hero-parallax-shape", {
        x: x * 25,
        y: y * 25,
        duration: 2,
        ease: "power2.out",
        overwrite: "auto"
      });
    };

    const handleMouseLeave = () => {
      gsap.to([".hero-parallax-img", ".hero-parallax-badge-1", ".hero-parallax-badge-2", ".hero-parallax-shape"], {
        x: 0,
        y: 0,
        duration: 1.5,
        ease: "power3.out"
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // GSAP animations
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      // 1. Process steps timeline animation
      const steps = gsap.utils.toArray(".process-step-card");
      steps.forEach((step: any, index: number) => {
        gsap.fromTo(
          step,
          { opacity: 0, x: index % 2 === 0 ? -60 : 60, y: 30 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: step,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // 2. Connector line drawing animation
      gsap.fromTo(
        ".timeline-line-fill",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".process-timeline-container",
            start: "top 40%",
            end: "bottom 60%",
            scrub: true,
          },
        }
      );

      // 3. Products/Services showcase grid animate
      gsap.fromTo(
        ".product-showcase-card",
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".products-grid-trigger",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // 4. General fade-ups
      const fadeUps = gsap.utils.toArray(".gsap-fade-up");
      fadeUps.forEach((item: any) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 45 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // 5. Image reveals (with scale shift)
      const reveals = gsap.utils.toArray(".gsap-reveal-img");
      reveals.forEach((img: any) => {
        gsap.fromTo(
          img,
          { clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)", scale: 1.1 },
          {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            scale: 1,
            duration: 1.2,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: img,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // 6. Floating hero background particles drift
      const particles = gsap.utils.toArray(".hero-particle");
      particles.forEach((p: any) => {
        gsap.to(p, {
          x: "random(-100, 100)",
          y: "random(-100, 100)",
          duration: "random(12, 22)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }, containerRef);

    return () => context.revert();
  }, []);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div ref={containerRef} className="w-full bg-white">
      {/* 1. Hero Section */}
      <section 
        ref={heroContainerRef}
        className="relative min-h-[90vh] py-20 lg:py-0 w-full overflow-hidden bg-slate-50 text-slate-800 flex items-center border-b border-slate-100 select-none"
      >
        {/* Subtle grid pattern overlay in background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-25 z-0" />
        
        {/* Radial glows */}
        <div className="absolute top-1/4 left-1/4 h-[350px] w-[350px] bg-primary-soft rounded-full filter blur-[100px] opacity-40 z-0 pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 h-[300px] w-[300px] bg-accent/15 rounded-full filter blur-[100px] opacity-30 z-0 pointer-events-none animate-pulse" />

        {/* Drifting microscopic cells */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
          {particlesConfig.map((p, idx) => (
            <div
              key={idx}
              className={`hero-particle absolute rounded-full border border-white/40 shadow-inner ${p.bgClass}`}
              style={{
                width: `${p.width}px`,
                height: `${p.height}px`,
                left: `${p.left}%`,
                top: `${p.top}%`,
                filter: "blur(0.5px)",
              }}
            />
          ))}
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div ref={heroTextRef} className="max-w-2xl">
                
                {/* Meta Indicator */}
                <div className="hero-animate-el flex items-center gap-3 mb-4">
                  <span className="text-[11px] font-bold text-accent uppercase tracking-widest bg-accent-soft px-3 py-1 rounded-full border border-accent/20">
                    {heroSlides[currentSlide].tag || "Biopharma"}
                  </span>
                  <span className="h-[1px] w-8 bg-slate-300" />
                  <span className="text-[11px] font-semibold text-slate-400 font-sans tracking-wide">
                    {heroSlides[currentSlide].stats || "Cold-Chain Certified"}
                  </span>
                </div>

                <span className="hero-animate-el text-primary-light uppercase tracking-widest text-xs font-bold mb-3 block font-sans">
                  {heroSlides[currentSlide].subtitle}
                </span>

                <h1 className="hero-animate-el text-4xl sm:text-5xl lg:text-[3.5rem] font-serif font-bold text-primary mb-6 leading-[1.15]">
                  {heroSlides[currentSlide].title}
                </h1>

                <p className="hero-animate-el text-base sm:text-lg text-slate-500 mb-8 max-w-xl leading-relaxed font-light">
                  {heroSlides[currentSlide].description}
                </p>

                {/* CTAs */}
                <div className="hero-animate-el flex flex-wrap gap-4 mb-10">
                  <Link
                    href={heroSlides[currentSlide].ctaLink}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-primary hover:bg-primary-light px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-all duration-300 group hover:shadow-lg hover:shadow-primary/20 cursor-pointer"
                  >
                    {heroSlides[currentSlide].ctaText}
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 hover:border-primary/30 px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-slate-600 hover:bg-slate-50 transition-all duration-300 cursor-pointer"
                  >
                    Get in Touch
                  </Link>
                </div>
              </div>

              {/* Progress Slider Indicators */}
              <div className="flex gap-4 items-center">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentSlide(index);
                      setSlideProgress(0);
                    }}
                    className="group relative flex flex-col items-start text-left cursor-pointer focus:outline-none"
                  >
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold font-sans transition-colors ${index === currentSlide ? "text-primary font-extrabold" : "text-slate-400 group-hover:text-slate-600"}`}>
                        0{index + 1}
                      </span>
                      <span className={`text-[10px] uppercase font-sans tracking-widest font-bold transition-all ${index === currentSlide ? "text-primary" : "text-slate-400 opacity-0 group-hover:opacity-100"}`}>
                        {index === 0 ? "Biotech" : index === 1 ? "Storage" : "Alliances"}
                      </span>
                    </div>
                    <div className="h-[2px] w-24 bg-slate-200 mt-2 relative overflow-hidden rounded-full">
                      <div
                        className={`absolute left-0 top-0 bottom-0 bg-accent transition-all`}
                        style={index === currentSlide ? { width: `${slideProgress}%`, transition: "none" } : { width: "0%" }}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Graphic/Image Column */}
            <div className="lg:col-span-5 flex justify-center items-center relative">
              
              {/* Rotating background vector elements */}
              <svg 
                viewBox="0 0 500 500" 
                className="hero-parallax-shape absolute h-[115%] w-[115%] text-slate-100 fill-none stroke-current stroke-1 pointer-events-none select-none z-0 opacity-80"
              >
                <circle cx="250" cy="250" r="230" strokeDasharray="6, 12" />
                <circle cx="250" cy="250" r="190" strokeWidth="0.5" stroke="#d4af37" strokeOpacity="0.25" />
                <line x1="250" y1="0" x2="250" y2="500" strokeWidth="0.5" strokeDasharray="4, 4" />
                <line x1="0" y1="250" x2="500" y2="250" strokeWidth="0.5" strokeDasharray="4, 4" />
              </svg>

              {/* Central Premium Shape Image Mask Container */}
              <div className="relative h-[480px] w-full max-w-[360px] md:max-w-[380px] rounded-[3.5rem_8rem_3.5rem_3.5rem] overflow-hidden border border-slate-100 shadow-2xl bg-white/50 backdrop-blur-sm z-10 flex-shrink-0">
                {heroSlides.map((slide, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-[1200ms] ease-in-out ${
                      index === currentSlide 
                        ? "opacity-100 scale-100 z-10" 
                        : "opacity-0 scale-110 z-0 pointer-events-none"
                    }`}
                  >
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      priority={index === 0}
                      className="object-cover object-center hero-parallax-img scale-105 transition-transform duration-[6000ms] ease-out"
                    />
                  </div>
                ))}
                {/* Thin inner border */}
                <div className="absolute inset-0 rounded-[3.5rem_8rem_3.5rem_3.5rem] border border-white/40 pointer-events-none z-20" />
              </div>

              {/* Floating Badge 1: Temperature Sensor (Top-Left) */}
              <div className="hero-parallax-badge-1 absolute -top-2 -left-6 md:-left-8 z-20 bg-white/70 backdrop-blur-md border border-white px-5 py-3 rounded-2xl shadow-xl shadow-slate-200/40 flex items-center gap-3 select-none animate-float">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <div className="font-sans text-left">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">Cold Chain Feed</span>
                  <span className="text-sm font-bold text-primary leading-none">
                    {currentSlide === 0 ? "2.4°C" : currentSlide === 1 ? "3.2°C" : "4.1°C"}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-600 block mt-0.5">✓ STABLE</span>
                </div>
              </div>

              {/* Floating Badge 2: Country Reach / Status (Bottom-Right) */}
              <div className="hero-parallax-badge-2 absolute -bottom-2 -right-6 md:-right-8 z-20 bg-white/70 backdrop-blur-md border border-white px-5 py-3.5 rounded-2xl shadow-xl shadow-slate-200/40 flex items-center gap-3 select-none">
                <div className="h-8 w-8 rounded-xl bg-accent-soft text-accent flex items-center justify-center font-serif text-sm font-bold">
                  SL
                </div>
                <div className="font-sans text-left">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">Compliance</span>
                  <span className="text-xs font-bold text-primary">NMRA Certified</span>
                  <span className="text-[9px] text-slate-500 block">Island-wide Hubs</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 2. Welcome Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 gsap-fade-up">
              <span className="text-accent text-sm font-bold uppercase tracking-widest block mb-2 font-sans">
                Sri Lanka's Trusted Partner
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-6 leading-tight">
                Welcome to Trimed Pharma
              </h2>
              <p className="text-slate-600 leading-relaxed text-base mb-6 font-light">
                Trimed Pharma Pvt Ltd is a dedicated, fully integrated distributor of healthcare solutions operating in Sri Lanka. The company consistently strives to make quality healthcare products accessible and affordable whilst upholding the best care in delivery throughout the country.
              </p>
              <p className="text-slate-600 leading-relaxed text-base mb-8 font-light">
                We represent over-the-counter (OTC), generic, and branded pharmaceuticals and biopharmaceuticals, supplying both the private and public healthcare sectors diligently with international standard excellence.
              </p>
              <div className="mb-6">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wider text-primary hover:text-accent transition-colors group"
                >
                  Read More About Us 
                  <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Right Interactive Visual Grid */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              {/* Card 1: Warehouse photo with Liquid Water Distortion */}
              <div className="w-full gsap-fade-up">
                <LiquidImage 
                  src="/images/logistics_warehouse.png"
                  alt="Pharma distribution warehouse Sri Lanka"
                />
              </div>

              {/* Card 2: Team Collaboration with Liquid Water Distortion */}
              <div className="w-full gsap-fade-up">
                <LiquidImage 
                  src="/images/team_collaboration.png"
                  alt="Trimed Pharma Team Collaboration"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Products/Services Showcase Section */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 products-grid-trigger">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 gsap-fade-up">
            <span className="text-accent text-sm font-bold uppercase tracking-widest block mb-2 font-sans">
              Our Core Offerings
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary">
              Distributing Quality Healthcare Solutions
            </h2>
            <p className="text-slate-500 text-base mt-4 font-light">
              Supplying the Sri Lankan public and private sectors with generic, branded, OTC, and advanced biopharmaceutical solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {homeProducts.map((prod, index) => (
              <div
                key={index}
                className="product-showcase-card bg-white border border-slate-100 rounded-3xl p-8 shadow-sm flex flex-col justify-between group hover:border-primary/20 hover:shadow-xl transition-all duration-300"
              >
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <div className="h-12 w-12 rounded-2xl bg-primary-soft text-primary flex items-center justify-center transition-all group-hover:bg-primary group-hover:text-accent">
                      {prod.icon}
                    </div>
                    <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">
                      Category 0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-2xl font-serif font-bold text-primary mb-3 leading-snug group-hover:text-primary-light transition-colors">
                    {prod.title}
                  </h3>
                  <p className="text-slate-600 text-base leading-relaxed font-light mb-6">
                    {prod.description}
                  </p>

                  <ul className="space-y-3 mb-8 border-t border-slate-100 pt-5">
                    {prod.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-slate-500 font-sans">
                        <Check size={14} className="text-accent flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <Link
                    href={prod.link}
                    className="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-widest text-primary-light hover:text-accent transition-colors group/btn"
                  >
                    View Catalog
                    <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Process Section */}
      <section className="py-24 bg-white relative overflow-hidden process-timeline-container">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-20 gsap-fade-up">
            <span className="text-accent text-sm font-bold uppercase tracking-widest block mb-2 font-sans">
              Our Operating Pipeline
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary">
              How Trimed Pharma Operates
            </h2>
            <p className="text-slate-500 text-base mt-4 font-light">
              An integrated pathway ensuring compliant registration, safe warehousing, and country-wide cold-chain distribution care.
            </p>
          </div>

          {/* Timeline Process Cards */}
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            
            {/* Scroll-triggered visual line connector */}
            <div className="absolute left-1/2 top-10 bottom-10 w-[2px] bg-slate-100 hidden lg:block -translate-x-1/2">
              <div className="timeline-line-fill w-full h-full bg-accent origin-top scale-y-0 relative">
                {/* Glowing bubble at the tip of the scaleY fill */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-4 w-4 rounded-full bg-accent border-[3px] border-white shadow-lg shadow-accent/50" />
              </div>
            </div>

            {processSteps.map((step, idx) => (
              <div
                key={idx}
                className={`lg:col-span-6 flex flex-col justify-center process-step-card ${
                  idx % 2 === 0 ? "lg:text-right lg:items-end lg:pr-12" : "lg:items-start lg:pl-12 lg:mt-24"
                }`}
              >
                <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 shadow-sm max-w-md w-full relative hover:bg-white hover:border-primary/20 hover:shadow-xl transition-all duration-300 group">
                  {/* Step Badge */}
                  <div className={`absolute top-0 -translate-y-1/2 h-10 w-10 rounded-full bg-accent text-primary font-bold text-sm flex items-center justify-center shadow-md font-sans ${
                    idx % 2 === 0 ? "right-6 lg:-right-5" : "left-6 lg:-left-5"
                  }`}>
                    {step.step}
                  </div>

                  <div className={`flex gap-4 items-center mb-4 ${
                    idx % 2 === 0 ? "lg:flex-row-reverse" : "flex-row"
                  }`}>
                    <div className="h-10 w-10 rounded-xl bg-primary-soft text-primary flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-accent transition-all duration-300">
                      {step.icon}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-accent uppercase tracking-widest block font-sans">
                        {step.subtitle}
                      </span>
                      <h3 className="text-lg font-serif font-bold text-primary">
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-slate-600 text-base leading-relaxed font-light">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* Cold-Chain Logistics Section */}
      <section className="py-24 bg-white relative overflow-hidden border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 gsap-fade-up">
            <span className="text-accent text-sm font-bold uppercase tracking-widest block mb-2 font-sans">
              Cold-Chain Distribution Integrity
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary">
              Advanced Thermal Logistics Infrastructure
            </h2>
            <p className="text-slate-500 text-base mt-4 font-light">
              We monitor and protect every biopharmaceutical shipment from port entry to patient delivery using real-time temperature telemetry.
            </p>
          </div>
          
          <div className="gsap-fade-up">
            <ColdChainVisualizer />
          </div>
        </div>
      </section>

      {/* 5. Strength Pillars (Bento Grid) */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 gsap-fade-up">
            <span className="text-accent text-sm font-bold uppercase tracking-widest block mb-2 font-sans">
              Our Foundations
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary">
              The Strengths Behind Our Care
            </h2>
            <p className="text-slate-500 text-base mt-4 font-light">
              Built on highly skilled staff, positive relationships, and social responsibility to deliver healthcare excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1: Team */}
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm flex flex-col justify-between group hover:shadow-xl transition-all duration-300 gsap-fade-up">
              <div>
                <div className="h-12 w-12 rounded-xl bg-primary-soft text-primary flex items-center justify-center mb-6 transition-transform group-hover:scale-110">
                  <Users size={24} />
                </div>
                <h3 className="text-xl font-serif font-bold text-primary mb-4">Trimed Team</h3>
                <p className="text-slate-600 text-base leading-relaxed font-light mb-6">
                  We believe that our staff is the greatest strength of the company. Employees share the core values and contribute to the organizational culture positively with respect for one another.
                </p>
              </div>
              <Link href="/about#team" className="text-sm font-bold uppercase tracking-wider text-primary-light hover:text-accent transition-colors flex items-center gap-1 group/btn">
                Meet the Team
                <ChevronRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </div>

            {/* Card 2: Supplier Community */}
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm flex flex-col justify-between group hover:shadow-xl transition-all duration-300 gsap-fade-up">
              <div>
                <div className="h-12 w-12 rounded-xl bg-primary-soft text-primary flex items-center justify-center mb-6 transition-transform group-hover:scale-110">
                  <Globe size={24} />
                </div>
                <h3 className="text-xl font-serif font-bold text-primary mb-4">Supplier Community</h3>
                <p className="text-slate-600 text-base leading-relaxed font-light mb-6">
                  At Trimed Pharma, we promote positive relationships and effective interactions with our suppliers from across the globe, nurturing links with those who share our same compassion.
                </p>
              </div>
              <Link href="/about#suppliers" className="text-sm font-bold uppercase tracking-wider text-primary-light hover:text-accent transition-colors flex items-center gap-1 group/btn">
                Discover Partnerships
                <ChevronRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </div>

            {/* Card 3: Social Focus */}
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm flex flex-col justify-between group hover:shadow-xl transition-all duration-300 gsap-fade-up">
              <div>
                <div className="h-12 w-12 rounded-xl bg-primary-soft text-primary flex items-center justify-center mb-6 transition-transform group-hover:scale-110">
                  <HeartHandshake size={24} />
                </div>
                <h3 className="text-xl font-serif font-bold text-primary mb-4">Social Focus</h3>
                <p className="text-slate-600 text-base leading-relaxed font-light mb-6">
                  Trimed Pharma consistently supports philanthropic initiatives that help extend and enhance the quality of life, protection of the environment, and clean drinking water for all.
                </p>
              </div>
              <Link href="/about#social" className="text-sm font-bold uppercase tracking-wider text-primary-light hover:text-accent transition-colors flex items-center gap-1 group/btn">
                Check Initiatives
                <ChevronRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Core Values Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            
            {/* Left Image Section */}
            <div className="lg:col-span-5 relative aspect-4/3 sm:aspect-video lg:aspect-square w-full">
              <div className="absolute inset-0 rounded-2xl overflow-hidden border border-slate-100 shadow-2xl shadow-slate-100 gsap-reveal-img">
                <Image
                  src="/images/product_showcase.png"
                  alt="High-end pharmaceutical solutions Trimed Sri Lanka"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>

            {/* Right Values List */}
            <div className="lg:col-span-7 gsap-fade-up">
              <span className="text-accent text-sm font-bold uppercase tracking-widest block mb-2 font-sans">
                Our Pillars
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-8">
                Core Values of Trimed Pharma
              </h2>
              
              <div className="flex flex-col gap-6">
                {[
                  { value: "Safety", text: "Is at the forefront of all the decisions we make.", icon: <ShieldCheck size={20} /> },
                  { value: "Respect", text: "For each other and the community at large.", icon: <Heart size={20} /> },
                  { value: "Teamwork", text: "Empowers individual strength & achievements through synergy.", icon: <Users size={20} /> },
                  { value: "Integrity", text: "Is at the heart of every single corporate achievement.", icon: <Scale size={20} /> },
                  { value: "Honesty", text: "Is the absolute foundation of every corporate action.", icon: <Landmark size={20} /> }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 p-4 rounded-xl hover:bg-slate-50 transition-all border border-transparent group">
                    <div className="h-10 w-10 rounded-lg bg-accent/10 text-primary-light flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-primary group-hover:text-accent">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-serif text-base font-bold text-primary mb-1">
                        {item.value}
                      </h4>
                      <p className="text-slate-600 text-base font-light">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. Social Focus & Outreach Section */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 gsap-fade-up">
              <span className="text-accent text-sm font-bold uppercase tracking-widest block mb-2 font-sans">
                Corporate Social Responsibility
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-6">
                Social Focus & Philanthropy
              </h2>
              <p className="text-slate-600 leading-relaxed text-base mb-6 font-light">
                Trimed Pharma consistently supports philanthropic initiatives that help extend and enhance the quality of life, protection of the environment, eradication of poverty and clean drinking water for all.
              </p>
              <p className="text-slate-600 leading-relaxed text-base mb-8 font-light">
                Donations of healthcare products are made to those in need, clinics based on charity service and for the up lifting of rural hospitals throughout the country. Our staff members are involved in these philanthropic initiatives through the contribution of funds, resources and effort to make each programme a success.
              </p>
              <div>
                <Link
                  href="/about#social"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wider text-primary hover:text-accent transition-colors group"
                >
                  Explore Outreach Programs 
                  <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-6 relative aspect-4/3 sm:aspect-video lg:aspect-square w-full">
              <div className="absolute inset-0 rounded-2xl overflow-hidden border border-slate-100 shadow-2xl shadow-slate-100 gsap-reveal-img">
                <Image
                  src="/images/social_impact_clinic.png"
                  alt="Trimed Pharma rural community healthcare donations Sri Lanka"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. FAQ Section */}
      <section className="py-24 bg-white relative">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 gsap-fade-up">
            <span className="text-accent text-sm font-bold uppercase tracking-widest block mb-2">
              Information Hub
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-500 text-base mt-3 font-light">
              Quick answers detailing product storage, distribution channels, and international supply partnership registration.
            </p>
          </div>

          <div className="space-y-4 gsap-fade-up">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white border border-slate-200/60 rounded-2xl overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center px-6 py-5 text-left text-primary hover:text-primary-light transition-colors focus:outline-none"
                >
                  <span className="font-serif text-base sm:text-lg font-bold pr-4">
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-slate-400 flex-shrink-0 transition-transform duration-300 ${
                      activeFaq === index ? "rotate-180 text-accent" : ""
                    }`}
                  />
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    activeFaq === index ? "max-h-[300px] border-t border-slate-100" : "max-h-0"
                  }`}
                >
                  <p className="px-6 py-5 text-slate-600 text-base leading-relaxed font-light">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. Mini Contact Form Section */}
      <section className="py-24 bg-slate-50 border-t border-slate-100 relative">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-slate-100 rounded-3xl p-8 sm:p-12 shadow-xl shadow-slate-100/50 gsap-fade-up">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-accent text-sm font-bold uppercase tracking-widest block mb-2 font-sans">
                Quick Connection
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary">
                Write to Trimed Pharma
              </h2>
              <p className="text-slate-500 text-base mt-3 font-light">
                Interested in our healthcare solutions? Send a brief message, and our representative will reach back within 24 hours.
              </p>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-sans">
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
                  placeholder="Subject of Query"
                  className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary-light transition-all"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wider mb-2">Message</label>
                <textarea
                  rows={4}
                  placeholder="Type your message here..."
                  className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary-light transition-all resize-none"
                  required
                ></textarea>
              </div>
              <div className="sm:col-span-2 text-center mt-2">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-10 py-4 text-sm font-semibold uppercase tracking-wider text-white hover:bg-primary-light transition-all duration-300 cursor-pointer w-full sm:w-auto"
                >
                  Send Message
                  <ArrowRight size={14} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
