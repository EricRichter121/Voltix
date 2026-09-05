import type {
  Request,
  Response,
  NextFunction,
} from 'express'
import { cartItemSchema } from '../dto/cart.dto.js';

export const validateCartItem = (req: Request, res: Response, next: NextFunction) => {
  try {
    cartItemSchema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid cart item data" });
  }
};