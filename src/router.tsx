import { createBrowserRouter } from 'react-router-dom';

import App from '@/App';
import SimulationFormPage from '@/pages/SimulationFormPage';
import SimulationResultsPage from '@/pages/SimulationResultsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <SimulationFormPage />,
      },
      {
        path: 'results',
        element: <SimulationResultsPage />,
      },
    ],
  },
]);

export default router;
