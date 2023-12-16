import { NextFunction, Request, Response } from 'express';
import { constants } from 'http2';
import bcrypt from 'bcryptjs';
import UserModel from '../models/user';
import { RequestWithBody, RequestWithParams } from '../interface/controllersArrt';
import { User } from '../interface/user';
import { NotFoundError } from '../utils/errors/notFoundError';
import { generateToken } from '../utils/token';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (
  req: RequestWithParams<{ userId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.params;
    const userIdToFind = userId === 'me' ? req.user?._id : userId;
    const user = await UserModel.findById(userIdToFind).orFail(new NotFoundError('Пользователь не найден'));

    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const createUser = async (req: RequestWithBody<User>, res: Response, next: NextFunction) => {
  try {
    const {
      name, about, avatar, password, email,
    } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      name, about, avatar, email, password: hash,
    });

    res.status(constants.HTTP_STATUS_CREATED).json(user);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req: RequestWithBody<Omit<User, 'avatar'>>, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?._id;
    const { name, about } = req.body;

    const user = await UserModel.findByIdAndUpdate(
      userId,
      { name, about },
      { new: true },
    ).orFail(new NotFoundError('Пользователь не найден'));

    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const updateAvatar = async (req: RequestWithBody<Pick<User, 'avatar'>>, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?._id;
    const { avatar } = req.body;
    const user = await UserModel.findByIdAndUpdate(
      userId,
      { avatar },
      { new: true },
    ).orFail(new NotFoundError('Пользователь не найден'));

    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const login = async (req: RequestWithBody<Pick<User, 'email' | 'password'>>, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel
      .findOne({ email }).select('+password').orFail(new NotFoundError('Неправильные почта или пароль'));
    const correctPassword = await bcrypt.compare(password, user.password);

    if (!correctPassword) {
      throw new NotFoundError('Неправильные почта или пароль');
    }

    const token = generateToken(user._id);

    res.cookie('jwt', token, {
      maxAge: 3600000,
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
  } catch (err) {
    next(err);
  }
};
