import React from 'react';
import { Outlet } from 'react-router-dom';
import UserHeader from '../components/UserHeader';
import UserFooter from '../components/UserFooter';
const UserLayout = () => {
    return (
        <>
            <UserHeader />

            <main className="user-content">
                <Outlet />
            </main>

            <UserFooter/>
        </>
    );
};

export default UserLayout;