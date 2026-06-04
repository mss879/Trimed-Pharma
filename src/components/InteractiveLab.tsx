"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface NodeItem {
  x: number;
  y: number;
  el: SVGCircleElement;
  vx: number;
  vy: number;
  originalVx: number;
  originalVy: number;
}

export default function InteractiveLab() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const svg = svgRef.current;
    const container = containerRef.current;
    if (!svg || !container) return;

    // Create particles/nodes
    const numNodes = 12;
    const nodes: NodeItem[] = [];
    const width = 400;
    const height = 400;

    // Generate random nodes
    for (let i = 0; i < numNodes; i++) {
      const circle = svg.querySelector(`#node-${i}`) as SVGCircleElement;
      if (circle) {
        const vx = (Math.random() - 0.5) * 0.6;
        const vy = (Math.random() - 0.5) * 0.6;
        nodes.push({
          x: Math.random() * (width - 60) + 30,
          y: Math.random() * (height - 60) + 30,
          el: circle,
          vx,
          vy,
          originalVx: vx,
          originalVy: vy,
        });
      }
    }

    // Capture mouse coordinates relative to SVG scale (0-400)
    const handleMouseMove = (e: MouseEvent) => {
      const rect = svg.getBoundingClientRect();
      mouseRef.current = {
        x: ((e.clientX - rect.left) / rect.width) * width,
        y: ((e.clientY - rect.top) / rect.height) * height,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    // Animate lines
    const lines = svg.querySelectorAll(".connection-line");

    // Animate nodes continuously using GSAP ticker
    const update = () => {
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Move nodes
      nodes.forEach((node) => {
        let vx = node.vx;
        let vy = node.vy;

        // Apply mouse repulsion if cursor is inside boundaries
        if (mx > 0 && my > 0) {
          const dx = node.x - mx;
          const dy = node.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 90) {
            // Push force: stronger when closer
            const force = (90 - dist) / 90;
            const angle = Math.atan2(dy, dx);
            
            // Push node away
            vx += Math.cos(angle) * force * 3.5;
            vy += Math.sin(angle) * force * 3.5;
          }
        }

        // Apply friction to slow down to original drift velocities
        node.x += vx;
        node.y += vy;

        node.vx += (node.originalVx - node.vx) * 0.08;
        node.vy += (node.originalVy - node.vy) * 0.08;

        // Bounce off walls with safety margins
        const margin = 20;
        if (node.x < margin) {
          node.x = margin;
          node.vx *= -1;
          node.originalVx *= -1;
        } else if (node.x > width - margin) {
          node.x = width - margin;
          node.vx *= -1;
          node.originalVx *= -1;
        }

        if (node.y < margin) {
          node.y = margin;
          node.vy *= -1;
          node.originalVy *= -1;
        } else if (node.y > height - margin) {
          node.y = height - margin;
          node.vy *= -1;
          node.originalVy *= -1;
        }

        // Update SVG circle attributes
        node.el.setAttribute("cx", node.x.toFixed(1));
        node.el.setAttribute("cy", node.y.toFixed(1));
      });

      // Update connection lines based on updated positions
      let lineIndex = 0;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Connect nodes within range
          if (dist < 125 && lineIndex < lines.length) {
            const line = lines[lineIndex] as SVGLineElement;
            line.setAttribute("x1", nodes[i].x.toFixed(1));
            line.setAttribute("y1", nodes[i].y.toFixed(1));
            line.setAttribute("x2", nodes[j].x.toFixed(1));
            line.setAttribute("y2", nodes[j].y.toFixed(1));
            // Set opacity based on distance
            line.setAttribute("stroke-opacity", (1 - dist / 125).toFixed(2));
            lineIndex++;
          }
        }
      }

      // Fade out unused lines
      for (let k = lineIndex; k < lines.length; k++) {
        const line = lines[k] as SVGLineElement;
        line.setAttribute("stroke-opacity", "0");
      }
    };

    gsap.ticker.add(update);

    // Pulse node radius animations
    nodes.forEach((node, idx) => {
      gsap.to(node.el, {
        r: idx % 2 === 0 ? 8 : 5,
        duration: 1.5 + Math.random() * 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    return () => {
      gsap.ticker.remove(update);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-square max-w-[400px] mx-auto bg-slate-50 rounded-3xl border border-slate-200/50 p-4 shadow-inner flex items-center justify-center overflow-hidden group select-none"
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary-soft to-accent/5 opacity-80" />
      
      {/* SVG Canvas */}
      <svg
        ref={svgRef}
        viewBox="0 0 400 400"
        className="w-full h-full relative z-10"
      >
        {/* Connection Lines */}
        {Array.from({ length: 35 }).map((_, idx) => (
          <line
            key={idx}
            className="connection-line"
            stroke="url(#lineGradient)"
            strokeWidth="1.5"
            strokeOpacity="0"
          />
        ))}

        {/* Nodes */}
        {Array.from({ length: 12 }).map((_, idx) => (
          <circle
            key={idx}
            id={`node-${idx}`}
            cx="200"
            cy="200"
            r="6"
            className="fill-primary stroke-white stroke-2 group-hover:fill-accent group-hover:stroke-primary transition-all duration-300 cursor-pointer"
          />
        ))}

        {/* Gradients definitions */}
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#064e3b" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#d4af37" stopOpacity="0.8" />
          </linearGradient>
        </defs>
      </svg>

      {/* Centered pulse graphic */}
      <div className="absolute h-24 w-24 rounded-full border border-primary/10 animate-ping opacity-25 pointer-events-none" />
      <div className="absolute h-12 w-12 rounded-full border border-accent/20 animate-pulse opacity-40 pointer-events-none" />
    </div>
  );
}
