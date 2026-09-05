import React, { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CIRCLES_LAYOUT_ID } from "../context/IntroContext";

type Props = {
  layoutMorph?: boolean;
};

export default function BackgroundCircles({ layoutMorph = false }: Props) {
  const gradId = useId();
  const shouldReduceMotion = useReducedMotion();

  // 6 Fine art pigment beads representing master mediums taught at Jeeva Art School:
  // Tanjore Gold, Rose Madder (Watercolour), Cerulean Sky (Acrylic), Viridian Emerald (Oil),
  // Amethyst Plum (Pastel/Gouache), Lapis Ultramarine (Pencil/Fine Glaze).
  // Perfectly proportioned with max diameter ~205px so the halo stays fully in view.
  const particles = [
    {
      name: "Tanjore Gold",
      color: "#f59e0b",
      glow: "rgba(245, 158, 11, 0.9)",
      sizeClass: "w-2 h-2 sm:w-2.5 sm:h-2.5",
      orbitClass: "w-[125px] h-[125px] sm:w-[155px] sm:h-[155px]",
      duration: 20,
      reverse: false,
      startAngle: 15,
      pulseDuration: 3.2,
    },
    {
      name: "Rose Madder",
      color: "#f43f5e",
      glow: "rgba(244, 63, 94, 0.85)",
      sizeClass: "w-2 h-2 sm:w-2.5 sm:h-2.5",
      orbitClass: "w-[140px] h-[140px] sm:w-[175px] sm:h-[175px]",
      duration: 26,
      reverse: true,
      startAngle: 75,
      pulseDuration: 3.8,
    },
    {
      name: "Cerulean Sky",
      color: "#38bdf8",
      glow: "rgba(56, 189, 248, 0.9)",
      sizeClass: "w-2 h-2 sm:w-2.5 sm:h-2.5",
      orbitClass: "w-[115px] h-[115px] sm:w-[145px] sm:h-[145px]",
      duration: 22,
      reverse: false,
      startAngle: 135,
      pulseDuration: 3.5,
    },
    {
      name: "Viridian Emerald",
      color: "#10b981",
      glow: "rgba(16, 185, 129, 0.85)",
      sizeClass: "w-2 h-2 sm:w-2.5 sm:h-2.5",
      orbitClass: "w-[150px] h-[150px] sm:w-[190px] sm:h-[190px]",
      duration: 32,
      reverse: true,
      startAngle: 195,
      pulseDuration: 4.2,
    },
    {
      name: "Amethyst Plum",
      color: "#a855f7",
      glow: "rgba(168, 85, 247, 0.85)",
      sizeClass: "w-2 h-2 sm:w-2.5 sm:h-2.5",
      orbitClass: "w-[130px] h-[130px] sm:w-[165px] sm:h-[165px]",
      duration: 24,
      reverse: false,
      startAngle: 255,
      pulseDuration: 3.6,
    },
    {
      name: "Lapis Ultramarine",
      color: "#6366f1",
      glow: "rgba(99, 102, 241, 0.9)",
      sizeClass: "w-2 h-2 sm:w-2.5 sm:h-2.5",
      orbitClass: "w-[160px] h-[160px] sm:w-[205px] sm:h-[205px]",
      duration: 36,
      reverse: true,
      startAngle: 315,
      pulseDuration: 4.5,
    },
  ];

  const dustMotes = [
    { x: "24%", y: "22%", color: "#fbbf24", delay: 0 },
    { x: "76%", y: "26%", color: "#f43f5e", delay: 1.2 },
    { x: "22%", y: "76%", color: "#38bdf8", delay: 2.1 },
    { x: "78%", y: "74%", color: "#10b981", delay: 3.3 },
  ];

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
    >
      {/* Bounded concentric circle container (~200px mobile, ~240px desktop) */}
      <motion.div
        layoutId={layoutMorph ? CIRCLES_LAYOUT_ID : undefined}
        transition={{ type: "spring", stiffness: 70, damping: 16, mass: 0.9 }}
        className="relative w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] shrink-0 flex items-center justify-center"
      >
        {/* 0. Upward Atmospheric Atelier Halo gently framing the portrait with comfortable breathing room */}
        <div
          className="absolute -top-4 sm:-top-6 w-[260px] sm:w-[320px] h-[180px] sm:h-[220px] rounded-full blur-2xl sm:blur-3xl opacity-35 dark:opacity-30 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 65%, rgba(245, 158, 11, 0.35) 0%, rgba(244, 63, 94, 0.2) 42%, rgba(139, 92, 246, 0.12) 68%, transparent 85%)",
          }}
        />

        {/* 1. Core Portrait Backlight (Golden Atelier Glow directly framing portrait) */}
        <motion.div
          className="absolute inset-0 m-auto w-24 h-24 sm:w-32 sm:h-32 rounded-full blur-md sm:blur-lg opacity-75 dark:opacity-70 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(251, 191, 36, 0.75) 0%, rgba(225, 29, 72, 0.4) 55%, transparent 80%)",
          }}
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  scale: [0.95, 1.08, 0.95],
                  opacity: [0.65, 0.85, 0.65],
                }
          }
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* 2. Organic Primary Watercolor Wash */}
        <motion.div
          className="absolute inset-0 m-auto w-36 h-36 sm:w-48 sm:h-48 rounded-full blur-xl sm:blur-2xl opacity-40 dark:opacity-35 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 35% 35%, rgba(245, 158, 11, 0.8) 0%, rgba(244, 63, 94, 0.6) 40%, rgba(139, 92, 246, 0.4) 70%, transparent 85%)",
          }}
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  scale: [0.96, 1.1, 0.96],
                  rotate: [0, 180, 360],
                  borderRadius: [
                    "44% 56% 62% 38% / 46% 42% 58% 54%",
                    "56% 44% 38% 62% / 58% 38% 62% 42%",
                    "38% 62% 54% 46% / 44% 64% 36% 56%",
                    "44% 56% 62% 38% / 46% 42% 58% 54%",
                  ],
                }
          }
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* 3. Counter-rotating Secondary Watercolor Wash */}
        <motion.div
          className="absolute inset-0 m-auto w-32 h-32 sm:w-44 sm:h-44 rounded-full blur-lg sm:blur-xl opacity-30 dark:opacity-25 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 65% 65%, rgba(16, 185, 129, 0.65) 0%, rgba(56, 189, 248, 0.55) 45%, rgba(251, 191, 36, 0.35) 75%, transparent 88%)",
          }}
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  scale: [1.08, 0.94, 1.08],
                  rotate: [360, 180, 0],
                  borderRadius: [
                    "54% 46% 44% 56% / 52% 56% 44% 48%",
                    "42% 58% 60% 40% / 38% 46% 54% 62%",
                    "54% 46% 44% 56% / 52% 56% 44% 48%",
                  ],
                }
          }
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* 4. Fine Atelier Compass Outer Ring (reduced to ~236px desktop, 190px mobile) */}
        <motion.div
          className="absolute inset-0 m-auto w-[190px] h-[190px] sm:w-[236px] sm:h-[236px] pointer-events-none"
          animate={shouldReduceMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 58, repeat: Infinity, ease: "linear" }}
        >
          <svg className="w-full h-full" viewBox="0 0 240 240" fill="none">
            <defs>
              <linearGradient id={`${gradId}-outer`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.55" />
                <stop offset="50%" stopColor="#f43f5e" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.45" />
              </linearGradient>
            </defs>

            {/* Precision dashed outer ring */}
            <circle
              cx="120"
              cy="120"
              r="108"
              stroke={`url(#${gradId}-outer)`}
              strokeWidth="1"
              strokeDasharray="4 8"
              opacity="0.55"
            />

            {/* Crosshair ticks (12, 3, 6, 9 o'clock) contained within 240px */}
            <line x1="120" y1="4" x2="120" y2="14" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" opacity="0.65" />
            <line x1="120" y1="226" x2="120" y2="236" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" opacity="0.65" />
            <line x1="4" y1="120" x2="14" y2="120" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" opacity="0.65" />
            <line x1="226" y1="120" x2="236" y2="120" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" opacity="0.65" />
          </svg>
        </motion.div>

        {/* 5. Delicate Counter-rotating Golden Ratio Inner Ring */}
        <motion.div
          className="absolute inset-0 m-auto w-[145px] h-[145px] sm:w-[180px] sm:h-[180px] pointer-events-none"
          animate={shouldReduceMotion ? undefined : { rotate: -360 }}
          transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
        >
          <svg className="w-full h-full" viewBox="0 0 180 180" fill="none">
            <circle
              cx="90"
              cy="90"
              r="82"
              stroke="#fbbf24"
              strokeWidth="0.75"
              strokeDasharray="2 7"
              strokeLinecap="round"
              opacity="0.4"
            />
            {/* Cardinal pigment nodes */}
            <circle cx="90" cy="8" r="1.5" fill="#f59e0b" opacity="0.8" />
            <circle cx="172" cy="90" r="1.5" fill="#f43f5e" opacity="0.8" />
            <circle cx="90" cy="172" r="1.5" fill="#10b981" opacity="0.8" />
            <circle cx="8" cy="90" r="1.5" fill="#38bdf8" opacity="0.8" />
          </svg>
        </motion.div>

        {/* 6. Orbital Pigment Beads (Constellation orbiting within ~205px boundary) */}
        {particles.map((p, idx) => (
          <motion.div
            key={idx}
            className={`absolute inset-0 m-auto rounded-full pointer-events-none ${p.orbitClass}`}
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    rotate: p.reverse
                      ? [p.startAngle, p.startAngle - 360]
                      : [p.startAngle, p.startAngle + 360],
                  }
            }
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {/* Delicate orbital track ring */}
            <div className="absolute inset-0 rounded-full border border-amber-500/10 dark:border-white/5 pointer-events-none" />

            {/* Static positioning container on perimeter */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <motion.div
                className={`rounded-full ${p.sizeClass}`}
                style={{
                  backgroundColor: p.color,
                  boxShadow: `0 0 8px ${p.glow}, 0 0 16px ${p.glow}`,
                }}
                animate={
                  shouldReduceMotion
                    ? undefined
                    : {
                        scale: [0.92, 1.25, 0.92],
                        opacity: [0.75, 1, 0.75],
                      }
                }
                transition={{
                  duration: p.pulseDuration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: idx * 0.4,
                }}
              />
            </div>
          </motion.div>
        ))}

        {/* 7. Subtle Ambient Atelier Dust Motes */}
        {dustMotes.map((m, idx) => (
          <motion.div
            key={`mote-${idx}`}
            className="absolute w-1 h-1 rounded-full pointer-events-none"
            style={{
              left: m.x,
              top: m.y,
              backgroundColor: m.color,
              boxShadow: `0 0 6px ${m.color}`,
            }}
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: [0.2, 0.85, 0.2],
                    scale: [0.8, 1.35, 0.8],
                    y: [0, -5, 0],
                  }
            }
            transition={{
              duration: 3.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: m.delay,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}