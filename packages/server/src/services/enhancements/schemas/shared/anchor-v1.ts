import * as z from 'zod'

export type Anchor = z.infer<typeof anchor>

export const anchor = z.object({
  id: z.string().uuid(),
  word: z.string(),
  prefixHash: z.string().optional(),
  suffixHash: z.string().optional(),
})
