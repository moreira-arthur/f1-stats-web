import React from 'react';
import { useNavigate } from 'react-router-dom';
import ConstructorForm from '../components/admin/ConstructorForm';
import DriverForm from '../components/admin/DriverForm';

export default function AdminActionsPage() {
    const navigate = useNavigate();

    return (
        <div className="bg-gray-50 min-h-screen p-4 sm:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Painel de Cadastro</h1>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="px-4 py-2 text-sm font-bold text-white bg-gray-600 rounded hover:bg-gray-700 transition-colors"
                    >
                        Voltar ao Dashboard
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <ConstructorForm />
                    <DriverForm />
                </div>
            </div>
        </div>
    );
}