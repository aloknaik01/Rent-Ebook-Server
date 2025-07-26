import express from 'express';
import { login, logout, register, verifyOtp } from '../controller/auth.controller.js';
import { isAuth } from '../middlewares/auth.Middleware.js';

const router = express.Router();
router.post('/register', register);
router.post('/verify-otp', verifyOtp);
router.post('/login', login);
router.get('/logout', isAuth, logout);

export default router;
