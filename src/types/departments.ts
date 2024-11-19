import { z } from 'zod'

export const departments = z.enum(['Engineering', 'Management', 'Operations', 'Food Services'])
export type DEPARTMENTS = z.infer<typeof departments>
