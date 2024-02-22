import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

interface GetBookrecordsInput
  extends Pick<Prisma.BookrecordFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetBookrecordsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: bookrecords,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.bookrecord.count({ where }),
      query: (paginateArgs) => db.bookrecord.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      bookrecords,
      nextPage,
      hasMore,
      count,
    }
  }
)
