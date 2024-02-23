import { z } from "zod"

export const CreateBookrecordSchema = z.object({
  // template: __fieldName__: z.__zodType__(),
})

export const UpdateBookrecordSchema = CreateBookrecordSchema.merge(
  z.object({
    userId: z.number(),
    bookId: z.number(),
    isLiked: z.boolean(),
    isRead: z.boolean(),
  })
)

export const DeleteBookrecordSchema = z.object({
  id: z.number(),
})
