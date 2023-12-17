import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import {
  getUsers, getUserById, updateUser, updateAvatar,
} from '../controllers/users';
import { avatarRegExp } from '../constants/regExp';

const router = Router();

router.get('/users', getUsers);
router.get('/users/:userId', celebrate({ params: { userId: Joi.string().hex().length(24) } }), getUserById);
router.patch('/users/me', celebrate({ body: { name: Joi.string().required(), about: Joi.string().required() } }), updateUser);
router.patch('/users/me/avatar', celebrate({ body: { avatar: Joi.string().regex(avatarRegExp).required() } }), updateAvatar);

export default router;
