import { Router } from 'express';
import signRoutes from './sign';
import cardRoutes from './cards';
import userRoutes from './users';

const router = Router();

router.use(signRoutes);
router.use(cardRoutes);
router.use(userRoutes);

export default router;
