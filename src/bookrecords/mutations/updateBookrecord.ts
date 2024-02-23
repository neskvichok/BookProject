import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateBookrecordSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(UpdateBookrecordSchema),
  resolver.authorize(),
  async ({ userId, bookId, ...data }) => {
    const hasRecord = await db.bookRecords.count({ where: { bookId, userId } })
    if (hasRecord === 0) {
      const bookrecord = await db.bookRecords.create({ data: { bookId, userId, ...data } })
      return bookrecord
    }
    const bookrecord = await db.bookRecords.updateMany({ where: { bookId, userId }, data })
    return bookrecord
  }
)
