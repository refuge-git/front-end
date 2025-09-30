// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "../css/Beneficiarios.css";
// import Icon from "../assets/perfil-s-fundo.png";
// import IconLupa from "../assets/lupa.png";
// import HelpIcon from "../assets/help.png";
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
//             const response = await api.get("/beneficiarios/frequencia-dia-semana", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//             console.log("Dados recebidos do backend (frequencia-dia-semana):", response.data);

//         if (Array.isArray(response.data)) {
//           setBeneficiariosList(response.data);
//         } else {
//           setBeneficiariosList([]);
//           console.warn("Formato inesperado do backend:", response.data);
//         }
//       } catch (err) {
//             console.error("Erro ao buscar beneficiários por frequência no dia da semana:", err);
//         setError("Não foi possível carregar os beneficiários.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBeneficiarios();
//   }, []);


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
//       {/* Título + contador + ajuda */}
//       <div className="beneficiarios-title-container">
//         <div className="beneficiarios-title-wrapper">
//           <h2 className="beneficiarios-title">Seus beneficiários</h2>
//           <div className="beneficiarios-help">
//             <img src={HelpIcon} alt="Ajuda" className="beneficiarios-help-icon" />
//             <span className="beneficiarios-help-tooltip">
//               Aqui você encontra todos os beneficiários cadastrados.
//               Clique em um nome para visualizar o prontuário.
//             </span>
//           </div>
//         </div>

//         <span className="beneficiarios-count">
//           {filteredList.length} ativo(s) de {beneficiariosList.length} total
//         </span>
//       </div>

//       {/* Campo de busca */}
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

//       {/* Lista de beneficiários */}
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

//       {/* === BOTÕES NO RODAPÉ DA PÁGINA === */}
//       <div className="beneficiarios-actions">
//         <Botao
//           className="btn-pular"
//           type="button"
//           onClick={() => navigate("/atividades")}
//         >
//           Atividades
//         </Botao>

//         <Botao
//           className="btn-salvar"
//           type="button"
//           onClick={handleCadastro}
//         >
//           Cadastrar novo beneficiário
//         </Botao>
//       </div>
//     </section>
//   );
// }


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Beneficiarios.css";
import Icon from "../assets/perfil-s-fundo.png";
import IconLupa from "../assets/lupa.png";
import HelpIcon from "../assets/help.png";
import DeleteIcon from "../assets/delete.png"; // coloque um ícone de lixeira aqui
import Botao from "./Botao";
import api from "../provider/api";

export default function Beneficiarios() {
  const [search, setSearch] = useState("");
  const [beneficiariosList, setBeneficiariosList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBeneficiario, setSelectedBeneficiario] = useState(null); // controle do card de apagar
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBeneficiarios = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/beneficiarios/frequencia-dia-semana", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Dados recebidos do backend:", response.data);

        if (Array.isArray(response.data)) {
          setBeneficiariosList(response.data);
        } else {
          setBeneficiariosList([]);
          console.warn("Formato inesperado:", response.data);
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

  const filteredList = (beneficiariosList || []).filter((item) => {
    if (!item) return false;
    if (item.status !== "ATIVO") return false;

    const nome = item.nomeRegistro || item.nome || item.nomeSocial;
    return nome && nome.toLowerCase().includes(search.toLowerCase());
  });

  const handleCadastro = () => {
    navigate("/registro-cadastro");
  };

  const handleDelete = async (beneficiario) => {
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/beneficiarios/${beneficiario.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBeneficiariosList((prev) =>
        prev.filter((b) => b.id !== beneficiario.id)
      );
      setSelectedBeneficiario(null);
    } catch (err) {
      console.error("Erro ao apagar beneficiário:", err);
      alert("Erro ao apagar beneficiário!");
    }
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

      {/* Campo de busca */}
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

      {/* Lista de beneficiários */}
      <div className="beneficiarios-list">
        {filteredList.map((item, i) => {
          const nome = item.nomeRegistro || item.nome || item.nomeSocial || "";

          return (
            <div key={i} className="beneficiarios-card">
              <div
                className="beneficiarios-card-info"
                onClick={() => {
                  if (nome === "José Santos") {
                    navigate("/prontuario", { state: { beneficiario: item } });
                  }
                }}
                style={nome === "José Santos" ? { cursor: "pointer" } : {}}
              >
                <img src={Icon} alt={nome} className="beneficiarios-card-img" />
                <span className="beneficiarios-card-name">{nome}</span>
              </div>

              {/* Ícone de deletar */}
              <img
                src={DeleteIcon}
                alt="Deletar"
                className="beneficiarios-delete-icon"
                onClick={() => setSelectedBeneficiario(item)}
              />
            </div>
          );
        })}

        {filteredList.length === 0 && (
          <div className="beneficiarios-empty">Nenhum beneficiário encontrado.</div>
        )}
      </div>

      {/* === MODAL DE CONFIRMAÇÃO === */}
      {/* {selectedBeneficiario && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3>Excluir beneficiário</h3>
            <p>
              Deseja realmente excluir{" "}
              <strong>{selectedBeneficiario.nomeRegistro || selectedBeneficiario.nome}</strong>?
            </p>
            <div className="modal-actions">
              <button onClick={() => setSelectedBeneficiario(null)}>Cancelar</button>
              <button
                className="btn-danger"
                onClick={() => handleDelete(selectedBeneficiario)}
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )} */}

      {/* === MODAL DE CONFIRMAÇÃO === */}
      {selectedBeneficiario && (
        <div className="modal-overlay">
          <div className="modal-card">
            {/* Botão X no canto */}
            <button className="modal-close" onClick={() => setSelectedBeneficiario(null)}>
              ✕
            </button>

            <h3>Excluir beneficiário</h3>
            <p>
              Deseja realmente excluir{" "}
              <strong>
                {selectedBeneficiario.nomeRegistro || selectedBeneficiario.nome}
              </strong>?
            </p>

            <div className="modal-actions">
              <button
                className="btn-verde"
                onClick={() => handleDelete(selectedBeneficiario)}
              >
                Sim
              </button>
              <button className="btn-vermelho" onClick={() => setSelectedBeneficiario(null)}>
                Não
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Botões do rodapé */}
      <div className="beneficiarios-actions">
        <Botao className="btn-pular" type="button" onClick={() => navigate("/atividades")}>
          Atividades
        </Botao>

        <Botao className="btn-salvar" type="button" onClick={handleCadastro}>
          Cadastrar novo beneficiário
        </Botao>
      </div>
    </section>
  );
}
