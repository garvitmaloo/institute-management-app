import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { PrismaClient, Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

import { typedef } from "./schema";
import { Query, Batch } from "./resolvers";
import { Mutation } from "./resolvers/Mutations/Mutations";
import { getUserInfoFromToken } from "./utils/getUserInfoFromToken";

export interface Context {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
  userInfo: { adminId: number; adminName: string } | null;
}

async function startServer() {
  const prisma = new PrismaClient();
  const server = new ApolloServer({
    typeDefs: typedef,
    resolvers: {
      Query,
      Mutation,
      Batch
    }
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 8080 },
    context: async ({ req }): Promise<Context> => {
      const userInfo = await getUserInfoFromToken(req.headers.authorization!);
      return { prisma, userInfo };
    }
  });

  console.log(`Server started at ${url}`);
}

startServer();
