import React from 'react';
import ReactDOM from 'react-dom/client';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './app/store';

import AppLayout from './components/AppLayout';
import { Home } from './pages/index';
import Auth from './pages/Auth/Auth';
import Movie from './pages/Movie/Movie';

import './global/style.css';

const router = createBrowserRouter([
    {
        path: '/auth',
        element: <Auth />,
    },
    {
        path: '/',

        element: <AppLayout />,
        children: [
            {
                path: '/',
                index: true,
                element: <Home />,
            },
            {
                path: '/movie/:id',
                element: <Movie />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('app') as HTMLDivElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>,
);
