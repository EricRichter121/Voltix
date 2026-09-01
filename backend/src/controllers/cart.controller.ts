import { type Request, type Response } from "express";
import { cartService } from "../services/cart.service";

export  class CartController {
    
    static getCart = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;

        const cart = await cartService.getCart(userId);

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({
        message: "Failed to get cart",
        });
    }
    };

    static addToCart = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;
        const { productId } = req.body;

        const cartItem = await cartService.addToCart(userId, productId);

        res.status(201).json(cartItem);
    } catch (error) {
        res.status(500).json({
        message: "Failed to add product to cart",
        });
    }
    };

    static updateCartItem = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;
        const productId = req.params.productId;
        const { quantity } = req.body;

        const cartItem = await cartService.updateCartItem(
        userId,
        productId,
        quantity
        );

        res.status(200).json(cartItem);
    } catch (error) {
        res.status(500).json({
        message: "Failed to update cart item",
        });
    }
    };

    static removeFromCart = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;
        const productId = req.params.productId;

        await cartService.removeFromCart(userId, productId);

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

        await cartService.clearCart(userId);

        res.status(204).send();
    } catch (error) {
        res.status(500).json({
        message: "Failed to clear cart",
        });
    }
    };
}