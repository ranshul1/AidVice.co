
const fast2sms = require('fast-two-sms');

const sendSMS = async ({ message, numbers }) => {
  try {
    if (!process.env.FAST2SMS_API_KEY) {
      throw new Error('FAST2SMS_API_KEY is missing.');
    }

    const response = await fast2sms.sendMessage({
      authorization: process.env.FAST2SMS_API_KEY,
      message,
      numbers,
      language: 'english',
      route: 'transactional',
    });

    if (!response.return) {
      throw new Error(response.message || 'SMS sending failed.');
    }

    return response;
  } catch (error) {
    console.error('Error sending SMS:', error.message || error);
    throw error;
  }
};

module.exports = sendSMS;