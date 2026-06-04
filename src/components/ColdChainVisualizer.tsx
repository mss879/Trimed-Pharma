"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

interface RouteTelemetry {
  city: string;
  temp: number;
  humidity: number;
  status: "OPTIMAL" | "STABLE" | "WARNING" | "CRITICAL";
  distance: string;
  eta: string;
}

export default function ColdChainVisualizer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tempRef = useRef<HTMLSpanElement>(null);
  const humidityRef = useRef<HTMLSpanElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const [activeRoute, setActiveRoute] = useState<string>("kandy");
  
  const telemetryData: Record<string, RouteTelemetry> = {
    colombo: {
      city: "Colombo Hub (Port & Airport)",
      temp: 4.2,
      humidity: 52,
      status: "OPTIMAL",
      distance: "0 km (Central Intake)",
      eta: "Active Receiving"
    },
    kandy: {
      city: "Kandy Clinical Network",
      temp: 3.8,
      humidity: 50,
      status: "OPTIMAL",
      distance: "115 km via A1",
      eta: "In Transit - 45 min"
    },
    galle: {
      city: "Galle Southern Hospital",
      temp: 4.8,
      humidity: 55,
      status: "STABLE",
      distance: "125 km via Southern Exp",
      eta: "Delivered (10:15 AM)"
    },
    jaffna: {
      city: "Jaffna Teaching Hospital",
      temp: 5.1,
      humidity: 53,
      status: "STABLE",
      distance: "395 km via A9 / Cold-Link",
      eta: "In Transit - 2h 15m"
    }
  };

  const currentData = telemetryData[activeRoute];

  // Live telemetry fluctuating numbers
  useEffect(() => {
    let tempVal = currentData.temp;
    let humidVal = currentData.humidity;

    const interval = setInterval(() => {
      // Small fluctuation
      const deltaTemp = (Math.random() - 0.5) * 0.4;
      const deltaHumid = Math.floor((Math.random() - 0.5) * 3);

      tempVal = Math.max(2.0, Math.min(8.0, Number((tempVal + deltaTemp).toFixed(1))));
      humidVal = Math.max(45, Math.min(65, humidVal + deltaHumid));

      if (tempRef.current) {
        gsap.to(tempRef.current, {
          innerText: tempVal,
          duration: 0.8,
          snap: { innerText: 0.1 },
          ease: "power2.out"
        });
      }
      if (humidityRef.current) {
        gsap.to(humidityRef.current, {
          innerText: humidVal,
          duration: 0.8,
          snap: { innerText: 1 },
          ease: "power2.out"
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [activeRoute, currentData]);

  // SVG route animation on selection change
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // Reset all paths
    const paths = svg.querySelectorAll(".route-path");
    paths.forEach((p) => {
      gsap.set(p, { strokeDasharray: "8, 8", strokeDashoffset: 0 });
    });

    // Animate active path flowing
    const activePath = svg.querySelector(`#path-${activeRoute}`) as SVGPathElement;
    if (activePath) {
      gsap.to(activePath, {
        strokeDashoffset: -160,
        duration: 8,
        repeat: -1,
        ease: "none"
      });
    }

    // Animate pulse rings around active hub
    const pulseRing = svg.querySelector(`#pulse-${activeRoute}`) as SVGCircleElement;
    if (pulseRing) {
      gsap.killTweensOf(pulseRing);
      gsap.fromTo(pulseRing, 
        { r: 6, opacity: 0.9 },
        { r: 24, opacity: 0, duration: 1.5, repeat: -1, ease: "power1.out" }
      );
    }

    // Dynamic info card entry animation
    gsap.fromTo(
      ".telemetry-card",
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
    );

    // Animate graph line
    const graphPath = containerRef.current?.querySelector(".telemetry-graph-path");
    if (graphPath) {
      gsap.fromTo(
        graphPath,
        { strokeDashoffset: 300, strokeDasharray: 300 },
        { strokeDashoffset: 0, duration: 1.2, ease: "power2.out" }
      );
    }
  }, [activeRoute]);

  // Color mappings
  const getStatusColor = (status: string) => {
    switch (status) {
      case "OPTIMAL": return "bg-emerald-500 text-white";
      case "STABLE": return "bg-emerald-600/20 text-emerald-800 border border-emerald-300/40";
      case "WARNING": return "bg-amber-500 text-white";
      default: return "bg-red-500 text-white";
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case "OPTIMAL": return "text-emerald-700";
      case "STABLE": return "text-emerald-600";
      case "WARNING": return "text-amber-600";
      default: return "text-red-600";
    }
  };

  return (
    <div 
      ref={containerRef}
      className="bg-white border border-slate-200/60 rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-100/50 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
    >
      {/* Telemetry Control Panel */}
      <div className="lg:col-span-5 flex flex-col justify-between h-full">
        <div>
          <span className="text-accent text-xs font-bold uppercase tracking-widest block mb-2 font-sans">
            Real-Time Monitor
          </span>
          <h3 className="text-2xl font-serif font-bold text-primary mb-3">
            Cold-Chain Logistics Map
          </h3>
          <p className="text-slate-500 text-sm leading-relaxed mb-6 font-light">
            Click on any distribution node in the map to query current cold-chain shipping logs, temperature sensors, and GPS transit reports.
          </p>

          {/* Quick Tabs */}
          <div className="grid grid-cols-2 gap-2.5 mb-6">
            {Object.keys(telemetryData).map((key) => (
              <button
                key={key}
                onClick={() => setActiveRoute(key)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 border text-center ${
                  activeRoute === key
                    ? "bg-primary text-white border-primary shadow-md shadow-primary/10"
                    : "bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-100 cursor-pointer"
                }`}
              >
                {key === "colombo" ? "Colombo Hub" : telemetryData[key].city.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Live Telemetry Display */}
        <div className="telemetry-card bg-slate-50 border border-slate-100 rounded-2xl p-5 shadow-inner">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-sans">
              Telemetry Feed
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${getStatusColor(currentData.status)}`}>
              {currentData.status}
            </span>
          </div>

          <h4 className="font-serif text-lg font-bold text-primary mb-1">
            {currentData.city}
          </h4>
          <p className="text-slate-400 text-xs mb-4 font-sans">{currentData.distance}</p>

          <div className="grid grid-cols-2 gap-4 border-t border-slate-200/50 pt-4 mb-4">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Temp Sensors</span>
              <div className="flex items-baseline gap-0.5">
                <span ref={tempRef} className="text-2xl font-bold font-serif text-primary leading-none">
                  {currentData.temp}
                </span>
                <span className="text-sm font-semibold text-slate-500">°C</span>
              </div>
              <span className="text-[10px] text-emerald-600 font-sans block mt-1">✓ Secure Range</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Relative Humidity</span>
              <div className="flex items-baseline gap-0.5">
                <span ref={humidityRef} className="text-2xl font-bold font-serif text-primary leading-none">
                  {currentData.humidity}
                </span>
                <span className="text-sm font-semibold text-slate-500">%</span>
              </div>
              <span className="text-[10px] text-slate-500 font-sans block mt-1">±3% Micro-variance</span>
            </div>
          </div>

          {/* Simulated Graph */}
          <div className="h-12 w-full mt-2 relative overflow-hidden bg-white/40 border border-slate-100 rounded-lg p-2">
            <svg viewBox="0 0 300 40" className="w-full h-full">
              <path
                d="M0 25 Q30 5, 60 20 T120 15 T180 25 T240 10 T300 20"
                fill="none"
                stroke="#064e3b"
                strokeWidth="2"
                strokeLinecap="round"
                className="telemetry-graph-path"
              />
              <path
                d="M0 25 Q30 5, 60 20 T120 15 T180 25 T240 10 T300 20 L300 40 L0 40 Z"
                fill="url(#graphGlow)"
                opacity="0.1"
              />
              <defs>
                <linearGradient id="graphGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#064e3b" />
                  <stop offset="100%" stopColor="#064e3b" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
            <span className="absolute bottom-1 right-2 text-[9px] text-slate-400 font-sans font-light">
              Live Logger
            </span>
          </div>

          <div className="flex justify-between items-center text-xs border-t border-slate-200/50 pt-4 mt-4 font-sans text-slate-500">
            <span>Status: <span className={`font-semibold ${getStatusTextColor(currentData.status)}`}>Stable Link</span></span>
            <span className="font-light italic">{currentData.eta}</span>
          </div>
        </div>
      </div>

      {/* Interactive Map Visual (Right Side) */}
      <div className="lg:col-span-7 relative bg-slate-50 rounded-2xl border border-slate-200/50 p-6 w-full flex items-center justify-center overflow-hidden">
        {/* Abstract radial grids in background */}
        <div className="absolute inset-0 bg-[radial-gradient(#064e3b_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.02]" />
        
        {/* Compass card */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm border border-slate-200/50 shadow-md rounded-lg p-2.5 flex items-center gap-2 text-[10px] text-slate-500 font-sans z-20">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Cold-Link System Active</span>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm border border-slate-200/50 shadow-md rounded-lg p-3 text-[10px] text-slate-500 font-sans space-y-1.5 z-20">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="font-medium">Primary Hubs</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-0.5 w-4 border-t-2 border-dashed border-accent" />
            <span>Transit Links</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full border border-emerald-500 animate-ping" />
            <span>Active Pulse</span>
          </div>
        </div>

        {/* Map and SVG Overlay Container */}
        <div className="relative w-full aspect-square max-w-[440px] rounded-xl overflow-hidden border border-slate-100 shadow-inner bg-white">
          {/* Background Map Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/sri_lanka_clinical_map.png"
              alt="Sri Lanka Clinical Telemetry Map"
              fill
              sizes="(max-width: 768px) 100vw, 440px"
              className="object-cover opacity-95"
            />
          </div>

          {/* Interactive SVG Overlay */}
          <svg
            ref={svgRef}
            viewBox="0 0 500 500"
            className="w-full h-full relative z-10 mix-blend-multiply"
          >
            {/* SVG Definitions */}
            <defs>
              <radialGradient id="pulseGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#d4af37" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Dotted Route Paths */}
            {/* Colombo (160, 348) to Jaffna (205, 45) */}
            <path
              id="path-jaffna"
              d="M 160 348 Q 170 190, 205 45"
              fill="none"
              stroke={activeRoute === "jaffna" ? "#d4af37" : "#064e3b"}
              strokeWidth={activeRoute === "jaffna" ? "4.5" : "1.5"}
              strokeOpacity={activeRoute === "jaffna" ? "1.0" : "0.35"}
              strokeDasharray="8, 8"
              className="route-path transition-all duration-300"
            />

            {/* Colombo (160, 348) to Kandy (245, 308) */}
            <path
              id="path-kandy"
              d="M 160 348 Q 200 328, 245 308"
              fill="none"
              stroke={activeRoute === "kandy" ? "#d4af37" : "#064e3b"}
              strokeWidth={activeRoute === "kandy" ? "4.5" : "1.5"}
              strokeOpacity={activeRoute === "kandy" ? "1.0" : "0.35"}
              strokeDasharray="8, 8"
              className="route-path transition-all duration-300"
            />

            {/* Colombo (160, 348) to Galle (198, 441) */}
            <path
              id="path-galle"
              d="M 160 348 Q 175 395, 198 441"
              fill="none"
              stroke={activeRoute === "galle" ? "#d4af37" : "#064e3b"}
              strokeWidth={activeRoute === "galle" ? "4.5" : "1.5"}
              strokeOpacity={activeRoute === "galle" ? "1.0" : "0.35"}
              strokeDasharray="8, 8"
              className="route-path transition-all duration-300"
            />

            {/* Colombo (160, 348) intake link from Port/Airport */}
            <path
              id="path-colombo"
              d="M 110 348 Q 135 348, 160 348"
              fill="none"
              stroke={activeRoute === "colombo" ? "#d4af37" : "#064e3b"}
              strokeWidth={activeRoute === "colombo" ? "4.5" : "1.5"}
              strokeOpacity={activeRoute === "colombo" ? "1.0" : "0.35"}
              strokeDasharray="8, 8"
              className="route-path transition-all duration-300"
            />

            {/* Pulse Waves under active hubs */}
            <circle
              id="pulse-colombo"
              cx="160"
              cy="348"
              r="0"
              fill="none"
              stroke="#d4af37"
              strokeWidth="2"
              opacity="0"
            />
            <circle
              id="pulse-jaffna"
              cx="205"
              cy="45"
              r="0"
              fill="none"
              stroke="#d4af37"
              strokeWidth="2"
              opacity="0"
            />
            <circle
              id="pulse-kandy"
              cx="245"
              cy="308"
              r="0"
              fill="none"
              stroke="#d4af37"
              strokeWidth="2"
              opacity="0"
            />
            <circle
              id="pulse-galle"
              cx="198"
              cy="441"
              r="0"
              fill="none"
              stroke="#d4af37"
              strokeWidth="2"
              opacity="0"
            />

            {/* Hub Click Targets (Transparent overlays) */}
            {/* Colombo Intake (Sea/Air Port) */}
            <circle
              cx="110"
              cy="348"
              r="14"
              className="fill-transparent stroke-transparent cursor-pointer"
              onClick={() => setActiveRoute("colombo")}
            />
            <circle
              cx="110"
              cy="348"
              r="6"
              className="fill-slate-400 stroke-white stroke-2 pointer-events-none"
            />

            {/* Central Colombo HQ */}
            <g className="cursor-pointer" onClick={() => setActiveRoute("colombo")}>
              <circle
                cx="160"
                cy="348"
                r="16"
                className="fill-transparent stroke-transparent"
              />
              <circle
                cx="160"
                cy="348"
                r="10"
                className={`stroke-white stroke-2 transition-all duration-300 pointer-events-none ${
                  activeRoute === "colombo" ? "fill-accent scale-110" : "fill-primary"
                }`}
              />
              <circle cx="160" cy="348" r="3" fill="#ffffff" className="pointer-events-none" />
            </g>

            {/* Jaffna Hub */}
            <g className="cursor-pointer" onClick={() => setActiveRoute("jaffna")}>
              <circle
                cx="205"
                cy="45"
                r="14"
                className="fill-transparent stroke-transparent"
              />
              <circle
                cx="205"
                cy="45"
                r="8"
                className={`stroke-white stroke-2 transition-all duration-300 pointer-events-none ${
                  activeRoute === "jaffna" ? "fill-accent scale-110" : "fill-primary"
                }`}
              />
            </g>

            {/* Kandy Hub */}
            <g className="cursor-pointer" onClick={() => setActiveRoute("kandy")}>
              <circle
                cx="245"
                cy="308"
                r="14"
                className="fill-transparent stroke-transparent"
              />
              <circle
                cx="245"
                cy="308"
                r="8"
                className={`stroke-white stroke-2 transition-all duration-300 pointer-events-none ${
                  activeRoute === "kandy" ? "fill-accent scale-110" : "fill-primary"
                }`}
              />
            </g>

            {/* Galle Hub */}
            <g className="cursor-pointer" onClick={() => setActiveRoute("galle")}>
              <circle
                cx="198"
                cy="441"
                r="14"
                className="fill-transparent stroke-transparent"
              />
              <circle
                cx="198"
                cy="441"
                r="8"
                className={`stroke-white stroke-2 transition-all duration-300 pointer-events-none ${
                  activeRoute === "galle" ? "fill-accent scale-110" : "fill-primary"
                }`}
              />
            </g>

            {/* A small glowing truck element that slides along the active path */}
            <circle
              r="6"
              fill="#d4af37"
              stroke="#ffffff"
              strokeWidth="1.5"
              className="filter drop-shadow-[0_0_4px_#d4af37] pointer-events-none"
              opacity={activeRoute !== "colombo" ? 1 : 0}
            >
              <animateMotion
                dur="7s"
                repeatCount="indefinite"
                path={
                  activeRoute === "kandy"
                    ? "M 160 348 Q 200 328, 245 308"
                    : activeRoute === "galle"
                    ? "M 160 348 Q 175 395, 198 441"
                    : activeRoute === "jaffna"
                    ? "M 160 348 Q 170 190, 205 45"
                    : "M 160 348"
                }
              />
            </circle>
          </svg>
        </div>
      </div>
    </div>
  );
}
