import { Request, Response } from "express";
import { verifyToken } from "../helpers/common";

export interface graphqlContext {
    token?: string;
    user_id?: number | null,
    req?: Request
}

export const createContext = async ({ req }: { req: Request }): Promise<graphqlContext>=>{
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return {token: "", user_id: null, req}
    }
    try {
        const {success, payload, message} = await verifyToken(token);
        if (success && payload) {
            const user_id = payload?.id;
            return {token, user_id, req}
        }
        return {token: "", user_id: null, req};
    } catch (error) {
        return {token: "", user_id: null, req}
    }
} 

export const isAuthenticated = (context: graphqlContext)=>{
    if (!context.user_id) {
        throw new Error('Not authenticated');
    }
}