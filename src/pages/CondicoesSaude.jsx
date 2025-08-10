import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/App.css';
import '../css/CondicoesSaude.css';
import SidebarCondicoes from '../components/SidebarCondicoes';
import ListaCondicoesSaude from '../components/ListaCondicoesSaude';
import CondicaoSaudeForm from '../components/CondicaoSaudeForm';

export default function CondicoesSaude() {
  const [categorias, setCategorias] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    axios.get('http://localhost:8080/categorias', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => setCategorias(res.data))
      .catch(() => setCategorias([]));
  }, []);
  const [activeSection, setActiveSection] = useState('condicao-saude');
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  // Dados mockados de condições de saúde existentes
  const [condicoesSaude, setCondicoesSaude] = useState([
    {
      id: 1,
      diagnostico: 'Diabetes Tipo 2',
      tratamento: 'Administração de insulina diária e dieta controlada',
      dataDiagnostico: '2023-01-15',
      descricao: 'Diabetes mellitus tipo 2 diagnosticada em consulta de rotina',
      observacao: 'Paciente responde bem ao tratamento atual',
      criadoEm: '2023-01-15T08:30:00',
      atualizadoEm: '2024-01-10T14:20:00'
    }
  ]);

  const handleClose = () => {
    navigate('/cadastro');
  };

  const handleMaisDetalhes = (condicaoId) => {
    // Aqui você pode implementar a lógica para mostrar mais detalhes
    console.log('Mostrar detalhes da condição:', condicaoId);
  };

  const handleAdicionarNova = () => {
    setShowForm(true);
  };

  const handleVoltarLista = () => {
    setShowForm(false);
  };

  const handleSalvarCondicao = (condicaoData) => {
    // Adicionar nova condição à lista
    const agora = new Date().toISOString();
    const novaCondicao = {
      id: condicoesSaude.length + 1,
      ...condicaoData,
      criadoEm: agora,
      atualizadoEm: agora
    };
    
    setCondicoesSaude([...condicoesSaude, novaCondicao]);
    setShowForm(false); // Voltar para a lista após salvar
    
    console.log('Condição salva:', novaCondicao);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'prontuario':
        return (
          <div>
            <h2>Prontuário</h2>
            <p>Informações do prontuário médico...</p>
          </div>
        );
      case 'endereco':
        return (
          <div>
            <h2>Endereço</h2>
            <p>Informações de endereço...</p>
          </div>
        );
      case 'condicao-saude':
        return (
          <div>
            <h2>Condição de Saúde <span className="opcional">(Opcional)</span></h2>
            {showForm ? (
              <CondicaoSaudeForm 
                onSalvar={handleSalvarCondicao}
                onVoltar={handleVoltarLista}
              />
            ) : (
              <ListaCondicoesSaude 
                condicoes={condicoesSaude}
                onMaisDetalhes={handleMaisDetalhes}
                onAdicionarNova={handleAdicionarNova}
              />
            )}
          </div>
        );
      default:
        return (
          <div>
            <h2>Selecione uma seção</h2>
          </div>
        );
    }
  };

  return (
    <div className="condicoes-saude-container">
      <div className="condicoes-saude-box">
        <button className="close-button" onClick={handleClose}>
          ✕
        </button>
        <SidebarCondicoes 
          activeSection={activeSection} 
          onSectionChange={setActiveSection} 
        />
        <div className="condicoes-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}