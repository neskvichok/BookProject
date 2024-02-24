import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateReadingSessionSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(UpdateReadingSessionSchema),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const readingSession = await db.readingSession.update({
      where: { id },
      data,
    })

    return readingSession
  }
)
