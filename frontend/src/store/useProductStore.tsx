import { create } from 'zustand'
import axios from 'axios'
import type { Product } from "../types/product.types"

const BASE_URL = 'http://localhost:3000'

interface ProductStore {
    products: Product[],
    loading: boolean;
    error: string | null;
    fetchProducts: () => Promise<void>;
}


export const useProductStore = create<ProductStore>((set) => ({
    products: [],
    loading: false,
    error:null,

    fetchProducts: async () => {
        set({ loading: true})
        try {
            // Обращаемся к бэкенду, чтобы получить список продуктов
            const response = await axios.get(`${BASE_URL}/api/products`)
            set({ products: response.data, error: null})
        } catch (err) {
            if (err && typeof err === 'object' && 'status' in err && err.status === 429) {
                set({ error: 'Too many requests. Please try again later.', products: [] })
            } else {
                set({ error: 'An error occurred while fetching products.', products: []})
                console.error('Error fetching products:', err)
            }
        } finally {
            set({ loading: false })
        }
    },
}))