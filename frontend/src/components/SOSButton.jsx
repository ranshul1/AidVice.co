
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const SOSButton = () => {
  const [isSending, setIsSending] = useState(false);

  const handleSOSClick = async () => {
    setIsSending(true);

    try {
      const message = 'Emergency! Help needed!';
      const token = sessionStorage.getItem('token');

      if (!token) {
        toast.error('You are not logged in. Please log in first.');
        setIsSending(false);
        return;
      }

      const response = await axios.post(
        'http://localhost:4001/sos/send',
        { message },
        {
          headers: { Authorization: `Bearer ${token}`},
        }
      );

      if (response.data.success) {
        toast.success('SOS sent successfully!');
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error('Error sending SOS:', error);
      toast.error('Failed to send SOS. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <button
      onClick={handleSOSClick}
      disabled={isSending}
      className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full shadow-lg"
    >
      {isSending ? 'Sending SOS...' : 'SOS'}
    </button>
  );
};

export default SOSButton;