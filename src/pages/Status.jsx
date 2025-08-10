import { useState } from "react";
import "./Status.css";

const statusList = [
  { nome: "Agnaldo", status: "Ativo", cor: "#4bb543" },
  { nome: "Pedro", status: "Banido", cor: "#ff2d2d" },
  { nome: "Rodolfo", status: "Suspenso", cor: "#ffe600" },
  { nome: "Maria", status: "Inativo", cor: "#cccccc" },
  { nome: "Samara", status: "Banido", cor: "#ff2d2d" },
  { nome: "Joana", status: "Ativo", cor: "#4bb543" },
  { nome: "Lucas", status: "Suspenso", cor: "#ffe600" },
  { nome: "Bruno", status: "Inativo", cor: "#cccccc" }
];

const statusOptions = [
  { label: "Todos", value: "" },
  { label: "Ativo", value: "Ativo" },
  { label: "Banido", value: "Banido" },
  { label: "Suspenso", value: "Suspenso" },
  { label: "Inativo", value: "Inativo" }
];

export default function Status() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const filteredList = statusList.filter(item =>
    item.nome.toLowerCase().includes(search.toLowerCase()) &&
    (filter === "" || item.status === filter)
  );

  return (
    <section className="status-container">
      <div className="status-header">
        <h2 className="status-title">Status</h2>
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="status-select"
        >
          {statusOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
      <div className="status-search">
        <span className="status-search-icon">🔍</span>
        <input
          type="text"
          placeholder="busque pelo nome..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="status-input"
        />
      </div>
      {filteredList.map((item, i) => (
        <div key={i} className="status-card">
          <div className="status-card-info">
            <span className="status-card-icon">👤</span>
            <span className="status-card-name">{item.nome}</span>
          </div>
          <span
            title={item.status}
            className="status-dot"
            style={{ background: item.cor }}
          ></span>
        </div>
      ))}
      {filteredList.length === 0 && (
        <div className="status-empty">
          Nenhum beneficiário encontrado.
        </div>
      )}
    </section>
  );
}