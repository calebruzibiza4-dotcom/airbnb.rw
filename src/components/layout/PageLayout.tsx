import React from 'react';
import LandingNavbar from '../landing/LandingNavbar';
import Footer from '../landing/Footer';

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F5F2ED] text-[#111111] font-inter flex flex-col">
      <LandingNavbar />
      <main className="flex-1 mt-[80px]">
        {children}
      </main>
      <Footer />
    </div>
  );
}
