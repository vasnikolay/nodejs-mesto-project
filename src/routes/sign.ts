import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import { createUser, login } from '../controllers/users';
import { avatarRegExp } from '../constants/regExp';
import { auth } from '../middlewares/auth';

const router = Router();

router.post('/signin', celebrate({ body: Joi.object().keys({ email: Joi.string().required(), password: Joi.string().required() }) }), login);
router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string().regex(avatarRegExp),
  }),
}), createUser);

router.use(auth);

export default router;
