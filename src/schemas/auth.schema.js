import { z } from "zod";


export const registerSchema = z.object({
  firstname: z.string({ required_error: "firstname is required" }).max(50, "firstname max length is 50"),
  lastname: z.string({ required_error: "lastname is required" }).max(50, "lastname max length is 50"),
  username: z.string({ required_error: "username is required" }).max(12, "username max length is 12").min(6, "username min length is 6"),
  email: z.string({ required_error: "email is required" }).email("invaild email").max(100, "email max length is 100"),
  password: z.string({ required_error: "password is required" }).min(6, "password must have at least 6 characters").max(50, "password max length is 50"),
  gender: z.string({ required_error: "gender is required" }).max(6, "gender max length is 6"),
  birthdate: z.string({ required_error: "birthdate is required" }),
  photo: z.string()
}
)

export const loginSchema = z.object(
  {
    email: z.string({ required_error: "email is required" }).email({ message: "invalid email" }),
    password: z.string({ required_error: "password is required" }),
  }
)