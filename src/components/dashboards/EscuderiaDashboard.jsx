import React, { useState, useEffect } from 'react';

// Importando as duas funções que usaremos
import {
    getConstructorDashboardData,
    getConstructorDetailsById
} from '../../services/apiService';

import StatCard from '../ui/StatCard'; // Nosso componente de card reutilizável
import SearchPilotForm from '../escuderia/SearchPilotForm';
import UploadPilotsForm from '../escuderia/UploadPilotForm';

// Importando ícones para a interface
import { FaTrophy, FaUsers, FaCalendarAlt } from 'react-icons/fa';

export default function EscuderiaDashboard({ user }) {
    const [details, setDetails] = useState(null); // Para guardar nome e contagem de pilotos
    const [stats, setStats] = useState(null); // Para guardar as estatísticas principais
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Garante que só vamos buscar os dados se tivermos o ID do usuário (escuderia)
        if (!user?.idOriginal) return;

        const fetchDashboardData = async () => {
            setLoading(true);
            try {
                const constructorId = user.idOriginal;

                // Usamos Promise.all para buscar os detalhes e as estatísticas em paralelo
                const [detailsData, statsData] = await Promise.all([
                    getConstructorDetailsById(constructorId),
                    getConstructorDashboardData(constructorId)
                ]);

                setDetails(detailsData);
                setStats(statsData);
            } catch (err) {
                setError('Falha ao carregar os dados da sua escuderia.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [user]); // A busca é refeita se o usuário mudar

    if (loading) return <p>Carregando seu dashboard...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    // Garante que não vamos tentar renderizar nada se os dados não tiverem chegado
    if (!details || !stats) return null;

    return (
        <div className="space-y-6">
            {/* Cabeçalho com o Nome e Contagem de Pilotos */}
            <div className="p-4 bg-gray-100 rounded-lg">
                <h2 className="text-3xl font-bold text-gray-800">{details.constructor_name}</h2>
                <p className="text-md text-gray-600">Total de pilotos cadastrados na equipe: <strong>{details.pilot_count}</strong></p>
            </div>

            {/* Ações da Escuderia (onde o upload de arquivo e consulta ficariam) */}
            {/* <div className="p-4 border rounded-lg"> ... </div> */}

            {/* Grid com as Estatísticas Principais */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total de Vitórias"
                    value={stats.total_vitorias.toLocaleString('pt-BR')}
                    icon={<FaTrophy className="text-yellow-500" />}
                />
                <StatCard
                    title="Pilotos na História"
                    value={stats.total_pilotos.toLocaleString('pt-BR')}
                    icon={<FaUsers className="text-blue-500" />}
                />
                <StatCard
                    title="Primeiro Ano"
                    value={stats.primeiro_ano}
                    icon={<FaCalendarAlt className="text-green-500" />}
                />
                <StatCard
                    title="Último Ano"
                    value={stats.ultimo_ano}
                    icon={<FaCalendarAlt className="text-red-500" />}
                />
            </div>
            <div className="pt-6 border-t">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Ações da Equipe</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Passamos o 'constructor_name' como prop para a busca */}
                    <SearchPilotForm constructorName={details.constructor_name} />
                    <UploadPilotsForm />
                </div>
            </div>
        </div>
    );
}
