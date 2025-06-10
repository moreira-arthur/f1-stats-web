import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// IMPORTAÇÃO CORRIGIDA: Apontando para o arquivo de contexto correto.
import { useAuth } from '../context/auth-context.js';

import f1_logo from '../assets/f1_logo.png'; // Agora será usado.
import { Separator } from "@/components/ui/separator";
import LoginPageInput from '@/components/LoginPageInput';

export default function LoginPage() {
    const navigate = useNavigate(); // Agora será usado.
    const { login } = useAuth();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(username, password);
        } catch (err) {
            // AVISO CORRIGIDO: Registrando o erro real no console para depuração.
            console.error("Falha no login:", err);
            setError('Usuário ou senha inválidos.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex flex-col items-start h-screen w-screen' style={{ backgroundColor: '#f8f7ef' }}>
            {/* HEADER CORRIGIDO: Adicionando o header de volta para usar 'f1_logo' e 'navigate' */}
            <div className='flex flex-row items-center justify-start w-screen h-2/10 ' style={{ backgroundColor: 'rgb(21, 21, 30)' }} >
                <div className='flex flex-row items-center w-7/10 h-full'>
                    <div className='flex flex-col items-start justify-center h-fit w-2/10 ml-10 mr-10'>
                        <img
                            src={f1_logo}
                            className="cursor-pointer"
                            onClick={() => navigate("/")}
                            alt="F1 Logo"
                        />
                    </div>
                </div>
            </div>
            <div className='flex flex-row items-center justify-start w-screen h-1/10 ' style={{ backgroundColor: '#38383f' }} />

            {/* O resto do seu formulário... */}
            <div className='flex flex-col items-center justify-center w-full h-full' style={{ backgroundColor: '#f8f7ef' }}>
                <form onSubmit={handleSubmit} className='flex flex-col items-center justify-start w-4/10 h-full rounded-lg'>
                    <div className='flex flex-col items-start justify-center w-full h-1/5'>
                        <h1 className='text-3xl font-titillium text-center'>SIGN IN</h1>
                    </div>
                    <Separator className='w-full h-1 bg-gray-300 mb-' />
                    <div className='flex flex-col items-center justify-start w-full h-full mt-5'>
                        <LoginPageInput
                            label='Username'
                            type='text'
                            placeholder='Digite seu usuário'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <LoginPageInput
                            label='Password'
                            type='password'
                            placeholder='Digite sua senha'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error && <p className="text-red-500 mt-2">{error}</p>}
                        <div className='w-full h-full'>
                            <button
                                type='submit'
                                disabled={loading}
                                className='text-white bg-red-600 font-titillium rounded w-2/10 h-1/9 mt-6 flex items-center border-2 border-transparent justify-center text-xs cursor-pointer hover:bg-white hover:text-red-600 hover:border-red-600 transition-colors duration-200'
                            >
                                {loading ? 'Entrando...' : 'SIGN IN'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}