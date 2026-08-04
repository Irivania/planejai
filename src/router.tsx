import { createBrowserRouter } from 'react-router-dom'
import { RootLayout } from './components/layout/RootLayout'
import { SimulationFormPage } from './pages/SimulationFormPage'
import { SimulationResultsPage } from './pages/SimulationResultsPage'

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
        element: (
          <main className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
            <h1 className="text-foreground text-2xl font-bold">
              Histórico de Simulações
            </h1>
          </main>
        ),
      },
    ],
  },
])

export default router