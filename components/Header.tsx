import React, { useState } from 'react';
import { WHATSAPP_NUMBER } from '../constants.tsx';
import { WhatsAppIcon } from './icons/ContactIcons.tsx';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const navLinks = (
    <>
      <button onClick={() => scrollToSection('services')} className="hover:text-cyan-500 transition-colors duration-300">خدماتنا</button>
      <button onClick={() => scrollToSection('booking')} className="hover:text-cyan-500 transition-colors duration-300">احجز الآن</button>
      <button onClick={() => scrollToSection('contact')} className="hover:text-cyan-500 transition-colors duration-300">تواصل معنا</button>
    </>
  );

  return (
    <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }} className="hover:opacity-80 transition-opacity duration-300">
            <img 
              src="/nasim/logo.svg" 
              alt="تقنية النسيم" 
              className="w-48 h-16 object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                console.error('Logo image not found. Please add logo.svg to the public folder.');
              }}
            />
          </a>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-lg font-medium text-slate-700">
          {navLinks}
        </nav>
        <div className="hidden md:flex">
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-green-500 text-white font-bold py-2 px-4 rounded-full hover:bg-green-600 transition-all duration-300 transform hover:scale-105">
            <WhatsAppIcon className="w-5 h-5"/>
            <span>واتساب</span>
          </a>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-700 focus:outline-none">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <nav className="flex flex-col items-center gap-4 py-4 text-lg font-medium text-slate-700">
            {navLinks}
             <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-green-500 text-white font-bold py-2 px-4 rounded-full hover:bg-green-600 transition-all duration-300">
                <WhatsAppIcon className="w-5 h-5"/>
                <span>تواصل واتساب</span>
              </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;