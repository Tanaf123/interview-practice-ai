import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      title: 'Choose Your Target',
      description: 'Select the company and role you want to practice for',
      icon: '🎯'
    },
    {
      title: 'Start Interview',
      description: 'Begin your AI-powered mock interview session',
      icon: '🤖'
    },
    {
      title: 'Get Feedback',
      description: 'Receive detailed feedback and improvement suggestions',
      icon: '📝'
    },
    {
      title: 'Track Progress',
      description: 'Monitor your improvement over time',
      icon: '📈'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            Practice makes perfect. Here's how we help you get there.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-lg font-medium text-gray-900">{step.title}</h3>
                <p className="mt-2 text-base text-gray-500">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks; 