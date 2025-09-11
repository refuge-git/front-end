// import { useState } from "react";
// import "../css/Status.css";
// import Icon from "../assets/perfil-s-fundo.png";
// import IconLupa from "../assets/lupa.png";

// const statusList = [
//   { nome: "Agnaldo", status: "Ativo", cor: "#4bb543" },
//   { nome: "Pedro", status: "Banido", cor: "#ff2d2d" },
//   { nome: "Rodolfo", status: "Suspenso", cor: "#ffe600" },
//   { nome: "Maria", status: "Inativo", cor: "#cccccc" },
//   { nome: "Samara", status: "Banido", cor: "#ff2d2d" },
//   { nome: "Joana", status: "Ativo", cor: "#4bb543" },
//   { nome: "Lucas", status: "Suspenso", cor: "#ffe600" },
//   { nome: "Bruno", status: "Inativo", cor: "#cccccc" }
// ];

// const statusOptions = [
//   { label: "Todos", value: "" },
//   { label: "Ativo", value: "Ativo" },
//   { label: "Banido", value: "Banido" },
//   { label: "Suspenso", value: "Suspenso" },
//   { label: "Inativo", value: "Inativo" }
// ];

// export default function Status() {
//   const [search, setSearch] = useState("");
//   const [filter, setFilter] = useState("");

//   const filteredList = statusList.filter(item =>
//     item.nome.toLowerCase().includes(search.toLowerCase()) &&
//     (filter === "" || item.status === filter)
//   );

//   return (
//     <section className="status-container">
//       <div className="status-header">
//         <h2 className="status-title">Status</h2>
//         <select
//           value={filter}
//           onChange={e => setFilter(e.target.value)}
//           className="status-select"
//         >
//           {statusOptions.map(opt => (
//             <option key={opt.value} value={opt.value}>{opt.label}</option>
//           ))}
//         </select>
//       </div>

//       <div className="status-search">
//         {/* <span className="status-search-icon">🔍</span> */}
//         <img
//           src={IconLupa}
//           alt="Buscar"
//           className="status-search-img"
//         />
//         <input
//           type="text"
//           placeholder="Busque pelo nome..."
//           value={search}
//           onChange={e => setSearch(e.target.value)}
//           className="status-input"
//         />
//       </div>

//       {/* Lista com scroll */}
//       <div className="status-list">
//         {filteredList.map((item, i) => (
//           <div key={i} className="status-card">
//             <div className="status-card-info">
//               {/* <span className="status-card-icon">👤</span> */}
//               <img
//                 src={Icon}
//                 alt={item.nome}
//                 className="status-card-img"
//               />
//               <span className="status-card-name">{item.nome}</span>
//             </div>
//             <span
//               title={item.status}
//               className="status-dot"
//               style={{ background: item.cor }}
//             ></span>
//           </div>
//         ))}
//         {filteredList.length === 0 && (
//           <div className="status-empty">
//             Nenhum beneficiário encontrado.
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }

import { useState, useEffect } from "react";
import api from "../provider/api"; // seu axios
import "../css/Status.css";
import IconDefault from "../assets/perfil-s-fundo.png";
import IconLupa from "../assets/lupa.png";

// Cores para cada status
const statusColors = {
  ATIVO: "#4bb543",    // verde
  BANIDO: "#ff2d2d",   // vermelho
  SUSPENSO: "#ffe600", // amarelo
  INATIVO: "#cccccc"   // cinza
};

export default function Status() {
  const [beneficiarios, setBeneficiarios] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  // Buscar beneficiários
  const fetchBeneficiarios = async () => {
    try {
      const response = await api.get("/beneficiarios/status"); 
      console.log("Resposta da API:", response.data); 
      const sorted = response.data.map((b) => ({
        ...b,
        status: b.status ? b.status.trim().toUpperCase() : "INATIVO"
      })).reverse();
      setBeneficiarios(sorted);
    } catch (error) {
      console.error("Erro ao buscar beneficiários:", error);
    }
  };

  useEffect(() => {
    fetchBeneficiarios();
  }, []);

  // Retorna a cor baseada no status
  const getStatusColor = (status) => {
    const s = (status || "").trim().toUpperCase();
    return statusColors[s] || "#cccccc";
  };

  const filteredList = beneficiarios
    .filter((item) => (item.status || "").toUpperCase() !== "ATIVO") 
    .filter((item) => {
      const nome = (item.nomeRegistro || "").toLowerCase();
      const searchLower = search.toLowerCase();
      return (
        nome.includes(searchLower) &&
        (filter === "" || item.status === filter)
      );
    });

  return (
    <section className="status-container">
      <div className="status-header">
        <h2 className="status-title">Status</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="status-select"
        >
          <option value="">Todos</option>
          <option value="ATIVO">Ativo</option>
          <option value="BANIDO">Banido</option>
          <option value="SUSPENSO">Suspenso</option>
          <option value="INATIVO">Inativo</option>
        </select>
      </div>

      <div className="status-search">
        <img src={IconLupa} alt="Buscar" className="status-search-img" />
        <input
          type="text"
          placeholder="Busque pelo nome..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="status-input"
        />
      </div>

      <div className="status-list">
        {filteredList.length > 0 ? (
          filteredList.map((item, index) => (
            <div key={index} className="status-card">
              <div className="status-card-info">
                <img
                  src={item.fotoPerfil || IconDefault}
                  alt={item.nomeRegistro}
                  className="status-card-img"
                />
                <span className="status-card-name">{item.nomeRegistro}</span>
              </div>
              <span
                title={item.status}
                className="status-dot"
                style={{ backgroundColor: getStatusColor(item.status) }}
              ></span>
            </div>
          ))
        ) : (
          <div className="status-empty">Nenhum beneficiário encontrado.</div>
        )}
      </div>
    </section>
  );
}
