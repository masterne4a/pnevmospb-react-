import { createBrowserRouter, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts';
//import {} from '../pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    /*children: [
      { index: true, element: <CatalogPage /> },
      { path: 'about', element: <CatalogPage /> },
      { path: 'offer/:id', element: <OfferPage /> },
      { path: 'skills', element: <SkillsPage /> },
      {
        path: 'profile',
        element: <ProfilePage />,
        children: [
          { path: 'favorites', element: <FavoritesSection /> },
          { path: 'swaps', element: <MySwapsSection /> },
        ],
      },
      { path: '404', element: <NotFoundPage /> },
      { path: '500', element: <Error500Page /> },
      { path: '*', element: <Navigate to="/404" replace /> },
    ],*/
  },
]);