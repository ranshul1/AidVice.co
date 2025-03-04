import express from 'express'
import { getAid } from '../controller/aid.controller.js'

const router=express.Router();

router.get("/", getAid);

export default router;