import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

export class CartService {
  static async getCart(userId: string) {
    const cart = await prisma.cart.findUnique({
      where: {
        userId,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart) {
      return {
        items: [],
        totalAmount: 0,
      };
    }

    const totalAmount = cart.items.reduce(
      (total: number, item: { product: { price: number; }; quantity: number; }) => total + item.product.price * item.quantity,
      0
    );

    return {
      ...cart,
      totalAmount,
    };
  }

  static async addToCart(userId: string, productId: string) {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    const cart = await prisma.cart.upsert({
      where: {
        userId,
      },
      create: {
        userId,
      },
      update: {},
    });

    const existingItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
    });

    if (existingItem) {
      return prisma.cartItem.update({
        where: {
          id: existingItem.id,
        },
        data: {
          quantity: {
            increment: 1,
          },
        },
        include: {
          product: true,
        },
      });
    }

    return prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity: 1,
      },
      include: {
        product: true,
      },
    });
  }

  static async updateCartItem(
    userId: string,
    productId: string,
    quantity: number
  ) {
    if (quantity < 1) {
      throw new Error("Quantity must be at least 1");
    }

    const cart = await prisma.cart.findUnique({
      where: {
        userId,
      },
    });

    if (!cart) {
      throw new Error("Cart not found");
    }

    const cartItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
    });

    if (!cartItem) {
      throw new Error("Cart item not found");
    }

    return prisma.cartItem.update({
      where: {
        id: cartItem.id,
      },
      data: {
        quantity,
      },
      include: {
        product: true,
      },
    });
  }

  static async removeFromCart(userId: string, productId: string) {
    const cart = await prisma.cart.findUnique({
      where: {
        userId,
      },
    });

    if (!cart) {
      throw new Error("Cart not found");
    }

    const cartItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
    });

    if (!cartItem) {
      throw new Error("Cart item not found");
    }

    await prisma.cartItem.delete({
      where: {
        id: cartItem.id,
      },
    });
  }

  static async clearCart(userId: string) {
    const cart = await prisma.cart.findUnique({
      where: {
        userId,
      },
    });

    if (!cart) {
      return;
    }

    await prisma.cartItem.deleteMany({
      where: {
        cartId: cart.id,
      },
    });
  }
}
