import express from 'express';
import { getUser, getUserById, login, signup } from '../controller/user.controller.js';
import { authenticateUser } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post("/signup", signup);
router.post("/login", login);

// Protected routes
router.get("/", authenticateUser, getUser);
router.get('/user/:id', authenticateUser, getUserById);

export default router;
