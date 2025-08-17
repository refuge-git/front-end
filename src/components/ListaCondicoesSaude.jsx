import CondicaoSaudeCard from './CondicaoSaudeCard';

export default function ListaCondicoesSaude({ condicoes, onMaisDetalhes, onAdicionarNova, onExcluir }) {
  return (
    <div className="lista-condicoes">
      <div className="condicoes-grid">
        {condicoes.map((condicao) => (
          <CondicaoSaudeCard 
            key={condicao.id}
            condicao={condicao}
            onMaisDetalhes={onMaisDetalhes}
            onExcluir={onExcluir}
          />
        ))}
      </div>
      <button 
        className="btn-adicionar-condicao"
        onClick={onAdicionarNova}
      >
        Adicionar Condição de Saúde
      </button>
    </div>
  );    
}