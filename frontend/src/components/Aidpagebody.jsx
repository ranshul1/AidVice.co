'use client'

import React, { useState, useEffect, useRef } from 'react'
import { jsPDF } from 'jspdf'
import axios from 'axios';
import SOSButton from '../components/SOSButton'
import MedicalAIChatot from '../components/MedicalAIChatbot'
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
    "Type": "domestic",
    "Name": "Burst tap or shower head",
    "Data": "Turn off the main water supply. Use a wrench to remove broken parts if needed. Call a plumber for repairs."
  },
  {
    "Type": "domestic",
    "Name": "Blocked toilet, pipe, or drain",
    "Data": "Use a plunger or drain snake to remove the blockage. Avoid using chemical cleaners to prevent pipe damage. Call a plumber if the issue persists."
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
  },
  {
    "Type": "medical",
    "Name": "Fainting",
    "Data": "Lay the person down and elevate their legs. Ensure they have fresh air. Reassure them once they regain consciousness."
  },
  {
    "Type": "medical",
    "Name": "Asthma",
    "Data": "Sit the person upright and keep them calm. Administer an inhaler: 2 puffs every 2 minutes up to 10 puffs. Call for help if the person does not improve."
  },
  {
    "Type": "medical",
    "Name": "Allergy",
    "Data": "Remove the allergen if possible. Administer antihistamines or an EpiPen if prescribed. Call emergency services for severe reactions."
  },
  {
    "Type": "medical",
    "Name": "Dizziness",
    "Data": "Help the person sit or lie down. Ensure they have fresh air. Offer water or fluids unless they are feeling nauseous."
  },
  {
    "Type": "medical",
    "Name": "Anaphylaxis",
    "Data": "Administer an epinephrine injection immediately. Call emergency services. Keep the person lying down with legs elevated."
  },
  {
    "Type": "medical",
    "Name": "Heart attack",
    "Data": "Call emergency services immediately. Keep the person calm and seated. Offer aspirin if the person is not allergic."
  },
  {
    "Type": "medical",
    "Name": "Chest pain",
    "Data": "Encourage rest and ensure they remain seated. Call emergency services if the pain persists. Prepare to provide CPR if breathing stops."
  },
  {
    "Type": "medical",
    "Name": "Burns",
    "Data": "Cool the burn under running water for at least 10 minutes. Cover the burn with a clean, nonstick cloth. Call for medical assistance for severe burns."
  },
  {
    "Type": "medical",
    "Name": "Unconsciousness",
    "Data": "Check the airway, breathing, and pulse. Place the person in the recovery position if breathing. Call emergency services immediately."
  },
  {
    "Type": "medical",
    "Name": "Choking",
    "Data": "Perform 5 back blows followed by 5 abdominal thrusts (Heimlich). Call for help if the object remains lodged."
  },
  {
    "Type": "medical",
    "Name": "Snakebite",
    "Data": "Keep the person calm and still. Immobilize the affected area. Call emergency services immediately."
  },
  {
    "Type": "medical",
    "Name": "Respiratory failure",
    "Data": "Call emergency services immediately. Assist with rescue breaths and ensure the airway is clear. Be prepared to start full CPR if breathing stops."
  },
  {
    "Type": "medical",
    "Name": "Internal bleeding",
    "Data": "Keep the person still and lying down. Monitor for signs of shock (pale skin, confusion). Call emergency services immediately."
  },
  {
    "Type": "medical",
    "Name": "Hyperthermia",
    "Data": "Move the person to a cool, shaded area. Remove excess clothing and use cold compresses. Provide cool drinks if they are conscious. Call emergency services for heatstroke."
  },
  {
    "Type": "medical",
    "Name": "Hypothermia",
    "Data": "Move the person to a warm, dry area. Remove wet clothing and wrap them in blankets. Provide warm, sugary drinks if they are conscious. Monitor for breathing and pulse, and prepare to perform CPR if necessary."
  },
  {
    "Type": "medical",
    "Name": "Hypovolemia",
    "Data": "Lay the person flat and elevate their legs. Keep them warm and still to prevent shock. Provide fluids if they are conscious, and call emergency services."
  },
  {
    "Type": "medical",
    "Name": "Flash burn",
    "Data": "Cool the burn with running water for 10-20 minutes. Cover the area with a non-fluffy, sterile dressing. Seek medical help for severe burns."
  },
  {
    "Type": "medical",
    "Name": "Diabetic coma",
    "Data": "Call emergency services immediately. Check for any insulin or medical alert information. Place the person in the recovery position if unconscious."
  },
  {
    "Type": "medical",
    "Name": "Drowning",
    "Data": "Remove the person from the water and call emergency services. Check for breathing and pulse, and start CPR if necessary. Monitor for hypothermia, even if the person seems recovered."
  },
  {
    "Type": "medical",
    "Name": "Dental emergency",
    "Data": "Rinse the mouth with warm water. Apply a cold compress for swelling. For knocked-out teeth, keep the tooth moist and seek dental care immediately."
  },
  {
    "Type": "medical",
    "Name": "Chest injury",
    "Data": "Support the chest and avoid movement. Call emergency services. Monitor for breathing and prepare for CPR if necessary."
  },
  {
    "Type": "medical",
    "Name": "Cardiac arrest",
    "Data": "Call emergency services immediately. Begin CPR with chest compressions and rescue breaths. Use an AED (if available) and continue CPR until help arrives."
  },
  {
    "Type": "medical",
    "Name": "Chemical burn",
    "Data": "Remove contaminated clothing and rinse the area with running water for at least 20 minutes. Avoid using ice or ointments. Call emergency services and protect the area from further exposure."
  }
];

export default function Aidpagebody() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedEmergency, setSelectedEmergency] = useState('')
  const [helpPoints, setHelpPoints] = useState([])
  const [nearestHospital, setNearestHospital] = useState(null)
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [vitals, setVitals] = useState({ heartRate: '--', bloodPressure: '--/--' })
  const [language, setLanguage] = useState('en')
  const [weatherAlert, setWeatherAlert] = useState(null)
  const [userCountry, setUserCountry] = useState('US')
  const [simulationActive, setSimulationActive] = useState(false)
  const [simulationStep, setSimulationStep] = useState(0)
  const [simulationFeedback, setSimulationFeedback] = useState('')
  const [incidentReport, setIncidentReport] = useState(null)
  const recognitionRef = useRef(null)
  const [reportedIncidents, setReportedIncidents] = useState([])
  const [firstAidTips, setFirstAidTips] = useState([])
  const [recoveryResources, setRecoveryResources] = useState([])
  const [showReportForm, setShowReportForm] = useState(false)
  const [newIncident, setNewIncident] = useState({ type: '', description: '', location: '' })
  const [showTipForm, setShowTipForm] = useState(false)
  const [newTip, setNewTip] = useState({ tip: '', category: '' })
  const [showResourceForm, setShowResourceForm] = useState(false)
  const [newResource, setNewResource] = useState({ name: '', type: '', contact: '' })
  const [activeTab, setActiveTab] = useState('incidents')
  const [isListeningVoice, setIsListeningVoice] = useState(false);
  const [voiceSearchError, setVoiceSearchError] = useState(null);
  const audioRef = useRef(null);

  const GROQ_API_KEY = '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';

  const emergencies = emergencyData.map(item => item.Name);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
  ]

  const translations = {
    en: {
      title: 'Enhanced Emergency First Aid',
      needHelpWith: 'I need help with:',
      getHelp: 'Get Help',
      sendSOS: 'Send SOS',
      findHospital: 'Find Nearest Hospital',
      vitals: 'Vital Signs Monitoring',
      countdown: 'Emergency Response Countdown',
      videoCall: 'Emergency Video Call',
      startVideoCall: 'Start Video Call',
      panicButton: 'PANIC',
      weatherAlert: 'Weather Alert',
      firstAidVideos: 'First Aid Video Tutorials',
      emergencyHotlines: 'Emergency Hotlines',
      startSimulation: 'Start Emergency Simulation',
      simulationFeedback: 'Simulation Feedback',
      generateReport: 'Generate Incident Report',
    },
    // ... (other translations)
  }

  const firstAidVideos = [
    { id: 'cpr', title: 'CPR Tutorial', url: 'https://www.youtube.com/embed/Plse2FOkV4Q' },
    { id: 'burns', title: 'Treating Burns', url: 'https://www.youtube.com/embed/ZNWjfe-84Ig' },
    { id: 'choking', title: 'Heimlich Maneuver', url: 'https://www.youtube.com/embed/SqpcTF2HFvg' },
  ];

  const emergencyHotlines = {
    US: {
      police: '100',
      fire: '101',
      ambulance: '102',
    },
    UK: {
      police: '100',
      fire: '101',
      ambulance: '102',
    },
    AU: {
      police: '100',
      fire: '101',
      ambulance: '102',
    },
  }

  const simulationScenarios = [
    {
      title: 'CPR Emergency',
      steps: [
        {
          question: 'You find an unconscious person. What do you do first?',
          options: [
            'Start chest compressions immediately',
            'Check for responsiveness and call for help',
            'Give rescue breaths',
            'Look for bleeding'
          ],
          correctAnswer: 1,
        },
        {
          question: 'How fast should you do chest compressions?',
          options: [
            '60 compressions per minute',
            '100 compressions per minute',
            '120 compressions per minute',
            '150 compressions per minute'
          ],
          correctAnswer: 2,
        },
      ],
    },
    // Add more scenarios here
  ]

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      recognitionRef.current = new window.webkitSpeechRecognition()
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true

      recognitionRef.current.onresult = (event) => {
        const current = event.resultIndex
        const transcript = event.results[current][0].transcript
        setTranscript(transcript)
      }

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error)
        setIsListening(false)
      }
    }

    // Simulating geolocation to set user's country
    const simulateGeolocation = () => {
      const countries = ['US', 'UK', 'AU']
      const randomCountry = countries[Math.floor(Math.random() * countries.length)]
      setUserCountry(randomCountry)
    }
    simulateGeolocation()

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [])

  const handleEmergencySelect = (emergency) => {
    setSelectedEmergency(emergency)
    setIsOpen(false)
    handleGetHelp(emergency)
  }

  const handleGetHelp = () => {
    const selectedData = emergencyData.find(item => item.Name === selectedEmergency);
    if (selectedData) {
      setHelpPoints(selectedData.Data.split('. '));
    } else {
      setHelpPoints([
        "Call emergency services immediately",
        "Stay calm and assess the situation",
        "Provide first aid if trained",
        "Wait for professional help to arrive"
      ]);
    }
    startCountdown()
  }

  const handleSendSOS = () => {
    alert("SOS sent to emergency contacts!")
  }

  const handleFindHospital = () => {
    setNearestHospital({
      name: "City General Hospital",
      distance: "2.5 km",
      address: "123 Health St, Cityville"
    })
  }

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop()
    } else {
      recognitionRef.current?.start()
    }
    setIsListening(!isListening)
  }

  const speakInstructions = () => {
    const utterance = new SpeechSynthesisUtterance(helpPoints.join('. '))
    window.speechSynthesis.speak(utterance)
  }

  const startCountdown = () => {
    setCountdown(300) // 5 minutes
    const timer = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(timer)
          return 0
        }
        return prevCount - 1
      })
    }, 1000)
  }

  const simulateVitals = () => {
    setVitals({
      heartRate: Math.floor(Math.random() * (100 - 60) + 60),
      bloodPressure: `${Math.floor(Math.random() * (140 - 110) + 110)}/${Math.floor(Math.random() * (90 - 70) + 70)}`
    })
  }

  useEffect(() => {
    const interval = setInterval(simulateVitals, 5000) // Update vitals every 5 seconds
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Simulating weather alert
    const fetchWeatherAlert = () => {
      setWeatherAlert({
        type: 'Severe Thunderstorm',
        description: 'Strong winds and heavy rainfall expected in your area.',
      })
    }
    fetchWeatherAlert()
  }, [])

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value)
  }

  const startSimulation = () => {
    setSimulationActive(true)
    setSimulationStep(0)
    setSimulationFeedback('')
  }

  const handleSimulationAnswer = (answerIndex) => {
    const currentScenario = simulationScenarios[0] // For now, we're using the first scenario
    const currentStep = currentScenario.steps[simulationStep]

    if (answerIndex === currentStep.correctAnswer) {
      setSimulationFeedback('Correct! Great job!')
    } else {
      setSimulationFeedback(`Incorrect. The correct action is: ${currentStep.options[currentStep.correctAnswer]}`)
    }

    if (simulationStep < currentScenario.steps.length - 1) {
      setSimulationStep(simulationStep + 1)
    } else {
      setSimulationActive(false)
      setSimulationStep(0)
    }
  }

  const generateIncidentReport = () => {
    const doc = new jsPDF()
    
    doc.setFontSize(18)
    doc.text('Emergency Incident Report', 20, 20)
    
    doc.setFontSize(12)
    doc.text(`Date: ${new Date().toLocaleString()}`, 20, 30)
    doc.text(`Emergency Type: ${selectedEmergency}`, 20, 40)
    doc.text(`Actions Taken:`, 20, 50)
    helpPoints.forEach((point, index) => {
      doc.text(`- ${point}`, 30, 60 + (index * 10))
    })
    doc.text(`Vital Signs:`, 20, 100)
    doc.text(`- Heart Rate: ${vitals.heartRate} BPM`, 30, 110)
    doc.text(`- Blood Pressure: ${vitals.bloodPressure} mmHg`, 30, 120)
    
    const pdfBlob = doc.output('blob')
    const pdfUrl = URL.createObjectURL(pdfBlob)
    setIncidentReport(pdfUrl)
  }

  const handleReportIncident = (e) => {
    e.preventDefault()
    const incident = {
      ...newIncident,
      timestamp: new Date().toISOString(),
    }
    setReportedIncidents([...reportedIncidents, incident])
    setNewIncident({ type: '', description: '', location: '' })
    setShowReportForm(false)
  }

  const handleAddFirstAidTip = (e) => {
    e.preventDefault()
    setFirstAidTips([...firstAidTips, { ...newTip, votes: 0 }])
    setNewTip({ tip: '', category: '' })
    setShowTipForm(false)
  }

  const handleAddRecoveryResource = (e) => {
    e.preventDefault()
    setRecoveryResources([...recoveryResources, newResource])
    setNewResource({ name: '', type: '', contact: '' })
    setShowResourceForm(false)
  }

  const startVoiceListening = () => {
    setIsListeningVoice(true);
    setVoiceSearchError(null);
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
          setIsListeningVoice(false);
        }, 5000); // Record for 5 seconds
      })
      .catch(err => {
        console.error('Error accessing microphone:', err);
        setVoiceSearchError('Error accessing microphone. Please check your permissions.');
        setIsListeningVoice(false);
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
      setVoiceSearchError(`Error transcribing audio: ${error.message || 'Unknown error'}. Please try again.`);
    }
  };

  const matchKeywords = (transcription) => {
    const words = transcription.toLowerCase().split(/\s+/);
    let bestMatch = null;
    let maxMatchCount = 0;

    emergencyData.forEach(emergency => {
      const emergencyWords = emergency.Name.toLowerCase().split(/\s+/);
      const matchCount = words.filter(word => emergencyWords.includes(word)).length;

      if (matchCount > maxMatchCount) {
        maxMatchCount = matchCount;
        bestMatch = emergency.Name;
      }
    });

    if (bestMatch) {
      handleEmergencySelect(bestMatch);
    } else {
      setVoiceSearchError('No matching emergency situation found. Please try again.');
    }
  };

  const t = translations[language]
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 via-red-200 to-red-300 p-4 pt-14">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent p-4"></h1>
        
        {/* Language Selector */}
        <div className="flex justify-end">
          <select
            value={language}
            onChange={handleLanguageChange}
            className="bg-white border border-red-300 text-red-700 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
        
        {/* Weather Alert */}
        {weatherAlert && (
          <div className="bg-gradient-to-r from-red-100 to-red-200 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded-r-lg" role="alert">
            <p className="font-bold">{t.weatherAlert}: {weatherAlert.type}</p>
            <p>{weatherAlert.description}</p>
          </div>
        )}
    
        {/* Emergency Selection */}
        <div>
        <div className="bg-gradient-to-br from-white to-red-100 bg-opacity-80 p-8 rounded-2xl shadow-lg backdrop-blur-sm">
  <h2 className="text-2xl font-semibold mb-6 text-red-700">{t.needHelpWith}</h2>
  <div className="flex space-x-4 mb-4">
    <div className="relative w-2/3">
      <button
        className="w-full p-3 text-left bg-gradient-to-r from-red-50 to-red-100 border border-red-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 text-red-800"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedEmergency || "Select an emergency"}
        <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
    <button className="w-1/3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105" onClick={handleGetHelp}>
      {t.getHelp}
    </button>
  </div>

  {/* Move the dropdown <ul> outside the div with relative positioning */}
  {isOpen && (
   <ul className="block top-24 left-0 w-full mt-1 bg-white border border-red-300 rounded-lg shadow-lg max-h-64 overflow-y-auto">
   {emergencyData.map((emergency) => (
     <li
       key={emergency.Name}
       className="p-3 hover:bg-red-100 cursor-pointer text-red-800"
       onClick={() => handleEmergencySelect(emergency.Name)}
     >
       {emergency.Name}
     </li>
   ))}
 </ul>
 
  )}

          
          
          {/* Voice Search Button */}
          <div className='flex flex-row'>
          <button 
            onClick={startVoiceListening}
            disabled={isListeningVoice}
            className="w-11 h-11 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 rounded-full transition duration-300 ease-in-out transform hover:scale-105 mt-4 "
          >
            <svg className="ml-3 h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
          </button>
          <p className='mt-6 ml-5 text-xl text-red-800 font-bold'>Click for voice search</p>
          </div>
          {voiceSearchError && (
            <p className="text-red-500 mt-8">{voiceSearchError}</p>
          )}
          </div>
        </div>

        {/* Help Points List */}
        {helpPoints.length > 0 && (
          <div className="bg-gradient-to-r from-red-50 to-red-100 p-6 rounded-lg mb-8 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-red-800 text-xl">Follow these steps:</h3>
              <button 
                onClick={speakInstructions}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              </button>
            </div>
            <ol className="list-decimal pl-5 space-y-2 text-red-700">
              {helpPoints.map((point, index) => (
                <li key={index} className="mb-2">
                  {point}
                </li>
              ))}
            </ol>
          </div>
        )}
        
        
        {/* SOS Section */}
        <SOSButton/>
        
        {/* Live Location and Nearest Hospital */}
        <div className="bg-gradient-to-br from-white to-red-100 bg-opacity-80 p-8 rounded-2xl shadow-lg backdrop-blur-sm">
          <h2 className="text-2xl font-semibold mb-6 flex items-center text-red-700">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            Your Location & Nearest Hospital
          </h2>
          <div className="mb-6">
            <p className="font-semibold text-red-600">Your Location:</p>
            <p className="text-red-700">Latitude: 40.7128° N, Longitude: 74.0060° W</p>
          </div>
          <a href='/nearbyhospitals'>
          <button className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 mb-6" onClick={handleFindHospital}>
            {t.findHospital}
          </button>
          </a>
          {nearestHospital && (
            <div className="border-t border-red-200 pt-6">
              <h3 className="font-semibold mb-3 text-red-700">{nearestHospital.name}</h3>
              <p className="flex items-center mb-2 text-red-600">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                {nearestHospital.distance} away
              </p>
              <p className="flex items-center text-red-600">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                {nearestHospital.address}
              </p>
            </div>
          )}
        </div>
        
        {/* Emergency Hotlines */}
        <div className="bg-gradient-to-br from-red-50 to-red-100 bg-opacity-80 p-8 rounded-2xl shadow-lg backdrop-blur-sm">
          <h2 className="text-2xl font-semibold mb-6 flex items-center text-red-800">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
            {t.emergencyHotlines}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(emergencyHotlines[userCountry]).map(([service, number]) => (
              <div key={service} className="bg-gradient-to-r from-white to-red-50 p-4 rounded-lg shadow-md">
                <p className="font-semibold text-red-700 capitalize">{service}</p>
                <p className="text-2xl font-bold text-red-800">{number}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Emergency Simulation */}
        <div className="bg-gradient-to-br from-red-50 to-red-100 bg-opacity-80 p-8 rounded-2xl shadow-lg backdrop-blur-sm">
          <h2 className="text-2xl font-semibold mb-6 flex items-center text-red-800">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Emergency Simulation
          </h2>
          {!simulationActive ? (
            <button
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105" onClick={startSimulation}>
              {t.startSimulation}
            </button>
          ) : (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-red-700">{simulationScenarios[0].title}</h3>
              <p className="text-red-600">{simulationScenarios[0].steps[simulationStep].question}</p>
              <div className="space-y-2">
                {simulationScenarios[0].steps[simulationStep].options.map((option, index) => (
                  <button
                    key={index}
                    className={`w-full font-medium py-2 px-4 rounded-lg transition duration-300 ease-in-out ${
                      simulationFeedback !== '' && index === simulationScenarios[0].steps[simulationStep].correctAnswer
                        ? 'bg-green-200 text-green-800'
                        : 'bg-gradient-to-r from-red-100 to-red-200 hover:from-red-200 hover:to-red-300 text-red-800'
                    }`}
                    onClick={() => handleSimulationAnswer(index)}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {simulationFeedback && (
                <div className={`p-4 rounded-lg ${simulationFeedback.includes('Correct') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {simulationFeedback}
                </div>
              )}
            </div>
          )}
        </div>

        {/* First Aid Video Tutorials */}
        <div className="bg-gradient-to-br from-red-50 to-red-100 bg-opacity-80 p-8 rounded-2xl shadow-lg backdrop-blur-sm">
          <h2 className="text-2xl font-semibold mb-6 flex items-center text-red-800">
            <svg
              className="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            First Aid Video Tutorials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {firstAidVideos.map((video) => (
              <div key={video.id} className="bg-gradient-to-r from-white to-red-50 rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={video.url}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-red-700">{video.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Incident Report Generation */}
       

        {/* Crowdsourced Real-time Emergency Situations */}
        <div className="bg-gradient-to-br from-red-50 to-red-100 bg-opacity-80 p-8 rounded-2xl shadow-lg backdrop-blur-sm">
          <h2 className="text-2xl font-semibold mb-6 flex items-center text-red-800">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            Crowdsourced Emergency Reports
          </h2>
          <div className="flex space-x-2 mb-4">
            <button
              onClick={() => setActiveTab('incidents')}
              className={`px-4 py-2 rounded-lg ${activeTab === 'incidents' ? 'bg-gradient-to-r from-red-600 to-red-700 text-white' : 'bg-gradient-to-r from-red-100 to-red-200 text-red-800'}`}
            >
              Incidents
            </button>
            <button
              onClick={() => setActiveTab('heatmap')}
              className={`px-4 py-2 rounded-lg ${activeTab === 'heatmap' ? 'bg-gradient-to-r from-red-600 to-red-700 text-white' : 'bg-gradient-to-r from-red-100 to-red-200 text-red-800'}`}
            >
              Heatmap
            </button>
          </div>
          {activeTab === 'incidents' ? (
            <>
              <button
                onClick={() => setShowReportForm(true)}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 mb-4"
              >
                Report New Incident
              </button>
              {showReportForm && (
                <form onSubmit={handleReportIncident} className="mb-4 space-y-4">
                  <input
                    type="text"
                    placeholder="Incident Type"
                    value={newIncident.type}
                    onChange={(e) => setNewIncident({...newIncident, type: e.target.value})}
                    className="w-full p-2 border border-red-300 rounded-lg bg-gradient-to-r from-white to-red-50"
                    required
                  />
                  <textarea
                    placeholder="Description"
                    value={newIncident.description}
                    onChange={(e) => setNewIncident({...newIncident, description: e.target.value})}
                    className="w-full p-2 border border-red-300 rounded-lg bg-gradient-to-r from-white to-red-50"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Location"
                    value={newIncident.location}
                    onChange={(e) => setNewIncident({...newIncident, location: e.target.value})}
                    className="w-full p-2 border border-red-300 rounded-lg bg-gradient-to-r from-white to-red-50"
                    required
                  />
                  <button type="submit" className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-2 rounded-lg">Submit Report</button>
                </form>
              )}
              <div className="mt-4 space-y-4">
                {reportedIncidents.map((incident, index) => (
                  <div key={index} className="bg-gradient-to-r from-white to-red-50 p-4 rounded-lg shadow-md">
                    <p className="font-semibold text-red-700">{incident.type}</p>
                    <p className="text-sm text-red-600">{incident.description}</p>
                    <p className="text-sm text-red-600">{incident.location}</p>
                    <p className="text-sm text-red-500">{new Date(incident.timestamp).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="bg-gradient-to-r from-red-100 to-red-200 h-64 rounded-lg flex items-center justify-center">
              <p className="text-red-700">Heatmap of reported incidents would be displayed here</p>
            </div>
          )}
        </div>

        {/* Community-Driven First Aid Knowledge Base */}
        <div className="bg-gradient-to-br from-red-50 to-red-100 bg-opacity-80 p-8 rounded-2xl shadow-lg backdrop-blur-sm">
          <h2 className="text-2xl font-semibold mb-6 flex items-center text-red-800">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            Community First Aid Tips
          </h2>
          <button
            onClick={() => setShowTipForm(true)}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 mb-4"
          >
            Add New Tip
          </button>
          {showTipForm && (
            <form onSubmit={handleAddFirstAidTip} className="mb-4 space-y-4">
              <input
                type="text"
                placeholder="First Aid Tip"
                value={newTip.tip}
                onChange={(e) => setNewTip({...newTip, tip: e.target.value})}
                className="w-full p-2 border border-red-300 rounded-lg bg-gradient-to-r from-white to-red-50"
                required
              />
              <select
                value={newTip.category}
                onChange={(e) => setNewTip({...newTip, category: e.target.value})}
                className="w-full p-2 border border-red-300 rounded-lg bg-gradient-to-r from-white to-red-50"
                required
              >
                <option value="">Select Category</option>
                <option value="burns">Burns</option>
                <option value="cuts">Cuts</option>
                <option value="fractures">Fractures</option>
                <option value="cpr">CPR</option>
              </select>
              <button type="submit" className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-2 rounded-lg">Submit Tip</button>
            </form>
          )}
          <div className="space-y-4">
            {firstAidTips.map((tip, index) => (
              <div key={index} className="bg-gradient-to-r from-white to-red-50 p-4 rounded-lg shadow-md flex items-center justify-between">
                <div>
                  <p className="font-semibold text-red-700">{tip.tip}</p>
                  <p className="text-sm text-red-600">Category: {tip.category}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      const updatedTips = [...firstAidTips]
                      updatedTips[index].votes++
                      setFirstAidTips(updatedTips)
                    }}
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-2 py-1 rounded"
                  >
                    👍 {tip.votes}
                  </button>
                  <button
                    onClick={() => {
                      const updatedTips = [...firstAidTips]
                      updatedTips[index].votes--
                      setFirstAidTips(updatedTips)
                    }}
                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-2 py-1 rounded"
                  >
                    👎
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Post-emergency Recovery Assistance */}

      </div>

      {/* Panic Button Widget */}
      <div className="fixed bottom-4 right-4">
       <MedicalAIChatot></MedicalAIChatot>
      </div>
    </div>
  )
}