import { constants } from 'http2';

export class UnauthorizedError extends Error {
  public statusCode: number;

  constructor(message:string) {
    super(message);
    this.statusCode = constants.HTTP_STATUS_UNAUTHORIZED;
    this.name = 'UnauthorizedError';
  }
}
