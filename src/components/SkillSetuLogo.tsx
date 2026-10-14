import React from 'react';
import { Language } from '../types';

interface SkillSetuLogoProps {
  language?: Language;
  variant?: 'full' | 'compact' | 'mark';
  className?: string;
}

export const SkillSetuLogo: React.FC<SkillSetuLogoProps> = ({
  language = 'en',
  variant = 'full',
  className = '',
}) => {
  return (
    <div className={`flex items-center gap-2.5 sm:gap-3.5 select-none ${className}`}>
      {/* 1. SkillSetu Official Vector Emblem (The Setu Skill Bridge + AI Beacon + Tricolor Arcs) */}
      <div className="relative shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden shadow-md shadow-blue-950/20 ring-1 ring-blue-900/20 dark:ring-blue-400/30 hover:scale-105 transition-all duration-300">
        <svg
          viewBox="0 0 54 54"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Deep Navy Jewel Gradient Background */}
          <rect width="54" height="54" rx="12" fill="url(#skillSetuBg)" />

          {/* Micro Grid & Coordinates */}
          <circle cx="27" cy="27" r="22" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="0.8" strokeDasharray="2 2" />
          <circle cx="27" cy="27" r="14" stroke="#ffffff" strokeOpacity="0.1" strokeWidth="0.8" />
          <line x1="5" y1="27" x2="49" y2="27" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="0.8" />
          <line x1="27" y1="5" x2="27" y2="49" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="0.8" />

          {/* Top Tiranga Saffron Arc - Education & Youth Aspirations */}
          <path
            d="M8 38 C15 15, 39 15, 46 38"
            stroke="url(#setuSaffronGrad)"
            strokeWidth="3.6"
            strokeLinecap="round"
          />

          {/* Center Cable-Suspension Deck (The "Setu" Bridge) */}
          <path
            d="M10 33 C18 20, 36 20, 44 33"
            stroke="#ffffff"
            strokeWidth="2.8"
            strokeLinecap="round"
          />

          {/* Bottom Tiranga Emerald Green Arc - Industrial Growth & Employment */}
          <path
            d="M13 41 C20 30, 34 30, 41 41"
            stroke="url(#setuEmeraldGrad)"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Vertical Tension Suspension Cables */}
          <line x1="20" y1="24" x2="20" y2="35" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.85" strokeDasharray="1.5 1" />
          <line x1="27" y1="21" x2="27" y2="35" stroke="#ffffff" strokeWidth="1.6" strokeOpacity="0.95" />
          <line x1="34" y1="24" x2="34" y2="35" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.85" strokeDasharray="1.5 1" />

          {/* Left Student / Education Node */}
          <circle cx="16" cy="19" r="2.4" fill="#fb923c" />
          <circle cx="16" cy="19" r="4.2" stroke="#fb923c" strokeWidth="0.8" strokeOpacity="0.4" />

          {/* Right Industry / Employment Node */}
          <circle cx="38" cy="19" r="2.4" fill="#38bdf8" />
          <circle cx="38" cy="19" r="4.2" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.4" />

          {/* Central AI Skill Intelligence Beacon (Keystone with Star) */}
          <circle cx="27" cy="18" r="5" fill="#ffffff" filter="url(#setuBeaconGlow)" />
          <circle cx="27" cy="18" r="2.8" fill="#0284c7" />

          {/* 4-point Diamond Sparkle */}
          <path
            d="M27 15 L28 17.5 L30 18 L28 18.5 L27 21 L26 18.5 L24 18 L26 17.5 Z"
            fill="#ffffff"
          />

          {/* Bottom Foundation Sparkle */}
          <circle cx="27" cy="44" r="1.5" fill="#34d399" />

          {/* Gradient & Filter Definitions */}
          <defs>
            <linearGradient id="skillSetuBg" x1="0" y1="0" x2="54" y2="54" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#081e3a" />
              <stop offset="50%" stopColor="#0f2b50" />
              <stop offset="100%" stopColor="#06152b" />
            </linearGradient>

            <linearGradient id="setuSaffronGrad" x1="8" y1="15" x2="46" y2="38" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ff7700" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>

            <linearGradient id="setuEmeraldGrad" x1="13" y1="30" x2="41" y2="41" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#059669" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>

            <filter id="setuBeaconGlow" x="19" y="10" width="16" height="16" filterUnits="userSpaceOnUse">
              <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#ffffff" floodOpacity="0.8" />
            </filter>
          </defs>
        </svg>

        {/* Tricolor Corner Ribbon */}
        <div className="absolute top-0 right-0 w-3 h-3 overflow-hidden pointer-events-none">
          <div className="w-5 h-1 bg-[#ff7700] rotate-45 translate-x-0 -translate-y-1" />
        </div>
      </div>

      {/* 2. SkillSetu AI Wordmark & Bilingual Typography */}
      {variant !== 'mark' && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 sm:gap-2 leading-none">
            <span className="text-lg sm:text-2xl font-black tracking-tight text-[#101828] dark:text-white font-sans">
              Skill<span className="text-[#0F9F94]">Setu</span>
            </span>
            <span className="px-2 py-0.5 text-[10px] sm:text-[11px] font-black uppercase tracking-wider rounded bg-[#0F9F94] text-white shadow-xs">
              AI
            </span>
            <span className="text-[10px] sm:text-[11px] font-black text-[#101828] bg-[#F4B942] px-1.5 py-0.5 rounded shadow-2xs hidden sm:inline">
              कौशल सेतु
            </span>
          </div>

          {variant === 'full' && (
            <div className="flex items-center gap-1.5 text-[10.5px] sm:text-[11.5px] font-semibold text-slate-600 dark:text-slate-300 mt-1 leading-tight">
              <span className="font-bold text-[#101828] dark:text-slate-200">
                {language === 'en' ? 'Labour Market Intelligence System' : 'श्रम बाजार आसूचना प्रणाली'}
              </span>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <span className="text-[#0F9F94] font-bold truncate">
                MSDE • Govt. of India
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
