import { z } from "zod";
import { prisma } from "../config/dbConnection";
import { errorResponse, successResponse } from "../helpers";
import { userLoginInput, userRegisterInput } from "../types";
import { ItemSchema, PartialItemSchema } from "../validation";
import { LoginSchema, RegisterSchema } from "../validation/user.validation";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/variables";
import { createStripeCustomer } from "../helpers/Stripe";
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
            const validate = RegisterSchema.parse(data);
            validate.password = await bcrypt.hash(data.password, 10);

            const stripe_customer = await createStripeCustomer(validate.name, validate.email);

            const user = await prisma.user.create({
                data: {
                    name: validate.name,
                    email: validate.email,
                    password: validate.password,
                    stripe_customer_id: stripe_customer.id, // Save the Stripe customer ID
                },
            });

            return successResponse('Registration successfull', user);
        } catch (error) {
            if (error instanceof z.ZodError) {
                return errorResponse(error.errors.map(e => e.message).join(', '));
            } else {
                return errorResponse('Something went wrong');
            }
        }
    }

    async userLogin(data: userLoginInput): Promise<controlleResponse>{
        try {
            const validation = LoginSchema.parse(data);
            
            const user = await prisma.user.findUnique({where: {email: validation.email}});

            if (!user) {
                return errorResponse('User not found');
            }
            
            const checkPassword = await bcrypt.compare(validation.password, user.password)
            if (!checkPassword) {
                return errorResponse('Invalid email or password');
            }

            const token = jwt.sign({id: user.id}, SECRET_KEY, {
                expiresIn: '1h'
            })
            const res_data = {
                user,
                token
            }
            return successResponse('User loggedin successfully', res_data);
        } catch (error) {
            if (error instanceof z.ZodError) {
                return errorResponse(error.errors.map(e => e.message).join(', '));
            } else {
                return errorResponse('Something went wrong');
            }
        }
    }
}