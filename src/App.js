import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import ErrorPage from './pages/Error';

import HomePage from './pages/Home';
import Authentication from './pages/Authentication'
import RootLayout from './pages/Root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Authentication /> },
    
    ],
  },
  {
    path: '/home',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage/> },
    
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
