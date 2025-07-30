import { useState } from 'react'
import './App.css'
import { router } from '@/routes'
import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider} from '@tanstack/react-query'

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
