import { createBrowserRouter } from 'react-router-dom';

import Upload from '../pages/Upload';
import Report from '../pages/Report';

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
