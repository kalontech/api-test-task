import { IMiddleware } from "graphql-middleware"

export type TMiddleware = IMiddleware<unknown, Context, { where?: { id?: string } }>

// This is my middleware that provided with queries or mutations names,
// will let the request through or throw a 401 error.
import { AuthenticationError } from "apollo-server-lambda"
import { verify } from "jsonwebtoken"

import env from "../../utils/env"
import { Context } from "../context"

const authCheck: (whitelisted: string[]) => TMiddleware = (whitelisted) => (
  resolve,
  root,
  args,
  context,
  info,
) => {
  const isPublic = ["_service", ...whitelisted].includes(info.fieldName)
  // I am checking if the query or mutation in the request is whitelisted and if the user is authenticated
  // when going through the Lambda Authorizer.
  if (!isPublic && !context.authToken) {
    throw new AuthenticationError("Unauthorized")
  }
  // For private routes if we have where.id === me, replace it with userId.
  if (context.authToken) {
    const decoded = verify(context.authToken.replace("Bearer ", ""), env.APP_SECRET)
    const id = (decoded as { userId: string }).userId
    context.userId = id
    if (args.where && args.where.id === "me") {
      args.where.id = id
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return resolve(root, args, context, info)
}

// GraphQL middleware allow me to specify different middlewares depending if it's a query or a mutation,
// here I use the same middleware for both.
const authMiddleware = (publicMutations: string[], publicQueries: string[]): TMiddleware => ({
  Mutation: authCheck(publicMutations),
  Query: authCheck(publicQueries),
})

export default authMiddleware
