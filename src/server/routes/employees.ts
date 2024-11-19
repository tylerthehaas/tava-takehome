import { Router } from 'express'

import { getEmployees, findOne, updateOne } from '../controllers/employees'
import { validate } from '../lib/validate'
import { findSchema, updateSchema } from '../schemas/employees'

const router = Router()

router.get('/', getEmployees)

router.get('/:id', validate(findSchema), findOne)

router.put('/:id', validate(updateSchema), updateOne)

export default router
