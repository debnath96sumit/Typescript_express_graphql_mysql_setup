import { z } from 'zod';
export const ItemSchema = z.object({
    name: z.string().min(1),
    price: z.number().positive()
});
  
export const PartialItemSchema = ItemSchema.partial();