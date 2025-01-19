import { prisma } from "../config/dbConnection";
import { ItemSchema, PartialItemSchema } from "../validation/item.validation";

export class HomeController{

    async createItem(name: string, price: number) {
        ItemSchema.parse({name, price });
        return await prisma.item.create({ data: { name, price } });
    }
    async updateItem(id: number, data: {name: string, price: number}) {
        // const data: { name?: string; price?: number } = {};
        // if (data.name !== undefined) data.name = name;
        // if (data.price !== undefined) data.price = price;
  
        PartialItemSchema.parse({ data });
        return await prisma.item.update({ where: { id }, data });
    }
}