import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout'
import LoginForm from '../pages/Auth/LoginForm';
import RegisterForm from '../pages/Auth/RegisterForm';
import ForgotPasswordForm from '../pages/Auth/ForgotPasswordForm';

function AuthRouter() {
    return (
        <Routes>
            <Route element={<AuthLayout />}>
                <Route path="/" element={<Navigate to="/auth/login" />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/forgot-password" element={<ForgotPasswordForm />} />
            </Route>
        </Routes>
    );
}

export default AuthRouter;
