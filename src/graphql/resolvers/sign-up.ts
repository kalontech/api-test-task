import { User } from "@prisma/client"
import { hash } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { nonNull, stringArg } from "nexus"
import { ObjectDefinitionBlock } from "nexus/dist/definitions/objectType"

import env from "../../utils/env"

const signUpMutation = (t: ObjectDefinitionBlock<"Mutation">) => {
  t.field("signUp", {
    args: {
      email: nonNull(stringArg()),
      password: nonNull(stringArg()),
      username: nonNull(stringArg()),
    },
    resolve: async (parent, { email, password, username }, ctx) => {
      const hashedPassword = await hash(password ?? "", 10)
      // validate phone here somewhere
      const created = (await ctx.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          username,
        },
      })) as User

      return {
        token: sign({ userId: created.id }, env.APP_SECRET),
        user: created,
      }
    },
    type: "AuthPayload",
  })
}

export default signUpMutation
