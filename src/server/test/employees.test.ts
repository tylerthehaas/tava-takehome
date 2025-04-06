import { describe, it, expect } from 'vitest'
import request from 'supertest'
import { app } from '../index'

describe('Employees API', () => {
  describe('GET /api/v1/employees', () => {
    it('should return a list of employees grouped by department', async () => {
      const response = await request(app).get('/api/v1/employees').expect('Content-Type', /json/).expect(200)

      expect(response.body).toBeDefined()
      expect(Array.isArray(response.body)).toBe(true)
    })
  })

  describe('GET /api/v1/employees/:id', () => {
    it('should return an employee by id', async () => {
      const response = await request(app).get('/api/v1/employees/1').expect('Content-Type', /json/).expect(200)

      expect(response.body).toBeDefined()
      expect(response.body.id).toBe(1)
    })

    it('should return 404 for non-existent employee', async () => {
      await request(app).get('/api/v1/employees/999').expect(404)
    })
  })

  describe('PUT /api/v1/employees/:id', () => {
    it('should update an employee', async () => {
      const updatedEmployee = {
        firstName: 'Updated',
        lastName: 'Name',
        department: 'Engineering',
        dateStarted: '2023-01-01T00:00:00.000Z',
        quote: 'A great quote about engineering',
      }

      const response = await request(app)
        .put('/api/v1/employees/1')
        .send(updatedEmployee)
        .expect('content-type', /json/)
        .expect(200)

      expect(response.body).toBeDefined()
      expect(response.body.firstName).toBe(updatedEmployee.firstName)
      expect(response.body.lastName).toBe(updatedEmployee.lastName)
      expect(response.body.department).toBe(updatedEmployee.department)
      expect(response.body.dateStarted).toBe(updatedEmployee.dateStarted)
      expect(response.body.quote).toBe(updatedEmployee.quote)
    })
  })
})
