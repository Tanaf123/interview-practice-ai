import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import '../lib/chartjs';

interface UserFeedback {
  id: string;
  userId: string;
  userName: string;
  type: 'bug' | 'feature' | 'improvement' | 'other';
  content: string;
  status: 'pending' | 'in-progress' | 'resolved';
  createdAt: string;
}

interface UsageStats {
  dailyActiveUsers: number[];
  totalInterviews: number;
  averageScore: number;
  completionRate: number;
  popularRoles: Array<{
    id: string;
    title: string;
    company: string;
    practiceCount: number;
  }>;
  popularQuestionSets: Array<{
    id: string;
    name: string;
    usageCount: number;
  }>;
}

interface UserFeedbackManagerProps {
  feedback: UserFeedback[];
  stats: UsageStats;
  onUpdateFeedbackStatus: (id: string, status: UserFeedback['status']) => void;
  onDeleteFeedback: (id: string) => void;
}

export default function UserFeedbackManager({
  feedback,
  stats,
  onUpdateFeedbackStatus,
  onDeleteFeedback,
}: UserFeedbackManagerProps) {
  const [selectedTimeRange, setSelectedTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  const chartData = {
    labels: Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }),
    datasets: [
      {
        label: 'Daily Active Users',
        data: stats.dailyActiveUsers,
        borderColor: '#8B5CF6',
        tension: 0.4,
        fill: true,
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        {/* Usage Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Interviews</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900">{stats.totalInterviews}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500">Average Score</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900">{stats.averageScore}%</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500">Completion Rate</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900">{stats.completionRate}%</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500">Active Users</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {stats.dailyActiveUsers[stats.dailyActiveUsers.length - 1]}
            </p>
          </div>
        </div>

        {/* User Activity Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">User Activity</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedTimeRange('7d')}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  selectedTimeRange === '7d'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                7D
              </button>
              <button
                onClick={() => setSelectedTimeRange('30d')}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  selectedTimeRange === '30d'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                30D
              </button>
              <button
                onClick={() => setSelectedTimeRange('90d')}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  selectedTimeRange === '90d'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                90D
              </button>
            </div>
          </div>
          <div className="h-64">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Popular Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Popular Roles */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Popular Roles</h2>
            <div className="space-y-4">
              {stats.popularRoles.map((role) => (
                <div key={role.id} className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-gray-900">{role.title}</h3>
                    <p className="text-sm text-gray-500">{role.company}</p>
                  </div>
                  <div className="text-sm text-gray-500">{role.practiceCount} practices</div>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Question Sets */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Popular Question Sets</h2>
            <div className="space-y-4">
              {stats.popularQuestionSets.map((set) => (
                <div key={set.id} className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-gray-900">{set.name}</h3>
                  </div>
                  <div className="text-sm text-gray-500">{set.usageCount} uses</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* User Feedback */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">User Feedback</h2>
          <div className="bg-gray-50 rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Content
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {feedback.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.userName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.type}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-md truncate">
                      {item.content}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <select
                        value={item.status}
                        onChange={(e) => onUpdateFeedbackStatus(item.id, e.target.value as UserFeedback['status'])}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                      >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => onDeleteFeedback(item.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 