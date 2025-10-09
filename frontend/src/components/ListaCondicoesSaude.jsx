import CondicaoSaudeCard from './CondicaoSaudeCard';
import Botao from './Botao';

export default function ListaCondicoesSaude({ condicoes, onMaisDetalhes, onAdicionarNova, onExcluir }) {
  return (
    <div className="lista-condicoes">
      {condicoes.length === 0 ? (
        <div className="nenhuma-condicao">
          <p>Nenhuma condição cadastrada</p>
        </div>
      ) : (
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
      )}


      <Botao 
        className="btn-adicionar-condicao"
        onClick={onAdicionarNova}
      >
        Adicionar Condição de Saúde
      </Botao>
    </div>
  );    
}
