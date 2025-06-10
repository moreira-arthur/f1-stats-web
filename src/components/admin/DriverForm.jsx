import React, { useState } from 'react';
// Importe a versão corrigida do seu serviço
import { createDriver } from '../../services/apiService';
import { Button } from '@/components/ui/button';

export default function DriverForm() {
    const initialState = { driverRef: '', number: '', code: '', forename: '', surname: '', dob: '', nationality: '' };
    const [formData, setFormData] = useState(initialState);
    const [feedback, setFeedback] = useState({ type: '', message: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // --- A FUNÇÃO handleSubmit AGORA É MUITO MAIS SIMPLES ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFeedback({ type: '', message: '' });

        try {
            // Apenas passamos o 'formData' diretamente.
            // O apiService vai cuidar da transformação.
            const response = await createDriver(formData);

            setFeedback({ type: 'success', message: response.message });
            setFormData(initialState); // Limpa o formulário
        } catch (error) {
            // A mensagem de erro da API agora deve ser mais específica
            const apiError = error.response?.data?.errors?.[0]?.message || error.response?.data?.message || 'Erro ao cadastrar piloto.';
            setFeedback({ type: 'error', message: apiError });
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Cadastrar Novo Piloto</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input name="driverRef" value={formData.driverRef} onChange={handleChange} placeholder="Referência (ex: alonso)" required className="w-full p-2 border rounded" />
                    <input name="forename" value={formData.forename} onChange={handleChange} placeholder="Primeiro Nome" required className="w-full p-2 border rounded" />
                    <input name="surname" value={formData.surname} onChange={handleChange} placeholder="Sobrenome" required className="w-full p-2 border rounded" />
                    <input name="nationality" value={formData.nationality} onChange={handleChange} placeholder="Nacionalidade" required className="w-full p-2 border rounded" />
                    <input type="number" name="number" value={formData.number} onChange={handleChange} placeholder="Número do Carro (opcional)" className="w-full p-2 border rounded" />
                    <input name="code" value={formData.code} onChange={handleChange} placeholder="Código 3 letras (opcional)" maxLength="3" className="w-full p-2 border rounded" />
                    <div>
                        <label className="text-sm text-gray-500">Data de Nascimento</label>
                        <input type="date" name="dob" value={formData.dob} onChange={handleChange} required className="w-full p-2 border rounded" />
                    </div>
                </div>
                <Button type="submit" className="w-full">
                    Cadastrar Piloto
                </Button>
                {feedback.message && (
                    <p className={`mt-2 text-sm ${feedback.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                        {feedback.message}
                    </p>
                )}
            </form>
        </div>
    );
}