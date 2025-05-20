import React, { useState, useEffect, useRef } from 'react';
import DeviceSetup from './DeviceSetup';
import InterviewEvaluation from './InterviewEvaluation';
import PostInterviewSummary from './PostInterviewSummary';

interface InterviewSimulationProps {
  config: {
    questionCount: number;
    timePerQuestion: number;
    questionSets: string[];
    difficulty: string;
  };
  onComplete: () => void;
}

interface Question {
  id: number;
  text: string;
  hint: string;
  type: 'Competency' | 'Behavioural' | 'Technical';
}

// Sample questions - replace with real questions from your backend
const sampleQuestions: Question[] = [
  {
    id: 1,
    text: "Tell me about a time when you had to solve a complex technical problem.",
    hint: "Focus on your problem-solving process and the outcome.",
    type: "Technical"
  },
  {
    id: 2,
    text: "How do you handle conflicts within your team?",
    hint: "Share a specific example and your approach to resolution.",
    type: "Behavioural"
  }
];

interface AnswerRecording {
  questionIndex: number;
  blob: Blob;
  timestamp: number;
}

export default function InterviewSimulation({ config, onComplete }: InterviewSimulationProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showDeviceSetup, setShowDeviceSetup] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isPreparing, setIsPreparing] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(config.timePerQuestion * 60);
  const [showHint, setShowHint] = useState(false);
  const [allowReRecording, setAllowReRecording] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showEvaluation, setShowEvaluation] = useState(false);
  const [evaluationData, setEvaluationData] = useState<{
    transcription: string;
    metrics: {
      accuracy: number;
      clarity: number;
      confidence: number;
    };
    feedback: Array<{
      category: string;
      text: string;
      emoji: string;
    }>;
  } | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  const [answerRecordings, setAnswerRecordings] = useState<AnswerRecording[]>([]);
  const [previousScores, setPreviousScores] = useState<{
    accuracy: number;
    clarity: number;
    confidence: number;
  } | null>(null);
  
  const timerRef = useRef<NodeJS.Timeout>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (!isPaused && !isPreparing && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, isPreparing, timeLeft]);

  const startPreparation = () => {
    setIsPreparing(true);
    let countdown = 10;
    const prepTimer = setInterval(() => {
      countdown--;
      if (countdown === 0) {
        clearInterval(prepTimer);
        setIsPreparing(false);
        startRecording();
      }
    }, 1000);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && streamRef.current) {
      mediaRecorderRef.current.stop();
      streamRef.current.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < config.questionCount - 1) {
      setCurrentQuestion(prev => prev + 1);
      setTimeLeft(config.timePerQuestion * 60);
      setShowHint(false);
      if (allowReRecording) {
        startPreparation();
      }
    } else {
      onComplete();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleComplete = async () => {
    if (mediaRecorderRef.current) {
      const chunks: Blob[] = [];
      mediaRecorderRef.current.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(chunks, { type: 'audio/webm' });
        
        // Save the recording
        setAnswerRecordings(prev => [...prev, {
          questionIndex: currentQuestion,
          blob: audioBlob,
          timestamp: Date.now()
        }]);
        
        // TODO: Replace with actual API calls
        // Simulate API calls for now
        const transcription = "This is a simulated transcription of the interview response.";
        const metrics = {
          accuracy: 85,
          clarity: 90,
          confidence: 75
        };
        const feedback = [
          {
            category: "Content",
            text: "Your answer demonstrated good understanding of the topic. Consider providing more specific examples.",
            emoji: "🎯"
          },
          {
            category: "Delivery",
            text: "Clear and confident speaking. Work on maintaining consistent pace throughout.",
            emoji: "🗣️"
          },
          {
            category: "Structure",
            text: "Well-organized response with clear beginning, middle, and end.",
            emoji: "📝"
          }
        ];

        setEvaluationData({
          transcription,
          metrics,
          feedback
        });
        setShowEvaluation(true);
      };
    }
  };

  const handleReplayAnswer = (questionIndex: number) => {
    const recording = answerRecordings.find(r => r.questionIndex === questionIndex);
    if (recording) {
      const url = URL.createObjectURL(recording.blob);
      const audio = new Audio(url);
      audio.play();
    }
  };

  const handlePracticeAgain = () => {
    setShowEvaluation(false);
    setShowSummary(false);
    setCurrentQuestion(0);
    setTimeLeft(config.timePerQuestion * 60);
    setShowHint(false);
    setAllowReRecording(false);
    setIsRecording(false);
  };

  const handleTryAnotherRole = () => {
    onComplete();
  };

  const handleSaveFeedback = () => {
    // TODO: Implement feedback saving
    console.log('Saving feedback...');
  };

  const handleDownloadReport = () => {
    // TODO: Implement PDF generation and download
    console.log('Downloading report...');
  };

  const handleSetReminder = (frequency: string) => {
    if (!frequency) return;

    const reminderTimes = {
      daily: 24 * 60 * 60 * 1000,
      weekly: 7 * 24 * 60 * 60 * 1000,
      biweekly: 14 * 24 * 60 * 60 * 1000,
      monthly: 30 * 24 * 60 * 60 * 1000
    };

    const nextReminder = new Date(Date.now() + reminderTimes[frequency as keyof typeof reminderTimes]);

    // TODO: Implement actual reminder functionality
    // This could be:
    // 1. Browser notifications
    // 2. Email notifications
    // 3. Calendar integration
    console.log(`Reminder set for ${nextReminder.toLocaleString()}`);
  };

  if (showDeviceSetup) {
    return <DeviceSetup onComplete={() => setShowDeviceSetup(false)} />;
  }

  if (showSummary) {
    return (
      <PostInterviewSummary
        currentScores={evaluationData?.metrics || { accuracy: 0, clarity: 0, confidence: 0 }}
        previousScores={previousScores || undefined}
        improvementSuggestions={[
          {
            category: "Behavioral Questions",
            suggestion: "Review the STAR method for structuring your answers to behavioral questions.",
            link: "/resources/star-method"
          },
          {
            category: "Technical Communication",
            suggestion: "Practice explaining technical concepts to non-technical audiences.",
            link: "/resources/technical-communication"
          },
          {
            category: "Confidence Building",
            suggestion: "Work on maintaining eye contact and using confident body language.",
            link: "/resources/confidence-building"
          }
        ]}
        relatedRoles={[
          {
            id: "1",
            title: "Senior Software Engineer",
            company: "Tech Corp",
            difficulty: "Medium",
            matchScore: 85
          },
          {
            id: "2",
            title: "Technical Lead",
            company: "Innovation Labs",
            difficulty: "Hard",
            matchScore: 75
          }
        ]}
        onPracticeAgain={handlePracticeAgain}
        onTryAnotherRole={handleTryAnotherRole}
        onSaveFeedback={handleSaveFeedback}
        onReplayAnswer={handleReplayAnswer}
        onSetReminder={handleSetReminder}
      />
    );
  }

  if (showEvaluation && evaluationData) {
    return (
      <InterviewEvaluation
        transcription={evaluationData.transcription}
        metrics={evaluationData.metrics}
        feedback={evaluationData.feedback}
        onDownload={() => setShowSummary(true)}
      />
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Interview Simulation
            </h1>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-gray-700'
            }`}>
              Q{currentQuestion + 1} of {config.questionCount}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setAllowReRecording(!allowReRecording)}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                allowReRecording
                  ? 'bg-purple-100 text-purple-800'
                  : isDarkMode
                  ? 'bg-gray-800 text-gray-200'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {allowReRecording ? 'Re-recording Enabled' : 'Re-recording Disabled'}
            </button>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-md ${
                isDarkMode ? 'text-gray-200 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {isDarkMode ? '🌞' : '🌙'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Video Preview */}
          <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            {isPreparing && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="text-4xl font-bold text-white">
                  {10 - Math.floor((10 - timeLeft) / 60)}
                </div>
              </div>
            )}
          </div>

          {/* Question Panel */}
          <div className={`space-y-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold">
                  {sampleQuestions[currentQuestion]?.text}
                </h2>
                <button
                  onClick={() => setShowHint(!showHint)}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {showHint ? 'Hide Hint' : 'Show Hint'}
                </button>
              </div>
              
              {showHint && (
                <div className={`mt-4 p-4 rounded-md ${
                  isDarkMode ? 'bg-gray-700' : 'bg-purple-50'
                }`}>
                  <p className="text-sm">{sampleQuestions[currentQuestion]?.hint}</p>
                </div>
              )}

              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setIsPaused(!isPaused)}
                    className={`p-2 rounded-md ${
                      isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {isPaused ? '▶️' : '⏸️'}
                  </button>
                  <span className="text-2xl font-mono">
                    {formatTime(timeLeft)}
                  </span>
                </div>
                <button
                  onClick={handleNextQuestion}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Next Question
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / config.questionCount) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 