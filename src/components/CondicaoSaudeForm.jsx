
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function CondicaoSaudeForm({ onSalvar, onVoltar }) {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:8080/categorias', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => setCategorias(res.data))
      .catch(() => setCategorias([]));
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const condicaoData = {
      diagnostico: formData.get('diagnostico'),
      dataDiagnostico: formData.get('dataDiagnostico'),
      tratamento: formData.get('tratamento'),
      descricao: formData.get('descricao'),
      observacao: formData.get('observacao'),
      categoria: { id: Number(formData.get('categoria')) },
      beneficiario: { id: 1 }
    };

    try {
      console.log('Dados enviados no POST:', condicaoData);
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8080/condicoes-saude', condicaoData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (onSalvar) onSalvar(response.data);
      alert('Condição de saúde salva com sucesso!');
    } catch (error) {
      alert('Erro ao salvar condição de saúde.');
      console.error(error);
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
            />
          </div>

          <div className="form-group">
            <label htmlFor="dataDiagnostico">Data de diagnóstico:</label>
            <input 
              type="date" 
              id="dataDiagnostico" 
              name="dataDiagnostico" 
            />
          </div>

          <div className="form-group">
            <label htmlFor="categoria">Categoria:</label>
            <select
              id="categoria"
              name="categoria"
              className="select-categoria"
              defaultValue=""
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
          ></textarea>
        </div>

        <div className="form-group full-width">
          <label htmlFor="descricao">Descrição:</label>
          <textarea 
            id="descricao" 
            name="descricao" 
            rows="3"
            placeholder="Descreva a condição de saúde..."
          ></textarea>
        </div>

        <div className="form-group full-width">
          <label htmlFor="observacao">Observação:</label>
          <textarea 
            id="observacao" 
            name="observacao" 
            rows="3"
            placeholder="Observações adicionais sobre a condição de saúde..."
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