import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import '../lib/chartjs';

interface SavedRole {
  id: string;
  title: string;
  company: string;
  lastPracticed: string;
  bestScore: number;
  practiceCount: number;
}

interface UserProfileProps {
  user: {
    name: string;
    email: string;
    resumeUrl?: string;
  };
  savedRoles: SavedRole[];
  scoreTrends: {
    dates: string[];
    scores: number[];
  };
  onResumeUpload: (file: File) => void;
  onDeleteRole: (roleId: string) => void;
}

export default function UserProfile({
  user,
  savedRoles,
  scoreTrends,
  onResumeUpload,
  onDeleteRole
}: UserProfileProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      await onResumeUpload(file);
      setIsUploading(false);
    }
  };

  const lineData = {
    labels: scoreTrends.dates,
    datasets: [
      {
        label: 'Average Score',
        data: scoreTrends.scores,
        borderColor: '#8B5CF6',
        tension: 0.4,
        fill: true,
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-600">{user.email}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="file"
                  id="resume-upload"
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                />
                <label
                  htmlFor="resume-upload"
                  className={`px-4 py-2 rounded-md text-sm font-medium cursor-pointer ${
                    isUploading
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                  }`}
                >
                  {isUploading ? 'Uploading...' : user.resumeUrl ? 'Update Resume' : 'Upload Resume'}
                </label>
              </div>
            </div>
          </div>
          {user.resumeUrl && (
            <div className="mt-4">
              <a
                href={user.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:text-purple-700 text-sm"
              >
                View Resume →
              </a>
            </div>
          )}
        </div>

        {/* Score Trends */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Score Trends</h2>
          <div className="h-64">
            <Line data={lineData} options={lineOptions} />
          </div>
        </div>

        {/* Saved Roles */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Saved Roles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedRoles.map((role) => (
              <div key={role.id} className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-gray-900">{role.title}</h3>
                    <p className="text-sm text-gray-600">{role.company}</p>
                  </div>
                  <button
                    onClick={() => onDeleteRole(role.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Best Score</span>
                    <span className="font-medium text-gray-900">{role.bestScore}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Practice Count</span>
                    <span className="font-medium text-gray-900">{role.practiceCount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Last Practiced</span>
                    <span className="text-gray-900">{role.lastPracticed}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 