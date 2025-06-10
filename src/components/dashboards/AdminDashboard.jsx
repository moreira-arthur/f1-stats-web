// src/components/dashboards/AdminDashboard.jsx

import React, { useState, useEffect } from 'react';
import {
    getAdminTotals,
    getAdminRacesByYear,
    getAdminConstructorStandings,
    getAdminDriverStandings
} from '../../services/apiService';
import StatCard from '../ui/StatCard';
import { FaCog } from 'react-icons/fa'; // Ícone para o botão
import { useNavigate } from 'react-router-dom';

// Importando ícones para dar um toque visual
import { FaFlagCheckered, FaCar, FaUserFriends } from 'react-icons/fa';

export default function AdminDashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // <-- Inicialize o hook

    useEffect(() => {
        const fetchDashboardData = async () => {
            setLoading(true);
            try {
                // Usando o ano anterior para garantir que tenhamos dados
                const yearToQuery = new Date().getFullYear() - 1;

                const [
                    totals,
                    races,
                    constructorStandings,
                    driverStandings
                ] = await Promise.all([
                    getAdminTotals(),
                    getAdminRacesByYear(yearToQuery),
                    getAdminConstructorStandings(yearToQuery),
                    getAdminDriverStandings(yearToQuery)
                ]);

                setData({ totals, races, constructorStandings, driverStandings, year: yearToQuery });
            } catch (err) {
                setError('Falha ao carregar dados do dashboard de Admin.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) return <p>Carregando dashboard do Admin...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!data) return null;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Visão Geral do Sistema</h2>
                {/* BOTÃO DE AÇÕES DO ADMIN */}
                <button
                    onClick={() => navigate('/admin/cadastro')}
                    className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-sm hover:bg-indigo-900 transition-colors cursor-pointer"
                >
                    <FaCog />
                    <span>Ações do Administrador</span>
                </button>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Administrador</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Total de Pilotos" value={data.totals.total_pilots} />
                <StatCard title="Total de Escuderias" value={data.totals.total_constructors} />
                <StatCard title="Total de Temporadas" value={data.totals.total_seasons} />
            </div>

            <h3 className="text-xl font-semibold text-gray-700 pt-4 border-b pb-2">Resumo da Temporada de {data.year}</h3>

            {/* --- INÍCIO DA MUDANÇA --- */}
            {/* A MUDANÇA PRINCIPAL ESTÁ AQUI: de lg:grid-cols-2 para lg:grid-cols-4 */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                {/* Card de Corridas - Ocupando as 2 primeiras colunas */}
                {/* E AQUI: definimos que este card ocupará 2 das 4 colunas em telas grandes */}
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center space-x-3 mb-4">
                        <FaFlagCheckered className="text-2xl text-red-600" />
                        <h4 className="text-lg font-bold text-gray-800">Corridas</h4>
                    </div>
                    <div className="max-h-[650px] overflow-y-auto pr-2 space-y-3">
                        {data.races.length > 0 ? (
                            data.races.map(race => (
                                <div key={race.round} className="p-3 bg-gray-50 rounded-md">
                                    <p className="font-semibold text-gray-700">{race.round}. {race.race_name}</p>
                                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                                        <span>Voltas: <strong>{race.laps}</strong></span>
                                        {race.winner_time && <span>Tempo Vencedor: <strong>{race.winner_time}</strong></span>}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500">Nenhuma corrida encontrada para o ano.</p>
                        )}
                    </div>
                </div>

                {/* Card de Pilotos - Ocupando a 3ª coluna */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center space-x-3 mb-4">
                        <FaUserFriends className="text-2xl text-green-600" />
                        <h4 className="text-lg font-bold text-gray-800">Classificação de Pilotos</h4>
                    </div>
                    <ul className="space-y-2">
                        {data.driverStandings.length > 0 ? (
                            data.driverStandings.map((d, index) => (
                                <li key={d.driver_name} className="flex justify-between items-center text-sm p-2 rounded hover:bg-gray-100">
                                    <span className="text-gray-700"><strong className="w-6 inline-block">{index + 1}.</strong> {d.driver_name}</span>
                                    <span className="font-bold text-gray-900">{d.total_points} pts</span>
                                </li>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500">Nenhuma classificação encontrada.</p>
                        )}
                    </ul>
                </div>

                {/* Card de Construtores - Ocupando a 4ª coluna */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center space-x-3 mb-4">
                        <FaCar className="text-2xl text-blue-600" />
                        <h4 className="text-lg font-bold text-gray-800">Classificação de Construtores</h4>
                    </div>
                    <ul className="space-y-2">
                        {data.constructorStandings.length > 0 ? (
                            data.constructorStandings.map((c, index) => (
                                <li key={c.constructor_name} className="flex justify-between items-center text-sm p-2 rounded hover:bg-gray-100">
                                    <span className="text-gray-700"><strong className="w-6 inline-block">{index + 1}.</strong> {c.constructor_name}</span>
                                    <span className="font-bold text-gray-900">{c.total_points} pts</span>
                                </li>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500">Nenhuma classificação encontrada.</p>
                        )}
                    </ul>
                </div>

            </div>
            {/* --- FIM DA MUDANÇA --- */}
        </div>
    );
}