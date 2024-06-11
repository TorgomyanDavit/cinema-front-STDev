import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Home from '../pages/home';
import DefaultLayout from '../components/layouts/DefaultLayout';

const configRoute = [
    {
        element: <Home/>,
        path: "/",
        Layout: DefaultLayout
    },


    // {
    //     element: <Rooms/>,
    //     path: "/room/:id",
    //     Layout: DefaultLayout
    // },
]

const RoutesProvider: React.FC = () => {
    return (
        <Routes>
            {configRoute.map(({ path, element, Layout }: any, idx: number) => (
                <Route element={<Outlet />} key={idx}>
                    <Route path={path} element={<Layout>{element}</Layout>} />
                </Route>
            ))}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default RoutesProvider;