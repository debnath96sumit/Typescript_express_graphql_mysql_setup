import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs } from "../graphql/schema";
import { resolvers } from "../graphql/resolver";
import { graphqlContext } from "../graphql/context";
import cors from 'cors';
import express from 'express';

export const createApolloServer = async () => {
  const server = new ApolloServer<graphqlContext>({
    typeDefs: typeDefs,
    resolvers: resolvers,
  });

  await server.start();

  const graphQlMiddleware = expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
  });
  return {
    middleware: [cors<cors.CorsRequest>(), express.json(), graphQlMiddleware]
  };
};
