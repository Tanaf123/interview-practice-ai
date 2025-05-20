import React from 'react';

const steps = [
  {
    title: 'Choose Role',
    description: 'Select your target role and industry to get relevant interview questions.',
    icon: '🎯'
  },
  {
    title: 'Simulate Interview',
    description: 'Practice with our AI interviewer that adapts to your responses in real-time.',
    icon: '🤖'
  },
  {
    title: 'Get Feedback',
    description: 'Receive detailed feedback on your answers, body language, and overall performance.',
    icon: '📊'
  }
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Master your interview skills in three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              {/* Step Number */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                {index + 1}
              </div>
              
              {/* Icon */}
              <div className="text-4xl mb-4">{step.icon}</div>
              
              {/* Content */}
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-500">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 