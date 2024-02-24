import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateReadingSessionSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(CreateReadingSessionSchema),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const readingSession = await db.readingSession.create({ data: input })

    return readingSession
  }
)
