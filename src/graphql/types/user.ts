import { objectType } from "nexus"

const User = objectType({
  definition(t) {
    t.model.email()
    t.model.username()
    t.model.id()
    t.model.updatedAt()
  },
  name: "User",
})

export default User
