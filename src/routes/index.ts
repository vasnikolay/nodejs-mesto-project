import { Router } from 'express';
import cardRoutes from './cards';
import userRoutes from './users';

const router = Router();

router.use(cardRoutes);

router.use(userRoutes);

export default router;
