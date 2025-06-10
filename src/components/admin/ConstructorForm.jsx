import React, { useState } from 'react';
import { createConstructor } from '../../services/apiService';
import { Button } from '../ui/button';

export default function ConstructorForm() {
    const [formData, setFormData] = useState({ constructorRef: '', name: '', nationality: '', url: '' });
    const [feedback, setFeedback] = useState({ type: '', message: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFeedback({ type: '', message: '' });
        try {
            const response = await createConstructor(formData);
            setFeedback({ type: 'success', message: response.message });
            setFormData({ constructorRef: '', name: '', nationality: '', url: '' }); // Limpa o formulário
        } catch (error) {
            setFeedback({ type: 'error', message: error.response?.data?.message || 'Erro ao cadastrar escuderia.' });
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Cadastrar Nova Escuderia</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input name="constructorRef" value={formData.constructorRef} onChange={handleChange} placeholder="Referência (ex: red_bull)" required className="w-full p-2 border rounded" />
                <input name="name" value={formData.name} onChange={handleChange} placeholder="Nome (ex: Red Bull)" required className="w-full p-2 border rounded" />
                <input name="nationality" value={formData.nationality} onChange={handleChange} placeholder="Nacionalidade" required className="w-full p-2 border rounded" />
                <input type="url" name="url" value={formData.url} onChange={handleChange} placeholder="URL (ex: http://en.wikipedia.org/wiki/Red_Bull_Racing)" required className="w-full p-2 border rounded" />
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                    Cadastrar Escuderia
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