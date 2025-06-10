import { createContext, useContext } from 'react';

// 1. Cria e exporta o contexto.
export const AuthContext = createContext(null);

// 2. Cria e exporta o hook que consome o contexto.
// Este arquivo agora só exporta lógica, nenhum componente, o que satisfaz o Vite.
export const useAuth = () => {
    return useContext(AuthContext);
};