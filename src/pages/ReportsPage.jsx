import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth-context.js';
import { Button } from '@/components/ui/button';

import AdminReports from '../components/reports/AdminReports';
import EscuderiaReports from '../components/reports/EscuderiaReports';
import PilotoReports from '../components/reports/PilotoReports'; // <-- IMPORTE O COMPONENTE FINAL

export default function ReportsPage() {
    const navigate = useNavigate();
    const { user } = useAuth();

    const renderReportsByRole = () => {
        if (!user) return <p>Carregando...</p>; // Adiciona um estado de carregamento

        switch (user.tipo) {
            case 'Administrador':
                return <AdminReports />;
            case 'Escuderia':
                return <EscuderiaReports user={user} />;
            case 'Piloto':
                return <PilotoReports user={user} />;
            default:
                return <p>Nenhum relatório disponível para este tipo de usuário.</p>;
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen p-4 sm:p-8">
            <div className="max-w-7xl mx-auto">
                <header className="flex justify-between items-center mb-6 border-b pb-4">
                    <h1 className="text-3xl font-bold text-gray-800">Central de Relatórios</h1>
                    <Button variant="outline" onClick={() => navigate('/dashboard')}>
                        Voltar ao Dashboard
                    </Button>
                </header>
                <main>
                    {renderReportsByRole()}
                </main>
            </div>
        </div>
    );
}