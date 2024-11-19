export interface Employee {
  id: number
  firstName: string
  lastName: string
  department: string
  dateStarted: string
  quote: string
  status: string
  avatarUrl: string
}

export interface DepartmentGroup {
  name: string
  employees: Employee[]
}

export type EmployeesByDepartment = Record<string, Employee[]>

export type UpdateEmployee = Omit<Employee, 'id' | 'avatarUrl' | 'status'>
