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

  const token = jwt.sign({ userId: user._id.toString(), roles: user.roles }, config.jwtSecret, { expiresIn: '7d' });
  return res.json({ access_token: token, roles: user.roles, name: user.name, club: user.club, id: user._id });
}
