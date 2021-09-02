import { nonNull, stringArg } from "nexus"
import { ObjectDefinitionBlock } from "nexus/dist/definitions/objectType"

const joinCommunityMutation = (t: ObjectDefinitionBlock<"Mutation">) => {
  t.field("joinCommunity", {
    args: {
      communityId: nonNull(stringArg()),
      userId: nonNull(stringArg()),
    },
    resolve: async (parent, { communityId, userId }, ctx) => {
      return null
    },
    type: "User",
  })
}

export default joinCommunityMutation
