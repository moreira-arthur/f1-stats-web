import React, { useState, useEffect } from 'react';
import { getReport1_ResultsByStatus } from '../../../services/apiService';
import { FaClipboardList } from 'react-icons/fa'; // Ícone para o cabeçalho

export default function AdminReport1() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getReport1_ResultsByStatus()
            .then(setData)
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
                <FaClipboardList className="text-2xl text-indigo-600" />
                <h3 className="text-lg font-bold text-gray-800">Relatório 1: Contagem de Resultados por Status</h3>
            </div>

            {loading ? <p className="text-sm text-gray-500">Carregando dados...</p> : (
                // Container com altura máxima e scroll
                <div className="max-h-[300px] overflow-y-auto border rounded-md">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-gray-100 sticky top-0">
                            <tr>
                                <th className="p-3 font-semibold text-gray-600">Status</th>
                                <th className="p-3 text-right font-semibold text-gray-600">Contagem Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {data.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="p-3 text-gray-700">{item.status_description}</td>
                                    <td className="p-3 text-right font-mono font-bold text-gray-800">{item.total_results.toLocaleString('pt-BR')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}