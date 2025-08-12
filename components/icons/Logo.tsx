import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "w-12 h-12" }) => {
  return (
    <svg
      viewBox="0 0 600 200"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* الدائرة الرئيسية */}
      <circle
        cx="100"
        cy="100"
        r="85"
        fill="url(#cyanGradient)"
        stroke="#0891b2"
        strokeWidth="3"
      />
      
      {/* الدائرة الداخلية البيضاء */}
      <circle
        cx="100"
        cy="100"
        r="65"
        fill="white"
      />
      
      {/* أيقونة المكيف والمروحة */}
      <g transform="translate(65, 65)">
        {/* إطار المكيف الخارجي */}
        <rect
          x="10"
          y="15"
          width="50"
          height="35"
          rx="8"
          fill="none"
          stroke="#0891b2"
          strokeWidth="3"
        />
        
        {/* المروحة الدائرية */}
        <circle
          cx="35"
          cy="32"
          r="10"
          fill="none"
          stroke="#0891b2"
          strokeWidth="2"
        />
        
        {/* شفرات المروحة */}
        <g transform="translate(35, 32)">
          <ellipse cx="0" cy="-7" rx="2" ry="6" fill="#0891b2" />
          <ellipse cx="7" cy="0" rx="6" ry="2" fill="#0891b2" />
          <ellipse cx="0" cy="7" rx="2" ry="6" fill="#0891b2" />
          <ellipse cx="-7" cy="0" rx="6" ry="2" fill="#0891b2" />
          <circle cx="0" cy="0" r="1.5" fill="#0891b2" />
        </g>
        
        {/* خطوط التهوية */}
        <g stroke="#0891b2" strokeWidth="2">
          <line x1="45" y1="20" x2="50" y2="20" />
          <line x1="47" y1="25" x2="52" y2="25" />
          <line x1="45" y1="30" x2="50" y2="30" />
          <line x1="47" y1="35" x2="52" y2="35" />
          <line x1="45" y1="40" x2="50" y2="40" />
        </g>
        
        {/* أداة الصيانة (مفك) */}
        <g transform="translate(15, 45)">
          <rect x="0" y="0" width="2" height="15" fill="#0891b2" rx="1" />
          <circle cx="1" cy="17" r="2.5" fill="#0891b2" />
        </g>
      </g>
      
      {/* تأثيرات التبريد المتموجة */}
      <g opacity="0.6" stroke="#06b6d4" strokeWidth="2" fill="none">
        <path d="M20 130 Q25 125 30 130 T40 130" />
        <path d="M25 140 Q30 135 35 140 T45 140" />
        <path d="M30 150 Q35 145 40 150 T50 150" />
        <path d="M150 130 Q155 125 160 130 T170 130" />
        <path d="M155 140 Q160 135 165 140 T175 140" />
        <path d="M160 150 Q165 145 170 150 T180 150" />
      </g>
      
      {/* النص العربي */}
      <g>
        {/* تقنية */}
        <text
          x="580"
          y="75"
          fontFamily="Arial, sans-serif"
          fontSize="36"
          fontWeight="bold"
          fill="#0891b2"
          textAnchor="end"
          dominantBaseline="middle"
        >
          تقنية
        </text>
        
        {/* النسيم */}
        <text
          x="580"
          y="125"
          fontFamily="Arial, sans-serif"
          fontSize="32"
          fontWeight="bold"
          fill="#0891b2"
          textAnchor="end"
          dominantBaseline="middle"
        >
          النسيم
        </text>
      </g>
      
      {/* التدرج اللوني */}
      <defs>
        <linearGradient id="cyanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="50%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Logo;