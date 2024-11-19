import * as employees from '../../resources/employees'
import { createSafeHandler } from '../../lib/handler'
import logger from '../../lib/logger'

const getEmployees = createSafeHandler((req, res) => {
  const {
    query: { groupBy },
  } = req

  logger.debug('groupBy', groupBy)

  let data

  switch (groupBy) {
    case 'department': {
      logger.debug('grouping by department')
      data = employees.groupByDepartment()
      break
    }

    default: {
      logger.debug('no grouping, getting all employees')
      data = employees.getAll()
      break
    }
  }

  logger.debug('data', JSON.stringify(data, null, 2))
  res.json(data)
})

export default getEmployees
