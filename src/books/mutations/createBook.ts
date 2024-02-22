import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateBookSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(CreateBookSchema),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const book = await db.book.create({ data: input })

    return book
  }
)
