import express from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import helmet from 'helmet';
import routes from './routes';
import { errorHandler } from './middlewares/errorHandler';
import { notFoundRoutError } from './middlewares/notFoundRoutError';
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

app.use(helmet());

app.use(requestLogger);

app.use(routes);

app.use(errorLogger);

app.use(notFoundRoutError);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
