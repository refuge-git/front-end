export default function CondicaoSaudeCard({ condicao, onMaisDetalhes }) {
  // Função para formatar datas
  const formatarData = (dataISO) => {
    if (!dataISO) return 'Não informado';
    
    const data = new Date(dataISO);
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="condicao-card">
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
            <span className="value-data">{formatarData(condicao.criadoEm)}</span>
          </div>
          
          <div className="condicao-info-inline">
            <span className="label">Atualizado em:</span>
            <span className="value-data">{formatarData(condicao.atualizadoEm)}</span>
          </div>
        </div>
        
        <button 
          className="mais-detalhes-btn"
          onClick={() => onMaisDetalhes(condicao.id)}
        >
          + Mais detalhes
        </button>
      </div>
    </div>
  );
}