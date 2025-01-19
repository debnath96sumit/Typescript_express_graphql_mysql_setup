import { mergeResolvers } from "@graphql-tools/merge";
import { itemResolver } from "./item.resolver";

export const resolvers = mergeResolvers([itemResolver]);

