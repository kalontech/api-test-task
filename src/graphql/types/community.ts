import { objectType } from "nexus"

const Community = objectType({
  definition(t) {
    t.model.createdAt()
    t.model.name()
    t.model.id()
    t.model.updatedAt()
  },
  name: "Community",
})

export default Community
