import { z } from "zod";

export const storyFormSchema = z.object({
  genre: z.string().min(1, "Please select a genre"),
  targetLength: z.enum(["1000_words", "2500_words", "4000_words"]).optional(),
  theme: z
    .string()
    .min(3, "Theme must be at least 3 characters")
    .max(50, "Theme must be less than 50 characters"),
  tone: z.string().min(1, "Please select a tone"),
  language: z.enum(["english", "hindi"]).optional(),
  storyIdea: z
    .string()
    .min(10, "Story idea must be at least 10 characters")
    .max(500, "Story idea must be less than 500 characters"),
});

export type StoryFormData = z.infer<typeof storyFormSchema>;
