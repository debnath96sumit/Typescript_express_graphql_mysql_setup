import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs } from "../graphql/schema";
import { resolvers } from "../graphql/resolver";
import { createContext, graphqlContext } from "../graphql/context";
import cors from 'cors';
import express from 'express';
import { Request } from "express";

export const createApolloServer = async () => {
  const server = new ApolloServer<graphqlContext>({
    typeDefs: typeDefs,
    resolvers: resolvers,
  });

  await server.start();

  const graphQlMiddleware = expressMiddleware(server, {
    context: async ({ req }: { req: Request}) => {
      try {
        const context = await createContext({ req });
        return {
          ...context,
          req,
        };
      } catch (err) {
        console.error("Error creating context:", err);
        throw new Error("Unauthorized");
      }
    },
  });
  return {
    middleware: [cors<cors.CorsRequest>(), express.json(), graphQlMiddleware]
  };
};
