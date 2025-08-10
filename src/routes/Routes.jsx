import { Routes, Route } from 'react-router-dom';
import  Cadastro  from '../pages/Cadastro';
import  Login  from '../pages/Login'; // Ou LoginPage, se esse for o nome
import  RegistroAtividade  from '../pages/Registro-atividade';
import  RegistroNovaAtividade  from '../pages/Registro-nova-atividade';
import RegistroEndereco from '../pages/Registro-endereco';
import FormsRegistro from '../pages/FormsRegistro'; // Importando o novo componente

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/registro-atividade" element={<RegistroAtividade />} />
            <Route path="/registro-nova-atividade" element={<RegistroNovaAtividade />} />
            <Route path="/registro-endereco" element={<RegistroEndereco />} />
            <Route path="/forms-registro" element={<FormsRegistro />} /> {/* Rota para o novo componente */}
        </Routes>
    );
}
