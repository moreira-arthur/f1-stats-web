// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Mude a importação para o caminho correto
import AuthProvider from './context/AuthProvider.jsx';

// Importe suas páginas e componentes
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ReportsPage from './pages/ReportsPage';
import AdminActionsPage from './pages/AdminActionsPage.jsx'; // <-- Importe a nova página
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <Router>      {/* <- Router agora está FORA */}
      <AuthProvider> {/* <- AuthProvider agora está DENTRO */}
        <Routes>
          {/* Rotas Públicas */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/admin/cadastro"
            element={
              <ProtectedRoute>
                <AdminActionsPage />
              </ProtectedRoute>
            }
          />

          {/* Rotas Protegidas */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <ReportsPage />
              </ProtectedRoute>
            }
          />

          {/* Rota "catch-all" */}
          <Route path="*" element={<div><h1>404 - Página Não Encontrada</h1></div>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}