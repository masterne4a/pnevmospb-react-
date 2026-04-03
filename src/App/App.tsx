import type { ReactNode } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import '../shared/styles/index.css';
import './App.css';

export function App(): ReactNode {
  return <RouterProvider router={router} />;
}