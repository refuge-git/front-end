
import axios from 'axios';
import { useEffect, useState } from 'react';
import api from '../provider/api';

export default function CondicaoSaudeForm({ onSalvar, onVoltar, condicao }) {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const condicaoData = {
      diagnostico: form.diagnostico,
      descricao: form.descricao,
      tratamento: form.tratamento,
      observacoes: form.observacoes,
      idBeneficiario: 1,
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
        // Se for 204 No Content, não há response.data
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

          {/**
          <div className="form-group">
            <label htmlFor="dataDiagnostico">Data de diagnóstico:</label>
            <input 
              type="date" 
              id="dataDiagnostico" 
              name="dataDiagnostico" 
            />
          </div>
          */}

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
          <button type="submit" className="btn-salvar">Salvar</button>
          <button type="button" className="btn-pular" onClick={onVoltar}>Voltar</button>
        </div>
      </form>
    </div>
  );
}