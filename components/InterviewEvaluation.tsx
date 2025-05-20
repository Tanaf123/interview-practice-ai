import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import '../lib/chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface EvaluationMetrics {
  accuracy: number;
  clarity: number;
  confidence: number;
}

interface FeedbackItem {
  category: string;
  text: string;
  emoji: string;
}

interface InterviewEvaluationProps {
  transcription: string;
  metrics: EvaluationMetrics;
  feedback: FeedbackItem[];
  onDownload: () => void;
}

export default function InterviewEvaluation({ transcription, metrics, feedback, onDownload }: InterviewEvaluationProps) {
  const pieData = {
    labels: ['Accuracy', 'Clarity', 'Confidence'],
    datasets: [
      {
        data: [metrics.accuracy, metrics.clarity, metrics.confidence],
        backgroundColor: ['#8B5CF6', '#EC4899', '#10B981'],
        borderColor: ['#7C3AED', '#DB2777', '#059669'],
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels: ['Accuracy', 'Clarity', 'Confidence'],
    datasets: [
      {
        label: 'Score',
        data: [metrics.accuracy, metrics.clarity, metrics.confidence],
        backgroundColor: ['#8B5CF6', '#EC4899', '#10B981'],
      },
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

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Interview Evaluation</h2>
        <button
          onClick={onDownload}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-200"
        >
          Download Report
        </button>
      </div>

      {/* Transcription */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Transcription</h3>
        <div className="bg-gray-50 rounded-lg p-4 max-h-48 overflow-y-auto">
          <p className="text-gray-700 whitespace-pre-wrap">{transcription}</p>
        </div>
      </div>

      {/* Score Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Overall Score</h3>
          <div className="aspect-square max-w-xs mx-auto">
            <Pie data={pieData} />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Score Breakdown</h3>
          <div className="h-64">
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
      </div>

      {/* Feedback */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Detailed Feedback</h3>
        <div className="space-y-4">
          {feedback.map((item, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-2xl">{item.emoji}</span>
                <span className="font-medium text-gray-900">{item.category}</span>
              </div>
              <p className="text-gray-700">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 