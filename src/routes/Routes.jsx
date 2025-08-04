import { Routes, Route } from 'react-router-dom';
import  Cadastro  from '../pages/Cadastro';
import  Login  from '../pages/Login'; // Ou LoginPage, se esse for o nome
import  RegistroAtividade  from '../pages/Registro-atividade';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/registro-atividade" element={<RegistroAtividade />} />
        </Routes>
    );
}
