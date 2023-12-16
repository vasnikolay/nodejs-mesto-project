import express from 'express';
import mongoose from 'mongoose';
import { celebrate, Joi, errors } from 'celebrate';
import routes from './routes';
import { errorHandler } from './middlewares/errorHandler';
import { notFoundRoutError } from './middlewares/notFoundRoutError';
import { createUser, login } from './controllers/users';
import { auth } from './middlewares/auth';
import User from './models/user';
import { requestLogger, errorLogger } from './middlewares/logger';

const PORT = 3000;
const MONGO_URI = 'mongodb://localhost:27017/mestrodb';

const app = express();
app.use(express.json());

const connectDb = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    await User.createIndexes();
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
};

connectDb();

app.use(requestLogger);

app.post('/signin', celebrate({ body: Joi.object().keys({ email: Joi.string().required(), password: Joi.string().required() }) }), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string().regex(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/i),
  }),
}), createUser);

app.use(auth);
app.use(routes);

app.use(errorLogger);

app.use(errors());
app.use(notFoundRoutError);
app.use(errorHandler);

app.listen(PORT);
