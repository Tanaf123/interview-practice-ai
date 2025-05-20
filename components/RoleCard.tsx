import React, { useState } from 'react';
import JobConfig from './JobConfig';

interface RoleCardProps {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
}

const difficultyColors = {
  Beginner: 'bg-green-100 text-green-800',
  Intermediate: 'bg-yellow-100 text-yellow-800',
  Advanced: 'bg-red-100 text-red-800',
};

export default function RoleCard({ id, title, description, difficulty, rating }: RoleCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showConfig, setShowConfig] = useState(false);

  const handleStartInterview = (config: any) => {
    // TODO: Implement interview start logic
    console.log('Starting interview with config:', config);
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <h4 className="text-lg font-medium text-gray-900">{title}</h4>
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className="ml-4 text-gray-400 hover:text-yellow-500 transition-colors duration-200"
            >
              <svg
                className={`w-5 h-5 ${isBookmarked ? 'text-yellow-500 fill-current' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
            </button>
          </div>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
          
          <div className="mt-3 flex items-center space-x-4">
            {/* Difficulty Badge */}
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${difficultyColors[difficulty]}`}>
              {difficulty}
            </span>
            
            {/* Rating */}
            <div className="flex items-center">
              <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
        
        {/* Start Interview Button */}
        <button
          onClick={() => setShowConfig(true)}
          className="ml-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
        >
          Start Interview
        </button>
      </div>

      {/* Job Configuration Modal */}
      {showConfig && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Configure Interview</h3>
              <button
                onClick={() => setShowConfig(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <JobConfig roleId={id} onStart={handleStartInterview} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 