import { render as originalRender, RenderOptions } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { ReactElement } from 'react'

// Create a custom render function
function render(
  ui: ReactElement,
  {
    route = '/',
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          gcTime: 0,
        },
      },
    }),
    ...renderOptions
  } = {} as RenderOptions & { route?: string; queryClient?: QueryClient },
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>{children}</BrowserRouter>
      </QueryClientProvider>
    )
  }

  window.history.pushState({}, 'Test page', route)

  return {
    ...originalRender(ui, { wrapper: Wrapper, ...renderOptions }),
    queryClient,
  }
}

// Re-export everything
export * from '@testing-library/react'
export * from '@testing-library/user-event'
// override the render method
export { render }
