import { z } from "zod"

export const createPostSchema = z.object(
  {
    description: z.string().max(1000, "description max length is 1000").optional(),
    image: z.string().optional(),
  }
)


export const commentPostSchema = z.object(
  {
    comment: z.string({ required_error: "comment is required" }).max(1000, "comment max length is 1000")
  }
)