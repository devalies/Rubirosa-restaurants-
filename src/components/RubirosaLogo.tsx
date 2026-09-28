import React from 'react';
import rubirosaLogoPng from '../assets/images/rubirosa_official_logo.png';

interface RubirosaLogoProps {
  className?: string;
  variant?: 'full-stacked' | 'horizontal' | 'mark-only';
  theme?: 'dark' | 'light';
}

export const RubirosaLogo: React.FC<RubirosaLogoProps> = ({
  className = 'h-10',
  variant = 'horizontal',
  theme = 'light',
}) => {
  if (variant === 'mark-only') {
    return (
      <div className={`inline-flex items-center ${className}`}>
        <img
          src={rubirosaLogoPng}
          alt="Rubirosa"
          className="h-full w-auto object-contain select-none"
          loading="eager"
          decoding="async"
        />
      </div>
    );
  }

  if (variant === 'full-stacked') {
    return (
      <div className="inline-flex flex-col items-center select-none text-center">
        <div className={`flex items-center justify-center ${className}`}>
          <img
            src={rubirosaLogoPng}
            alt="Rubirosa"
            className="h-full w-auto max-w-[240px] sm:max-w-[280px] object-contain drop-shadow-md"
            loading="eager"
            decoding="async"
          />
        </div>
        <div className="flex items-center gap-2 mt-2.5 w-full justify-center">
          <span className="h-[1.5px] w-6 sm:w-8 bg-[#FCBA12]/70" />
          <span
            className={`text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase ${
              theme === 'dark' ? 'text-stone-300' : 'text-stone-700'
            }`}
          >
            Pizzeria & Ristorante
          </span>
          <span className="h-[1.5px] w-6 sm:w-8 bg-[#FCBA12]/70" />
        </div>
        <span
          className={`text-[9px] font-semibold tracking-[0.2em] uppercase mt-0.5 ${
            theme === 'dark' ? 'text-stone-500' : 'text-stone-400'
          }`}
        >
          Nolita · New York City
        </span>
      </div>
    );
  }

  // Default 'horizontal' lockup for Navbar and Header badges
  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <img
        src={rubirosaLogoPng}
        alt="Rubirosa"
        className="h-full w-auto max-h-12 object-contain filter drop-shadow-xs transition-transform duration-200 group-hover:scale-[1.02]"
        loading="eager"
        decoding="async"
      />
    </div>
  );
};
export default RubirosaLogo;
