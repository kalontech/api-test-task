import { nonNull, stringArg } from "nexus"
import { ObjectDefinitionBlock } from "nexus/dist/definitions/objectType"

const registerForEventMutation = (t: ObjectDefinitionBlock<"Mutation">) => {
  t.field("registerForEvent", {
    args: {
      eventId: nonNull(stringArg()),
      userId: nonNull(stringArg()),
    },
    resolve: async (parent, { eventId, userId }, ctx) => {
      return null
    },
    type: "User",
  })
}

export default registerForEventMutation
