import { api } from "./axios";

interface AddToCartData {
  userId: string;
  productId: string;
}

export const addToCart = async (data: AddToCartData) => {
  const response = await api.post("/cart", data);

  return response.data;
};