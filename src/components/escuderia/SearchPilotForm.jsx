import React, { useState } from 'react';
import { searchDriverForEscuderia } from '../../services/apiService';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FaSearch } from 'react-icons/fa';

// Recebemos o nome da construtora como prop para usar na busca
export default function SearchPilotForm({ constructorName }) {
    const [forename, setForename] = useState('');
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!forename) {
            setFeedback('Por favor, digite um nome para buscar.');
            return;
        }
        setLoading(true);
        setFeedback('');
        setResults(null);
        try {
            const data = await searchDriverForEscuderia(forename, constructorName);
            setResults(data);
            if (data.length === 0) {
                setFeedback('Nenhum piloto encontrado com este nome que já tenha corrido pela sua escuderia.');
            }
        } catch (err) {
            console.error("Erro na busca de piloto:", err);
            setResults([]); // Limpa resultados em caso de erro
            setFeedback(err.response?.data?.error || 'Erro ao realizar a busca.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 h-full">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Consultar Histórico de Piloto</h3>
            <form onSubmit={handleSearch} className="flex items-center space-x-2 mb-4">
                <Input
                    type="text"
                    value={forename}
                    onChange={(e) => setForename(e.target.value)}
                    placeholder="Primeiro nome do piloto"
                    className="flex-grow"
                />
                <Button type="submit" disabled={loading}>
                    <FaSearch className="mr-2 h-4 w-4" />
                    {loading ? 'Buscando...' : 'Buscar'}
                </Button>
            </form>

            {/* Área de Resultados */}
            <div className="mt-4 space-y-2">
                {feedback && <p className="text-sm text-gray-600">{feedback}</p>}
                {results && results.length > 0 && (
                    <div className="border rounded-md p-2 bg-gray-50">
                        <h4 className="font-semibold text-sm mb-2">Resultados Encontrados:</h4>
                        <ul className="divide-y divide-gray-200">
                            {results.map(pilot => (
                                <li key={pilot.nome_completo} className="py-2">
                                    <p className="font-bold text-gray-800">{pilot.nome_completo}</p>
                                    <p className="text-xs text-gray-500">
                                        Nascimento: {new Date(pilot.data_nascimento).toLocaleDateString('pt-BR')} | Nacionalidade: {pilot.nacionalidade}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}