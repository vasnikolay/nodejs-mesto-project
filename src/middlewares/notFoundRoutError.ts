import { NextFunction, Request, Response } from 'express';
import { NotFoundError } from '../utils/errors/notFoundError';

export const notFoundRoutError = (req: Request, res: Response, next: NextFunction) => {
  const error = new NotFoundError(`Маршрут ${req.url} не найден`);
  next(error);
};
