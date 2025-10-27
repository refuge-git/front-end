import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/App.css';
import SidebarCondicoes from '../components/SideBarCondicoes';
import ListaCondicoesSaude from '../components/ListaCondicoesSaude';
import CondicaoSaudeForm from '../components/CondicaoSaudeForm';
import api from '../provider/api';


export default function CondicoesSaude() {
  const [categorias, setCategorias] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idBeneficiario = queryParams.get('idBeneficiario');

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
  const [condicoesSaude, setCondicoesSaude] = useState([]);
  const [showForm, setShowForm] = useState(true);
  const [condicaoEditando, setCondicaoEditando] = useState(null);

  useEffect(() => {
    const fetchCondicoes = async () => {
      if (!idBeneficiario) return;

      try {
        const token = localStorage.getItem('token');

        const response = await api.get(
          `/condicoes-saude/beneficiario/${idBeneficiario}`,
          {
            headers: {
              // Se o seu axios `api` já tem interceptor de Authorization, pode remover esta seção
              Authorization: token ? `Bearer ${token}` : undefined,
              Accept: 'application/json'
            },
            validateStatus: () => true // deixa a gente inspecionar status sem cair no catch
          }
        );

        console.log('GET condicoes-saude status:', response.status);
        if (response.status === 204) {
          setCondicoesSaude([]);
          setShowForm(true);
          return;
        }

        if (response.status >= 400) {
          console.error('Erro backend:', response.status, response.data);
          setCondicoesSaude([]);
          setShowForm(true);
          return;
        }

        const data = Array.isArray(response.data)
          ? response.data
          : (response.data ? [response.data] : []);
        setCondicoesSaude(data);
        setShowForm(data.length === 0);
      } catch (error) {
        console.error('Falha na requisição:', {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data
        });
        setCondicoesSaude([]);
        setShowForm(true);
      }
    };

    fetchCondicoes();
  }, [idBeneficiario]);

  const navigate = useNavigate();

  const handleClose = () => {
    localStorage.removeItem("formBeneficiario");
    sessionStorage.removeItem("formEndereco");
    localStorage.removeItem("idBeneficiario");
    navigate('/home');
  };

  const handleMaisDetalhes = (condicaoId) => {
    const condicao = condicoesSaude.find(c => c.id === condicaoId);
    setCondicaoEditando(condicao);
    setShowForm(true);
  };

  const handleAdicionarNova = () => {
    setCondicaoEditando(null);
    setShowForm(true);
  };

  const handleVoltarLista = () => {
    setShowForm(false);
    setCondicaoEditando(null);
  };

  const handleSalvarCondicao = async (condicaoData) => {
    try {
      if (condicaoEditando && condicaoEditando.id) {
        // Atualização
        const response = await api.put(`/condicoes-saude/${condicaoEditando.id}`, condicaoData);
        setCondicoesSaude(condicoesSaude.map(c => c.id === condicaoEditando.id ? response.data : c));
      } else {
        // Criação
        const agora = new Date().toISOString();
        const novaCondicao = {
          id: condicoesSaude.length + 1,
          ...condicaoData,
          criadoEm: agora,
          atualizadoEm: agora
        };
        setCondicoesSaude([...condicoesSaude, novaCondicao]);
      }
      setShowForm(false);
      setCondicaoEditando(null);
    } catch (error) {
      alert('Erro ao salvar condição de saúde.');
    }
  };

  const handleExcluirCondicao = async (condicaoId) => {
    try {
      await api.delete(`/condicoes-saude/${condicaoId}`);
      setCondicoesSaude(condicoesSaude.filter(c => c.id !== condicaoId));
    } catch (error) {
      alert('Erro ao excluir condição de saúde.');
    }
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
                condicao={condicaoEditando}
              />
            ) : (
              <ListaCondicoesSaude
                condicoes={condicoesSaude}
                onMaisDetalhes={handleMaisDetalhes}
                onAdicionarNova={handleAdicionarNova}
                onExcluir={handleExcluirCondicao}
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
            navigate(`/prontuario?idBeneficiario=${idBeneficiario}`);

            if (sectionId === 'prontuario') {
              navigate(`/prontuario?idBeneficiario=${idBeneficiario}`);
            } else if (sectionId === 'endereco') {
              navigate(`/endereco?idBeneficiario=${idBeneficiario}`);

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
