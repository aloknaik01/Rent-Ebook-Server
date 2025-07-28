import express from 'express';
import { getUser, login, logout, register, verifyOtp } from '../controller/auth.controller.js';
import { isAuth } from '../middlewares/auth.Middleware.js';

const router = express.Router();
router.post('/register', register);
router.post('/verify-otp', verifyOtp);
router.post('/login', login);
router.get('/logout', isAuth, logout);
router.get('/me', isAuth, getUser);

export default router;
