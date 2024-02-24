import { NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { number, z } from "zod"

const GetRunningReadingSessionByUserAndBook = z.object({
  // This accepts type of undefined, but is required at runtime
  userId: z.number().optional().refine(Boolean, "Required"),
  bookId: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(
  resolver.zod(GetRunningReadingSessionByUserAndBook),
  resolver.authorize(),
  async ({ userId, bookId }) => {
    const readingSession = await db.readingSession.findFirst({
      where: { userId: userId, bookId: bookId, endTime: null },
    })
    return readingSession
  }
)
