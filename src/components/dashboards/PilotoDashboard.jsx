import React, { useState, useEffect } from 'react';

// Importando todas as funções que usaremos para este dashboard
import {
    getDriverDetailsById,
    getDriverActiveYears,
    getDriverAnnualStats,
    getDriverCircuitResume
} from '../../services/apiService';

import StatCard from '../ui/StatCard'; // Nosso componente de card reutilizável

// Importando ícones para a interface
import { FaUser, FaBuilding, FaCalendarCheck, FaFlagCheckered } from 'react-icons/fa';

export default function PilotoDashboard({ user }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!user?.idOriginal) return;

        const fetchDashboardData = async () => {
            setLoading(true);
            try {
                const driverId = user.idOriginal;

                // Buscamos todos os dados da carreira do piloto em paralelo
                const [
                    details,
                    activeYears,
                    annualStats,
                    circuitResume,
                ] = await Promise.all([
                    getDriverDetailsById(driverId),
                    getDriverActiveYears(driverId),
                    getDriverAnnualStats(driverId),
                    getDriverCircuitResume(driverId),
                ]);

                setData({ details, activeYears, annualStats, circuitResume });
            } catch (err) {
                setError('Falha ao carregar os dados da sua carreira.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [user]);

    if (loading) return <p>Carregando seu dashboard de carreira...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!data) return null;

    return (
        <div className="space-y-6">
            {/* Cabeçalho de Boas-vindas */}
            <div className="p-4 bg-gray-100 rounded-lg">
                <h2 className="text-3xl font-bold text-gray-800 flex items-center">
                    <FaUser className="mr-3" /> {data.details.pilot_full_name}
                </h2>
                <p className="text-md text-gray-600 flex items-center mt-1">
                    <FaBuilding className="mr-2" /> Escuderia Atual:  <strong>{data.details.current_constructor_name || 'Não disponível'}</strong>
                </p>
            </div>

            {/* Cards com Primeiro e Último Ano */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <StatCard
                    title="Primeiro Ano na F1"
                    value={data.activeYears.primeiro_ano}
                    icon={<FaCalendarCheck className="text-green-500" />}
                />
                <StatCard
                    title="Último Ano Registrado"
                    value={data.activeYears.ultimo_ano}
                    icon={<FaFlagCheckered className="text-red-500" />}
                />
            </div>

            {/* Tabelas de Desempenho */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
                {/* Tabela de Desempenho Anual */}
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Desempenho Anual</h3>
                    <div className="max-h-[400px] overflow-y-auto border rounded-md">
                        <table className="min-w-full text-sm text-left">
                            <thead className="bg-gray-100 sticky top-0">
                                <tr>
                                    <th className="p-3 font-semibold text-gray-600">Ano</th>
                                    <th className="p-3 font-semibold text-gray-600 text-center">Corridas</th>
                                    <th className="p-3 font-semibold text-gray-600 text-center">Vitórias</th>
                                    <th className="p-3 font-semibold text-gray-600 text-center">Pontos</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {data.annualStats.map(stat => (
                                    <tr key={stat.ano} className="hover:bg-gray-50">
                                        <td className="p-3 font-medium">{stat.ano}</td>
                                        <td className="p-3 text-center font-mono">{stat.corridas_no_ano}</td>
                                        <td className="p-3 text-center font-mono">{stat.vitorias_no_ano}</td>
                                        <td className="p-3 text-center font-mono font-bold text-gray-900">{stat.pontos_no_ano}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Tabela de Desempenho por Circuito */}
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Desempenho por Circuito</h3>
                    <div className="max-h-[400px] overflow-y-auto border rounded-md">
                        <table className="min-w-full text-sm text-left">
                            <thead className="bg-gray-100 sticky top-0">
                                <tr>
                                    <th className="p-3 font-semibold text-gray-600">Circuito</th>
                                    <th className="p-3 font-semibold text-gray-600 text-center">Corridas</th>
                                    <th className="p-3 font-semibold text-gray-600 text-center">Vitórias</th>
                                    <th className="p-3 font-semibold text-gray-600 text-center">Pontos</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {data.circuitResume.map(stat => (
                                    <tr key={stat.circuito} className="hover:bg-gray-50">
                                        <td className="p-3 font-medium">{stat.circuito}</td>
                                        <td className="p-3 text-center font-mono">{stat.corridas_no_circuito}</td>
                                        <td className="p-3 text-center font-mono">{stat.vitorias_no_circuito}</td>
                                        <td className="p-3 text-center font-mono font-bold text-gray-900">{stat.pontos_obtidos_no_circuito}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}