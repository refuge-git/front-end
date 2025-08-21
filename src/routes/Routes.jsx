import { Routes, Route } from 'react-router-dom';
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

export default function AppRoutes() { 
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/registro-atividade" element={<RegistroAtividade />} />
            <Route path="/registro-nova-atividade" element={<RegistroNovaAtividade />} />
            <Route path="/registro-endereco" element={<RegistroEndereco />} />
            <Route path="/registro-cadastro" element={<RegistroCadastro />} /> 
            <Route path="/condicoes-saude" element={<CondicoesSaude />} />
            <Route path="/home" element={<Home />} />
            <Route path="/prontuario" element={<Prontuario />} />
            <Route path="/endereco" element={<Endereco />} />
            <Route path="/condicoes-saude-teste" element={<CondicoesSaudeTeste />} />
        </Routes>
    );
}
