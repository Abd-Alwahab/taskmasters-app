import { z } from "zod";

export const taskSchema = z.object({
  title: z
    .string({ required_error: "Task Name is required" })
    .min(2, "Task Name must be at least 2 characters long")
    .max(60, "Task Name must be less than 40 characters long"),
  description: z
    .string({ required_error: "Task Description is required" })
    .min(10, "Task Description must be at least 10 characters long")
    .max(1000, "Task Description must be less than 1000 characters long"),
  priority: z.enum(["Low", "Medium", "High"]),
  category: z.number({ required_error: "Category is required" }),
  points: z
    .string({ required_error: "Task points is required" }) // Expect a string initially
    .refine(
      (val) => {
        const parsedVal = parseInt(val, 10);
        return !isNaN(parsedVal) && parsedVal >= 1 && parsedVal <= 100;
      },
      {
        message: "Task points must be a number between 1 and 100",
      }
    )
    .transform((val) => parseInt(val, 10)), // Transform to number after validation
});
