import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '@models/User';
import { config } from '@config/index';
import { StatusCodes } from 'http-status-codes';

export async function register(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });

  const { name, email, password, roles, club } = req.body as {
    name: string; email: string; password: string; roles?: string[]; club?: string;
  };

  const existing = await User.findOne({ email });
  if (existing) return res.status(StatusCodes.CONFLICT).json({ message: 'Email already registered' });

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, passwordHash, roles: roles || ['USER'], club });
  return res.status(StatusCodes.CREATED).json({ id: user._id, email: user.email });
}

export async function login(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });

  const { email, password } = req.body as { email: string; password: string };
  const user = await User.findOne({ email });
  if (!user) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid credentials' });

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ userId: user.id, roles: user.roles }, config.jwtSecret, { expiresIn: '7d' });
  return res.json({ access_token: token, roles: user.roles, name: user.name, club: user.club, id: user.id });
}

export async function verify(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });

  const { email, otp } = req.body as { email: string; otp: string };
  // NOTE: OTP is not validated in this simplified flow. In production, validate it.
  const user = await User.findOne({ email });
  if (!user) return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
  const token = jwt.sign({ userId: user.id, roles: user.roles }, config.jwtSecret, { expiresIn: '7d' });
  return res.json({
    name: user.name,
    roles: user.roles,
    club: user.club,
    id: user.id,
    accessToken: token,
  });
}

export async function googleLogin(_req: Request, res: Response) {
  // Simplified: always issue a USER token. Replace with real Google token verification.
  const payload = { name: 'Google User', email: 'googleuser@example.com', roles: ['USER'] as string[] };
  // Create user if missing
  let user = await User.findOne({ email: payload.email });
  if (!user) {
    user = await User.create({ name: payload.name, email: payload.email, passwordHash: await bcrypt.hash('oauth', 6), roles: ['USER'] });
  }
  const token = jwt.sign({ userId: user.id, roles: user.roles }, config.jwtSecret, { expiresIn: '7d' });
  return res.json({ access_token: token, roles: user.roles, name: user.name, club: user.club, id: user.id });
}

export async function logout(_req: Request, res: Response) {
  // Stateless JWT: client should delete token. We return OK for UX.
  return res.json({ ok: true });
}
