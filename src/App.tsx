import { Suspense } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider, QueryErrorResetBoundary } from '@tanstack/react-query'
import Payroll from './components/Payroll'
import EmployeeList from './components/EmployeeList'
import Loading from './components/Loading'
import { ErrorBoundary } from 'react-error-boundary'

import './styles.css'
import Nav from './components/Nav'
import { EditEmployee } from './components/EditEmployee'
import Button from './components/Button'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Nav />
        <main>
          <QueryErrorResetBoundary>
            {({ reset }) => (
              <ErrorBoundary
                onReset={reset}
                fallbackRender={({ resetErrorBoundary }) => (
                  <div>
                    <p>There was an error!</p>
                    <Button onClick={resetErrorBoundary}>Try again</Button>
                  </div>
                )}
              >
                <Suspense fallback={<Loading />}>
                  <Routes>
                    <Route path="/" element={<Navigate to="/payroll" replace />} />
                    <Route path="/payroll" element={<Payroll />} />
                    <Route path="/employees" element={<EmployeeList />} />
                    <Route path="/employees/:id" element={<EditEmployee />} />
                  </Routes>
                </Suspense>
              </ErrorBoundary>
            )}
          </QueryErrorResetBoundary>
        </main>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
