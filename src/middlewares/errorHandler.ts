import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from '../utils/errors/badRequest';
import { getValidationErrorMessage } from '../utils/errorValidation';

interface GeneralError extends Error {
    statusCode: number;
    errors?: Record<string, {
    kind: string;
    path: string;
    properties: Record<string, unknown>;
  }>;
}

const errorNames = [
  'NotFoundError',
  'InternalServerError',
  'BadRequestError',
];

export const errorHandler = (
  err: GeneralError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err.name === 'ValidationError') {
    const { message, statusCode } = new BadRequestError(getValidationErrorMessage(err.errors));
    return res.status(statusCode).json({ message });
  }
  if (errorNames.includes(err.name)) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  return res.status(500).json({ message: 'Неизвестная ошибка' });
};
