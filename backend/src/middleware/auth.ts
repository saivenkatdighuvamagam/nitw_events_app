import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '@config/index';
import { StatusCodes } from 'http-status-codes';

export function authenticateJwt(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Missing or invalid Authorization header' });
  }

  const token = authHeader.slice('Bearer '.length);
  try {
    const payload = jwt.verify(token, config.jwtSecret);
    req.user = payload as Express.UserJwt;
    return next();
  } catch {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid token' });
  }
}

export function authorizeRoles(...allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const roles = req.user?.roles || [];
    const permitted = roles.some((r) => allowedRoles.includes(r));
    if (!permitted) {
      return res.status(StatusCodes.FORBIDDEN).json({ message: 'Forbidden' });
    }
    return next();
  };
}
