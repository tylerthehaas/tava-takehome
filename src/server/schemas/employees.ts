import { z } from 'zod'
import { departments } from '../../types/departments'

export const updateSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/).transform(Number),
  }),
  body: z
    .object({
      firstName: z.string(),
      lastName: z.string(),
      department: departments,
      dateStarted: z.string().refine((value) => {
        const date = new Date(value)
        return !isNaN(date.getTime()) && value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)
      }, 'Invalid date format - must be in ISO format (e.g. 1997-03-13T00:00:00.000Z)'),
      quote: z.string(),
    })
    .strict(),
})

export const findSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/).transform(Number),
  }),
})
