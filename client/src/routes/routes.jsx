import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from '../features/forms/LoginForm';
import RegistrationForm from '../features/forms/RegistrationForm';
import AuthPage from '../features/pages/usersList/UsersList';
import UnAuthPage from '../features/pages/unAuthPage/UnAuthPage';
import NaviBar from '../features/navBar/NaviBar';

export const useRoutes = (isAuthenticated) => {
    if (isAuthenticated) {
        return (
            <>
                <NaviBar />
                <Routes>
                    <Route path="/login" element={<Navigate replace to="/" />} />
                    <Route path="/registration" element={<Navigate replace to="/" />} />
                    <Route path="/" element={<AuthPage />} />
                </Routes>
            </>

        )
    }
    return (
        <Routes>
            <Route path="/" element={<UnAuthPage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/registration" element={<RegistrationForm />} />

        </Routes>
    )


} 