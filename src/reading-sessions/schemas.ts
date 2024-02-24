import { z } from "zod"

export const CreateReadingSessionSchema = z.object({
  // template: __fieldName__: z.__zodType__(),
})
export const UpdateReadingSessionSchema = CreateReadingSessionSchema.merge(
  z.object({
    id: z.number(),
  })
)

export const DeleteReadingSessionSchema = z.object({
  id: z.number(),
})
