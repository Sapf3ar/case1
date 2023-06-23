import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Upload from '../pages/Upload';
import Page2 from '../pages/page2';
import Root from './root';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Upload />,
    },
    {
        path: '/page2',
        element: <Page2 />,
    },
]);
