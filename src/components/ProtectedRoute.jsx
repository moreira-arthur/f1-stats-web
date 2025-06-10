import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/auth-context.js';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        // Redireciona para a página de login se não estiver autenticado
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;