import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.tsx';
import Hero from './components/Hero.tsx';
import Services from './components/Services.tsx';
import HowItWorks from './components/HowItWorks.tsx';
import BookingForm from './components/BookingForm.tsx';
import Contact from './components/Contact.tsx';
import Footer from './components/Footer.tsx';
import AdminApp from './src/admin/AdminApp.tsx';

// Main Website Component
const MainSite: React.FC = () => {
  return (
    <div className="bg-slate-50 text-slate-800">
      <Header />
      <main>
        <Hero />
        <Services />
        <HowItWorks />
        <BookingForm />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  // Check if we're on admin routes
  const isAdminRoute = window.location.pathname.startsWith('/nasim/admin') || window.location.pathname.startsWith('/admin');
  
  if (isAdminRoute) {
    return <AdminApp />;
  }
  
  return (
    <Router basename="/nasim">
      <Routes>
        <Route path="/*" element={<MainSite />} />
      </Routes>
    </Router>
  );
};

export default App;