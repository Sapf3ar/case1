import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Upload from '../pages/Upload';
import Report from '../pages/Report';
import Root from './root';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Upload />,
    },
    {
        path: '/report/:id',
        element: <Report />,
    },
]);
