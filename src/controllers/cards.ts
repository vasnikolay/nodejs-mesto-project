import { NextFunction, Request, Response } from 'express';
import { constants } from 'http2';
import CardModel from '../models/card';
import { Card } from '../interface/card';
import { RequestWithBody, RequestWithParams } from '../interface/controllersArrt';
import { NotFoundError } from '../utils/errors/notFoundError';
import { ForbiddenError } from '../utils/errors/forbiddenError';

export const getCards = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cards = await CardModel.find();
    res.json(cards);
  } catch (err) {
    next(err);
  }
};
export const createCard = async (req: RequestWithBody<Pick<Card, 'name' | 'link'>>, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?._id;
    const { name, link } = req.body;
    const card = await CardModel.create({ name, link, owner: userId });
    res.status(constants.HTTP_STATUS_CREATED).json(card);
  } catch (err) {
    next(err);
  }
};

export const deleteCard = async (
  req: RequestWithParams<{ cardId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { cardId } = req.params;
    const card = await CardModel.findById(cardId).orFail(new NotFoundError('Карточка с указанным _id не найдена'));

    if (card.owner.toString() !== req.user?._id) {
      throw new ForbiddenError('Недостаточно прав');
    } else {
      await CardModel.deleteOne({ _id: cardId });
      res.json({ message: `Карточка c id: ${cardId} удалена` });
    }
  } catch (err) {
    next(err);
  }
};

export const likeCard = async (
  req: RequestWithParams<{ cardId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { cardId } = req.params;
    const card = await CardModel.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: req.user?._id } },
      { new: true },
    ).orFail(new NotFoundError('Карточка с указанным _id не найдена'));

    res.json(card);
  } catch (err) {
    next(err);
  }
};

export const dislikeCard = async (
  req: RequestWithParams<{ cardId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { cardId } = req.params;
    const card = await CardModel.findByIdAndUpdate(
      cardId,
      { $pull: { likes: req.user?._id } },
      { new: true },
    ).orFail(new NotFoundError('Карточка с указанным _id не найдена'));

    res.json(card);
  } catch (err) {
    next(err);
  }
};
