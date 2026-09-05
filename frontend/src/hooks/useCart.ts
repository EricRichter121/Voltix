import { useMutation } from "@tanstack/react-query";
import { addToCart } from "../api/cart.api";

interface AddToCartData {
  userId: string;
  productId: string;
}

export const useAddToCart = () => {
  return useMutation({
    mutationFn: (data: AddToCartData) => addToCart(data),
  });
};