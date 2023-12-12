import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';
import { linkUser } from './middlewares/linkUser';
import { errorHandler } from './middlewares/errorHandler';
import { notFoundRoutError } from './middlewares/notFoundRoutError';

const PORT = 3000;
const MONGO_URI = 'mongodb://localhost:27017/mestrodb';

const app = express();
app.use(express.json());

const connectDb = async () => {
  try {
    await mongoose.connect(MONGO_URI);
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
};

connectDb();

app.use(linkUser, routes);
app.use(notFoundRoutError);
app.use(errorHandler);

app.listen(PORT);
