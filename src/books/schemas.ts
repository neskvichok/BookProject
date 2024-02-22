import { z } from "zod"

export const CreateBookSchema = z.object({
  name: z.string(),
  author: z.string(),
  pageNum: z.number(),
  isbn: z.string(),
  description: z.string(),
  // rate: z.number(),
  // template: __fieldName__: z.__zodType__(),
})
export const UpdateBookSchema = CreateBookSchema.merge(
  z.object({
    id: z.number(),
  })
)

export const DeleteBookSchema = z.object({
  id: z.number(),
})
