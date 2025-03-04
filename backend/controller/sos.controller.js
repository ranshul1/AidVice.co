import User from '../model/user.model.js';
import axios from 'axios';

export const sendSOS = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, message: 'Message is required.' });
    }

    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    const phoneNumber = user.phnumber;
    if (!phoneNumber) {
      return res.status(400).json({ success: false, message: 'Phone number is missing.' });
    }

    const data = new URLSearchParams({
      message: message,
      language: 'english',
      route: 'q', // Quick SMS route
      numbers: phoneNumber,
    });

    const config = {
      headers: {
        Authorization: process.env.FAST2SMS_API_KEY,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    const response = await axios.post('https://www.fast2sms.com/dev/bulkV2', data, config);

    if (response.data.return) {
      return res.status(200).json({ success: true, message: 'SOS sent successfully!' });
    } else {
      console.error('Fast2SMS API Error:', response.data);
      return res.status(500).json({ success: false, message: response.data.message || 'SMS sending failed.' });
    }
  } catch (error) {
    console.error('Error in sendSOS:', error);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

