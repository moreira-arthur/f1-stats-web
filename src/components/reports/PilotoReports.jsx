import React from 'react';

import PilotoReport6 from './piloto/PilotoReport6';
import PilotoReport7 from './piloto/PilotoReport7';

export default function PilotoReports({ user }) {
    const pilotId = user.idOriginal;

    return (
        <div className="space-y-8">
            <PilotoReport6 pilotId={pilotId} />
            <PilotoReport7 pilotId={pilotId} />
        </div>
    );
}