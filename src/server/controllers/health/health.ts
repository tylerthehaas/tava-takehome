import { Request, Response } from 'express'

function getHealth(req: Request, res: Response): void {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
  })
}

export default getHealth
