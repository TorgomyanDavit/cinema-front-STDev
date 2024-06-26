import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Rooms from '../pages/Rooms';
import DefaultLayout from '../components/layouts/DefaultLayout';
import CinemaAdmin from '../pages/admin';

const configRoute = [
    {
        element: <Rooms/>,
        path: "/",
        Layout: DefaultLayout
    },
    {
        element: <CinemaAdmin/>,
        path: "/admin",
        Layout: DefaultLayout
    },
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