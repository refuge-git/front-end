import { Routes, Route, Navigate } from 'react-router-dom';
import  Cadastro  from '../pages/Cadastro';
import  Login  from '../pages/Login';
import  RegistroAtividade  from '../pages/Registro-atividade';
import  RegistroNovaAtividade  from '../pages/Registro-nova-atividade';
import RegistroEndereco from '../pages/Registro-endereco';
import RegistroCadastro from '../pages/Registro-beneficiario'; 
import CondicoesSaude from '../pages/CondicoesSaudeForm'; 
import Home from '../pages/Home';
import Prontuario from '../pages/Prontuario';
import Endereco from '../pages/Endereco';
import CondicoesSaudeTeste from '../pages/CondSaude';

function ProtectedRoute({ children }) {
    const isAuthenticated = !!localStorage.getItem('token');
    return isAuthenticated ? children : <Navigate to="/" replace />;
}

export default function AppRoutes() { 
        return (
                <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/cadastro" element={<Cadastro />} />
                        <Route path="/registro-atividade" element={
                            <ProtectedRoute><RegistroAtividade /></ProtectedRoute>
                        } />
                        <Route path="/registro-nova-atividade" element={
                            <ProtectedRoute><RegistroNovaAtividade /></ProtectedRoute>
                        } />
                        <Route path="/registro-endereco" element={
                            <ProtectedRoute><RegistroEndereco /></ProtectedRoute>
                        } />
                        <Route path="/registro-cadastro" element={
                            <ProtectedRoute><RegistroCadastro /></ProtectedRoute>
                        } />
                        <Route path="/condicoes-saude" element={
                            <ProtectedRoute><CondicoesSaude /></ProtectedRoute>
                        } />
                        <Route path="/home" element={
                            <ProtectedRoute><Home /></ProtectedRoute>
                        } />
                        <Route path="/prontuario" element={
                            <ProtectedRoute><Prontuario /></ProtectedRoute>
                        } />
                        <Route path="/endereco" element={
                            <ProtectedRoute><Endereco /></ProtectedRoute>
                        } />
                        <Route path="/condicoes-saude-teste" element={
                            <ProtectedRoute><CondicoesSaudeTeste /></ProtectedRoute>
                        } />
                </Routes>
        );
}
