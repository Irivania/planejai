import { ThemeProvider } from './context/theme/ThemeProvider'
import { router } from './router'
import { RouterProvider } from 'react-router-dom'

export function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App