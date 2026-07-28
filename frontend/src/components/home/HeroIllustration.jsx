import React from "react";

export function HeroIllustration() {
  return (
    <div className="relative w-full max-w-lg mx-auto lg:max-w-none flex items-center justify-center p-4">
      {/* Background soft orange decorative abstract circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-[420px] sm:h-[420px] bg-accent/20 rounded-full blur-2xl -z-10" />
      <div className="absolute top-10 right-10 w-48 h-48 bg-primary/10 rounded-full blur-xl -z-10" />

      {/* SVG Flat Vector Illustration */}
      <svg
        viewBox="0 0 600 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-md"
      >

        {/* <defs>: Holds reusable visual assets : Linear gradient for soft orange color transitions.*/}
        <defs>
          <linearGradient id="orangeGrad" x1="0" y1="0" x2="600" y2="500" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFF7ED" />
            <stop offset="1" stopColor="#FFEDD5" />
          </linearGradient>
          <linearGradient id="primaryGrad" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#F97316" />
            <stop offset="1" stopColor="#EA580C" />
          </linearGradient>
          <linearGradient id="accentGrad" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#FDBA74" />
            <stop offset="1" stopColor="#FB923C" />
          </linearGradient>
          <filter id="dropShadow" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#F97316" floodOpacity="0.08" />
          </filter>
        </defs>

        {/* Outer Frame Backing */}
        {/*Draws a subtle light-orange ellipse at the bottom to ground the entire illustration with a floor shadow. */}
        <ellipse cx="300" cy="450" rx="250" ry="30" fill="#FED7AA" opacity="0.4" />

        {/* 1. Large Candidate Resume / Profile Card (Background Panel) */}
        <rect
          x="320"
          y="60"
          width="240"
          height="320"
          rx="24"
          fill="#FFFFFF"
          stroke="#FED7AA"
          strokeWidth="3"
          filter="url(#dropShadow)"
        />

        {/* We Are Hiring Tag */}
        <rect x="340" y="85" width="130" height="28" rx="8" fill="#FFF7ED" />
        <text x="352" y="104" fontFamily="sans-serif" fontSize="13" fontWeight="bold" fill="#EA580C">
          We are hiring!
        </text>

        {/* Checkmark Tag */}
        <circle cx="510" cy="98" r="16" fill="#F97316" />
        <path d="M503 98L508 103L517 93" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

        {/* Profile Item 1 */}
        <circle cx="360" cy="150" r="16" fill="#FED7AA" opacity="0.6" />
        <path d="M354 147 A 6 6 0 0 1 366 147 M352 158 C 352 153 368 153 368 158" stroke="#EA580C" strokeWidth="2" fill="none" />
        <rect x="390" y="142" width="120" height="8" rx="4" fill="#FED7AA" opacity="0.8" />
        <rect x="390" y="156" width="80" height="6" rx="3" fill="#FED7AA" opacity="0.4" />
        <line x1="340" y1="180" x2="520" y2="180" stroke="#FFF7ED" strokeWidth="2" />

        {/* Profile Item 2 */}
        <circle cx="360" cy="210" r="16" fill="#FED7AA" opacity="0.6" />
        <path d="M354 207 A 6 6 0 0 1 366 207 M352 218 C 352 213 368 213 368 218" stroke="#EA580C" strokeWidth="2" fill="none" />
        <rect x="390" y="202" width="100" height="8" rx="4" fill="#FED7AA" opacity="0.8" />
        <rect x="390" y="216" width="60" height="6" rx="3" fill="#FED7AA" opacity="0.4" />
        <line x1="340" y1="240" x2="520" y2="240" stroke="#FFF7ED" strokeWidth="2" />

        {/* Profile Item 3 (Highlight Magnified Candidate) */}
        <circle cx="360" cy="270" r="16" fill="#FDBA74" />
        <rect x="390" y="262" width="110" height="8" rx="4" fill="#F97316" />
        <rect x="390" y="276" width="70" height="6" rx="3" fill="#FED7AA" />

        {/* 2. Glass Magnifying Glass inspecting candidate */}
        <g transform="translate(430, 160)">
          <circle cx="50" cy="50" r="42" fill="#FFFFFF" fillOpacity="0.4" stroke="#1F2937" strokeWidth="4" />
          <circle cx="50" cy="50" r="32" fill="#FED7AA" fillOpacity="0.3" stroke="#F97316" strokeWidth="2" strokeDasharray="4 4" />
          {/* Avatar inside glass */}
          <circle cx="50" cy="42" r="12" fill="#F97316" />
          <path d="M36 58 C36 50 64 50 64 58" fill="#1F2937" />
          {/* Handle */}
          <line x1="80" y1="80" x2="110" y2="110" stroke="#1F2937" strokeWidth="8" strokeLinecap="round" />
        </g>

        {/* 3. Orange Beanbag Chair */}
        <path
          d="M 180 260 
             C 120 280, 100 360, 140 410 
             C 180 460, 320 460, 350 410 
             C 380 360, 360 300, 310 270 
             C 270 240, 220 240, 180 260 Z"
          fill="url(#primaryGrad)"
        />
        <path
          d="M 170 300 Q 240 340 330 310"
          stroke="#EA580C"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
        />

        {/* 4. Candidate Woman sitting on beanbag with laptop */}
        {/* Hair */}
        <path d="M210 180 C200 150, 260 140, 265 170 C270 150, 280 180, 260 210 Z" fill="#1F2937" />
        {/* Head & Face */}
        <circle cx="242" cy="182" r="16" fill="#FDBA74" />
        {/* Hair Front Lock */}
        <path d="M230 172 C235 165, 250 168, 254 175" fill="#1F2937" />
        {/* Smile */}
        <path d="M246 186 Q249 190 252 186" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" fill="none" />

        {/* Body & Clothes (Orange Top) */}
        <path d="M225 198 L260 198 L275 270 L210 270 Z" fill="#EA580C" />
        {/* Sleeves */}
        <path d="M225 198 L195 240 L210 245 L235 210 Z" fill="#F97316" />

        {/* Dark Pants & Legs */}
        <path d="M210 270 L290 270 L300 370 L280 370 L250 310 L230 370 L210 370 Z" fill="#1F2937" />

        {/* Yellow Shoes */}
        <ellipse cx="300" cy="372" rx="14" ry="6" fill="#FDBA74" />
        <ellipse cx="220" cy="372" rx="14" ry="6" fill="#FDBA74" />

        {/* Laptop on lap */}
        <rect x="230" y="235" width="55" height="35" rx="4" fill="#E5E7EB" stroke="#1F2937" strokeWidth="2" transform="rotate(-10 230 235)" />
        <polygon points="215,270 285,260 280,265 210,275" fill="#9CA3AF" />

        {/* 5. Potted Plant on the Right Side */}
        <rect x="520" y="340" width="40" height="50" rx="6" fill="#374151" />
        {/* Plant Leaves */}
        <path d="M540 340 C510 300, 480 260, 520 220 C540 260, 540 300, 540 340 Z" fill="#F97316" />
        <path d="M540 340 C570 300, 600 260, 560 220 C540 260, 540 300, 540 340 Z" fill="#EA580C" />
        <path d="M540 340 C530 280, 540 230, 540 200 C550 240, 550 290, 540 340 Z" fill="#FB923C" />

        {/* Floating Decorative Sparkles & Nodes */}
        <circle cx="100" cy="140" r="6" fill="#F97316" />
        <circle cx="560" cy="110" r="4" fill="#FB923C" />
        <circle cx="80" cy="320" r="8" fill="#FDBA74" opacity="0.6" />
        <path d="M120 180 L130 190 M130 180 L120 190" stroke="#F97316" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </div>
  );
}
