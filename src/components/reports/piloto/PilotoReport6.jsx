import React, { useState, useEffect } from 'react';
import { getReport6_DriverPointsByRace } from '../../../services/apiService';
import { FaCalendarAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';

export default function PilotoReport6({ pilotId }) {
    // O estado agora guardará um objeto, onde cada chave é um ano. Ex: { "2007": { ... } }
    const [dataByYear, setDataByYear] = useState({});
    const [loading, setLoading] = useState(true);
    const [expandedYear, setExpandedYear] = useState(null);

    useEffect(() => {
        if (!pilotId) return;

        getReport6_DriverPointsByRace(pilotId)
            .then(flatData => {
                // --- A TRANSFORMAÇÃO MÁGICA ACONTECE AQUI ---
                // Usamos reduce para agrupar a lista plana em um objeto por ano.
                const groupedData = flatData.reduce((acc, race) => {
                    const year = race.race_year;
                    // Se o ano ainda não existe no nosso acumulador (acc), o criamos.
                    if (!acc[year]) {
                        acc[year] = {
                            total_points_in_year: 0,
                            races: []
                        };
                    }
                    // Adicionamos os pontos da corrida ao total do ano.
                    acc[year].total_points_in_year += race.points_scored;
                    // Adicionamos a corrida à lista de corridas daquele ano.
                    acc[year].races.push(race);

                    return acc;
                }, {});

                setDataByYear(groupedData);
            })
            .catch(err => console.error("Erro ao buscar relatório de pontos:", err))
            .finally(() => setLoading(false));
    }, [pilotId]);

    const handleYearClick = (year) => {
        setExpandedYear(expandedYear === year ? null : year);
    };

    // Pegamos os anos do nosso objeto de dados e os ordenamos do mais recente para o mais antigo.
    const sortedYears = Object.keys(dataByYear).sort((a, b) => b - a);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
                <FaCalendarAlt className="text-2xl text-purple-600" />
                <h3 className="text-lg font-bold text-gray-800">Relatório 6: Detalhamento de Pontos por Ano</h3>
            </div>

            {loading ? <p className="text-sm text-gray-500">Carregando dados...</p> : (
                <div className="space-y-2">
                    {sortedYears.length > 0 ? sortedYears.map(year => {
                        const yearData = dataByYear[year];
                        return (
                            // CORREÇÃO DA KEY: Adicionando a key única para cada ano.
                            <div key={year} className="border rounded-lg bg-gray-50">
                                <button onClick={() => handleYearClick(year)} className="w-full text-left p-3 hover:bg-gray-100 flex justify-between items-center">
                                    <div className="flex items-center">
                                        <p className="font-bold text-lg text-gray-800">{year}</p>
                                        <span className="ml-4 text-sm text-gray-600">Total de Pontos: <strong className="font-mono">{yearData.total_points_in_year}</strong></span>
                                    </div>
                                    {expandedYear === year ? <FaChevronUp /> : <FaChevronDown />}
                                </button>

                                {expandedYear === year && (
                                    <div className="border-t p-4 bg-white">
                                        <h4 className="font-semibold text-sm mb-2">Pontos por Corrida:</h4>
                                        <ul className="divide-y divide-gray-200">
                                            {yearData.races.map(race => (
                                                // CORREÇÃO DA KEY: Adicionando a key única para cada corrida.
                                                <li key={race.race_name} className="py-2 flex justify-between text-sm">
                                                    <span>{race.race_name}</span>
                                                    <span className="font-mono font-semibold">{race.points_scored} pts</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )
                    }) : (
                        <p className="p-4 text-center text-gray-500">Nenhum dado de pontuação encontrado.</p>
                    )}
                </div>
            )}
        </div>
    );
}