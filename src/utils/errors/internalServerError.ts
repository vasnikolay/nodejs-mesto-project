export class InternalServerError extends Error {
  private statusCode: number;

  constructor(message:string) {
    super(message);
    this.statusCode = 500;
    this.name = 'InternalServerError';
  }
}
