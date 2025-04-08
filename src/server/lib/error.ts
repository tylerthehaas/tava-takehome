import { NextFunction, Request, Response } from 'express'
import logger from './logger'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function globalErrorHandler(err: Error, _req: Request, res: Response, _next: NextFunction): void {
  logger.error(err.message)
  res.status(500).json({
    error: {
      message: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message,
    },
  })
}
