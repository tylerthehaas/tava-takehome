import { Router } from 'express'
import apiRouter from './api'
import healthRouter from './health'

const router = Router()

router.use('/health', healthRouter)
router.use('/api/v1', apiRouter)

export default router
