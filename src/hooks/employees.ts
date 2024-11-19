import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { DepartmentGroup, Employee, EmployeesByDepartment } from '../types/employees'
import { fetchEmployeeById, fetchEmployeesByDepartment, updateEmployeeById } from '../api/employees'

interface EmployeesActions {
  getEmployeesByDepartment: () => DepartmentGroup[]
  getEmployeeById: (id: number) => Employee
  updateEmployeeById: (employee: Employee) => void
}

function transformToDepartmentGroupList(employeesByDepartment: EmployeesByDepartment): DepartmentGroup[] {
  return Object.entries(employeesByDepartment).map(([departmentName, employeeList]) => ({
    name: departmentName,
    employees: employeeList,
  }))
}

function useEmployees(): EmployeesActions {
  const queryClient = useQueryClient()
  const updateEmployeeMutation = useMutation({
    mutationFn: (employee: Employee) => updateEmployeeById(employee),
    onMutate: async (newEmployee) => {
      // Cancel any outgoing refetches so they don't overwrite our optimistic update
      await queryClient.cancelQueries({ queryKey: ['employees', 'byDepartment'] })
      await queryClient.cancelQueries({ queryKey: ['employee', 'byId', newEmployee.id] })

      // Snapshot the previous value
      const previousEmployeesByDepartment = queryClient.getQueryData<EmployeesByDepartment>([
        'employees',
        'byDepartment',
      ])
      const previousEmployee = queryClient.getQueryData<Employee>(['employee', 'byId', newEmployee.id])

      // Optimistically update the cache
      if (previousEmployeesByDepartment) {
        queryClient.setQueryData<EmployeesByDepartment>(['employees', 'byDepartment'], (old) => {
          if (!old) return old
          const updated = { ...old }

          // Remove from old department
          if (previousEmployee && previousEmployee.department !== newEmployee.department) {
            updated[previousEmployee.department] = updated[previousEmployee.department].filter(
              (emp) => emp.id !== newEmployee.id,
            )
          }

          // Add to new/current department
          if (!updated[newEmployee.department]) {
            updated[newEmployee.department] = []
          }

          updated[newEmployee.department] = updated[newEmployee.department].map((emp) =>
            emp.id === newEmployee.id ? newEmployee : emp,
          )

          return updated
        })
      }

      // Update individual employee cache
      queryClient.setQueryData(['employee', 'byId', newEmployee.id], newEmployee)

      // Return context with snapshot
      return { previousEmployeesByDepartment, previousEmployee }
    },
    onError: (err, newEmployee, context) => {
      // If mutation fails, roll back to the snapshot
      if (context?.previousEmployeesByDepartment) {
        queryClient.setQueryData(['employees', 'byDepartment'], context.previousEmployeesByDepartment)
      }
      if (context?.previousEmployee) {
        queryClient.setQueryData(['employee', 'byId', newEmployee.id], context.previousEmployee)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['employees', 'byDepartment'] })
      queryClient.invalidateQueries({ queryKey: ['employee', 'byId'] })
    },
  })

  const actions: EmployeesActions = {
    getEmployeesByDepartment() {
      const { data: employeesByDepartment } = useSuspenseQuery({
        queryKey: ['employees', 'byDepartment'],
        queryFn: fetchEmployeesByDepartment,
      })

      return transformToDepartmentGroupList(employeesByDepartment)
    },

    getEmployeeById(id) {
      const { data: employee } = useSuspenseQuery({
        queryKey: ['employee', 'byId', id],
        queryFn: () => fetchEmployeeById(id),
      })

      return employee
    },

    updateEmployeeById(employee) {
      return updateEmployeeMutation.mutateAsync(employee)
    },
  }

  return actions
}

export default useEmployees
