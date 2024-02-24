import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateReadingSessionSchema, StartReadingSessionSchema } from "../schemas"
import { error } from "console"

export default resolver.pipe(
  resolver.zod(StartReadingSessionSchema),
  resolver.authorize(),
  async ({ bookId, startPage }, ctx) => {
    const userId = ctx.session.userId

    const currentReadingSession = await db.readingSession.findFirst({
      where: { userId: userId, endTime: null },
    })
    if (currentReadingSession != null) {
      throw new Error()
    }

    const readingSession = await db.readingSession.create({
      data: {
        userId: userId,
        bookId: bookId,
        startPage: startPage,
        startTime: new Date(),
      },
    })

    return readingSession
  }
)
