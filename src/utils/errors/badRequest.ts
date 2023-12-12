import { constants } from 'http2';

export class BadRequestError extends Error {
  public statusCode: number;

  constructor(message:string) {
    super(message);
    this.statusCode = constants.HTTP_STATUS_BAD_REQUEST;
    this.name = 'BadRequestError';
  }
}
