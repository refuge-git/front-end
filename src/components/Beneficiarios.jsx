// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../css/Beneficiarios.css";
// import Icon from "../assets/perfil-s-fundo.png";
// import IconLupa from "../assets/lupa.png";
// import Botao from "./Botao";

// const beneficiariosList = [
//   { nome: "José Santos" },
//   { nome: "Maria Clara" },
//   { nome: "Agnaldo Silva" },
//   { nome: "Samara Souza" },
//   { nome: "Pedro Henrique" },
//   { nome: "Joana Lima" },
//   { nome: "Lucas Andrade" },
//   { nome: "Patrícia Gomes" },
//   { nome: "Ricardo Mendes" },
//   { nome: "Fernanda Alves" }
// ];

// export default function Beneficiarios() {
//   const [search, setSearch] = useState("");
//   const navigate = useNavigate();

//   const filteredList = beneficiariosList.filter(item =>
//     item.nome.toLowerCase().includes(search.toLowerCase())
//   );

//   const handleCadastro = () => {
//     navigate("/registro-cadastro"); 
//   };

//   return (
//     <section className="beneficiarios-container">
//       <h2 className="beneficiarios-title">Seus beneficiários</h2>

//       <Botao className="beneficiarios-btn" type="submit" onClick={handleCadastro}>Cadastrar beneficiário</Botao>
//       <div className="beneficiarios-search">
//         <img
//           src={IconLupa}
//           alt="Buscar"
//           className="beneficiarios-search-img"
//         />
//         <input
//           type="text"
//           placeholder="Busque pelo nome..."
//           value={search}
//           onChange={e => setSearch(e.target.value)}
//           className="beneficiarios-input"
//         />
//       </div>

//       <div className="beneficiarios-list">
//         {filteredList.map((item, i) => (
//           <div
//             key={i}
//             className="beneficiarios-card"
//             onClick={() => {
//               if (item.nome === "José Santos") {
//                 navigate("/prontuario");
//               }
//             }}
//             style={item.nome === "José Santos" ? { cursor: "pointer" } : {}}
//           >
//             <img
//               src={Icon}
//               alt={item.nome}
//               className="beneficiarios-card-img"
//             />
//             <span className="beneficiarios-card-name">{item.nome}</span>
//           </div>
//         ))}

//         {filteredList.length === 0 && (
//           <div className="beneficiarios-empty">
//             Nenhum beneficiário encontrado.
//           </div>
//         )}
//       </div>
//     </section>
//   );
// // }
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "../css/Beneficiarios.css";
// import Icon from "../assets/perfil-s-fundo.png";
// import IconLupa from "../assets/lupa.png";
// import Botao from "./Botao";
// import api from "../provider/api"; 

// export default function Beneficiarios() {
//   const [search, setSearch] = useState("");
//   const [beneficiariosList, setBeneficiariosList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchBeneficiarios = async () => {
//       try {
//         const response = await api.get("/beneficiarios"); // ajuste conforme seu backend
//         if (Array.isArray(response.data)) {
//           setBeneficiariosList(response.data);
//         } else {
//           setBeneficiariosList([]);
//           console.warn("Formato inesperado do backend:", response.data);
//         }
//       } catch (err) {
//         console.error("Erro ao buscar beneficiários:", err);
//         setError("Não foi possível carregar os beneficiários.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBeneficiarios();
//   }, []);

//   // Filtra a lista garantindo que item.nome existe
//   const filteredList = (beneficiariosList || []).filter(
//     (item) => item && item.nome && item.nome.toLowerCase().includes(search.toLowerCase())
//   );

//   const handleCadastro = () => {
//     navigate("/registro-cadastro");
//   };

//   if (loading) {
//     return <div className="beneficiarios-loading">Carregando beneficiários...</div>;
//   }

//   if (error) {
//     return <div className="beneficiarios-error">{error}</div>;
//   }

//   return (
//     <section className="beneficiarios-container">
//       <h2 className="beneficiarios-title">Seus beneficiários</h2>

//       <Botao className="beneficiarios-btn" type="submit" onClick={handleCadastro}>
//         Cadastrar beneficiário
//       </Botao>

//       <div className="beneficiarios-search">
//         <img src={IconLupa} alt="Buscar" className="beneficiarios-search-img" />
//         <input
//           type="text"
//           placeholder="Busque pelo nome..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="beneficiarios-input"
//         />
//       </div>

//       <div className="beneficiarios-list">
//         {filteredList.map((item, i) => (
//           <div
//             key={i}
//             className="beneficiarios-card"
//             onClick={() => {
//               if (item.nome === "José Santos") {
//                 navigate("/prontuario");
//               }
//             }}
//             style={item.nome === "José Santos" ? { cursor: "pointer" } : {}}
//           >
//             <img src={Icon} alt={item.nome} className="beneficiarios-card-img" />
//             <span className="beneficiarios-card-name">{item.nome}</span>
//           </div>
//         ))}

//         {filteredList.length === 0 && (
//           <div className="beneficiarios-empty">Nenhum beneficiário encontrado.</div>
//         )}
//       </div>
//     </section>
//   );
// }

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Beneficiarios.css";
import Icon from "../assets/perfil-s-fundo.png";
import IconLupa from "../assets/lupa.png";
import Botao from "./Botao";
import api from "../provider/api";

export default function Beneficiarios() {
  const [search, setSearch] = useState("");
  const [beneficiariosList, setBeneficiariosList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBeneficiarios = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get("/beneficiarios", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log("Dados recebidos do backend:", response.data);

        if (Array.isArray(response.data)) {
          setBeneficiariosList(response.data.reverse());
        } else {
          setBeneficiariosList([]);
          console.warn("Formato inesperado do backend:", response.data);
        }
      } catch (err) {
        console.error("Erro ao buscar beneficiários:", err);
        setError("Não foi possível carregar os beneficiários.");
      } finally {
        setLoading(false);
      }
    };

    fetchBeneficiarios();
  }, []);

  // Filtra a lista usando o campo correto (ex: nomeRegistro)
  const filteredList = (beneficiariosList || []).filter(
    (item) => {
      if (!item) return false;

      const nome = item.nomeRegistro || item.nome || item.nomeSocial;
      return nome && nome.toLowerCase().includes(search.toLowerCase());
    }
  );

  const handleCadastro = () => {
    navigate("/registro-cadastro");
  };

  if (loading) {
    return <div className="beneficiarios-loading">Carregando beneficiários...</div>;
  }

  if (error) {
    return <div className="beneficiarios-error">{error}</div>;
  }

  return (
    <section className="beneficiarios-container">
      <h2 className="beneficiarios-title">Seus beneficiários</h2>

      <Botao className="beneficiarios-btn" type="submit" onClick={handleCadastro}>
        Cadastrar beneficiário
      </Botao>

      <div className="beneficiarios-search">
        <img src={IconLupa} alt="Buscar" className="beneficiarios-search-img" />
        <input
          type="text"
          placeholder="Busque pelo nome..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="beneficiarios-input"
        />
      </div>

      <div className="beneficiarios-list">
        {filteredList.map((item, i) => {
          const nome = item.nomeRegistro || item.nome || item.nomeSocial || "";
          return (
            <div
              key={i}
              className="beneficiarios-card"
            >
              <img src={Icon} alt={nome} className="beneficiarios-card-img" />
              <span className="beneficiarios-card-name">{nome}</span>
            </div>
          );
        })}

        {filteredList.length === 0 && (
          <div className="beneficiarios-empty">Nenhum beneficiário encontrado.</div>
        )}
      </div>
    </section>
  );
}
