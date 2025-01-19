import { Request, Response } from "express";

export interface graphqlContext {
    token?: string;
}