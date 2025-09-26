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
//         const token = localStorage.getItem('token');
//         const response = await api.get("/beneficiarios", {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });

//         console.log("Dados recebidos do backend:", response.data);

//         if (Array.isArray(response.data)) {
//           setBeneficiariosList(response.data.reverse());
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

//   const filteredList = (beneficiariosList || [])
//     .filter(item => {
//       if (!item) return false;

//       if (item.status !== "ATIVO") return false;

//       const nome = item.nomeRegistro || item.nome || item.nomeSocial;
//       return nome && nome.toLowerCase().includes(search.toLowerCase());
//     });

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
//         {filteredList.map((item, i) => {
//           const nome = item.nomeRegistro || item.nome || item.nomeSocial || "";
//           return (
//             <div key={i} className="beneficiarios-card">
//               <img src={Icon} alt={nome} className="beneficiarios-card-img" />
//               <span className="beneficiarios-card-name">{nome}</span>
//             </div>
//           );
//         })}

//         {filteredList.length === 0 && (
//           <div className="beneficiarios-empty">Nenhum beneficiário encontrado.</div>
//         )}
//       </div>
//     </section>
//   );
// }

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
//         const token = localStorage.getItem("token");
//         const response = await api.get("/beneficiarios", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         console.log("Dados recebidos do backend:", response.data);

//         if (Array.isArray(response.data)) {
//           // Inverter para mostrar os mais recentes primeiro
//           setBeneficiariosList(response.data.reverse());
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

//   // Filtra a lista
//   const filteredList = (beneficiariosList || []).filter((item) => {
//     if (!item) return false;
//     if (item.status !== "ATIVO") return false;

//     const nome = item.nomeRegistro || item.nome || item.nomeSocial;
//     return nome && nome.toLowerCase().includes(search.toLowerCase());
//   });

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
//         {filteredList.map((item, i) => {
//           const nome = item.nomeRegistro || item.nome || item.nomeSocial || "";

//           return (
//             <div
//               key={i}
//               className="beneficiarios-card"
//               onClick={() => {
//                 if (nome === "José Santos") {
//                   navigate("/prontuario", { state: { beneficiario: item } });
//                 }
//               }}
//               style={nome === "José Santos" ? { cursor: "pointer" } : { cursor: "default" }}
//             >
//               <img src={Icon} alt={nome} className="beneficiarios-card-img" />
//               <span className="beneficiarios-card-name">{nome}</span>
//             </div>
//           );
//         })}

//         {filteredList.length === 0 && (
//           <div className="beneficiarios-empty">Nenhum beneficiário encontrado.</div>
//         )}
//       </div>
//     </section>
//   );
// }

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
//         const token = localStorage.getItem("token");
//         const response = await api.get("/beneficiarios", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         console.log("Dados recebidos do backend:", response.data);

//         if (Array.isArray(response.data)) {
//           // Inverter para mostrar os mais recentes primeiro
//           setBeneficiariosList(response.data.reverse());
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

//   // Filtra a lista
//   const filteredList = (beneficiariosList || []).filter((item) => {
//     if (!item) return false;
//     if (item.status !== "ATIVO") return false;

//     const nome = item.nomeRegistro || item.nome || item.nomeSocial;
//     return nome && nome.toLowerCase().includes(search.toLowerCase());
//   });

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
//       {/* Título + contador ao lado */}
//       <div className="beneficiarios-title-container">
//         <h2 className="beneficiarios-title">Seus beneficiários</h2>
//         <span className="beneficiarios-count">
//           {filteredList.length} ativo(s)
//         </span>
//       </div>

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
//         {filteredList.map((item, i) => {
//           const nome = item.nomeRegistro || item.nome || item.nomeSocial || "";

//           return (
//             <div
//               key={i}
//               className="beneficiarios-card"
//               onClick={() => {
//                 if (nome === "José Santos") {
//                   navigate("/prontuario", { state: { beneficiario: item } });
//                 }
//               }}
//               style={nome === "José Santos" ? { cursor: "pointer" } : { cursor: "default" }}
//             >
//               <img src={Icon} alt={nome} className="beneficiarios-card-img" />
//               <span className="beneficiarios-card-name">{nome}</span>
//             </div>
//           );
//         })}

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
import HelpIcon from "../assets/help.png"; // adicione um ícone de ajuda (pode ser um ponto de interrogação)
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
        const token = localStorage.getItem("token");
        const response = await api.get("/beneficiarios", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (Array.isArray(response.data)) {
          setBeneficiariosList(response.data.reverse());
        } else {
          setBeneficiariosList([]);
        }
      } catch (err) {
        setError("Não foi possível carregar os beneficiários.");
      } finally {
        setLoading(false);
      }
    };

    fetchBeneficiarios();
  }, []);

  const filteredList = (beneficiariosList || []).filter((item) => {
    if (!item) return false;
    if (item.status !== "ATIVO") return false;

    const nome = item.nomeRegistro || item.nome || item.nomeSocial;
    return nome && nome.toLowerCase().includes(search.toLowerCase());
  });

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
      {/* Título + contador + ajuda */}
      <div className="beneficiarios-title-container">
        <div className="beneficiarios-title-wrapper">
          <h2 className="beneficiarios-title">Seus beneficiários</h2>
          <div className="beneficiarios-help">
            <img src={HelpIcon} alt="Ajuda" className="beneficiarios-help-icon" />
            <span className="beneficiarios-help-tooltip">
              Aqui você encontra todos os beneficiários cadastrados.
              Clique em um nome para visualizar o prontuário.
            </span>
          </div>
        </div>

        <span className="beneficiarios-count">
          {filteredList.length} ativo(s) de {beneficiariosList.length} total
        </span>
      </div>

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
              onClick={() => {
                if (nome === "José Santos") {
                  navigate("/prontuario", { state: { beneficiario: item } });
                }
              }}
              style={nome === "José Santos" ? { cursor: "pointer" } : { cursor: "default" }}
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
