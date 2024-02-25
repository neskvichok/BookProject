import { NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { number, z } from "zod"
import { Button } from "@chakra-ui/react"

const GetReadingSessionsByUserAndBook = z.object({
  // This accepts type of undefined, but is required at runtime
  userId: z.number(),
  bookId: z.number(),
})

export default resolver.pipe(
  resolver.zod(GetReadingSessionsByUserAndBook),
  resolver.authorize(),
  async ({ userId, bookId }) => {
    const readingSessions = await db.readingSession.findMany({
      where: { userId, bookId },
    })
    return readingSessions
  }
)
