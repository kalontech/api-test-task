import "./../generated/prisma"
import "./../generated/nexus"

import { ApolloServer } from "apollo-server-lambda"

import { graphqlContext } from "./graphql/context"
import authMiddleware from "./graphql/middlewares/auth-middleware"
import { graphqlSchema } from "./graphql/schema"
import { configureServer } from "./graphql/utils"
import env from "./utils/env"

const publicMutations = ["login", "signUp", "joinCommunity", "registerForEvent"]
const publicQueries: string[] = ["users", "communities"]

const serverConfig = configureServer({
  context: graphqlContext,
  introspection: true,
  middleware: [authMiddleware(publicMutations, publicQueries)],
  playground: {
    endpoint: `/${env.SLS_STAGE}/graphql`,
    settings: {
      "schema.polling.enable": false,
    },
  },
  schema: graphqlSchema,
})

// Initialize Apollo Server.
const server = new ApolloServer(serverConfig)

export const graphqlHandler = server.createHandler()
