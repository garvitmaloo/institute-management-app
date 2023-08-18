import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { PrismaClient, Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

import { typedef } from "./schema";
import { Query } from "./resolvers";
import { Mutation } from "./resolvers/Mutations/Mutations";

export interface Context {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
}

async function startServer() {
  const prisma = new PrismaClient();
  const server = new ApolloServer({
    typeDefs: typedef,
    resolvers: {
      Query,
      Mutation
    }
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 8080 },
    context: async (): Promise<Context> => {
      return { prisma };
    }
  });

  console.log(`Server started at ${url}`);
}

startServer();
