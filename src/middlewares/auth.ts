import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../utils/errors/unauthorizedError';
import { AuthenticatedRequest } from '../interface/controllersArrt';
import { secretKey } from '../utils/token';

export const auth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;

  if (!token) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  let payload;

  try {
    payload = jwt.verify(token, secretKey) as { _id: string | jwt.JwtPayload };
    req.user = payload;
  } catch (err) {
    next(new UnauthorizedError('Неверный токен авторизации'));
  }

  next();
};
