import axios from 'axios';
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

 
  useEffect(() => {
    const token = localStorage.getItem('token');
    api.get('/categorias', {
      headers: {
        Authorization: `Bearer ${token}`
      }
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

  // 🔹 Atualiza valores do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Submissão do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!idBeneficiario) {
      alert("ID do beneficiário não encontrado na URL!");
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
      if (onSalvar) {
        await onSalvar(response.data ?? {});
      }
      alert('Condição de saúde salva com sucesso!');
    } catch (error) {
      alert('Erro ao salvar condição de saúde. Veja o console para detalhes.');
      if (error.response) {
        console.error('Erro na resposta da API:', error.response.status, error.response.data);
      } else if (error.request) {
        console.error('Sem resposta da API:', error.request);
      } else {
        console.error('Erro desconhecido:', error.message);
      }
    }
  };

  return (
    <div className="condicao-saude-form">
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
          {/* 🔹 Voltar agora leva para /registro-endereco */}
          <Botao
            type="button"
            className="btn-pular"
            onClick={() => navigate('/registro-endereco')}
          >
            Voltar
          </Botao>

          <Botao type="submit" className="btn-salvar">Salvar</Botao>
        </div>
      </form>
    </div>
  );
}
