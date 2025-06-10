import React from 'react';

// Importe os componentes de relatório que criamos
import EscuderiaReport4 from './escuderia/EscuderiaReport4';
import EscuderiaReport5 from './escuderia/EscuderiaReport5';

export default function EscuderiaReports({ user }) {
    // O idOriginal do usuário escuderia é o constructorId
    const constructorId = user.idOriginal;

    return (
        <div className="space-y-8">
            <EscuderiaReport4 constructorId={constructorId} />
            <EscuderiaReport5 constructorId={constructorId} />
        </div>
    );
}