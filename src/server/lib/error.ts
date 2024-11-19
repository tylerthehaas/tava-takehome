import { NextFunction, Request, Response } from 'express'
import logger from './logger'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function globalErrorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
  logger.error(err.stack)
  res.status(500).json({
    error: {
      message: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message,
    },
  })
}
