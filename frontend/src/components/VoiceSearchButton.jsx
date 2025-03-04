import React, { useState, useRef } from 'react';
import axios from 'axios';

const VoiceSearchButton = () => {
  const [isListening, setIsListening] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState(null);
  const audioRef = useRef(null);

  const GROQ_API_KEY = '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';

  const emergencyData = [
    {
      "Type": "domestic",
      "Name": "Gas leakage",
      "Data": "Evacuate the area immediately. Avoid using electrical switches or anything that could cause a spark. Call emergency services from a safe location."
    },
    {
      "Type": "domestic",
      "Name": "Broken glass",
      "Data": "Wear gloves for protection. Sweep up large and small glass pieces carefully. Dispose of broken glass in a sturdy, sealed container."
    },
    {
      "Type": "domestic",
      "Name": "HVAC goes out",
      "Data": "Close windows and doors to maintain indoor temperature. Use portable heaters or fans if necessary. Call a technician for repairs."
    },
    {
      "Type": "domestic",
      "Name": "Ant or rodent infestation",
      "Data": "Remove food sources by cleaning thoroughly. Use traps for rodents and insecticides for ants. Contact pest control for large infestations."
    },
    {
      "Type": "domestic",
      "Name": "Burst hot water system",
      "Data": "Turn off the water supply immediately. Turn off the heating system. Call a plumber for repairs."
    },
    {
      "Type": "medical",
      "Name": "Seizure",
      "Data": "Protect the person from injury by moving objects and cushioning the head. Do not restrain them or put anything in their mouth. Call emergency services if the seizure lasts more than 5 minutes."
    },
    {
      "Type": "medical",
      "Name": "Shortness of breath",
      "Data": "Sit the person upright and help them stay calm. Assist in using an inhaler if prescribed. Call emergency services if symptoms worsen."
    },
    {
      "Type": "medical",
      "Name": "Bleeding",
      "Data": "Apply direct pressure to the wound with a clean cloth. Elevate the wound if possible. Call emergency services for severe bleeding."
    }
  ];

  const startListening = () => {
    setIsListening(true);
    setError(null);
    audioRef.current = new Audio();
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const mediaRecorder = new MediaRecorder(stream);
        const audioChunks = [];

        mediaRecorder.addEventListener("dataavailable", event => {
          audioChunks.push(event.data);
        });

        mediaRecorder.addEventListener("stop", () => {
          const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
          transcribeAudio(audioBlob);
        });

        mediaRecorder.start();
        setTimeout(() => {
          mediaRecorder.stop();
          setIsListening(false);
        }, 5000); // Record for 5 seconds
      })
      .catch(err => {
        console.error('Error accessing microphone:', err);
        setError('Error accessing microphone. Please check your permissions.');
        setIsListening(false);
      });
  };

  const transcribeAudio = async (audioBlob) => {
    try {
      const formData = new FormData();
      formData.append('file', audioBlob, 'audio.wav');
      formData.append('model', 'whisper-large-v3-turbo');
      formData.append('response_format', 'json');
      formData.append('language', 'en');

      const response = await axios.post('https://api.groq.com/openai/v1/audio/transcriptions', formData, {
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data && response.data.text) {
        matchKeywords(response.data.text);
      } else {
        throw new Error('Transcription response is empty or invalid');
      }
    } catch (error) {
      console.error('Error transcribing audio:', error);
      setError(`Error transcribing audio: ${error.message || 'Unknown error'}. Please try again.`);
    }
  };

  const matchKeywords = (transcription) => {
    const words = transcription.toLowerCase().split(/\s+/);
    let bestMatch = null;
    let maxMatchCount = 0;

    emergencyData.forEach(item => {
      const itemWords = item.Name.toLowerCase().split(/\s+/);
      const matchCount = words.filter(word => itemWords.includes(word)).length;

      if (matchCount > maxMatchCount) {
        maxMatchCount = matchCount;
        bestMatch = item;
      }
    });

    if (bestMatch) {
      setSearchResult(bestMatch);
    } else {
      setError('No matching emergency situation found. Please try again.');
    }
  };

  return (
    <div className="p-4 pl-0">
    <button 
      onClick={startListening}
      disabled={isListening}
      className={`bg-gradient-to-r ${
        isListening 
          ? 'from-green-600 to-green-700' 
          : 'from-red-600 to-red-700' 
      } hover:bg-red-900 text-white font-bold py-2 px-4 rounded-full`}
    >
      <svg 
        className="h-5 w-5 text-white" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" 
        />
      </svg>
    </button>
    {error && (
      <p className="text-red-500 mt-2">{error}</p>
    )}
    {searchResult && (
      <div className="mt-4">
        <h3 className="text-xl font-bold">{searchResult.Name}</h3>
        <p className="text-gray-700">{searchResult.Data}</p>
      </div>
    )}
  </div>
  );
};

export default VoiceSearchButton;

