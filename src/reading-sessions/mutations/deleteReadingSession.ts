import { resolver } from "@blitzjs/rpc"
import db from "db"
import { DeleteReadingSessionSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(DeleteReadingSessionSchema),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const readingSession = await db.readingSession.deleteMany({
      where: { id },
    })

    return readingSession
  }
)
