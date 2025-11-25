import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import api from "../provider/api"; // seu axios
import "../css/Status.css";
import IconDefault from "../assets/perfil-s-fundo.png";
import IconLupa from "../assets/lupa.png";
import ModalEditarStatus from "../components/ModalEditarStatus";


const statusColors = {
  ATIVO: "#4bb543",    // verde
  BANIDO: "#03045e",   // azul escuro
  SUSPENSO: "#0096c7", // azul
  INATIVO: "#90e0ef"   // azul claro
};

export default function Status() {
  const navigate = useNavigate();
  const location = useLocation();
  const [beneficiarios, setBeneficiarios] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [listLoading, setListLoading] = useState(false);
  const [modalVisualizacao, setModalVisualizacao] = useState(null);
  const [selectedBeneficiario, setSelectedBeneficiario] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [confirmacao, setConfirmacao] = useState(null);


  useEffect(() => {
    if (location.state?.beneficiarioSelecionado) {
      const beneficiario = location.state.beneficiarioSelecionado;
      setSelectedBeneficiario(beneficiario);
      setNewStatus(beneficiario.status || "INATIVO");
    }
  }, [location.state]);

  const fetchBeneficiarios = useCallback(async (page = currentPage, searchValue = searchTerm, statusValue = filter, isSearch = false) => {
    if (isSearch) {
      setListLoading(true);
    } else {
      setLoading(true);
    }

    try {
      const token = localStorage.getItem("token");

      const params = {
        page,
        size: pageSize,
        search: searchValue ? searchValue.trim() : ""
      };

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

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleFilterChange = (e) => {
    const newFilter = e.target.value;
    setFilter(newFilter);
    setCurrentPage(1);
    setSearchTerm("");
    setSearch("");
    fetchBeneficiarios(1, "", newFilter, true);
  };

  const handleAbrirModalVisualizacao = (beneficiario) => {
    setModalVisualizacao(beneficiario);
  };

  const handleFecharModalVisualizacao = () => {
    setModalVisualizacao(null);
  };

  const handleVisualizarProntuario = (beneficiario) => {
    console.log("Beneficiário clicado:", beneficiario);
    setModalVisualizacao(null);
    navigate(`/prontuario?idBeneficiario=${beneficiario.idBeneficiario}`);
  };


  const handleAbrirModalEditar = (beneficiario) => {
    setModalVisualizacao(null);
    setSelectedBeneficiario(beneficiario);
    setNewStatus(beneficiario.status || "INATIVO");
  };

  const handleAbrirModalStatus = (beneficiario) => {
    setModalVisualizacao(beneficiario);
  };

  const handleFecharModalStatus = () => {
    setSelectedBeneficiario(null);
    setNewStatus("");
    if (beneficiarios.length > 0) {
      const beneficiarioAtual = beneficiarios.find(b => b.id === selectedBeneficiario?.id);
      if (beneficiarioAtual) {
        setModalVisualizacao(beneficiarioAtual);
      }
    }
  };

  const handleSalvarStatus = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/beneficiarios/${selectedBeneficiario.idBeneficiario}/status`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setBeneficiarios((prev) =>
        prev.map((b) =>
          b.idBeneficiario === selectedBeneficiario.idBeneficiario
            ? { ...b, status: newStatus }
            : b
        )
          .filter((b) => (b.status || "").toString().trim().toUpperCase() !== "ATIVO")

          .filter((b) =>
            filter === "ALL" ? true : b.status.toUpperCase() === filter.toUpperCase()
          )
      );

      setModalVisualizacao((prev) =>
        prev && prev.idBeneficiario === selectedBeneficiario.idBeneficiario
          ? { ...prev, status: newStatus }
          : prev
      );

      setSelectedBeneficiario(null);
      setNewStatus("");

      setConfirmacao({
        status: 'sucesso',
        mensagem: `Status de ${selectedBeneficiario.nomeRegistro} alterado para ${newStatus}!`
      });

      setTimeout(() => {
        setConfirmacao(null);
      }, 3000);
    } catch (err) {
      console.error("Erro ao alterar status:", err);
      setConfirmacao({
        status: 'erro',
        mensagem: "Erro ao alterar status. Tente novamente."
      });

      setTimeout(() => {
        setConfirmacao(null);
      }, 4000);
    }
  };

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
          className="select-categoria"
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
                <div
                  // key={item.id || index}
                  key={item.idBeneficiario}
                  className="status-card"
                  onClick={() => handleAbrirModalStatus(item)}
                  style={{ cursor: "pointer" }}
                >
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

      {totalPages > 1 && (
        <div className="pagination-container">
          <button
            className="pagination-btn"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          >
            &#8249;
          </button>

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
            {currentPage} / {totalPages} ({totalItems} itens)
          </div>
        </div>
      )}

      {/* === MODAL DE VISUALIZAÇÃO DE STATUS === */}
      {modalVisualizacao && (
        <div className="modal-overlay">
          <div className="modal-card">
            <button className="modal-close" onClick={handleFecharModalVisualizacao}>
              ✕
            </button>

            <h3>Informações do Beneficiário</h3>

            <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
              {/* Foto ao lado */}
              <div style={{ flexShrink: 0 }}>
                <img
                  src={modalVisualizacao.fotoPerfil || IconDefault}
                  alt={modalVisualizacao.nomeRegistro}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    marginTop: "50px",
                  }}
                />
              </div>

              {/* Campos ao lado da foto */}
              <div className="modal-form" style={{ flex: 1 }}>
                <label>Nome</label>
                <input
                  type="text"
                  value={modalVisualizacao.nomeRegistro}
                  disabled
                  style={{
                    backgroundColor: "#f0f0f0",
                    cursor: "not-allowed"
                  }}
                />

                <label>Status Atual</label>
                <input
                  type="text"
                  value={modalVisualizacao.status}
                  disabled
                  style={{
                    backgroundColor: "#f0f0f0",
                    cursor: "not-allowed"
                  }}
                />
              </div>
            </div>

            <div className="modal-actions-init" style={{ marginTop: "20px" }}>
              <button
                className="btn-verde"
                onClick={() => handleVisualizarProntuario(modalVisualizacao)}
              >
                Visualizar Prontuário
              </button>
              <button
                className="btn-salvar"
                onClick={() => handleAbrirModalEditar(modalVisualizacao)}

              >
                Editar Status
              </button>
            </div>
          </div>
        </div>
      )}

      <ModalEditarStatus
        beneficiario={selectedBeneficiario}
        newStatus={newStatus}
        setNewStatus={setNewStatus}
        onClose={handleFecharModalStatus}
        onSave={handleSalvarStatus}
      />


      {/* === CARD DE CONFIRMAÇÃO === */}
      {confirmacao && (
        <div className={`confirmacao-card confirmacao-${confirmacao.status}`}>
          <div className="confirmacao-content">
            {confirmacao.status === 'sucesso' ? (
              <>
                <span className="confirmacao-icon">✓</span>
                <span className="confirmacao-mensagem">{confirmacao.mensagem}</span>
              </>
            ) : (
              <>
                <span className="confirmacao-icon confirmacao-erro-icon">✕</span>
                <span className="confirmacao-mensagem">{confirmacao.mensagem}</span>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
