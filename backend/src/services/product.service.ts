import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, type Product } from "../generated/prisma/client.js";
import { Pool } from "pg";

import { type ProductDTO } from "../dto/product.dto.js";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });


export class ProductService {
    static async getAllProducts(): Promise<ProductDTO[]> {
        const products: Product[] = await prisma.product.findMany();

        return products.map(product => ({
            id: product.id,
            name: product.name,
            imageUrl: product.imageUrl,
            price: product.price,
            description: product.description
        }));
    }

    static async getProductById(id: string): Promise<ProductDTO | null> {
        const product: Product | null = await prisma.product.findUnique({
            where: { id }
        });

        if (!product) {
            return null;
        }

        return {
            id: product.id,
            name: product.name,
            imageUrl: product.imageUrl,
            price: product.price,
            description: product.description
        };
    }

    static async createProduct(data: ProductDTO): Promise<ProductDTO> {
        const product: Product = await prisma.product.create({
            data: {
                name: data.name,
                imageUrl: data.imageUrl,
                price: data.price,
                description: data.description
            }
        });

        return {
            id: product.id,
            name: product.name,
            imageUrl: product.imageUrl,
            price: product.price,
            description: product.description
        };
    }


    static async updateProduct(id: string, data: ProductDTO): Promise<ProductDTO> {
        const product: Product = await prisma.product.update({
            // id продукта, который нужно обновить, передается в параметрах запроса
            where: { id },
            // данные обновляются на основе переданного объекта data, параметры которого мы ожидаем в теле запроса
            data: {
                name: data.name,
                imageUrl: data.imageUrl,
                price: data.price,
                description: data.description
            }
        });

        if (!product) {
            throw new Error("Product not found");
        }
        return {
            id: product.id,
            name: product.name,
            imageUrl: product.imageUrl,
            price: product.price,
            description: product.description
        };
    }

    static async deleteProduct(id: string): Promise<void> {
        const product: Product | null = await prisma.product.findUnique({
            where: { id }
        });

        if (!product) {
            throw new Error("Product not found");
        }

        await prisma.product.delete({
            where: { id }
        });
    }
}