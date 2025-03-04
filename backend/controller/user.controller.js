
import jwt from 'jsonwebtoken';
import User from '../model/user.model.js';
import bcrypt from 'bcryptjs';

// User signup
export const signup = async (req, res) => {
  try {
    const {
      fullname,
      dob,
      email,
      phnumber,
      password,
      fathername,
      mothername,
      address,
      occupation,
      dp,
      bloodgrp,
      diseasebool,
      disease,
      allergybool,
      allergy,
      surgerybool,
      surgery,
      socialhistory,
      emergencycontact,
    } = req.body;

    // Validate required fields
    if (!fullname || !email || !password) {
      return res
        .status(400)
        .json({ message: 'Fullname, email, and password are required.' });
    }

    if (typeof password !== 'string' || password.trim().length < 6) {
      return res
        .status(400)
        .json({ message: 'Password must be at least 6 characters long.' });
    }

    // Validate emergency contacts
    if (emergencycontact && Array.isArray(emergencycontact)) {
      const isValid = emergencycontact.every(contact => {
        return (
          typeof contact.name === 'string' &&
          typeof contact.phone === 'string' &&
          typeof contact.relation === 'string' &&
          contact.name.trim() !== '' &&
          contact.phone.trim() !== '' &&
          contact.relation.trim() !== '' &&
          /^\d{10}$/.test(contact.phone) // Ensure phone is a valid 10-digit string
        );
      });

      if (!isValid) {
        return res.status(400).json({
          message:
            'Each emergency contact must have a valid name, 10-digit phone number, and relationship.',
        });
      }
    } else if (emergencycontact && !Array.isArray(emergencycontact)) {
      return res
        .status(400)
        .json({ message: 'Emergency contacts must be an array.' });
    }

    // Clean and map emergency contacts
    const cleanedEmergencyContacts = emergencycontact.map(contact => ({
      emergencycontactname: contact.name,
      emergencycontactphn: contact.phone,
      emergencycontactrln: contact.relation,
    }));

    // Check if user exists by email or fullname
    const existingUser = await User.findOne({
      $or: [{ email }, { fullname }],
    });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      fullname,
      dob,
      email,
      phnumber,
      password: hashedPassword,
      fathername,
      mothername,
      address,
      occupation,
      bloodgrp,
      diseasebool,
      disease,
      allergybool,
      allergy,
      surgerybool,
      surgery,
      socialhistory,
      emergencycontact: cleanedEmergencyContacts,
    });

    await newUser.save();

    res.status(201).json({
      message: 'User created successfully!',
      user: {
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: 'Internal server error.' });
  }
};


// User login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare the password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error during login:', error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get user details (protected route)
export const getUser = async (req, res) => {
  try {
    const user = req.user; // User object from authenticateUser middleware
    return res.status(200).json({ user });
  } catch (error) {
    console.error('Error fetching user data:', error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).lean();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error('Error fetching user data:', error.message);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
// Middleware to authenticate user (already provided, updated for clarity)
export const authenticateUser = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Token is missing' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user from the decoded token
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // Attach user to the request object
    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication failed:', error.message);
    return res.status(401).json({ error: error.name === 'JsonWebTokenError' ? 'Invalid token' : 'Token expired' });
  }
};