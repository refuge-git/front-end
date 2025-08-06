import React from 'react';
import '../css/Registro-endereco.css';

function RegistroEndereco() {
  return (
    <div className="container-endereco">
      <aside className="sidebar">
        <button className="voltar-btn">&#8592;</button>
        <nav className="menu-lateral">
          <button className="menu-item">Prontuario</button>
          <button className="menu-item ativo">Endereço</button>
          <button className="menu-item">Condição de Saúde</button>
          <button className="menu-item">Relatório Geral</button>
        </nav>
      </aside>
      <main className="conteudo-endereco">
        <form className="box-endereco">
          <h2>Editar dados</h2>
          <div className="linha-campos">
            <div className="campo" style={{ flex: 2 }}>
              <label htmlFor="logradouro">Logradouro:</label>
              <input type="text" id="logradouro" defaultValue="R. Treze de Maio" />
            </div>
            <div className="campo" style={{ flex: 1 }}>
              <label htmlFor="numero">Número:</label>
              <input type="text" id="numero" defaultValue="479" />
            </div>
            <div className="campo" style={{ flex: 1 }}>
              <label htmlFor="complemento">Complemento:</label>
              <input type="text" id="complemento" defaultValue="-" />
            </div>
          </div>
          <div className="linha-campos">
            <div className="campo">
              <label htmlFor="bairro">Bairro:</label>
              <input type="text" id="bairro" defaultValue="Bela Vista" />
            </div>
            <div className="campo">
              <label htmlFor="cidade">Cidade:</label>
              <input type="text" id="cidade" defaultValue="São Paulo" />
            </div>
          </div>
          <div className="linha-campos">
            <div className="campo">
              <label htmlFor="cep">CEP:</label>
              <input type="text" id="cep" defaultValue="01327-000" />
            </div>
            <div className="campo">
              <label htmlFor="observacao">Observação:</label>
              <input type="text" id="observacao" defaultValue="-" />
            </div>
          </div>
        </form>
        <button type="submit" className="botao-editar">Editar</button>
      </main>
    </div>
  );
}

export default RegistroEndereco;