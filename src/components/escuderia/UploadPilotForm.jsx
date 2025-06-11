import React, { useState } from 'react';
import { uploadDriversFile } from '../../services/apiService';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FaUpload } from 'react-icons/fa';

export default function UploadPilotsForm() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState('');

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
        setFeedback('');
        setUploadStatus(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedFile) {
            setFeedback('Por favor, selecione um arquivo para enviar.');
            return;
        }
        setLoading(true);
        setFeedback('');
        setUploadStatus(null);
        try {
            const response = await uploadDriversFile(selectedFile);
            setUploadStatus(response);
            setFeedback('Arquivo processado com sucesso!');
        } catch (err) {
            console.error("Erro no upload de pilotos:", err);
            setFeedback(err.response?.data?.error || 'Erro ao processar o arquivo.');
        } finally {
            setLoading(false);
            setSelectedFile(null); // Limpa a seleção após o envio
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 h-full">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Inserir Novos Pilotos (via Arquivo)</h3>
            <p className="text-xs text-gray-500 mb-4">Envie um arquivo de texto (.txt ou .csv) com os dados dos pilotos, um por linha. Formato: `Driverref,Number,Code,Forename,Surname,DateOfBirth,Nationality,URL`</p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    type="file"
                    onChange={handleFileChange}
                    accept=".txt,.csv" // Aceita apenas arquivos de texto
                />
                <Button type="submit" disabled={loading || !selectedFile} className="w-full">
                    <FaUpload className="mr-2 h-4 w-4" />
                    {loading ? 'Processando...' : 'Enviar Arquivo'}
                </Button>
            </form>

            {feedback && <p className="text-sm mt-4">{feedback}</p>}

            {/* Área de Resumo do Upload */}
            {uploadStatus && (
                <div className="mt-4 p-4 border rounded-md bg-gray-50 text-sm space-y-2">
                    <h4 className="font-semibold mb-2">Resumo do Processamento:</h4>
                    <p className="text-green-600"><strong>{uploadStatus.insertedCount}</strong> pilotos inseridos com sucesso.</p>
                    <p className="text-orange-600"><strong>{uploadStatus.duplicateCount}</strong> pilotos já existiam (ignorados).</p>
                    {uploadStatus.duplicates.length > 0 && (
                        <ul className="text-xs list-disc pl-5 text-orange-500">
                            {uploadStatus.duplicates.map(d => <li key={d}>{d}</li>)}
                        </ul>
                    )}
                    <p className="text-red-600"><strong>{uploadStatus.errorCount}</strong> linhas com erro.</p>
                    {uploadStatus.errors.length > 0 && (
                        <ul className="text-xs list-disc pl-5 text-red-500">
                            {uploadStatus.errors.map(e => <li key={e}>{e}</li>)}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}