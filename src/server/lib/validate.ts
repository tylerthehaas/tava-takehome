import { NextFunction, Response, Request } from 'express'
import { AnyZodObject } from 'zod'
import { fromError } from 'zod-validation-error'

export const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await schema.safeParseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      })

      if (result.success) {
        req.body = result.data.body ?? req.body
        req.query = result.data.query ?? req.query
        req.params = result.data.params ?? req.params
        return next()
      }

      if (result.error) {
        throw result.error
      }
    } catch (error) {
      const { message } = fromError(error)
      res.status(400).json({ message })
    }
  }
