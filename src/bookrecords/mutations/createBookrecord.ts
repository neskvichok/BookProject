import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateBookrecordSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(CreateBookrecordSchema),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const bookrecord = await db.bookRecords.create({ data: input })

    return bookrecord
  }
)
