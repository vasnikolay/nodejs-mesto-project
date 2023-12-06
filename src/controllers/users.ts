import { NextFunction, Request, Response } from 'express';
import UserModel from '../models/user';
import { RequestWithBody } from '../interface/entities';
import { User } from '../interface/user';
import { NotFoundError } from '../utils/errors/notFoundError';
import { BadRequestError } from '../utils/errors/badRequest';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (
  req: Request<{ userId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.params;
    const user = await UserModel.findById(userId);

    if (!user) {
      throw new NotFoundError('Пользователь c указанным _id не найден');
    } else {
      res.json(user);
    }
  } catch (err) {
    next(err);
  }
};

export const createUser = async (req: RequestWithBody<User>, res: Response, next: NextFunction) => {
  try {
    const { name, about, avatar } = req.body;
    const user = await UserModel.create({ name, about, avatar });
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req: RequestWithBody<Omit<User, 'avatar'>>, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore временно для заглушки
    const userId = req.user._id;
    const { name, about } = req.body;
    if (!name && !about) {
      throw new BadRequestError('Нужно ввести поле name или about');
    }

    const user = await UserModel.findByIdAndUpdate(
      userId,
      { name, about },
      { new: true, runValidators: true },
    );

    if (!user) {
      throw new NotFoundError('Пользователь не найден');
    } else {
      res.json(user);
    }
  } catch (err) {
    next(err);
  }
};

export const updateAvatar = async (req: RequestWithBody<Pick<User, 'avatar'>>, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore временно для заглушки
    const userId = req.user._id;
    const { avatar } = req.body;
    if (!avatar) {
      throw new BadRequestError('Нужно ввести поле avatar');
    }
    const user = await UserModel.findByIdAndUpdate(
      userId,
      { avatar },
      { new: true, runValidators: true },
    );

    if (!user) {
      throw new NotFoundError('Пользователь не найден');
    } else {
      res.json(user);
    }
  } catch (err) {
    next(err);
  }
};
