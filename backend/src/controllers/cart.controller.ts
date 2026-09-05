import { type Request, type Response } from "express";
import { CartService } from "../services/cart.service.js";
import type { CartItemDto } from "../dto/cart.dto.js";

export class CartController {
    
    static getCart = async (req: Request, res: Response) => {
        try {
            const { userId }= req.body;

            const cart = await CartService.getCart(userId);

            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({
                message: "Failed to get cart",
            });
        }
    };

    static addToCart = async (req: Request, res: Response) => {
        
        try {
            const { productId, userId } = req.body;

            console.log("userId:", userId);
            console.log("productId:", productId);

            if (typeof productId !== "string") {
            return res.status(400).json({
                message: "Invalid productId",
            });
            }

            const cartItem = await CartService.addToCart(userId, productId);

            res.status(201).json(cartItem);
        } catch (error) {
            res.status(500).json({
            message: "Failed to add product to cart",
            error: error instanceof Error ? error.message : String(error),
            });
        }
        };

    static updateCartItem = async (req: Request, res: Response) => {
        try {
            const { productId } = req.params;
            const { quantity, userId } = req.body;

            if (typeof productId !== 'string' || typeof quantity !== 'number') {
                return res.status(400).json({ message: "Invalid productId or quantity" });
            }

            const cartItem = await CartService.updateCartItem(
                userId,
                productId,
                quantity
            );

            res.status(200).json(cartItem);
        } catch (error) {
            res.status(500).json({
                message: "Failed to update cart item",
                error: error instanceof Error ? error.message : String(error),
                
            });
        }
    };

    static removeFromCart = async (req: Request<CartItemDto>, res: Response) => {
        try {
            const userId = req.user.id;
            const { productId } = req.params;

            if (typeof productId !== 'string') {
                return res.status(400).json({ message: "Invalid productId" });
            }

            await CartService.removeFromCart(
                userId,
                productId
            );

            res.status(204).send();
        } catch (error) {
            res.status(500).json({
            message: "Failed to remove product from cart",
            });
        }
    };

    static clearCart = async (req: Request, res: Response) => {
        try {
            const userId = req.user.id;

            await CartService.clearCart(userId);

            res.status(204).send();
        } catch (error) {
            res.status(500).json({
            message: "Failed to clear cart",
            });
        }
    };
}