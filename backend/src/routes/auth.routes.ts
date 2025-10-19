import { Router } from 'express';
import { body } from 'express-validator';
import { googleLogin, login, logout, register, verify } from '@controllers/auth.controller';

const router = Router();

router.post('/register',
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('name').isString().notEmpty(),
  register
);

router.post('/login',
  body('email').isEmail(),
  body('password').isString().notEmpty(),
  login
);

// Placeholder endpoints to match existing frontend (verify, forgotPassword)
router.post('/verify', body('email').isEmail(), body('otp').isString(), verify);

router.post('/forgotPassword', body('email').isEmail(), (_req, res) => res.json({ sent: true }));
router.post('/forgotPassword/verify', body('email').isEmail(), body('otp').isString(), (_req, res) => res.json({ ok: true }));
router.post('/forgotPassword/changePassword', (_req, res) => res.json({ changed: true }));
router.post('/google', googleLogin);
router.post('/logout', logout);

export default router;
