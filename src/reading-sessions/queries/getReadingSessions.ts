import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

interface GetReadingSessionsInput
  extends Pick<Prisma.ReadingSessionFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetReadingSessionsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: readingSessions,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.readingSession.count({ where }),
      query: (paginateArgs) => db.readingSession.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      readingSessions,
      nextPage,
      hasMore,
      count,
    }
  }
)
