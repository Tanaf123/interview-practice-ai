import React from 'react';
import { Bar } from 'react-chartjs-2';
import '../lib/chartjs';
import PerformanceTracker from './PerformanceTracker';

interface ImprovementSuggestion {
  category: string;
  suggestion: string;
  link?: string;
}

interface RelatedRole {
  id: string;
  title: string;
  company: string;
  difficulty: string;
  matchScore: number;
}

interface PostInterviewSummaryProps {
  currentScores: {
    accuracy: number;
    clarity: number;
    confidence: number;
  };
  previousScores?: {
    accuracy: number;
    clarity: number;
    confidence: number;
  };
  improvementSuggestions: ImprovementSuggestion[];
  relatedRoles: RelatedRole[];
  onPracticeAgain: () => void;
  onTryAnotherRole: () => void;
  onSaveFeedback: () => void;
  onReplayAnswer: (questionIndex: number) => void;
  onSetReminder: (frequency: string) => void;
}

export default function PostInterviewSummary({
  currentScores,
  previousScores,
  improvementSuggestions,
  relatedRoles,
  onPracticeAgain,
  onTryAnotherRole,
  onSaveFeedback,
  onReplayAnswer,
  onSetReminder
}: PostInterviewSummaryProps) {
  const barData = {
    labels: ['Accuracy', 'Clarity', 'Confidence'],
    datasets: [
      {
        label: 'Current Score',
        data: [currentScores.accuracy, currentScores.clarity, currentScores.confidence],
        backgroundColor: '#8B5CF6',
      },
      ...(previousScores ? [{
        label: 'Previous Score',
        data: [previousScores.accuracy, previousScores.clarity, previousScores.confidence],
        backgroundColor: '#9CA3AF',
      }] : []),
    ],
  };

  const barOptions = {
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  // Sample performance data - replace with real data from your backend
  const performanceMetrics = [
    { date: '2024-01-01', accuracy: 75, clarity: 80, confidence: 70 },
    { date: '2024-01-08', accuracy: 80, clarity: 85, confidence: 75 },
    { date: '2024-01-15', accuracy: 85, clarity: 90, confidence: 80 },
    { date: '2024-01-22', accuracy: 90, clarity: 85, confidence: 85 },
  ];

  const badges = [
    {
      id: '1',
      name: 'Consistent Performer',
      description: 'Completed 5 interviews with above-average scores',
      icon: '🏆',
      unlockedAt: '2024-01-22'
    },
    {
      id: '2',
      name: 'Quick Learner',
      description: 'Improved scores by 20% in one week',
      icon: '🚀',
      unlockedAt: '2024-01-15'
    },
    {
      id: '3',
      name: 'Technical Expert',
      description: 'Scored above 90% in technical questions',
      icon: '💻',
      unlockedAt: '2024-01-08'
    },
    {
      id: '4',
      name: 'Communication Master',
      description: 'Achieved perfect clarity score',
      icon: '🎯',
      unlockedAt: '2024-01-01'
    }
  ];

  const strengths = [
    {
      category: 'Technical Knowledge',
      score: 95,
      description: 'Strong understanding of core concepts'
    },
    {
      category: 'Communication',
      score: 90,
      description: 'Clear and concise explanations'
    }
  ];

  const weaknesses = [
    {
      category: 'Time Management',
      score: 75,
      description: 'Sometimes exceeds time limits',
      improvementTip: 'Practice with stricter time constraints'
    },
    {
      category: 'Confidence',
      score: 80,
      description: 'Occasional hesitation in responses',
      improvementTip: 'Record and review your answers to build confidence'
    }
  ];

  const goal = {
    target: 90,
    current: 85,
    category: 'Overall Score'
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-sm p-6 space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Interview Summary</h2>
          <div className="flex space-x-4">
            <button
              onClick={onPracticeAgain}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-200"
            >
              Practice Again
            </button>
            <button
              onClick={onTryAnotherRole}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-200"
            >
              Try Another Role
            </button>
            <button
              onClick={onSaveFeedback}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200"
            >
              Save Feedback
            </button>
          </div>
        </div>

        {/* Score Comparison */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Score Comparison</h3>
          <div className="h-64">
            <Bar data={barData} options={barOptions} />
          </div>
        </div>

        {/* Improvement Suggestions */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Improvement Suggestions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {improvementSuggestions.map((suggestion, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">{suggestion.category}</h4>
                <p className="text-gray-700 mb-2">{suggestion.suggestion}</p>
                {suggestion.link && (
                  <a
                    href={suggestion.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:text-purple-700 text-sm"
                  >
                    Learn more →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Related Roles */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Related Roles to Practice</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedRoles.map((role) => (
              <div key={role.id} className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900">{role.title}</h4>
                    <p className="text-gray-600 text-sm">{role.company}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    role.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                    role.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {role.difficulty}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 bg-purple-600 rounded-full"
                      style={{ width: `${role.matchScore}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600">{role.matchScore}% match</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Replay Answers */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Your Answers</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((questionIndex) => (
              <div key={questionIndex} className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-gray-900">Question {questionIndex}</h4>
                  <button
                    onClick={() => onReplayAnswer(questionIndex)}
                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200"
                  >
                    Replay Answer
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <PerformanceTracker
        metrics={performanceMetrics}
        badges={badges}
        strengths={strengths}
        weaknesses={weaknesses}
        goal={goal}
        onSetReminder={onSetReminder}
      />
    </div>
  );
} 