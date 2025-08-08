
import React, { useState } from "react";
import "../css/Registro-nova-atividade.css";

const RegistroNovaAtividade = () => {
  const [nomeAtividade, setNomeAtividade] = useState("");
  const [descricao, setDescricao] = useState("");

  const handleSalvar = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para salvar os dados
    alert("Atividade salva!");
  };

  return (
    <div className="rna-bg">
      <div className="rna-container">
        {/* Sidebar */}
        <div className="rna-sidebar">
          <button className="rna-sidebar-btn">
            <span>
              <i className="fa fa-list rna-icon-margin" />
              Prontuário
            </span>
            <span>&gt;</span>
          </button>
          <div className="rna-sidebar-item">
            <span>
              <i className="fa fa-address-card rna-icon-margin" />
              Endereço
            </span>
            <span>&gt;</span>
          </div>
          <div className="rna-sidebar-item">
            <span>
              <i className="fa fa-stethoscope rna-icon-margin" />
              Condição de Saúde
            </span>
            <span>&gt;</span>
          </div>
          <div className="rna-sidebar-flex" />
          <div className="rna-sidebar-voltar">
            <i className="fa fa-arrow-left rna-voltar-icon" />
            <div className="rna-voltar-text">Voltar</div>
          </div>
        </div>
        {/* Main Content */}
        <div className="rna-main">
          <div className="rna-title">
            <span className="rna-title-arrow">&larr;</span>
            Cadastre uma nova atividade
          </div>
          <form onSubmit={handleSalvar}>
            <div className="rna-form-group">
              <label className="rna-label">
                Nome da Atividade:
              </label>
              <input
                type="text"
                value={nomeAtividade}
                onChange={(e) => setNomeAtividade(e.target.value)}
                className="rna-input"
                placeholder="--------------"
                required
              />
            </div>
            <div className="rna-form-group">
              <label className="rna-label">
                Descrição:
              </label>
              <textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                className="rna-textarea"
                placeholder="-------------------------------"
                required
              />
            </div>
            <button
              type="submit"
              className="rna-salvar-btn"
            >
              Salvar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistroNovaAtividade;