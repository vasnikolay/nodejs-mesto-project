import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import {
  createCard, deleteCard, dislikeCard, getCards, likeCard,
} from '../controllers/cards';
import { avatarRegExp } from '../constants/regExp';

const router = Router();

router.get('/cards', getCards);
router.post('/cards', celebrate({ body: { name: Joi.string().required(), link: Joi.string().regex(avatarRegExp).required() } }), createCard);
router.delete('/cards/:cardId', celebrate({ params: { cardId: Joi.string().hex().length(24) } }), deleteCard);
router.put('/cards/:cardId/likes', celebrate({ params: { cardId: Joi.string().hex().length(24) } }), likeCard);
router.delete('/cards/:cardId/likes', celebrate({ params: { cardId: Joi.string().hex().length(24) } }), dislikeCard);

export default router;
