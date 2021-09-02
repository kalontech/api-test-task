import { objectType } from "nexus"

const AuthPayload = objectType({
  definition(t) {
    t.string("token")
    t.field("user", { type: "User" })
  },
  name: "AuthPayload",
})

export default AuthPayload
