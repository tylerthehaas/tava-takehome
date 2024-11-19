import { NextFunction, Request, Response } from 'express'

export function createSafeHandler(
  fn: (req: Request, res: Response, next: NextFunction) => void,
): (req: Request, res: Response, next: NextFunction) => void {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      fn(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}
