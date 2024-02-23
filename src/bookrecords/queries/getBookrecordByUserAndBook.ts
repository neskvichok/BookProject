import { NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

interface GetBookrecordByUserAndBook {
  // This accepts type of undefined, but is required at runtime
  userId: number
  bookId: number
}

export default resolver.pipe(
  resolver.authorize(),
  async ({ userId, bookId }: GetBookrecordByUserAndBook) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const bookrecord = await db.bookRecords.findFirst({ where: { userId, bookId } })

    return bookrecord
  }
)
