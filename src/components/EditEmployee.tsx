import { useForm } from 'react-hook-form'
import Card from './Card'
import { Employee } from '../types'
import useEmployees from '../hooks/employees'
import { useNavigate, useParams } from 'react-router-dom'
import { cn } from '../lib/style-helpers'
import { FC, ReactNode, useState } from 'react'
import Button from './Button'

const textInputClasses =
  'w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500'

const labelClasses = 'flex justify-between text-sm font-medium text-gray-700 mb-1'

interface ValidationErrorProps {
  children: ReactNode
}

const ValidationError: FC<ValidationErrorProps> = ({ children }) => (
  <p className="text-red-600" role="alert">
    {children}
  </p>
)

export function EditEmployee() {
  const { id = '' } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { getEmployeeById, updateEmployeeById } = useEmployees()
  const employee = getEmployeeById(parseInt(id))
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Employee>({
    values: employee,
  })
  const [errorMessage, setErrorMessage] = useState('')

  const onSubmit = async (employee: Employee) => {
    try {
      await updateEmployeeById(employee)
    } catch (error) {
      setErrorMessage((error as Error).message)
      return
    }
    navigate('/employees')
  }

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-semibold mb-6">Edit Employee</h1>
      {errorMessage && <ValidationError>{errorMessage}</ValidationError>}
      <Card classes="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="firstName" className={labelClasses}>
              First Name
              {errors.firstName && <ValidationError>{errors.firstName.message}</ValidationError>}
            </label>

            <input
              id="firstName"
              type="text"
              {...register('firstName', { required: 'first name is required' })}
              className={textInputClasses}
              aria-invalid={errors.firstName ? 'true' : 'false'}
            />
          </div>

          <div>
            <label htmlFor="lastName" className={labelClasses}>
              Last Name
              {errors.lastName && <ValidationError>{errors.lastName.message}</ValidationError>}
            </label>
            <input
              id="lastName"
              type="text"
              {...register('lastName', { required: 'last name is required' })}
              className={textInputClasses}
              aria-invalid={errors.lastName ? 'true' : 'false'}
            />
          </div>

          <div>
            <label htmlFor="dateStarted" className={labelClasses}>
              Start Date
              {errors.dateStarted && <ValidationError>{errors.dateStarted.message}</ValidationError>}
            </label>
            <input
              id="dateStarted"
              type="text"
              {...register('dateStarted', { required: 'start date is required' })}
              className={textInputClasses}
              aria-invalid={errors.dateStarted ? 'true' : 'false'}
            />
          </div>

          <div>
            <label htmlFor="department" className={labelClasses}>
              Department
            </label>
            <select id="department" {...register('department')} className={textInputClasses}>
              <option value="Management">Management</option>
              <option value="HR">HR</option>
              <option value="Engineering">Engineering</option>
              <option value="Sales">Sales</option>
            </select>
          </div>

          <div>
            <label htmlFor="quote" className={labelClasses}>
              Quote
              {errors.quote && <ValidationError>{errors.quote.message}</ValidationError>}
            </label>
            <textarea
              id="quote"
              {...register('quote', { required: 'quote is required' })}
              className={cn(textInputClasses, 'min-h-[100px]')}
              aria-invalid={errors.quote ? 'true' : 'false'}
            />
          </div>

          <Button type="submit">Save</Button>
        </form>
      </Card>
    </div>
  )
}
