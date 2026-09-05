import { Router } from 'express';
import { CartController } from '../controllers/cart.controller.js';

const router: Router = Router();

router.get('/', CartController.getCart);
router.post('/', CartController.addToCart);
router.patch('/:productId', CartController.updateCartItem);
router.delete('/:productId', CartController.removeFromCart);
router.delete('/', CartController.clearCart);

export default router;