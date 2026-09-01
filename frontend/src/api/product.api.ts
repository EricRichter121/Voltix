import { api } from "./axios";
import type { Product } from "../types/product.types";

export const getProduct = async (id: string): Promise<Product> => {
    const response = await api.get(`/products/${id}`);
    return response.data;
};