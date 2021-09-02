import { makeSchema, mutationType, queryType } from "nexus"

import joinCommunityMutation from "./resolvers/join-community"
import loginMutation from "./resolvers/login"
import registerForEventMutation from "./resolvers/register-for-event"
import signUpMutation from "./resolvers/sign-up"
import AuthPayload from "./types/auth-payload"
import Community from "./types/community"
import User from "./types/user"
import { configureSchemaWithTypes } from "./utils"

const Query = queryType({
  definition(t) {
    t.crud.users()
    t.crud.communities()
  },
})

const Mutation = mutationType({
  definition(t) {
    loginMutation(t)
    signUpMutation(t)
    joinCommunityMutation(t)
    registerForEventMutation(t)
    t.crud.createOneCommunity()
    t.crud.createOneUser()
  },
})

export const graphqlSchema = makeSchema(
  configureSchemaWithTypes([AuthPayload, Mutation, Query, User, Community]),
)
