import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Together from "together-ai";
import './MedicalAIChatbot.css';

const together = new Together({ apiKey: 'f499f1671654820a7dbc7fb1d9df3fa640e5b90ddbe3c5f63ab2da349f62275f' });
const GROQ_API_KEY ='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' ;

const MedicalAIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const chatContainerRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const processWithVisionModel = async (image, text) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result.split(',')[1];
        try {
          const response = await together.chat.completions.create({
            messages: [
              { role: "system", content: "You are a medical AI assistant capable of analyzing images and answering questions." },
              { role: "user", content: `Analyze this medical image and answer the following question: ${text}` }
            ],
            model: "meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo",
            max_tokens: 500,
            temperature: 0.7,
            top_p: 0.7,
            top_k: 50,
            repetition_penalty: 1,
            stop: ["<|eot_id|>", "<|eom_id|>"],
            image: base64Image
          });

          let fullResponse = '';
          for await (const token of response) {
            fullResponse += token.choices[0]?.delta?.content || '';
          }
          resolve(fullResponse);
        } catch (error) {
          console.error('Error in processWithVisionModel:', error);
          reject(new Error('Failed to process image: ' + error.message));
        }
      };
      reader.onerror = (error) => {
        console.error('Error reading file:', error);
        reject(new Error('Failed to read image file'));
      };
      reader.readAsDataURL(image);
    });
  };

  const processWithGroq = async (text) => {
    try {
      const response = await axios.post(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          model: 'gemma2-9b-it',
          messages: [{ role: 'user', content: text }],
          max_tokens: 8000,
          temperature: 0.7,
        },
        {
          headers: {
            'Authorization': `Bearer ${GROQ_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data.choices[0].message.content.trim();
    } catch (error) {
      console.error('Error in processWithGroq:', error);
      throw new Error('Failed to process text: ' + error.message);
    }
  };

  const formatResponse = (response) => {
    const lines = response.split('\n');
    let formattedResponse = '';
    let inList = false;

    lines.forEach((line, index) => {
      if (line.trim().match(/^\d+\./)) {
        if (!inList) {
          formattedResponse += '<ol>';
          inList = true;
        }
        formattedResponse += `<li>${line.trim().replace(/^\d+\./, '')}</li>`;
      } else if (line.trim().match(/^-/)) {
        if (!inList) {
          formattedResponse += '<ul>';
          inList = true;
        }
        formattedResponse += `<li>${line.trim().replace(/^-/, '')}</li>`;
      } else {
        if (inList) {
          formattedResponse += inList ? '</ol></ul>'.slice(inList === 'ol' ? 4 : 0) : '';
          inList = false;
        }
        formattedResponse += `<p>${line}</p>`;
      }
    });

    if (inList) {
      formattedResponse += inList ? '</ol></ul>'.slice(inList === 'ol' ? 4 : 0) : '';
    }

    return formattedResponse;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() && !selectedImage) return;

    const userMessage = {
      type: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString(),
    };

    if (selectedImage) {
      userMessage.image = URL.createObjectURL(selectedImage);
    }

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      let aiResponse = '';
      
      if (selectedImage) {
        aiResponse = await processWithVisionModel(selectedImage, input);
      } else {
        aiResponse = await processWithGroq(input);
      }

      const formattedResponse = formatResponse(aiResponse);

      setMessages(prev => [...prev, {
        type: 'ai',
        content: formattedResponse,
        timestamp: new Date().toLocaleTimeString(),
      }]);

      setSelectedImage(null);
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      setMessages(prev => [...prev, {
        type: 'ai',
        content: 'I apologize, but I encountered an error processing your request. Please try again or rephrase your question.',
        timestamp: new Date().toLocaleTimeString(),
      }]);
    }

    setIsTyping(false);
  };

  const startNewChat = () => {
    setMessages([]);
    setSelectedImage(null);
    setInput('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce"
          aria-label="Open chat"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}
      
      {isOpen && (
        <div className="bg-white rounded-lg shadow-2xl w-96 h-[32rem] flex flex-col overflow-hidden animate-slideIn">
          <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 text-white flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                <img
                  src="/placeholder.svg?height=40&width=40"
                  alt="AI Assistant"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-lg font-bold">Medical AI Assistant</h2>
                <p className="text-xs opacity-80">Always here to help</p>
              </div>
            </div>
            <button
              onClick={toggleChat}
              className="text-white hover:text-gray-200 transition-colors"
              aria-label="Close chat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
          >
            {messages.length === 0 && (
              <div className="text-center text-gray-500 mt-8">
                <p className="text-lg font-semibold">Welcome to Medical AI Assistant</p>
                <p className="text-sm mt-2">Ask me anything about medical topics or upload an image for analysis.</p>
              </div>
            )}
            
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-messageSlide`}
              >
                <div
                  className={`max-w-[75%] rounded-lg p-3 ${
                    message.type === 'user'
                      ? 'bg-blue-500 text-white ml-4'
                      : 'bg-white text-gray-800 mr-4 shadow-md'
                  }`}
                >
                  {message.image && (
                    <div className="mb-2">
                      <img
                        src={message.image}
                        alt="Uploaded"
                        className="max-w-full h-auto rounded-lg"
                      />
                    </div>
                  )}
                  {message.type === 'ai' ? (
                    <div dangerouslySetInnerHTML={{ __html: message.content }} />
                  ) : (
                    <p className="break-words">{message.content}</p>
                  )}
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp}
                  </span>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start animate-messageSlide">
                <div className="bg-white text-gray-800 rounded-lg p-3 shadow-md mr-4">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-200">
            <div className="flex space-x-2 mb-2">
              <button
                type="button"
                onClick={startNewChat}
                className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-sm transition-colors duration-200"
              >
                New Chat
              </button>
              <label className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-sm cursor-pointer transition-colors duration-200">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  ref={fileInputRef}
                  className="hidden"
                />
                {selectedImage ? 'Image Selected ✓' : 'Upload Image'}
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder={selectedImage ? "Ask about the image or send without text..." : "Type your message..."}
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
              />
              <button
                type="submit"
                disabled={!input.trim() && !selectedImage}
                className={`bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full p-2 transition-all duration-200 ${
                  (!input.trim() && !selectedImage)
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:shadow-lg'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default MedicalAIChatbot;

