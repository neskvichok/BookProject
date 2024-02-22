import { resolver } from "@blitzjs/rpc"
import db from "db"
import { DeleteBookrecordSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(DeleteBookrecordSchema),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const bookrecord = await db.bookrecord.deleteMany({ where: { id } })

    return bookrecord
  }
)
