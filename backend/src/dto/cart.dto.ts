import { z } from 'zod';

export const cartItemSchema = z.object({
  productId: z.uuid(),
  quantity: z.number().min(1),
});

export type CartItemDto = z.infer<typeof cartItemSchema>;
