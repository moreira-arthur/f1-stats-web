import React, { useState, useEffect } from 'react';
import {
    getReport3_TotalRaceCount,
    getReport3_CircuitRaceStats,
    getReport3_RaceDetailsByCircuit
} from '../../../services/apiService';
import { FaRoad, FaChevronDown, FaChevronUp } from 'react-icons/fa'; // Ícones

export default function AdminReport3() {
    const [totalRaces, setTotalRaces] = useState(0);
    const [circuitStats, setCircuitStats] = useState([]);
    const [loading, setLoading] = useState(true);

    const [expandedCircuit, setExpandedCircuit] = useState({ id: null, details: [], loading: false });

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [totalData, circuitsData] = await Promise.all([
                    getReport3_TotalRaceCount(),
                    getReport3_CircuitRaceStats()
                ]);
                setTotalRaces(totalData.total_races);
                setCircuitStats(circuitsData);
            } catch (error) {
                console.error("Erro ao buscar dados do Relatório 3", error);
            } finally {
                setLoading(false);
            }
        };
        fetchInitialData();
    }, []);

    const handleCircuitClick = async (circuitId) => {
        // Se clicar no mesmo circuito, ele fecha
        if (expandedCircuit.id === circuitId) {
            setExpandedCircuit({ id: null, details: [], loading: false });
            return;
        }

        setExpandedCircuit({ id: circuitId, details: [], loading: true });
        try {
            const detailsData = await getReport3_RaceDetailsByCircuit(circuitId);
            setExpandedCircuit({ id: circuitId, details: detailsData, loading: false });
        } catch (error) {
            console.error(`Erro ao buscar detalhes do circuito ${circuitId}`, error);
            setExpandedCircuit({ id: circuitId, details: [], loading: false });
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
                <FaRoad className="text-2xl text-orange-500" />
                <h3 className="text-lg font-bold text-gray-800">Relatório 3: Estatísticas de Corridas e Circuitos</h3>
            </div>

            {loading ? <p className="text-sm text-gray-500">Carregando dados...</p> : (
                <div className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-lg text-center">
                        <p className="text-md">Quantidade total de corridas cadastradas na base:</p>
                        <p className="text-4xl font-bold">{totalRaces}</p>
                    </div>

                    <h4 className="font-semibold pt-4 border-t">Estatísticas por Circuito (Clique para ver detalhes)</h4>
                    <div className="space-y-2">
                        {circuitStats.map(circuit => (
                            <div key={circuit.circuit_id} className="border rounded-lg bg-gray-50">
                                <button onClick={() => handleCircuitClick(circuit.circuit_id)} className="w-full text-left p-3 hover:bg-gray-100 flex justify-between items-center">
                                    <div>
                                        <p className="font-bold text-gray-800">{circuit.circuit_name}</p>
                                        <div className="text-xs text-gray-600 flex flex-wrap gap-x-4">
                                            <span>Corridas: <strong>{circuit.race_count}</strong></span>
                                            <span>Voltas (Min/Média/Max): <strong>{circuit.min_laps} / {circuit.avg_laps.toFixed(0)} / {circuit.max_laps}</strong></span>
                                        </div>
                                    </div>
                                    {expandedCircuit.id === circuit.circuit_id ? <FaChevronUp /> : <FaChevronDown />}
                                </button>

                                {expandedCircuit.id === circuit.circuit_id && (
                                    <div className="p-4 border-t bg-white">
                                        {expandedCircuit.loading ? <p className="text-sm text-gray-500">Buscando detalhes do circuito...</p> : (
                                            <ul className="list-disc pl-5 text-sm space-y-2 text-gray-700">
                                                {expandedCircuit.details.length > 0 ? expandedCircuit.details.map(race => (
                                                    <li key={`${race.race_year}-${race.race_name}`}>
                                                        <strong>{race.race_year}</strong> - {race.race_name}: {race.laps} voltas {race.winner_time ? `(Tempo: ${race.winner_time})` : ''}
                                                    </li>
                                                )) : <p>Nenhum detalhe de corrida encontrado para este circuito.</p>}
                                            </ul>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}