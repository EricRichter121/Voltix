import { Router } from 'express';

import authRoutes from './auth.route.js'
import productRoutes from './products.route.js'
// import cartRoutes from './cart.route.js'

const router: Router = Router()

router.use('/auth', authRoutes)
router.use('/products', productRoutes)
// router.use('/cart', cartRoutes)

export default router