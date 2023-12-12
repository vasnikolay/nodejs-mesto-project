import { NextFunction, Request, Response } from 'express';
import { constants } from 'http2';
import { Error } from 'mongoose';
import { BadRequestError } from '../utils/errors/badRequest';
import { getValidationErrorMessage } from '../utils/errorValidation';
import { NotFoundError } from '../utils/errors/notFoundError';
import { InternalServerError } from '../utils/errors/internalServerError';

interface GeneralError extends Error {
    statusCode: number;
    errors?: Record<string, {
    kind: string;
    path: string;
    properties: Record<string, unknown>;
  }>;
}

export const errorHandler = (
  err: GeneralError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof Error.CastError) {
    const { message, statusCode } = new BadRequestError('Некорректные данные');
    return res.status(statusCode).json({ message });
  }
  if (err instanceof Error.ValidationError) {
    const { message, statusCode } = new BadRequestError(getValidationErrorMessage(err.errors));
    return res.status(statusCode).json({ message });
  }
  if (err instanceof (NotFoundError || BadRequestError || InternalServerError)) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  return res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({ message: 'Неизвестная ошибка' });
};
