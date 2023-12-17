import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../utils/errors/unauthorizedError';
import { AuthenticatedRequest } from '../interface/controllersArrt';
import { secretKey } from '../utils/token';

export const auth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, secretKey) as { _id: string | jwt.JwtPayload };
    req.user = payload;
  } catch (err) {
    next(new UnauthorizedError('Неверный токен авторизации'));
  }

  next();
};
