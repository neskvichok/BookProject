import { NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { number, z } from "zod"

const GetReadingSessionByUserAndBook = z.object({
  // This accepts type of undefined, but is required at runtime
  userId: z.number().optional().refine(Boolean, "Required"),
  bookId: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(
  resolver.zod(GetReadingSessionByUserAndBook),
  resolver.authorize(),
  async ({ userId, bookId }) => {
    const readingSessions = await db.readingSession.findMany({
      where: { userId, bookId },
    })
    return readingSessions
  }
)
