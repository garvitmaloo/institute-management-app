import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { typedef } from "./schema";
import { Query } from "./resolvers";

async function startServer() {
  const server = new ApolloServer({
    typeDefs: typedef,
    resolvers: {
      Query
    }
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 8080 }
  });

  console.log(`Server started at ${url}`);
}

startServer();
