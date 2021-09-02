import { PrismaClient } from "@prisma/client"
import lambda from "aws-lambda"

export interface Context {
  authToken: string
  locale: string
  prisma: PrismaClient
  userId?: string
}

interface GraphQLContextArgs {
  event?: lambda.APIGatewayProxyEventBase<Record<string, unknown>>
}

// Initialize Prisma client.
const prisma = new PrismaClient()

export const graphqlContext: (args: GraphQLContextArgs) => Context = ({ event }) => {
  // Determine locale.
  const locale = event?.headers?.["x-werz-locale"] ?? "en"
  // Create context.
  return {
    authToken: event?.headers?.authorization ?? event?.headers?.Authorization ?? "",
    locale,
    prisma,
  }
}
