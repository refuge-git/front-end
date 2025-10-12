import axios from "axios";

// Permite configurar hosts via variáveis de ambiente do Vite
// Use VITE_ROOT_HOST e VITE_API_HOST se quiser sobrescrever em desenvolvimento/produção
const ROOT_HOST = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_ROOT_HOST
  ? import.meta.env.VITE_ROOT_HOST
  : 'http://localhost:8080';

const API_HOST = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_HOST
  ? import.meta.env.VITE_API_HOST
  : 'http://localhost:3001';

// Instância principal apontando para a raiz (mantida como default)
const api = axios.create({
  baseURL: ROOT_HOST
});

// Segunda instância para rotas montadas em /api (exportada como named export)
const apiPrefix = axios.create({
  baseURL: `${API_HOST}/api`
});

// Função utilitária para anexar o interceptor de autenticação em uma instância
function attachAuthInterceptor(instance) {
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
}

attachAuthInterceptor(api);
attachAuthInterceptor(apiPrefix);

export { apiPrefix };
export default api;
