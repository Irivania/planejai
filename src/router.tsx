import { createBrowserRouter } from 'react-router-dom'
import { RootLayout } from './components/layout/RootLayout'
import { SimulationFormPage } from './pages/SimulationFormPage'
import { SimulationResultsPage } from './pages/SimulationResultsPage'
import { HistoryPage } from './pages/History' // Importe a página de Histórico

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <SimulationFormPage />,
      },
      {
        path: '/resultado/:id',
        element: <SimulationResultsPage />,
      },
      {
        path: '/historico',
        element: <HistoryPage />,
      },
    ],
  },
])

export default router