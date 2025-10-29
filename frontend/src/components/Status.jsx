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

import { useState, useEffect, useCallback } from "react";
import api from "../provider/api"; // seu axios
import "../css/Status.css";
import IconDefault from "../assets/perfil-s-fundo.png";
import IconLupa from "../assets/lupa.png";

// Cores para cada status
const statusColors = {
  ATIVO: "#4bb543",    // verde
  BANIDO: "#03045e",   // azul escuro
  SUSPENSO: "#0096c7", // azul
  INATIVO: "#90e0ef"   // azul claro
};

export default function Status() {
  const [beneficiarios, setBeneficiarios] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL"); // padrão "ALL" para todos
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Estados para paginação
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  
  // Estado para debounce da busca
  const [searchTerm, setSearchTerm] = useState("");
  
  // Estado para controlar loading apenas da lista
  const [listLoading, setListLoading] = useState(false);

  // Função para buscar beneficiários com paginação
  const fetchBeneficiarios = useCallback(async (page = currentPage, searchValue = searchTerm, statusValue = filter, isSearch = false) => {
    // Se for busca, usar listLoading; se for carregamento inicial, usar loading
    if (isSearch) {
      setListLoading(true);
    } else {
      setLoading(true);
    }
    
    try {
      const token = localStorage.getItem("token");
      
      // Preparar parâmetros
      const params = {
        page,
        size: pageSize,
        search: searchValue ? searchValue.trim() : ""
      };
      
      // Mapear "ALL" para a string "ALL", outros valores normalmente
      if (statusValue === "ALL" || statusValue === "") {
        params.status = "ALL";
      } else {
        params.status = statusValue;
      }
      
      console.log("Parâmetros da requisição:", params);
      
      const response = await api.get("/beneficiarios/status/page", {
        params,
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Resposta da API status-page:", response.data);
      console.log("Items recebidos:", response.data?.items);
      console.log("Total de items:", response.data?.total);

      // Verifica se a resposta tem a estrutura de paginação
      if (response.data && Array.isArray(response.data.items)) {
        const processedData = response.data.items.map((b) => ({
          ...b,
          status: b.status ? b.status.trim().toUpperCase() : "INATIVO"
        }));
        
        setBeneficiarios(processedData);
        setTotalItems(response.data.total);
        setTotalPages(Math.ceil(response.data.total / pageSize));
        setCurrentPage(response.data.page);
      } else {
        setBeneficiarios([]);
        setTotalItems(0);
        setTotalPages(0);
        console.warn("Formato inesperado da resposta:", response.data);
      }
    } catch (error) {
      console.error("Erro ao buscar beneficiários:", error);
      console.error("Detalhes do erro:", error.response?.data);
      console.error("Status do erro:", error.response?.status);
      
      // Verificar se é um erro 204 (No Content) que é esperado quando não há dados
      if (error.response?.status === 204 || error.code === 'ERR_NETWORK' && error.response?.status === 204) {
        console.log("Sem dados para exibir (204 - No Content)");
        setBeneficiarios([]);
        setTotalItems(0);
        setTotalPages(0);
        setCurrentPage(1);
        setError(null); // Limpar erro pois 204 é resposta válida
      } else {
        setError(`Erro ao carregar beneficiários: ${error.response?.status || 'Rede'}`);
      }
    } finally {
      setLoading(false);
      setListLoading(false);
    }
  }, [currentPage, pageSize, searchTerm, filter]);

  useEffect(() => {
    fetchBeneficiarios(1, "", "ALL", false); // Carregamento inicial - todos os status
  }, []);

  // Debounce para a busca
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm !== search) {
        setSearchTerm(search);
        setCurrentPage(1);
        fetchBeneficiarios(1, search, filter, true);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [search, fetchBeneficiarios]);

  // Função para navegar para uma página específica
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      fetchBeneficiarios(page, searchTerm, filter, true);
    }
  };

  // Função para ir para a página anterior
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  // Função para ir para a próxima página
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  // Função para lidar com mudanças no campo de busca
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Função para lidar com mudanças no filtro de status
  const handleFilterChange = (e) => {
    const newFilter = e.target.value;
    setFilter(newFilter);
    setCurrentPage(1);
    setSearchTerm("");
    setSearch("");
    fetchBeneficiarios(1, "", newFilter, true);
  };

  // Retorna a cor baseada no status
  const getStatusColor = (status) => {
    const s = (status || "").trim().toUpperCase();
    return statusColors[s] || "#cccccc";
  };

  if (loading) {
    return <div className="status-loading">Carregando status...</div>;
  }

  if (error) {
    return <div className="status-error">{error}</div>;
  }

  return (
    <section className="status-container">
      <div className="status-header">
        <h2 className="status-title">Status</h2>
        <select
          value={filter}
          onChange={handleFilterChange}
          className="status-select"
        >
          <option value="ALL">Todos</option>
          <option value="INATIVO">Inativo</option>
          <option value="BANIDO">Banido</option>
          <option value="SUSPENSO">Suspenso</option>
        </select>
      </div>

      <div className="status-search">
        <img src={IconLupa} alt="Buscar" className="status-search-img" />
        <input
          type="text"
          placeholder="Busque pelo nome..."
          value={search}
          onChange={handleSearchChange}
          className="status-input"
        />
      </div>

      <div className="status-list">
        {listLoading ? (
          <div className="status-list-loading">
            <div className="loading-spinner"></div>
            <span>Carregando...</span>
          </div>
        ) : (
          <>
            {beneficiarios.length > 0 ? (
              beneficiarios.map((item, index) => (
                <div key={item.id || index} className="status-card">
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
              !listLoading && <div className="status-empty">Nenhum beneficiário encontrado.</div>
            )}
          </>
        )}
      </div>

      {/* Componente de Paginação */}
      {totalPages > 1 && (
        <div className="pagination-container">
          <button
            className="pagination-btn"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          >
            &#8249;
          </button>

          {/* Números das páginas */}
          <div className="pagination-numbers">
            {(() => {
              const pages = [];
              const maxVisiblePages = 5;

              let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
              let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

              if (endPage - startPage + 1 < maxVisiblePages) {
                startPage = Math.max(1, endPage - maxVisiblePages + 1);
              }

              for (let i = startPage; i <= endPage; i++) {
                pages.push(
                  <button
                    key={i}
                    className={`pagination-number ${currentPage === i ? 'active' : ''}`}
                    onClick={() => goToPage(i)}
                  >
                    {i}
                  </button>
                );
              }

              return pages;
            })()}
          </div>

          <button
            className="pagination-btn"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            &#8250;
          </button>

          <div className="pagination-info">
            Página {currentPage} de {totalPages} ({totalItems} itens)
          </div>
        </div>
      )}
    </section>
  );
}
