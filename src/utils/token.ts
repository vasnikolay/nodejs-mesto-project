import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

export const secretKey = 'd5e4eef1004688a5b955293958b9ac3aad8b6304996ae03ba3770c9dd1e824d5';

export const generateToken = (id:Types.ObjectId) => jwt.sign({ _id: id }, secretKey, { expiresIn: '7d' });
