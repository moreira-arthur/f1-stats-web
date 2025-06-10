import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/auth-context.js';

// Importe os novos componentes de dashboard
import AdminDashboard from '../components/dashboards/AdminDashboard.jsx';
import EscuderiaDashboard from '../components/dashboards/EscuderiaDashboard.jsx';
import PilotoDashboard from '../components/dashboards/PilotoDashboard.jsx';

export default function DashboardPage() {
    const { user, logout } = useAuth();

    // Esta função agora apenas decide qual componente renderizar
    const renderDashboardContent = () => {
        switch (user?.tipo) {
            case 'Administrador':
                return <AdminDashboard />;
            case 'Escuderia':
                return <EscuderiaDashboard user={user} />;
            case 'Piloto':
                return <PilotoDashboard user={user} />;
            default:
                // Se o AuthProvider ainda estiver carregando, user pode ser null
                if (user === null) return <p>Carregando...</p>;
                console.log("Usuário com tipo desconhecido:", user?.tipo);
                return <p>Tipo de usuário desconhecido.</p>;
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen p-4 sm:p-8">
            <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-4 sm:p-6">
                <header className="flex flex-wrap justify-between items-center mb-8 border-b pb-4">
                    <h1 className="text-2xl sm:text-3xl font-bold font-titillium text-gray-800">Dashboard</h1>
                    <div className="flex items-center space-x-4 mt-2 sm:mt-0">
                        <Link to="/reports" className="px-9 py-2 text-lm font-bold text-white bg-red-600 rounded hover:bg-red-100 hover:text-black transition-colors">
                            Ver Relatórios
                        </Link>
                        <button onClick={logout} className="px-4 py-2 text-lm font-bold text-white bg-gray-700 rounded hover:bg-gray-900 transition-colors">
                            Sair
                        </button>
                    </div>
                </header>

                <main>
                    {renderDashboardContent()}
                </main>
            </div>
        </div>
    );
}