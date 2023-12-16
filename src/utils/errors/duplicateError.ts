import { constants } from 'http2';

export class DuplicateError extends Error {
  public statusCode: number;

  constructor(message:string) {
    super(message);
    this.statusCode = constants.HTTP_STATUS_CONFLICT;
    this.name = 'DuplicateError';
  }
}
