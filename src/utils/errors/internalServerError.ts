import { constants } from 'http2';

export class InternalServerError extends Error {
  private statusCode: number;

  constructor(message:string) {
    super(message);
    this.statusCode = constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
    this.name = 'InternalServerError';
  }
}
