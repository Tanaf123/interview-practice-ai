import React, { useState } from 'react';

interface Question {
  id: string;
  text: string;
  type: 'behavioral' | 'technical' | 'situational';
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  tags: string[];
}

interface QuestionSet {
  id: string;
  name: string;
  questions: Question[];
  difficulty: string;
  category: string;
}

interface QuestionSetManagerProps {
  questionSets: QuestionSet[];
  onAddQuestion: (setId: string, question: Omit<Question, 'id'>) => void;
  onUpdateQuestion: (setId: string, questionId: string, updates: Partial<Question>) => void;
  onDeleteQuestion: (setId: string, questionId: string) => void;
  onGenerateQuestions: (setId: string, count: number, difficulty: string, category: string) => void;
  onUploadQuestions: (setId: string, file: File) => void;
}

export default function QuestionSetManager({
  questionSets,
  onAddQuestion,
  onUpdateQuestion,
  onDeleteQuestion,
  onGenerateQuestions,
  onUploadQuestions,
}: QuestionSetManagerProps) {
  const [selectedSet, setSelectedSet] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, setId: string) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      await onUploadQuestions(setId, file);
      setIsUploading(false);
    }
  };

  const handleGenerateQuestions = async (setId: string) => {
    const count = prompt('How many questions to generate?', '5');
    const difficulty = prompt('Difficulty level (easy/medium/hard)?', 'medium');
    const category = prompt('Question category?', 'behavioral');

    if (count && difficulty && category) {
      setIsGenerating(true);
      await onGenerateQuestions(setId, parseInt(count), difficulty, category);
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        {/* Question Sets List */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Question Sets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {questionSets.map((set) => (
              <div
                key={set.id}
                className={`p-4 rounded-lg border ${
                  selectedSet === set.id ? 'border-purple-500' : 'border-gray-200'
                } cursor-pointer hover:border-purple-300`}
                onClick={() => setSelectedSet(set.id)}
              >
                <h3 className="font-medium text-gray-900">{set.name}</h3>
                <p className="text-sm text-gray-500">
                  {set.questions.length} questions • {set.difficulty} • {set.category}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Question Set Details */}
        {selectedSet && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {questionSets.find((set) => set.id === selectedSet)?.name}
              </h2>
              <div className="flex space-x-4">
                <div className="relative">
                  <input
                    type="file"
                    id="question-upload"
                    className="hidden"
                    accept=".json,.csv"
                    onChange={(e) => handleFileUpload(e, selectedSet)}
                    disabled={isUploading}
                  />
                  <label
                    htmlFor="question-upload"
                    className={`px-4 py-2 rounded-md text-sm font-medium cursor-pointer ${
                      isUploading
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-purple-600 text-white hover:bg-purple-700'
                    }`}
                  >
                    {isUploading ? 'Uploading...' : 'Upload Questions'}
                  </label>
                </div>
                <button
                  onClick={() => handleGenerateQuestions(selectedSet)}
                  disabled={isGenerating}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    isGenerating
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                  }`}
                >
                  {isGenerating ? 'Generating...' : 'Generate Questions'}
                </button>
                <button
                  onClick={() => {
                    const text = prompt('Question text:');
                    const type = prompt('Question type (behavioral/technical/situational):');
                    const difficulty = prompt('Difficulty (easy/medium/hard):');
                    const category = prompt('Category:');
                    const tags = prompt('Tags (comma-separated):')?.split(',').map((tag) => tag.trim());

                    if (text && type && difficulty && category && tags) {
                      onAddQuestion(selectedSet, {
                        text,
                        type: type as Question['type'],
                        difficulty: difficulty as Question['difficulty'],
                        category,
                        tags,
                      });
                    }
                  }}
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-sm font-medium"
                >
                  Add Question
                </button>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Question
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Difficulty
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tags
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {questionSets
                    .find((set) => set.id === selectedSet)
                    ?.questions.map((question) => (
                      <tr key={question.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {question.text}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {question.type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {question.difficulty}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {question.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {question.tags.join(', ')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => {
                              const text = prompt('New question text:', question.text);
                              if (text) {
                                onUpdateQuestion(selectedSet, question.id, { text });
                              }
                            }}
                            className="text-purple-600 hover:text-purple-900 mr-4"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => onDeleteQuestion(selectedSet, question.id)}
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
        )}
      </div>
    </div>
  );
} 