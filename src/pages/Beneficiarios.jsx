import { useState } from "react";
import "./Beneficiarios.css";

const beneficiariosList = [
  { nome: "José Alberto" },
  { nome: "Maria Clara" },
  { nome: "Agnaldo Silva" },
  { nome: "Samara Souza" },
  { nome: "Pedro Henrique" },
  { nome: "Joana Lima" }
];

export default function Beneficiarios() {
  const [search, setSearch] = useState("");

  const filteredList = beneficiariosList.filter(item =>
    item.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="beneficiarios-container">
      <h2 className="beneficiarios-title">Seus beneficiários</h2>
      <button className="beneficiarios-btn">
        Cadastrar beneficiário
      </button>
      <div className="beneficiarios-search">
        <span className="beneficiarios-search-icon">🔍</span>
        <input
          type="text"
          placeholder="busque pelo nome..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="beneficiarios-input"
        />
      </div>
      {filteredList.map((item, i) => (
        <div key={i} className="beneficiarios-card">
          <span className="beneficiarios-card-icon">👤</span>
          <span className="beneficiarios-card-name">{item.nome}</span>
        </div>
      ))}
      {filteredList.length === 0 && (
        <div className="beneficiarios-empty">
          Nenhum beneficiário encontrado.
        </div>
      )}
    </section>
  );
}