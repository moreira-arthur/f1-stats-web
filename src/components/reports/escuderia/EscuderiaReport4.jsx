import React, { useState, useEffect } from 'react';
import { getReport4_ConstructorPilotWins } from '../../../services/apiService';
import { FaTrophy } from 'react-icons/fa';

export default function EscuderiaReport4({ constructorId }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!constructorId) return;

        getReport4_ConstructorPilotWins(constructorId)
            .then(apiData => {
                // Ordena os pilotos pela quantidade de vitórias (do maior para o menor)
                const sortedData = apiData.sort((a, b) => b.win_count - a.win_count);
                setData(sortedData);
            })
            .catch(err => console.error("Erro ao buscar relatório de vitórias por piloto:", err))
            .finally(() => setLoading(false));
    }, [constructorId]);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
                <FaTrophy className="text-2xl text-yellow-500" />
                <h3 className="text-lg font-bold text-gray-800">Relatório 4: Vitórias por Piloto na Equipe</h3>
            </div>

            {loading ? <p className="text-sm text-gray-500">Carregando dados...</p> : (
                <div className="max-h-[400px] overflow-y-auto border rounded-md">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-gray-100 sticky top-0">
                            <tr>
                                <th className="p-3 font-semibold text-gray-600 w-12">Pos.</th>
                                <th className="p-3 font-semibold text-gray-600">Nome do Piloto</th>
                                <th className="p-3 text-right font-semibold text-gray-600">Nº de Vitórias</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {data.length > 0 ? data.map((item, index) => (
                                <tr key={item.pilot_full_name} className="hover:bg-gray-50">
                                    <td className="p-3 text-center">{index + 1}</td>
                                    <td className="p-3 font-medium text-gray-800">{item.pilot_full_name}</td>
                                    <td className="p-3 text-right font-mono font-bold text-lg text-gray-900">{item.win_count}</td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="3" className="p-4 text-center text-gray-500">Nenhum piloto com vitórias encontrado para esta escuderia.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}