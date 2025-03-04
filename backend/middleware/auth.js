

import jwt from 'jsonwebtoken';
import User from '../model/user.model.js';

export const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Unauthorized. No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found.' });
    }
    req.user = { id: user._id, email: user.email }; // Attach user data to request
    next();
  } catch (error) {
    console.error('Authentication error:', error.message);
    res.status(401).json({ success: false, message: 'Unauthorized. Invalid token.' });
  }
};