import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../utils/errors/unauthorizedError';
import { AuthenticatedRequest } from '../interface/controllersArrt';

export const auth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key') as { _id: string | jwt.JwtPayload };
    req.user = payload;
  } catch (err) {
    next(err);
  }

  next();
};
