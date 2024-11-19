import * as employees from '../../resources/employees'
import logger from '../../lib/logger'
import { createSafeHandler } from '../../lib/handler'

const updateOne = createSafeHandler((req, res) => {
  // there should be a better way to declare the type in the validate function but I don't have time to do this right now
  const id = req.params.id as unknown as number
  logger.debug(`Updating employee with id ${id}`)
  const employeeData = req.body
  logger.debug('employeeData', JSON.stringify(employeeData, null, 2))

  const updatedEmployee = employees.updateOne(id, employeeData)
  if (!updatedEmployee) {
    res.status(404).json({ message: 'Employee not found' })
    return
  }
  res.json(updatedEmployee)
})

export default updateOne
