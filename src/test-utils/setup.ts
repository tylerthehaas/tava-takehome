import '@testing-library/jest-dom'
import { beforeAll, afterAll, afterEach } from 'vitest'
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'
import { toHaveNoViolations } from 'jest-axe'

expect.extend(toHaveNoViolations)

// Mock API handlers
const handlers = [
  http.get('/api/employees', () => {
    return HttpResponse.json([
      {
        id: 1,
        name: 'John Doe',
        department: 'Engineering',
        salary: 100000,
      },
      {
        id: 2,
        name: 'Jane Smith',
        department: 'Marketing',
        salary: 80000,
      },
    ])
  }),
  http.get('/api/employees/:id', ({ params }) => {
    return HttpResponse.json({
      id: Number(params.id),
      name: 'John Doe',
      department: 'Engineering',
      salary: 100000,
    })
  }),
  http.put('/api/employees/:id', async ({ request }) => {
    const updatedEmployee = await request.json()
    return HttpResponse.json(updatedEmployee)
  }),
]

// Setup MSW
const server = setupServer(...handlers)

beforeAll(() => {
  // Start the server
  server.listen({ onUnhandledRequest: 'error' })
})

afterEach(() => {
  // Reset handlers between tests
  server.resetHandlers()
})

afterAll(() => {
  // Close the server
  server.close()
})
