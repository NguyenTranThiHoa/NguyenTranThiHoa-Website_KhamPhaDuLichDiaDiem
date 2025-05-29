import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import AdminLayout from '../layouts/AdminLayout';
import ManageLocations from '../pages/Admin/ManageLocations';
import DashBoard from '../pages/Admin/DashBoard';
import ManageHotels from '../pages/Admin/ManageHotels';
import ManageTransports from '../pages/Admin/ManageTransports';
import ManageTransportType from '../pages/Admin/ManageTransportType';
import ManageSpecialty from '../pages/Admin/ManageSpecialty';
import ManageUsers from '../pages/Admin/ManageUsers';
import ManageReviews from '../pages/Admin/ManageReviews';

const AdminRoutes = () => {
    return (
        <Routes>
            <Route element={<PrivateRoute allowedRoles={['Admin']} />}>
                <Route path="/" element={<Navigate to="/admin/dash-board" />} />    
                <Route element={<AdminLayout />}>
                    <Route path="/dash-board" element={<DashBoard />} />
                    <Route path="/manage-locations" element={<ManageLocations />} />
                    <Route path="/manage-hotels" element={<ManageHotels />} />
                    <Route path="/manage-transports" element={<ManageTransports />} />
                    <Route path="/manage-transportType" element={<ManageTransportType />} />
                    <Route path="/manage-specialty" element={<ManageSpecialty />} />
                    <Route path="/manage-user" element={< ManageUsers/>} />
                    <Route path="/manage-reviews" element={< ManageReviews/>} />
                </Route>
            </Route>
        </Routes>
    );
};

export default AdminRoutes;
