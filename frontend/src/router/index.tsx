import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Page1 from '../pages/page1';
import Page2 from '../pages/page2';
import Root from './root';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
    },
    {
        path: '/page2',
        element: <Page2 />,
    },
]);
