import { z } from "zod";

export const cardsSchema = z.object({
  cards: z
    .object({
      text: z.string(),
      title: z.string(),
    })
    .array(),
});
