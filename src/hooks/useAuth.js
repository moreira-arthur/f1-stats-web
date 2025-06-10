import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider'; // Importe o contexto do outro arquivo

// Este arquivo exporta APENAS o hook.
export const useAuth = () => {
    return useContext(AuthContext);
};