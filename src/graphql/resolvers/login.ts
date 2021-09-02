import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { nonNull, stringArg } from "nexus"
import { ObjectDefinitionBlock } from "nexus/dist/definitions/objectType"

import env from "../../utils/env"

const loginMutation = (t: ObjectDefinitionBlock<"Mutation">) => {
  t.field("login", {
    args: {
      email: stringArg(),
      password: nonNull(stringArg()),
      username: stringArg(),
    },
    resolve: async (parent, { email, username, password }, ctx) => {
      if (!email && !username) {
        throw new Error("User not found")
      }
      const user = (await ctx.prisma.user.findUnique({
        where: {
          email: email,
          username: username,
        },
      })) as User
      if (!user) {
        throw new Error("User not found")
      }
      if (!(await compare(password, user.password ?? ""))) {
        throw new Error("Invalid password")
      }
      return {
        token: sign({ userId: user.id }, env.APP_SECRET),
        user,
      }
    },
    type: "AuthPayload",
  })
}

export default loginMutation
