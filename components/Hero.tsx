
import React from 'react';

const Hero: React.FC = () => {
  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative bg-gradient-to-br from-cyan-600 via-cyan-700 to-cyan-800 text-white min-h-[60vh] md:min-h-[70vh] flex items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center opacity-15" style={{ backgroundImage: "url('/images/nasim-hero-bg.jpg')" }}></div>
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-600/40 to-cyan-900/60"></div>
      <div className="relative z-10 p-6 flex flex-col items-center">
        <h2 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg mb-4">
          برودة تدوم... صيانة تثق بها
        </h2>
        <p className="max-w-3xl text-lg md:text-2xl font-light text-cyan-100 drop-shadow-md mb-8">
          في تقنية النسيم، نقدم حلول صيانة مكيفات متكاملة تضمن لك هواءً نقيًا وبيئة منعشة طوال العام. خبراء بين يديك.
        </p>
        <button
          onClick={scrollToBooking}
          className="bg-white text-cyan-600 font-bold text-lg py-4 px-10 rounded-full shadow-xl hover:bg-slate-100 transform hover:scale-105 transition-all duration-300 ease-in-out"
        >
          اطلب الخدمة الآن
        </button>
      </div>
    </section>
  );
};

export default Hero;
