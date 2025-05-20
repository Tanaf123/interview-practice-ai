import React from 'react';
import { Line } from 'react-chartjs-2';
import '../lib/chartjs';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface PerformanceMetric {
  date: string;
  accuracy: number;
  clarity: number;
  confidence: number;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: string;
}

interface Strength {
  category: string;
  score: number;
  description: string;
}

interface Weakness {
  category: string;
  score: number;
  description: string;
  improvementTip: string;
}

interface PerformanceTrackerProps {
  metrics: PerformanceMetric[];
  badges: Badge[];
  strengths: Strength[];
  weaknesses: Weakness[];
  goal: {
    target: number;
    current: number;
    category: string;
  };
  onSetReminder: (frequency: string) => void;
}

export default function PerformanceTracker({
  metrics,
  badges,
  strengths,
  weaknesses,
  goal,
  onSetReminder
}: PerformanceTrackerProps) {
  const lineData = {
    labels: metrics.map(m => m.date),
    datasets: [
      {
        label: 'Accuracy',
        data: metrics.map(m => m.accuracy),
        borderColor: '#8B5CF6',
        tension: 0.4,
      },
      {
        label: 'Clarity',
        data: metrics.map(m => m.clarity),
        borderColor: '#EC4899',
        tension: 0.4,
      },
      {
        label: 'Confidence',
        data: metrics.map(m => m.confidence),
        borderColor: '#10B981',
        tension: 0.4,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Performance Tracker</h2>
        <div className="flex space-x-4">
          <select
            onChange={(e) => onSetReminder(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Set Practice Reminder</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="biweekly">Bi-weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      </div>

      {/* Performance Trends */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Trends</h3>
        <div className="h-64">
          <Line data={lineData} options={lineOptions} />
        </div>
      </div>

      {/* Goal Progress */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Goal Progress</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-700">Target: {goal.target} in {goal.category}</span>
            <span className="text-gray-700">Current: {goal.current}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-purple-600 h-2.5 rounded-full"
              style={{ width: `${(goal.current / goal.target) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Strengths & Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Top Strengths</h3>
          <div className="space-y-4">
            {strengths.map((strength, index) => (
              <div key={index} className="bg-green-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-green-900">{strength.category}</h4>
                  <span className="text-green-700 font-medium">{strength.score}%</span>
                </div>
                <p className="text-green-700">{strength.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Areas for Improvement</h3>
          <div className="space-y-4">
            {weaknesses.map((weakness, index) => (
              <div key={index} className="bg-red-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-red-900">{weakness.category}</h4>
                  <span className="text-red-700 font-medium">{weakness.score}%</span>
                </div>
                <p className="text-red-700 mb-2">{weakness.description}</p>
                <p className="text-sm text-red-600">{weakness.improvementTip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Badges */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Achievements</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map((badge) => (
            <div key={badge.id} className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">{badge.icon}</div>
              <h4 className="font-medium text-gray-900 mb-1">{badge.name}</h4>
              <p className="text-sm text-gray-600 mb-2">{badge.description}</p>
              <span className="text-xs text-gray-500">Unlocked {badge.unlockedAt}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 