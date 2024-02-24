import { z } from "zod"

export const CreateReadingSessionSchema = z.object({
  // template: __fieldName__: z.__zodType__(),
})
export const UpdateReadingSessionSchema = CreateReadingSessionSchema.merge(
  z.object({
    id: z.number(),
  })
)
export const StartReadingSessionSchema = z.object({
  bookId: z.number(),
  startPage: z.number(),
})

export const FinishReadingSessionSchema = z.object({
  endPage: z.number(),
})

export const DeleteReadingSessionSchema = z.object({
  id: z.number(),
})
