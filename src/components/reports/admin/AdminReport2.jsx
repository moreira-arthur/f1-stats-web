import React, { useState } from 'react';
import { getReport2_AirportsNearCity } from '../../../services/apiService';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FaPlaneDeparture, FaSearch } from 'react-icons/fa'; // Ícones

export default function AdminReport2() {
    const [cityName, setCityName] = useState('');
    const [results, setResults] = useState(null); // Iniciar com null para saber o estado inicial
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!cityName) {
            setError('Por favor, digite o nome de uma cidade.');
            return;
        }
        setLoading(true);
        setError('');
        setResults(null);
        try {
            const data = await getReport2_AirportsNearCity(cityName);
            setResults(data);
            if (data.length === 0) {
                setError('Nenhum aeroporto encontrado para esta cidade.');
            }
        } catch (err) {
            // CORREÇÃO: Usando a variável 'err' para logging
            console.error("Erro na busca de aeroportos:", err);
            setError(err.response?.data?.error || 'Erro na busca. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
                <FaPlaneDeparture className="text-2xl text-green-600" />
                <h3 className="text-lg font-bold text-gray-800">Relatório 2: Aeroportos Próximos</h3>
            </div>

            <form onSubmit={handleSearch} className="flex items-center space-x-2 mb-4">
                <Input
                    type="text"
                    value={cityName}
                    onChange={(e) => setCityName(e.target.value)}
                    placeholder="Digite o nome da cidade (ex: Sao Paulo)"
                    className="flex-grow"
                />
                <Button type="submit" disabled={loading}>
                    <FaSearch className="mr-2 h-4 w-4" />
                    {loading ? 'Buscando...' : 'Buscar'}
                </Button>
            </form>

            {error && <p className="text-sm text-red-500 mt-2">{error}</p>}

            {/* A tabela só aparece se results for um array com itens */}
            {results && results.length > 0 && (
                <div className="overflow-x-auto mt-4 border rounded-md">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-3 font-semibold text-gray-600">Cidade Pesquisada</th>
                                <th className="p-3 font-semibold text-gray-600">Aeroporto (IATA)</th>
                                <th className="p-3 font-semibold text-gray-600">Município</th>
                                <th className="p-3 text-right font-semibold text-gray-600">Distância (Km)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {results.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="p-3 text-gray-700">{item.city_name}</td>
                                    <td className="p-3 text-gray-800"><strong>{item.airport_iata_code}</strong> - {item.airport_name}</td>
                                    <td className="p-3 text-gray-700">{item.airport_municipality}</td>
                                    <td className="p-3 text-right font-mono font-bold">{item.distance_km.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}