import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Beneficiarios.css";
import Icon from "../assets/perfil-s-fundo.png";
import IconLupa from "../assets/lupa.png";

const beneficiariosList = [
  { nome: "José Alberto" },
  { nome: "Maria Clara" },
  { nome: "Agnaldo Silva" },
  { nome: "Samara Souza" },
  { nome: "Pedro Henrique" },
  { nome: "Joana Lima" },
  { nome: "Lucas Andrade" },
  { nome: "Patrícia Gomes" },
  { nome: "Ricardo Mendes" },
  { nome: "Fernanda Alves" }
];

export default function Beneficiarios() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filteredList = beneficiariosList.filter(item =>
    item.nome.toLowerCase().includes(search.toLowerCase())
  );

  const handleCadastro = () => {
    navigate("/registro-cadastro"); 
  };

  return (
    <section className="beneficiarios-container">
      <h2 className="beneficiarios-title">Seus beneficiários</h2>

      <button className="beneficiarios-btn" onClick={handleCadastro}>
        Cadastrar beneficiário
      </button>

      <div className="beneficiarios-search">
        {/* <span className="beneficiarios-search-icon">🔍</span> */}
        <img
          src={IconLupa}
          alt="Buscar"
          className="beneficiarios-search-img"
        />

        <input
          type="text"
          placeholder="Busque pelo nome..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="beneficiarios-input"
        />
      </div>

      <div className="beneficiarios-list">
        {filteredList.map((item, i) => (
          <div key={i} className="beneficiarios-card">
            {/* <span className="beneficiarios-card-icon">👤</span> */}
            <img
              src={Icon}
              alt={item.nome}
              className="beneficiarios-card-img"
            />
            <span className="beneficiarios-card-name">{item.nome}</span>
          </div>
        ))}

        {filteredList.length === 0 && (
          <div className="beneficiarios-empty">
            Nenhum beneficiário encontrado.
          </div>
        )}
      </div>
    </section>
  );
}
