import React from 'react';
import HeroSection from '../components/HeroSection';
import HowItWorks from '../components/HowItWorks';
import CompanyRoleBrowser from '../components/CompanyRoleBrowser';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeroSection />
      </div>
      <HowItWorks />
      <CompanyRoleBrowser />
    </main>
  );
} 