import { NextFunction, Request, Response } from 'express'

type MiddlewareHandler = (req: Request, res: Response, next: NextFunction) => void

export function createSafeHandler(fn: MiddlewareHandler): MiddlewareHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      fn(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}
