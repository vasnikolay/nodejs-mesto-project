import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import crypto from 'crypto';

export const generateToken = (id:Types.ObjectId) => {
  const secretKey = crypto.randomBytes(32).toString('hex');
  return jwt.sign({ _id: id }, secretKey, { expiresIn: '7d' });
};
