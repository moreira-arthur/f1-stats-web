import axios from 'axios';

// 1. Crie uma instância do Axios com a URL base da sua API
const apiClient = axios.create({
    baseURL: 'http://localhost:3333',
});

// 2. Interceptor para Adicionar o Token JWT
// Isso é MÁGICO! Ele intercepta TODA requisição feita pelo 'apiClient'
// e adiciona o header de autorização se um token existir.
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken'); // Pegamos o token do localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// ===================================================================
//                        AUTENTICAÇÃO
// ===================================================================

export const loginUser = async (user, password) => {
    // A rota de login não precisa do token, ela o cria.
    const response = await axios.post('http://localhost:3333/login', { user, password });
    return response.data; // Retorna { message, token }
};

export const logoutUser = () => {
    // A rota de logout precisa do token, que o interceptor vai adicionar
    return apiClient.post('/logout');
};


// ===================================================================
//                        AÇÕES (Admin e Escuderia)
// ===================================================================

// --- Admin ---
export const createConstructor = (constructorData) => {
    // POST /constructor
    return apiClient.post('/constructor', constructorData).then(res => res.data);
};

// src/services/apiService.js

// ... (outras importações e funções)

export const createDriver = (driverData) => {
    // 1. Cria uma cópia dos dados recebidos do formulário.
    const payload = { ...driverData };

    // 2. Converte o campo 'number' para um número inteiro ou null.
    payload.number = driverData.number ? parseInt(driverData.number, 10) : null;
    
    // 3. Renomeia 'dob' para 'dateOfBirth', como a API espera.
    payload.dateOfBirth = driverData.dob;
    delete payload.dob; // Apaga a chave antiga.

    // 4. Envia o payload JÁ CORRIGIDO para a API.
    return apiClient.post('/driver', payload).then(res => res.data);
};

// ... (resto do arquivo)

// --- Escuderia ---

// --- Ações e Detalhes da Escuderia ---
export const getConstructorDetailsById = (constructorId) => {
    return apiClient.get(`/constructor/${constructorId}/details`).then(res => res.data);
};

export const searchDriverForEscuderia = (forename, constructorName) => {
    // GET /driver/search?forename=...&constructorName=...
    return apiClient.get(`/driver/search`, { params: { forename, constructorName } }).then(res => res.data);
};

export const uploadDriversFile = (file) => {
    // POST /driver/upload-stream
    const formData = new FormData();
    formData.append('file', file); // A API espera um campo chamado 'file'
    return apiClient.post('/driver/upload-stream', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }).then(res => res.data);
};

// ===================================================================
//                        DASHBOARDS
// ===================================================================

// --- Admin Dashboard ---
// Note que agora são 4 funções separadas, como na sua API
export const getAdminTotals = () => apiClient.get('/dashboard/admin/totals').then(res => res.data);
export const getAdminRacesByYear = (year) => apiClient.get(`/dashboard/admin/races/${year}`).then(res => res.data);
export const getAdminConstructorStandings = (year) => apiClient.get(`/dashboard/admin/standings/constructor/${year}`).then(res => res.data);
export const getAdminDriverStandings = (year) => apiClient.get(`/dashboard/admin/standings/driver/${year}`).then(res => res.data);

// --- Escuderia Dashboard ---
export const getConstructorDashboardData = (constructorId) => {
    return apiClient.get(`/dashboard/constructor/${constructorId}`).then(res => res.data);
};

// --- Piloto Dashboard ---
// Também são várias funções para compor o dashboard
export const getDriverDetailsById = (driverId) => {
    return apiClient.get(`/driver/${driverId}/details`).then(res => res.data);
};
export const getDriverActiveYears = (driverId) => apiClient.get(`/dashboard/driver/${driverId}/active-years`).then(res => res.data);
export const getDriverCareerTotals = (driverId) => apiClient.get(`/dashboard/driver/${driverId}/career-totals`).then(res => res.data);
export const getDriverAnnualStats = (driverId) => apiClient.get(`/dashboard/driver/${driverId}/annual-stats`).then(res => res.data);
export const getDriverCircuitResume = (driverId) => apiClient.get(`/dashboard/driver/${driverId}/circuit-resume`).then(res => res.data);


// ===================================================================
//                        RELATÓRIOS
// ===================================================================
// Mapeamento 1 para 1 das suas rotas de relatório

// --- Relatórios do Admin ---
export const getReport1_ResultsByStatus = () => apiClient.get('/reports/results-by-status').then(res => res.data);
export const getReport2_AirportsNearCity = (cityName) => apiClient.get(`/reports/airports-near/${cityName}`).then(res => res.data);
// O Relatório 3 é composto por 3 chamadas
export const getReport3_ConstructorPilotCount = () => apiClient.get('/reports/constructors-pilot-count').then(res => res.data);
export const getReport3_TotalRaceCount = () => apiClient.get('/reports/total-races').then(res => res.data);
export const getReport3_CircuitRaceStats = () => apiClient.get('/reports/circuit-race-stats').then(res => res.data);
export const getReport3_RaceDetailsByCircuit = (circuitId) => apiClient.get(`/reports/circuits/${circuitId}/races`).then(res => res.data);

// --- Relatórios da Escuderia ---
export const getReport4_ConstructorPilotWins = (constructorId) => apiClient.get(`/reports/constructors/${constructorId}/pilot-wins`).then(res => res.data);
export const getReport5_ConstructorStatusCount = (constructorId) => apiClient.get(`/reports/constructors/${constructorId}/status-count`).then(res => res.data);

// --- Relatórios do Piloto ---
export const getReport6_DriverPointsByRace = (driverId) => apiClient.get(`/reports/drivers/${driverId}/points-by-race`).then(res => res.data);
export const getReport7_DriverStatusCount = (driverId) => apiClient.get(`/reports/drivers/${driverId}/status-count`).then(res => res.data);