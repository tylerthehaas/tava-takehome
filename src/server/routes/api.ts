import { Router } from 'express'
import employeesRouter from './employees'

const router = Router()

router.use('/employees', employeesRouter)

export default router
