import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/App.css';
import SidebarCondicoes from '../components/SideBarCondicoes';
import ListaCondicoesSaude from '../components/ListaCondicoesSaude';
import CondicaoSaudeForm from '../components/CondicaoSaudeForm';
import api from '../provider/api';

export default function CondicoesSaude() {
  const [categorias, setCategorias] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    api.get('/categorias', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => setCategorias(res.data))
      .catch(() => setCategorias([]));
  }, []);
  const [activeSection, setActiveSection] = useState('condicao-saude');
  // Estado para condições de saúde do morador de rua id 1
  const [condicoesSaude, setCondicoesSaude] = useState([]);
  // showForm: true se não houver condições, false se houver pelo menos uma
  const [showForm, setShowForm] = useState(false);

  // Buscar condições de saúde do backend ao carregar
  useEffect(() => {
    const fetchCondicoes = async () => {
      try {
        const response = await api.get('/condicoes-saude/beneficiario/1');
  // Garante que condicoesSaude seja sempre um array
  const data = Array.isArray(response.data) ? response.data : (response.data ? [response.data] : []);
  setCondicoesSaude(data);
  setShowForm(data.length === 0);
      } catch (error) {
        setCondicoesSaude([]);
        setShowForm(true);
      }
    };
    fetchCondicoes();
  }, []);

  const navigate = useNavigate();

  // ...mock já movido acima...

  const handleClose = () => {
    navigate('/home');
  };

  const handleMaisDetalhes = (condicaoId) => {
    console.log('Mostrar detalhes da condição:', condicaoId);
  };

  const handleAdicionarNova = () => {
    setShowForm(true);
  };

  const handleVoltarLista = () => {
    setShowForm(false);
  };

  const handleSalvarCondicao = (condicaoData) => {
    const agora = new Date().toISOString();
    const novaCondicao = {
      id: condicoesSaude.length + 1,
      ...condicaoData,
      criadoEm: agora,
      atualizadoEm: agora
    };

    setCondicoesSaude([...condicoesSaude, novaCondicao]);
    setShowForm(false);

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
          onSectionChange={(sectionId) => {
            if (sectionId === 'prontuario') {
              navigate('/registro-cadastro');
            } else if (sectionId ==='endereco') {
              navigate('/Registro-endereco');

            }
            else {
              setActiveSection(sectionId);
            }
          }}
        />
        <div className="condicoes-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}