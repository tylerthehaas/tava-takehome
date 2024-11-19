const apiBaseUrl = process.env.VITE_API_BASE_URL || 'http://localhost:3001'

const config = {
  employeeListUrl: `${apiBaseUrl}/api/v1/employees`,
  employeesByDepartmentUrl: `${apiBaseUrl}/api/v1/employees?groupBy=department`,
  employeesByIdUrl: (id: number) => `${apiBaseUrl}/api/v1/employees/${id}`,
  healthCheckUrl: `${apiBaseUrl}/health`,
}

export default config
