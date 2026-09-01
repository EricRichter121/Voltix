import { type Request, type Response } from "express";
import { ProductService } from "../services/product.service.js";
// import { config } from '../env.js';


export class ProductController {
  static async getAllProducts(req: Request, res: Response) {
    const products = await ProductService.getAllProducts();

    res.status(200).json(products);
  }

  static async getProductById(req: Request, res: Response) {
    const product = await ProductService.getProductById(req.params.id as string); // переводим req.params.id в строку, так как он может быть undefined
    res.status(200).json(product);
  }

  static async createProduct(req: Request, res: Response) {
    const product = await ProductService.createProduct(req.body);

    res.status(201).json(product);
  }

  static async updateProduct(req: Request, res: Response) {
    const product = await ProductService.updateProduct(req.params.id as string, req.body);

    res.status(200).json(product);
  }

  static async deleteProduct(req: Request, res: Response) {
    await ProductService.deleteProduct(req.params.id as string);
    res.status(200).json({ message: "Product deleted successfully" });
  }

}