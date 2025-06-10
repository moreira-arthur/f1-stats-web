import React from 'react';

// Importe os componentes de relatório que criaremos a seguir
import AdminReport1 from './admin/AdminReport1';
import AdminReport2 from './admin/AdminReport2';
import AdminReport3 from './admin/AdminReport3';

export default function AdminReports() {
    return (
        <div className="space-y-8">
            <AdminReport1 />
            <AdminReport2 />
            <AdminReport3 />
        </div>
    );
}