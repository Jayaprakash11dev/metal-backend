import express from 'express';
import { signup, login } from '../controllers/auth.controller.js';
import { body } from 'express-validator';

const router = express.Router();

router.post('/signup',
  [body('email').isEmail(), body('password').isLength({ min: 6 })],
  signup
);

router.post('/login',
  [body('email').isEmail(), body('password').notEmpty()],
  login
);

export default router;
