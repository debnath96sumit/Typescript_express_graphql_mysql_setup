import { mergeTypeDefs } from "@graphql-tools/merge";
import { itemSchema } from "./item.schema";
import { authSchema } from "./auth.schema";

export const typeDefs = mergeTypeDefs([itemSchema, authSchema]);