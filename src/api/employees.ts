import { omit } from 'lodash'

import config from '../lib/config'
import { Employee, EmployeesByDepartment } from '../types/employees'

export const fetchEmployeesByDepartment = async (): Promise<EmployeesByDepartment> => {
  const response = await fetch(config.employeesByDepartmentUrl)
  if (!response.ok) {
    throw new Error('Failed to fetch employees')
  }
  return response.json()
}

export const fetchEmployeeById = async (id: number): Promise<Employee> => {
  const response = await fetch(config.employeesByIdUrl(id))
  if (!response.ok) {
    throw new Error(`Failed to fetch employee for id ${id}`)
  }
  return response.json()
}

export const updateEmployeeById = async (employee: Employee): Promise<Employee> => {
  const response = await fetch(config.employeesByIdUrl(employee.id), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(omit(employee, ['id', 'avatarUrl', 'status'])),
  })
  if (!response.ok) {
    throw new Error('Failed to update employee')
  }
  return response.json()
}
