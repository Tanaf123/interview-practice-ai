import React, { useState } from 'react';
import InterviewSimulation from './InterviewSimulation';

interface JobConfigProps {
  roleId: string;
  onStart: (config: InterviewConfig) => void;
}

interface InterviewConfig {
  difficulty: 'Easy' | 'Medium' | 'Hard';
  questionSets: ('Competency' | 'Behavioural' | 'Technical')[];
  questionCount: number;
  timePerQuestion: number;
  questionVariation: boolean;
  jobFunctionTags: string[];
}

const defaultConfig: InterviewConfig = {
  difficulty: 'Medium',
  questionSets: ['Competency', 'Behavioural', 'Technical'],
  questionCount: 10,
  timePerQuestion: 3,
  questionVariation: true,
  jobFunctionTags: []
};

const jobFunctionTags = [
  'Mechanical Design',
  'Systems Engineering',
  'Manufacturing',
  'Software Development',
  'Project Management',
  'Quality Assurance',
  'Research & Development',
  'Operations'
];

export default function JobConfig({ roleId, onStart }: JobConfigProps) {
  const [config, setConfig] = useState<InterviewConfig>(defaultConfig);
  const [jobDescription, setJobDescription] = useState<string>('');
  const [showSimulation, setShowSimulation] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setJobDescription(e.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  const toggleQuestionSet = (set: 'Competency' | 'Behavioural' | 'Technical') => {
    setConfig(prev => ({
      ...prev,
      questionSets: prev.questionSets.includes(set)
        ? prev.questionSets.filter(s => s !== set)
        : [...prev.questionSets, set]
    }));
  };

  const toggleJobFunctionTag = (tag: string) => {
    setConfig(prev => ({
      ...prev,
      jobFunctionTags: prev.jobFunctionTags.includes(tag)
        ? prev.jobFunctionTags.filter(t => t !== tag)
        : [...prev.jobFunctionTags, tag]
    }));
  };

  const handleStartInterview = () => {
    setShowSimulation(true);
  };

  if (showSimulation) {
    return (
      <InterviewSimulation
        config={config}
        onComplete={() => {
          setShowSimulation(false);
          onStart(config);
        }}
      />
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
      {/* Job Description Upload */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Job Description</h3>
        <div className="flex items-center space-x-4">
          <label className="flex-1">
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-purple-500 transition-colors duration-200">
              <div className="space-y-1 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer rounded-md font-medium text-purple-600 hover:text-purple-500">
                    <span>Upload a file</span>
                    <input type="file" className="sr-only" onChange={handleFileUpload} accept=".txt,.pdf,.doc,.docx" />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>
              </div>
            </div>
          </label>
        </div>
      </div>

      {/* Interview Configuration */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">Interview Configuration</h3>
        
        {/* Difficulty Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty Level</label>
          <div className="flex space-x-4">
            {(['Easy', 'Medium', 'Hard'] as const).map((level) => (
              <button
                key={level}
                onClick={() => setConfig(prev => ({ ...prev, difficulty: level }))}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  config.difficulty === level
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Question Sets */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Question Sets</label>
          <div className="flex flex-wrap gap-2">
            {(['Competency', 'Behavioural', 'Technical'] as const).map((set) => (
              <button
                key={set}
                onClick={() => toggleQuestionSet(set)}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  config.questionSets.includes(set)
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {set}
              </button>
            ))}
          </div>
        </div>

        {/* Job Function Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Job Function Tags</label>
          <div className="flex flex-wrap gap-2">
            {jobFunctionTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleJobFunctionTag(tag)}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  config.jobFunctionTags.includes(tag)
                    ? 'bg-purple-100 text-purple-800 border border-purple-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Question Count and Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Questions</label>
            <select
              value={config.questionCount}
              onChange={(e) => setConfig(prev => ({ ...prev, questionCount: Number(e.target.value) }))}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
            >
              {[5, 10, 15, 20].map((count) => (
                <option key={count} value={count}>{count} questions</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time per Question</label>
            <select
              value={config.timePerQuestion}
              onChange={(e) => setConfig(prev => ({ ...prev, timePerQuestion: Number(e.target.value) }))}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
            >
              {[2, 3, 5, 7].map((minutes) => (
                <option key={minutes} value={minutes}>{minutes} minutes</option>
              ))}
            </select>
          </div>
        </div>

        {/* Question Variation Toggle */}
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">Question Variation</label>
          <button
            onClick={() => setConfig(prev => ({ ...prev, questionVariation: !prev.questionVariation }))}
            className={`relative inline-flex h-6 w-11 items-center rounded-full ${
              config.questionVariation ? 'bg-purple-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                config.questionVariation ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Summary */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Interview Summary</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Total Questions: {config.questionCount}</li>
            <li>• Total Time: {config.questionCount * config.timePerQuestion} minutes</li>
            <li>• Question Sets: {config.questionSets.join(', ')}</li>
            <li>• Difficulty: {config.difficulty}</li>
            {config.jobFunctionTags.length > 0 && (
              <li>• Job Functions: {config.jobFunctionTags.join(', ')}</li>
            )}
          </ul>
        </div>

        {/* Start Button */}
        <button
          onClick={handleStartInterview}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-md text-sm transition-colors duration-200"
        >
          Start Interview
        </button>
      </div>
    </div>
  );
} 