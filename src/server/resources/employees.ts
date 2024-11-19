import { EmployeesByDepartment, Employee, UpdateEmployee } from '../../types'
import { data } from './data'

export function groupByDepartment(): EmployeesByDepartment {
  const departmentList = data.reduce((accum: EmployeesByDepartment, employeeRecord: Employee) => {
    const { department } = employeeRecord
    if (!accum[department]) {
      accum[department] = [employeeRecord]
    } else {
      accum[department].push(employeeRecord)
    }
    return accum
  }, {})

  return departmentList
}

export function getAll() {
  return data
}

export function findOnebyId(id: number) {
  return data.find((employee) => employee.id === id)
}

export function updateOne(id: number, employeeData: UpdateEmployee) {
  const index = data.findIndex((employee) => employee.id === id)

  if (index === -1) {
    return null
  }

  data[index] = { ...data[index], ...employeeData }
  return data[index]
}
