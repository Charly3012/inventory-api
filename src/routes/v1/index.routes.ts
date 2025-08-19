import { Router } from 'express';
import productRoutes from './product.routes';
import categoryRoutes from './category.routes';

const router = Router();

router.use('/product', productRoutes);
router.use('/category', categoryRoutes);

export default router;
