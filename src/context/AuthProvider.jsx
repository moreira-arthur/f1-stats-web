import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from './auth-context.js';
import { loginUser, logoutUser } from '../services/apiService';

export default function AuthProvider({ children }) {
    // REMOVIDO: O estado 'token' não é mais necessário.
    // const [token, setToken] = useState(sessionStorage.getItem('authToken')); 

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const tokenFromStorage = sessionStorage.getItem('authToken');

        try {
            if (tokenFromStorage) {
                const decodedUser = jwtDecode(tokenFromStorage);
                if (decodedUser.exp * 1000 > Date.now()) {
                    setUser(decodedUser);
                }
            }
        } catch (error) {
            console.error("Token inválido no sessionStorage:", error);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const login = async (username, password) => {
        const response = await loginUser(username, password);
        const { token: newToken } = response;
        sessionStorage.setItem('authToken', newToken);
        const decodedUser = jwtDecode(newToken);

        // REMOVIDO: A chamada setToken(newToken) não é mais necessária.
        setUser(decodedUser);
        navigate('/dashboard');
    };

    const logout = async () => {
        try {
            await logoutUser();
        } catch (error) {
            console.error("Erro no logout da API:", error.response?.data?.message || error.message);
        } finally {
            setUser(null);
            // REMOVIDO: A chamada setToken(null) não é mais necessária.
            sessionStorage.removeItem('authToken');
            navigate('/login');
        }
    };

    // O 'isLoading' foi adicionado ao contexto para o caso de algum componente precisar saber sobre isso.
    const value = { user, isAuthenticated: !!user, login, logout, isLoading };

    if (isLoading) {
        // pode ser estilizado melhor
        return <div className="flex justify-center items-center h-screen w-screen"><h1>Carregando...</h1></div>;
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};