import express from 'express';
import { sendSOS } from'../controller/sos.controller.js';
import { authenticateUser } from '../middleware/auth.js';
const router = express.Router();
router.post('/send', authenticateUser, sendSOS);

export default router;
