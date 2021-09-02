import { PrismaClient } from '@prisma/client'
import { hash } from "bcryptjs"
const prisma = new PrismaClient()

const DEFAULT_PASSWORD = "qwerty123"

async function seedUsers() {
  const users: Record<string, string | string[]> = {}
  const hashedPassword = await hash(DEFAULT_PASSWORD ?? "", 10)

  // generate 5 test users
    for (let i = 0; i < 5; i++) {
        await prisma.user.create({
            data: {
                username: `test_user_${i}`,
                password: hashedPassword
            }
        })
    }

  console.log("=== Generated users")
  return users
}

async function seedCommunities() {
  const communities: Record<string, string> = {}
  for (let i = 0; i < 5; i++) {
    await prisma.community.create({
        data: {
            name: `test_community_${i}`,
        }
    })
}
  console.log("=== Generated communities")
  return communities
}


async function main() {
  await seedUsers()
  await seedCommunities()
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
