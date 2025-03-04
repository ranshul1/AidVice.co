const jwt = require('jsonwebtoken');

// Replace these values with your actual details
const JWT_SECRET = '45d368e57c0dba4f0f2df4823c3cc1f1550431a140c8748a92cc98e68a932e31287719d96c91b363b9262209bf3393d05bf21921f8a8aaad592e154ad031871f'; // Ensure this matches your backend .env value
const payload = {
  userId: '6754a7a9d0be0bd8b73462f0', // Replace with a valid userId from your database
};

const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }); // Token valid for 1 hour
console.log('Generated Token:', token);