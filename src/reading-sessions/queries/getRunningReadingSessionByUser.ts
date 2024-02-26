import { NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { number, z } from "zod"

const GetRunningReadingSessionByUserAndBook = z.object({
  userId: z.number().optional(),
})

export default resolver.pipe(
  resolver.zod(GetRunningReadingSessionByUserAndBook),
  // resolver.authorize(),
  async ({ userId }) => {
    if (userId == null) return null
    const readingSession = await db.readingSession.findFirst({
      where: { userId: userId, endTime: null },
    })
    return readingSession
  }
)
