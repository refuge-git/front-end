import { useState } from 'react';
import iconDelete from '../assets/icon-delete.svg';

export default function CondicaoSaudeCard({ condicao, onMaisDetalhes, onExcluir }) {
  // Função para formatar datas
  const [condicoesSaude, setCondicoesSaude] = useState([]);
const [condicaoEditando, setCondicaoEditando] = useState(null);
const [showForm, setShowForm] = useState(false);

  const [showConfirm, setShowConfirm] = useState(false);
  const formatarData = (dataValue) => {
    if (!dataValue) return 'Não informado';
    // Aceita Date, string ISO, ou timestamp
    let data;
    if (dataValue instanceof Date) {
      data = dataValue;
    } else if (typeof dataValue === 'string' && dataValue.length > 5) {
      // Corrige datas tipo '2024-08-17T12:00:00Z' ou '2024-08-17'
      data = new Date(dataValue);
    } else if (typeof dataValue === 'number') {
      data = new Date(dataValue);
    } else {
      return 'Não informado';
    }
    if (isNaN(data.getTime())) return 'Não informado';
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="condicao-card">
      {showConfirm && (
        <div className="popup-confirm-excluir">
          <div className="popup-content">
            <p>Tem certeza que deseja excluir esta condição de saúde?</p>
            <div className="popup-actions">
              <button className="btn-confirmar" onClick={() => { setShowConfirm(false); onExcluir && onExcluir(condicao.id); }}>Sim</button>
              <button className="btn-cancelar" onClick={() => setShowConfirm(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
      <div className="condicao-content">
        <div className="condicao-info">
          <span className="label">Diagnóstico:</span>
          <span className="value">{condicao.diagnostico}</span>
        </div>
        
        <div className="condicao-info">
          <span className="label">Tratamento:</span>
          <span className="value-multiline">{condicao.tratamento}</span>
        </div>
        
        <div className="condicao-datas">
          <div className="condicao-info-inline">
            <span className="label">Criado em:</span>
            <span className="value-data">{formatarData(condicao.criadoEm || condicao.criado_em || condicao.dataRegistro)}</span>
          </div>
          <div className="condicao-info-inline">
            <span className="label">Atualizado em:</span>
            <span className="value-data">{formatarData(condicao.atualizadoEm || condicao.atualizado_em || condicao.dataAtualizacao)}</span>
          </div>
        </div>
        
        <div className="condicao-actions-row">
          <button 
            className="mais-detalhes-btn"
            onClick={() => onMaisDetalhes(condicao.id)}
          >
            + Mais detalhes
          </button>
          <div style={{ flex: 1 }} />
          <button 
            className="excluir-btn"
            title="Excluir condição"
            onClick={() => setShowConfirm(true)}
            style={{ marginLeft: 'auto' }}
          >
            <img src={iconDelete} alt="Excluir" style={{ width: 20, height: 20 }} />
          </button>
        </div>
      </div>
    </div>
  );
}

