import React, { useState, useEffect } from 'react';

interface DeviceSetupProps {
  onComplete: () => void;
}

export default function DeviceSetup({ onComplete }: DeviceSetupProps) {
  const [cameraReady, setCameraReady] = useState(false);
  const [micReady, setMicReady] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    const setupDevices = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });
        setStream(mediaStream);
        setCameraReady(true);
        setMicReady(true);
      } catch (error) {
        console.error('Error accessing media devices:', error);
      }
    };

    setupDevices();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Device Setup</h2>
      
      <div className="space-y-6">
        {/* Camera Preview */}
        <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
          {stream && (
            <video
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
              ref={video => {
                if (video) video.srcObject = stream;
              }}
            />
          )}
          <div className="absolute inset-0 flex items-center justify-center">
            {!cameraReady && (
              <div className="text-gray-500">Camera not detected</div>
            )}
          </div>
        </div>

        {/* Device Status */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${cameraReady ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="text-gray-700">
              {cameraReady ? 'Camera ready' : 'Camera not detected'}
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${micReady ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="text-gray-700">
              {micReady ? 'Microphone ready' : 'Microphone not detected'}
            </span>
          </div>
        </div>

        {/* Continue Button */}
        <button
          onClick={onComplete}
          disabled={!cameraReady || !micReady}
          className={`w-full py-3 px-4 rounded-md text-white font-medium transition-colors duration-200 ${
            cameraReady && micReady
              ? 'bg-purple-600 hover:bg-purple-700'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          Continue to Interview
        </button>
      </div>
    </div>
  );
} 