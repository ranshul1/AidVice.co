
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './route/user.route.js';
import sosRoutes from './route/sos.route.js';
import axios from 'axios';
import { URLSearchParams } from 'url';
// Load environment variables
dotenv.config();

// Initialize express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to the database
connectDB();

// Function to send SMS using Fast2SMS API
async function sendSMS() {
  const phoneNumber = '9993173445'; // Ensure this is a valid numeric phone number
  const message = '1234';

  // Check if the phone number contains only numeric values
  if (!/^\d+$/.test(phoneNumber)) {
    console.log('Invalid phone number. Only numeric values are allowed.');
    return;
  }

  // Prepare the data for the API request in URL-encoded format
  const data = new URLSearchParams({
    message: message,
    language: 'english',
    route: 'otp', // Use OTP route if you're sending OTPs, else change the route accordingly
    numbers: phoneNumber,
  }).toString();

  // Set up the request headers and API URL
  const config = {
    headers: {
      'Authorization': process.env.FAST2SMS_API_KEY, // Get API key from environment variables
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
    },
  };

  // Make the request to Fast2SMS API
  try {
    const response = await axios.post(
      'https://www.fast2sms.com/dev/bulkV2',
      data,
      config
    );

    // Handle the response
    if (response.status === 200) {
      console.log('SMS sent successfully:', response.data);
    } else {
      console.log('Failed to send SMS:', response.data);
    }
  } catch (error) {
    console.error('Error sending SMS:', error);
  }
};

// Routes
app.use('/user', userRoutes); // Auth-related routes
app.use('/sos', (req, res, next) => {
  console.log('SOS route accessed:', req.method, req.path);
  next();
});

app.use('/sos', sosRoutes); // SOS-related routes

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
    success: false,
    message: 'Something went wrong!',
  });
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
