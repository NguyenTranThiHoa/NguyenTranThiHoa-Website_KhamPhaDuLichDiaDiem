import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import UserLayout from '../layouts/UserLayout'
import Home from '../pages/User/Home';
import Locations from '../pages/User/Locations';
import Hotels from '../pages/User/Hotels';
import Specialty from '../pages/User/Specialty';
import Transports from '../pages/User/Transports';
import LocationsDetails from '../pages/User/LocationsDetails';
import HotelsDetails from '../pages/User/HotelsDetails';
import SpecialtyDetails from '../pages/User/SpecialtyDetails';
import TransportDetails from '../pages/User/TransportsDetails';
import Account from '../pages/User/Account';
import About from '../pages/User/About';

const AdminRoutes = () => {
    return (
        <Routes>
            <Route element={<UserLayout />}>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<Home />} />
                <Route path="/locations" element={<Locations/>} />
                <Route path="/locations/:id" element={<LocationsDetails />} />
                <Route path="/hotels" element={<Hotels/>} />
                <Route path="/hotels/:id" element={<HotelsDetails />} />
                <Route path="/specialty" element={<Specialty/>} />
                <Route path="/specialty/:id" element={<SpecialtyDetails />} />
                <Route path="/transports" element={<Transports/>} />
                <Route path="/transports/:id" element={<TransportDetails />} />

                <Route element={<PrivateRoute allowedRoles={['User', 'Admin']} />}>
                    <Route path="/account" element={<Account />} />
                </Route>

                <Route path="/abouts" element={<About/>} />
            </Route>
        </Routes>
    )
}

export default AdminRoutes;