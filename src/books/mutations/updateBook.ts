import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateBookSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(UpdateBookSchema),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const book = await db.book.update({ where: { id }, data })

    return book
  }
)
