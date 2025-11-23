import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import QuizPage from './pages/QuizPage';
import MainLayout from './layouts/MainLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'quiz', element: <QuizPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
