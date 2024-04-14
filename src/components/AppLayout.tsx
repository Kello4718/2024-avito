import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from '../app/hooks';
import React from 'react';

const AppLayout = () => {
    const { user } = useAppSelector(({ movies }) => movies);

    if (!user.login && !user.password) {
        return <Navigate to={'/auth'} />;
    }

    return <Outlet />;
};

export default AppLayout;
