import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface UserJwt extends JwtPayload {
      userId: string;
      roles: string[];
    }
    interface Request {
      user?: UserJwt;
    }
  }
}
export {};
