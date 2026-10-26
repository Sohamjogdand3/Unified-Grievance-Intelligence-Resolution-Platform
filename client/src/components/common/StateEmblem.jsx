import React from "react";

/**
 * State Emblem of India (Lion Capital of Ashoka) with "सत्यमेव जयते"
 * Scalable SVG vector icon in official institutional styling
 */
export default function StateEmblem({ className = "h-12 w-auto", color = "#17365D" }) {
  return (
    <svg
      viewBox="0 0 100 135"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="State Emblem of India"
    >
      {/* Central Lion Head */}
      <path
        d="M50 8C43 8 38 13 38 20C38 24 40 27 42 29C40 31 39 34 39 38C39 42 41 45 44 47C42 49 41 52 41 55C41 62 45 67 50 67C55 67 59 62 59 55C59 52 58 49 56 47C59 45 61 42 61 38C61 34 60 31 58 29C60 27 62 24 62 20C62 13 57 8 50 8Z"
        fill={color}
      />
      {/* Central Crown & Mane detail */}
      <path
        d="M46 14C46 12 48 10 50 10C52 10 54 12 54 14C54 16 52 17 50 17C48 17 46 16 46 14Z"
        fill="#FFFFFF"
      />
      <circle cx="50" cy="24" r="2.5" fill="#FFFFFF" />
      <path d="M46 32H54V35H46V32Z" fill="#FFFFFF" />
      <path d="M44 42C44 40 47 39 50 39C53 39 56 40 56 42V45H44V42Z" fill="#FFFFFF" />

      {/* Left Lion Profile */}
      <path
        d="M38 22C34 22 30 25 29 29C27 33 28 38 31 41C28 44 27 48 28 52C29 57 33 61 38 63C38 57 39 52 40 48C37 45 36 41 37 37C35 34 35 30 37 27C37 25 38 23 38 22Z"
        fill={color}
        opacity="0.9"
      />
      {/* Right Lion Profile */}
      <path
        d="M62 22C66 22 70 25 71 29C73 33 72 38 69 41C72 44 73 48 72 52C71 57 67 61 62 63C62 57 61 52 60 48C63 45 64 41 63 37C65 34 65 30 63 27C63 25 62 23 62 22Z"
        fill={color}
        opacity="0.9"
      />

      {/* Abacus / Base Platform */}
      <rect x="22" y="68" width="56" height="5" rx="1.5" fill={color} />
      
      {/* Ashoka Chakra in Center of Abacus */}
      <circle cx="50" cy="81" r="7.5" stroke={color} strokeWidth="1.8" />
      <circle cx="50" cy="81" r="2" fill={color} />
      {/* Chakra Spokes */}
      <path
        d="M50 74V88M43 81H57M45 76L55 86M45 86L55 76M47 74.5L53 87.5M47 87.5L53 74.5M43.5 78L56.5 84M43.5 84L56.5 78"
        stroke={color}
        strokeWidth="0.8"
      />

      {/* Galloping Horse (Left) & Bull (Right) stylized */}
      <path
        d="M26 77C28 75 32 75 34 78C35 79 36 82 34 84C32 86 28 85 26 83C25 81 25 78 26 77Z"
        fill={color}
      />
      <path
        d="M74 77C72 75 68 75 66 78C65 79 64 82 66 84C68 86 72 85 74 83C75 81 75 78 74 77Z"
        fill={color}
      />

      {/* Lotus / Base Foundation */}
      <path
        d="M18 90C28 88 72 88 82 90C80 94 72 97 50 97C28 97 20 94 18 90Z"
        fill={color}
      />
      <rect x="24" y="98" width="52" height="3" rx="1" fill={color} />

      {/* Devanagari Inscription: सत्यमेव जयते */}
      <text
        x="50"
        y="114"
        textAnchor="middle"
        fontFamily="sans-serif"
        fontSize="10"
        fontWeight="bold"
        fill={color}
        letterSpacing="0.05em"
      >
        सत्यमेव जयते
      </text>
    </svg>
  );
}
