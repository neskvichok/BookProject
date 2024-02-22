import { resolver } from "@blitzjs/rpc"
import db from "db"
import { DeleteBookSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(DeleteBookSchema),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const book = await db.book.deleteMany({ where: { id } })

    return book
  }
)
