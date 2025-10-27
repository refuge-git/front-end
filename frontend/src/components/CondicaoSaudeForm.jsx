import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 
import api from '../provider/api';
import Botao from './Botao';

export default function CondicaoSaudeForm({ onSalvar, condicao }) {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const idBeneficiario = queryParams.get('idBeneficiario');

  const [categorias, setCategorias] = useState([]);
  const [form, setForm] = useState({
    diagnostico: condicao?.diagnostico || '',
    descricao: condicao?.descricao || '',
    tratamento: condicao?.tratamento || '',
    observacoes: condicao?.observacoes || '',
    categoria: condicao?.idCategoria || condicao?.categoria?.id || ''
  });

  // estados para feedback
  const [erro, setErro] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    api.get('/categorias', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setCategorias(res.data))
      .catch(() => setCategorias([]));
  }, []);

  useEffect(() => {
    if (condicao) {
      setForm({
        diagnostico: condicao.diagnostico || '',
        descricao: condicao.descricao || '',
        tratamento: condicao.tratamento || '',
        observacoes: condicao.observacoes || '',
        categoria: condicao.idCategoria || condicao.categoria?.id || ''
      });
    }
  }, [condicao]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    if (!idBeneficiario) {
      setErro('ID do beneficiário não encontrado na URL.');
      return;
    }
    if (!form.diagnostico || !form.categoria) {
      setErro('Preencha os campos obrigatórios: Diagnóstico e Categoria.');
      return;
    }

    const condicaoData = {
      diagnostico: form.diagnostico,
      descricao: form.descricao,
      tratamento: form.tratamento,
      observacoes: form.observacoes,
      idBeneficiario: idBeneficiario,
      idCategoria: Number(form.categoria)
    };

    try {
      const token = localStorage.getItem('token');
      let response;
      if (condicao && condicao.id) {
        response = await api.put(`/condicoes-saude/${condicao.id}`, condicaoData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        response = await api.post('/condicoes-saude', condicaoData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }

      // 1) Mostra o card imediatamente
      setShowConfirm(true);

      // 2) Espera 1.8s para o usuário ver o feedback
      await new Promise((r) => setTimeout(r, 1800));

      // 3) Se o pai precisa ser notificado, faça depois do delay
      if (onSalvar) {
        await onSalvar(response.data ?? {});
      }

      // 4) Navega para a próxima etapa
      navigate(`/condicoes-saude?idBeneficiario=${idBeneficiario}`);

    } catch (error) {
      setErro('Erro ao salvar condição de saúde. Tente novamente.');
      if (error.response) {
        console.error('Erro na resposta da API:', error.response.status, error.response.data);
      } else if (error.request) {
        console.error('Sem resposta da API:', error.request);
      } else {
        console.error('Erro desconhecido:', error.message);
      }
    }
  };

  // Concluir manualmente (se o usuário clicar)
  const handleClose = () => {
    navigate(`/condicoes-saude?idBeneficiario=${idBeneficiario}`);
  };

  return (
    <div className="condicao-saude-form">
      {/* Mensagem de erro */}
      {erro && <p className="erro">{erro}</p>}

      {/* Card de confirmação */}
      {showConfirm && (
        <div className="confirm-overlay">
          <div className="confirm-card">
            <div className="confirm-icon"></div>
            <div>
              <h3>Cadastro realizado!</h3>
              <p>
                Condição de saúde salva com sucesso.<br />
                Você será redirecionado em instantes.
              </p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="diagnostico">Diagnóstico:</label>
            <input
              type="text"
              id="diagnostico"
              name="diagnostico"
              placeholder="Diagnóstico da condição de saúde..."
              value={form.diagnostico}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="categoria">Categoria:</label>
            <select
              id="categoria"
              name="categoria"
              className="select-categoria"
              value={form.categoria}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Selecione uma categoria</option>
              {categorias.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.nome}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group full-width">
          <label htmlFor="tratamento">Tratamento:</label>
          <textarea
            id="tratamento"
            name="tratamento"
            rows="2"
            placeholder="Tratamento recomendado ou em uso..."
            value={form.tratamento}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="form-group full-width">
          <label htmlFor="descricao">Descrição:</label>
          <textarea
            id="descricao"
            name="descricao"
            rows="3"
            placeholder="Descreva a condição de saúde..."
            value={form.descricao}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="form-group full-width">
          <label htmlFor="observacao">Observação:</label>
          <textarea
            id="observacao"
            name="observacoes"
            rows="3"
            placeholder="Observações adicionais sobre a condição de saúde..."
            value={form.observacoes}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="form-buttons">
          <Botao
            type="button"
            className="btn-pular"
            onClick={handleClose}
          >
            Concluir
          </Botao>

          <Botao type="submit" className="btn-salvar">Salvar</Botao>
        </div>
      </form>
    </div>
  );
}