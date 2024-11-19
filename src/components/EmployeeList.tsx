import { useNavigate } from 'react-router-dom'
import useEmployees from '../hooks/employees'
import { cn } from '../lib/style-helpers'
import Card from './Card'
import { formatDate } from '../lib/date'

const thClasses = `text-left p-4 font-medium text-gray-600 border-b border-gray-100`
const tdClasses = 'p-4 border-b border-gray-100'

const EmployeeList = () => {
  const { getEmployeesByDepartment } = useEmployees()
  const employeesByDepartment = getEmployeesByDepartment()
  const navigate = useNavigate()

  function navigateToEmployee(id: number): () => void {
    return () => navigate(`/employees/${id}`)
  }

  if (!employeesByDepartment) {
    return null
  }

  return (
    <div className="p-6 font-sans">
      {employeesByDepartment.map((dept) => (
        <div key={dept.name} className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">{dept.name}</h2>
          <Card>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className={cn(thClasses, 'w-1/4')}>Name</th>
                  <th className={cn(thClasses, 'w-1/6')}>Start Date</th>
                  <th className={cn(thClasses, 'w-1/3')}>Quote</th>
                  <th className={cn(thClasses, 'w-1/6')}>Status</th>
                </tr>
              </thead>
              <tbody>
                {dept.employees.map((employee) => (
                  <tr
                    key={employee.id}
                    className={`transition-colors hover:bg-yellow-100 cursor-pointer`}
                    onClick={navigateToEmployee(employee.id)}
                  >
                    <td className="p-4 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <img
                          src={employee.avatarUrl}
                          alt={`${employee.firstName} ${employee.lastName}`}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span>{`${employee.firstName} ${employee.lastName}`}</span>
                      </div>
                    </td>
                    <td className={tdClasses}>{formatDate(employee.dateStarted)}</td>
                    <td className={tdClasses}>{employee.quote}</td>
                    <td className={tdClasses}>
                      <span
                        className={cn(`float-left px-3 py-1 rounded-sm text-sm font-medium text-white capitalize`, {
                          'bg-green-400': employee.status === 'active',
                          'bg-orange-400': employee.status !== 'active',
                        })}
                      >
                        {employee.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      ))}
    </div>
  )
}

export default EmployeeList
