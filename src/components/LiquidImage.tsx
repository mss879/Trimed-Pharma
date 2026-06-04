"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

interface LiquidImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function LiquidImage({ src, alt, className = "" }: LiquidImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const filterIdRef = useRef(`liquid-distortion-${Math.random().toString(36).substring(2, 9)}`);
  const dispRef = useRef<SVGFEDisplacementMapElement>(null);
  const turbRef = useRef<SVGFETurbulenceElement>(null);
  const offsetRef = useRef<SVGFEOffsetElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const disp = dispRef.current;
    const turb = turbRef.current;
    const offset = offsetRef.current;
    if (!container || !disp || !turb || !offset) return;

    // Set initial displacement scale to 0 (flat)
    gsap.set(disp, { attr: { scale: 0 } });

    let flowTween: gsap.core.Tween | null = null;
    const turbVal = { x: 0.015, y: 0.015 };
    const offsetVal = { x: 0, y: 0 };

    const handleMouseEnter = () => {
      // 1. Initial splash ripple scale-up
      gsap.killTweensOf(disp);
      gsap.fromTo(
        disp,
        { attr: { scale: 0 } },
        {
          attr: { scale: 38 },
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => {
            // Settle to a continuous, responsive wave
            gsap.to(disp, {
              attr: { scale: 16 },
              duration: 1.0,
              ease: "sine.inOut",
            });
          },
        }
      );

      // 2. Continuous idle fluid rippling
      if (flowTween) flowTween.kill();
      flowTween = gsap.to(turbVal, {
        x: 0.03,
        y: 0.05,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        onUpdate: () => {
          turb.setAttribute("baseFrequency", `${turbVal.x} ${turbVal.y}`);
        },
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate localized translation force based on pointer position relative to center
      const targetDx = (x - rect.width / 2) * 0.35;
      const targetDy = (y - rect.height / 2) * 0.35;

      // Animate the displacement noise offset to follow cursor with organic latency (wake drag)
      gsap.to(offsetVal, {
        x: targetDx,
        y: targetDy,
        duration: 0.8,
        ease: "power2.out",
        onUpdate: () => {
          offset.setAttribute("dx", offsetVal.x.toFixed(1));
          offset.setAttribute("dy", offsetVal.y.toFixed(1));
        },
      });

      // Momentarily increase ripple intensity depending on cursor movement speed/offset distance
      const distance = Math.sqrt(
        (targetDx - offsetVal.x) ** 2 + (targetDy - offsetVal.y) ** 2
      );
      if (distance > 5) {
        gsap.to(disp, {
          attr: { scale: Math.min(26, 16 + distance * 0.15) },
          duration: 0.3,
          ease: "power1.out",
          overwrite: "auto",
        });
      }
    };

    const handleMouseLeave = () => {
      // 1. Settle displacement back to flat 0
      gsap.killTweensOf(disp);
      gsap.to(disp, {
        attr: { scale: 0 },
        duration: 0.8,
        ease: "power3.out",
        onComplete: () => {
          if (flowTween) {
            flowTween.kill();
            flowTween = null;
          }
          // Reset base values
          turb.setAttribute("baseFrequency", "0.015 0.015");
          offset.setAttribute("dx", "0");
          offset.setAttribute("dy", "0");
          turbVal.x = 0.015;
          turbVal.y = 0.015;
          offsetVal.x = 0;
          offsetVal.y = 0;
        },
      });
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      if (flowTween) flowTween.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full aspect-square overflow-hidden rounded-3xl cursor-pointer group shadow-xl border border-slate-100/50 ${className}`}
    >
      {/* SVG Displacement Filter definition */}
      <svg className="absolute w-0 h-0 pointer-events-none select-none">
        <defs>
          <filter id={filterIdRef.current}>
            <feTurbulence
              ref={turbRef}
              type="fractalNoise"
              baseFrequency="0.015 0.015"
              numOctaves="2"
              result="noise"
            />
            {/* feOffset shifts the noise coordinates to track mouse pointer */}
            <feOffset
              ref={offsetRef}
              dx="0"
              dy="0"
              in="noise"
              result="offsetNoise"
            />
            <feDisplacementMap
              ref={dispRef}
              in="SourceGraphic"
              in2="offsetNoise"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Styled Image Container */}
      <div
        className="w-full h-full relative z-10 transition-transform duration-700 group-hover:scale-[1.035]"
        style={{ filter: `url(#${filterIdRef.current})` }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
        />
        {/* Soft glassmorphic overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    </div>
  );
}
