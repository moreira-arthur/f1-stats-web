import React, { useState, useEffect } from 'react';
import { getReport7_DriverStatusCount } from '../../../services/apiService';
import { FaClipboardList } from 'react-icons/fa';

export default function PilotoReport7({ pilotId }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!pilotId) return;

        getReport7_DriverStatusCount(pilotId)
            .then(apiData => {
                const sortedData = apiData.sort((a, b) => b.total_results - a.total_results);
                setData(sortedData);
            })
            .catch(err => console.error("Erro ao buscar relatório de status do piloto:", err))
            .finally(() => setLoading(false));
    }, [pilotId]);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
                <FaClipboardList className="text-2xl text-teal-600" />
                <h3 className="text-lg font-bold text-gray-800">Relatório 7: Seus Status de Finalização</h3>
            </div>

            {loading ? <p className="text-sm text-gray-500">Carregando dados...</p> : (
                <div className="max-h-[400px] overflow-y-auto border rounded-md">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-gray-100 sticky top-0">
                            <tr>
                                <th className="p-3 font-semibold text-gray-600">Status</th>
                                <th className="p-3 text-right font-semibold text-gray-600">Contagem</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {data.length > 0 ? data.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="p-3 text-gray-700">{item.status_description}</td>
                                    <td className="p-3 text-right font-mono font-bold">{item.total_results.toLocaleString('pt-BR')}</td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="2" className="p-4 text-center text-gray-500">Nenhum status encontrado.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}