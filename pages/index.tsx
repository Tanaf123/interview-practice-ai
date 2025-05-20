import React from 'react';
import HeroSection from '../components/HeroSection';
import Navbar from '../components/Navbar';
import HowItWorks from '../components/HowItWorks';
import CompaniesSection from '../components/CompaniesSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeroSection />
      </div>
      <HowItWorks />
      <CompaniesSection />
    </main>
  );
} 