import { Error } from 'mongoose';

export interface GeneralError extends Error {
  code?: number;
  statusCode: number;
  errors?: Record<string, {
    kind: string;
    path: string;
    properties: Record<string, unknown>;
  }>;
}
