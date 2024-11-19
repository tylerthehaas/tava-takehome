import * as employees from '../../resources/employees'
import logger from '../../lib/logger'
import { createSafeHandler } from '../../lib/handler'

const findOne = createSafeHandler((req, res) => {
  const id = req.params.id as unknown as number
  logger.debug(`Getting employee with id ${id}`)
  const employee = employees.findOnebyId(id)
  logger.debug(employee)
  if (!employee) {
    res.status(404).json({ message: 'Employee not found' })
    return
  }
  res.json(employee)
})

export default findOne
