import { Router } from 'express';
import { body } from 'express-validator';
import { login, register } from '@controllers/auth.controller';

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
router.post('/verify', body('email').isEmail(), body('otp').isString(), (req, res) => {
  // For now, auto-verify and issue token (replace with real OTP in production)
  res.json({
    name: 'Verified User',
    roles: ['USER'],
    club: req.body.club || null,
    id: '000000000000000000000000',
    accessToken: 'placeholder',
  });
});

router.post('/forgotPassword', body('email').isEmail(), (_req, res) => res.json({ sent: true }));
router.post('/forgotPassword/verify', body('email').isEmail(), body('otp').isString(), (_req, res) => res.json({ ok: true }));
router.post('/forgotPassword/changePassword', (_req, res) => res.json({ changed: true }));
router.post('/google', (_req, res) => res.json({ access_token: 'placeholder', roles: ['USER'], name: 'Google User', club: null, id: '000000000000000000000000' }));

export default router;
