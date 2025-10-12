  import { useState, useEffect } from 'react';
  import { useNavigate } from 'react-router-dom';
  import '../css/App.css';
  import SidebarCondicoes from '../components/SideBarCondicoes';
  import ListaCondicoesSaude from '../components/ListaCondicoesSaude';
  import CondicaoSaudeForm from '../components/CondicaoSaudeFor';
  import api from '../provider/api';
  import Botao from '../components/Botao';

  export default function CondicoesSaude() {
    const [categorias, setCategorias] = useState([]);
    const [activeSection, setActiveSection] = useState('condicao-saude');
    const [condicoesSaude, setCondicoesSaude] = useState([]);
    const [condicaoEditando, setCondicaoEditando] = useState(null);
    const [isFormAberto, setIsFormAberto] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) return;

      api.get('/categorias', { headers: { Authorization: `Bearer ${token}` } })
        .then(res => setCategorias(res.data))
        .catch(() => setCategorias([]));
    }, []);

    useEffect(() => {
      const fetchCondicoes = async () => {
        try {
          const response = await api.get('/condicoes-saude/beneficiario/1');
          const data = Array.isArray(response.data) ? response.data : (response.data ? [response.data] : []);
          setCondicoesSaude(data);
          setIsFormAberto(false);
        } catch (error) {
          setCondicoesSaude([]);
          setIsFormAberto(false);
        }
      };
      fetchCondicoes();
    }, []);

    const handleClose = () => navigate('/home');

    const handleMaisDetalhes = (condicaoId) => {
      const condicao = condicoesSaude.find(c => c.id === condicaoId);
      setCondicaoEditando(condicao);
      setIsFormAberto(true);
    };

    const handleAdicionarNova = () => {
      setCondicaoEditando(null);
      setIsFormAberto(true);
    };

    const handleVoltarLista = () => {
      setIsFormAberto(false);
      setCondicaoEditando(null);
    };

    const handleSalvarCondicao = async (condicaoData) => {
      try {
        if (condicaoEditando && condicaoEditando.id) {
          const response = await api.put(`/condicoes-saude/${condicaoEditando.id}`, condicaoData);
          setCondicoesSaude(condicoesSaude.map(c => c.id === condicaoEditando.id ? response.data : c));
        } else {
          const agora = new Date().toISOString();
          const novaCondicao = {
            id: condicoesSaude.length + 1,
            ...condicaoData,
            criadoEm: agora,
            atualizadoEm: agora
          };
          setCondicoesSaude([...condicoesSaude, novaCondicao]);
        }
        setIsFormAberto(false);
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
      if (activeSection !== 'condicao-saude') return <div><h2>Seção não implementada</h2></div>;

      return (
        <div>
          <h2>Condição de Saúde <span className="opcional">(Opcional)</span></h2>

          {isFormAberto ? (
            <CondicaoSaudeForm
              onSalvar={handleSalvarCondicao}
              onVoltar={handleVoltarLista}
              condicao={condicaoEditando}
            />
          ) : (
            <ListaCondicoesSaude
              condicoes={condicoesSaude} // se vazio, ListaCondicoesSaude cuida da mensagem + botão
              onMaisDetalhes={handleMaisDetalhes}
              onAdicionarNova={handleAdicionarNova}
              onExcluir={handleExcluirCondicao}
            />
          )}
        </div>
      );
    };

    return (
      <div className="condicoes-saude-container">
        <div className="condicoes-saude-box">
          <Botao className="close-button" onClick={handleClose}>✕</Botao>
          <SidebarCondicoes
            activeSection={activeSection}
            onSectionChange={(sectionId) => {
              if (sectionId === 'prontuario') navigate('/Prontuario');
              else if (sectionId === 'endereco') navigate('/Endereco');
              else setActiveSection(sectionId);
            }}
          />
          <div className="condicoes-content">
            {renderContent()}
          </div>
        </div>
      </div>
    );
  }
