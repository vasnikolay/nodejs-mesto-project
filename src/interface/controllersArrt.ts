import { Request } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthenticatedRequest<P = {}, S= {}, Q = {}> extends Request<P, S, Q> {
  user?:{
    _id: string | jwt.JwtPayload
  };
}

export type RequestWithBody<T> = AuthenticatedRequest<{}, {}, T>

export type RequestWithParams<T> = AuthenticatedRequest<T>
