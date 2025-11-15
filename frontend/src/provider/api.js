import axios from "axios";

// Permite configurar hosts via variáveis de ambiente do Vite
// Use VITE_ROOT_HOST e VITE_API_HOST se quiser sobrescrever em desenvolvimento/produção

const ROOT_HOST = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_ROOT_HOST
  ? import.meta.env.VITE_ROOT_HOST
  : 'http://alb-principal-1783223917.us-east-1.elb.amazonaws.com';

// const ROOT_HOST = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_ROOT_HOST
//  ? import.meta.env.VITE_ROOT_HOST
//  : 'http://localhost:8080';

const API_HOST = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_HOST
  ? import.meta.env.VITE_API_HOST
  : 'http://localhost:3001';

// Instância principal apontando para a raiz (mantida como default)
const api = axios.create({
  baseURL: ROOT_HOST,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json; charset=UTF-8',
  }
});

// Segunda instância para rotas montadas em /api (exportada como named export)
const apiPrefix = axios.create({
  baseURL: `${API_HOST}/api`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json; charset=UTF-8',
  }
});

// Função utilitária para anexar o interceptor de autenticação em uma instância
function attachAuthInterceptor(instance) {
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      // Garantir charset UTF-8 em todas as requisições
      config.headers['Content-Type'] = 'application/json; charset=UTF-8';
      config.headers['Accept'] = 'application/json; charset=UTF-8';
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Interceptor de resposta para garantir UTF-8
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => Promise.reject(error)
  );
}

attachAuthInterceptor(api);
attachAuthInterceptor(apiPrefix);

export { apiPrefix };
export default api;
