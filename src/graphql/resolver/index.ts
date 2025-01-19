import { mergeResolvers } from "@graphql-tools/merge";
import { itemResolver } from "./item.resolver";
import { authResolver } from "./auth.resolver";

export const resolvers = mergeResolvers([itemResolver, authResolver]);

