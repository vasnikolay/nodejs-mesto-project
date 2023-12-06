import { NextFunction, Response, Request } from 'express';

export const linkUser = (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  req.user = {
    _id: '65649b73582ae83f475b9dfa',
  };
  next();
};
