import React from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../lib/auth';

export default function HeroSection() {
  const router = useRouter();
  const { user } = useAuth();

  const handleStartInterview = () => {
    if (!user) {
      router.push('/login');
    } else {
      router.push('/interview');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Headline */}
        <h1 className="text-5xl font-bold text-black leading-tight">
          Practice interviews where it hurts most — before it counts.
        </h1>
        
        {/* Subheading */}
        <p className="text-lg text-gray-500 mt-4 max-w-2xl mx-auto">
          Master your interview skills with AI-powered mock interviews tailored to your industry.
        </p>

        {/* CTA Button */}
        <div className="pt-6">
          <button
            onClick={handleStartInterview}
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-8 rounded-md text-lg transition-colors duration-200"
          >
            Start Interview
          </button>
        </div>

        {/* Industry Pills */}
        <div className="flex flex-wrap justify-center gap-3 pt-8">
          {['Energy', 'F1', 'Aerospace', 'Tech'].map((industry) => (
            <button
              key={industry}
              className="px-4 py-2 rounded-full border border-gray-200 text-gray-700 font-medium hover:border-gray-300 transition-colors duration-200"
            >
              {industry}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 