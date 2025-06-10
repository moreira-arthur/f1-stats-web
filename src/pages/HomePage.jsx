import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// Ícones para a seção de funcionalidades
import { FaUserCog, FaCar, FaUserAstronaut } from 'react-icons/fa';
import { GoChevronDown } from "react-icons/go";

// Seus assets
import f1_live_hero from '../assets/f1-live-hero.avif';
import F1_75_Logo from '../assets/F1_75_Logo.png';

// Um componente local para os cards de funcionalidades para manter o código limpo
const FeatureCard = ({ icon, title, description, features }) => (
    <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
        <div className="flex items-center space-x-4 mb-4">
            <div className="text-3xl text-primary">{icon}</div>
            <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        </div>
        <p className="text-gray-600 mb-4">{description}</p>
        <ul className="space-y-2 text-sm list-disc list-inside">
            {features.map((feature, index) => <li key={index}>{feature}</li>)}
        </ul>
    </div>
);

export default function HomePage() {
    const navigate = useNavigate();

    return (
        <div className="bg-background font-titillium">
            {/* Header Minimalista e Fixo */}
            <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 bg-transparent">
                <img src={F1_75_Logo} alt="F1 Logo" className="h-8 w-auto" />
                <Button variant="outline" className="bg-white/20 backdrop-blur-sm border-white/50 text-white hover:bg-white hover:text-primary" onClick={() => navigate('/login')}>
                    Login
                </Button>
            </header>

            {/* Seção Hero */}
            <section
                className="relative h-screen flex flex-col items-center justify-center text-center text-white p-4"
                style={{ backgroundImage: `url(${f1_live_hero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
                {/* Filtro escuro para legibilidade */}
                <div className="absolute inset-0 bg-black/60 z-0"></div>

                {/* Conteúdo da Hero */}
                <div className="relative z-10 flex flex-col items-center">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight">F1 Stats Platform</h1>
                    <p className="mt-4 max-w-2xl text-lg md:text-xl text-gray-200">
                        Sua central definitiva para análise de dados e gerenciamento no universo da Fórmula 1. Explore estatísticas, gerencie equipes e acompanhe o desempenho como nunca antes.
                    </p>
                    <Button size="lg" className="mt-8" onClick={() => navigate('/login')}>
                        Acessar Plataforma
                        <span className="ml-2">→</span>
                    </Button>
                </div>

                {/* Ícone para indicar que há mais conteúdo abaixo */}
                <div className="absolute bottom-10 z-10 animate-bounce">
                    <GoChevronDown size={32} />
                </div>
            </section>

            {/* Seção de Funcionalidades */}
            <section className="py-20 bg-gray-100">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900">Uma Plataforma, Múltiplas Visões</h2>
                        <p className="text-gray-600 mt-2">Cada tipo de usuário tem acesso a ferramentas e dados específicos para suas necessidades.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<FaUserCog />}
                            title="Visão do Administrador"
                            description="Controle total sobre a base de dados e o sistema."
                            features={[
                                "Cadastrar novas escuderias e pilotos.",
                                "Visualizar dashboards com estatísticas globais.",
                                "Gerar relatórios completos sobre corridas e status."
                            ]}
                        />
                        <FeatureCard
                            icon={<FaCar />}
                            title="Visão da Escuderia"
                            description="Ferramentas para gerenciar e analisar o desempenho da sua equipe."
                            features={[
                                "Dashboard com vitórias, contagem de pilotos e anos de atividade.",
                                "Consultar o histórico de pilotos que correram pela equipe.",
                                "Inserir múltiplos pilotos via upload de arquivo.",
                                "Relatórios de vitórias e status de finalização da equipe."
                            ]}
                        />
                        <FeatureCard
                            icon={<FaUserAstronaut />}
                            title="Visão do Piloto"
                            description="Acesso exclusivo às suas estatísticas de carreira."
                            features={[
                                "Dashboard com resumo de desempenho anual e por circuito.",
                                "Relatório detalhado de pontos por corrida em cada ano.",
                                "Análise de todos os seus status de finalização em corridas."
                            ]}
                        />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 text-white text-center p-4">
                <p>&copy; {new Date().getFullYear()} F1 Stats Platform. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
}