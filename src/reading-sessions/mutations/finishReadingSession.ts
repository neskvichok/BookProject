import { resolver } from "@blitzjs/rpc"
import db from "db"
import {
  CreateReadingSessionSchema,
  FinishReadingSessionSchema,
  StartReadingSessionSchema,
} from "../schemas"

export default resolver.pipe(
  resolver.zod(FinishReadingSessionSchema),
  resolver.authorize(),
  async ({ endPage }, ctx) => {
    const userId = ctx.session.userId

    const readingSession = await db.readingSession.updateMany({
      where: { userId: userId, endTime: null },
      data: {
        endPage: endPage,
        endTime: new Date(),
      },
    })

    return readingSession
  }
)
