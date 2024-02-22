import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateBookrecordSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(UpdateBookrecordSchema),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const bookrecord = await db.bookrecord.update({ where: { id }, data })

    return bookrecord
  }
)
