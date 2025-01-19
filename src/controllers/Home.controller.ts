import { z } from "zod";
import { prisma } from "../config/dbConnection";
import { errorResponse, successResponse } from "../helpers";
import { userRegisterInput } from "../types";
import { ItemSchema, PartialItemSchema } from "../validation";
import { RegisterSchema } from "../validation/user.validation";

interface controlleResponse {
    success: boolean;
    message: string;
    data?: any
}
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

    async userRegister(data: userRegisterInput): Promise<controlleResponse>{
        try {
            RegisterSchema.parse(data);
            return successResponse('Registration successfull', data);
        } catch (error) {
            if (error instanceof z.ZodError) {
                return errorResponse(error.errors.map(e => e.message).join(', '));
            } else {
                return errorResponse('Something went wrong');
            }
        }
    }
}