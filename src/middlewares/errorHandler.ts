import { NextFunction, Request, Response } from 'express';
import { constants } from 'http2';
import { Error } from 'mongoose';
import { BadRequestError } from '../utils/errors/badRequest';
import { NotFoundError } from '../utils/errors/notFoundError';
import { InternalServerError } from '../utils/errors/internalServerError';
import { DuplicateError } from '../utils/errors/duplicateError';
import { UnauthorizedError } from '../utils/errors/unauthorizedError';
import { GeneralError } from '../interface/entities';

export const errorHandler = (
  err: GeneralError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err.code === 11000) {
    const { message, statusCode } = new DuplicateError('Такой пользователь уже существует');
    return res.status(statusCode).json({ message });
  }
  if (err instanceof Error.CastError) {
    const { message, statusCode } = new BadRequestError('Некорректные данные');
    return res.status(statusCode).json({ message });
  }
  if (err instanceof Error.ValidationError) {
    const { message, statusCode } = new BadRequestError(err.message);
    return res.status(statusCode).json({ message });
  }
  if (
    [NotFoundError, UnauthorizedError, BadRequestError, InternalServerError]
      .some((errorClass) => err instanceof errorClass)
  ) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  return res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({ message: 'Неизвестная ошибка' });
};
