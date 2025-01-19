import { mergeTypeDefs } from "@graphql-tools/merge";
import { itemSchema } from "./item.schema";

export const typeDefs = mergeTypeDefs([itemSchema]);