import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Beneficiarios.css";
import Icon from "../assets/perfil-s-fundo.png";
import IconLupa from "../assets/lupa.png";
import HelpIcon from "../assets/help.png";
import DeleteIcon from "../assets/delete.png";
import Botao from "./Botao";
import api from "../provider/api";

export default function Beneficiarios() {
  const [search, setSearch] = useState("");
  const [beneficiariosList, setBeneficiariosList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [ativosCount, setAtivosCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBeneficiario, setSelectedBeneficiario] = useState(null); // para exclusão
  const [presencaBeneficiario, setPresencaBeneficiario] = useState(null); // para presença

  // Estados para paginação
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize] = useState(5);
  const [totalItems, setTotalItems] = useState(0);

  // Estado para debounce da busca
  const [searchTerm, setSearchTerm] = useState("");

  // Estado para controlar loading apenas da lista
  const [listLoading, setListLoading] = useState(false);
  const [modalAtividadesOpen, setModalAtividadesOpen] = useState(false);

  // Função para abrir modal (reseta paginação)
  const handleAbrirModalAtividades = () => {
    setAtividadesModalPage(0);
    setModalAtividadesOpen(true);
  };

  // Função para fechar modal
  const handleFecharModalAtividades = () => {
    setModalAtividadesOpen(false);
  };

  // Função para adicionar nova atividade ao estado
  const handleAdicionarAtividade = (atividade) => {
    setAtividadesCadastradas((prev) => [...prev, { nome: atividade.nome }]);
  };

  const [atividades, setAtividades] = useState({
    PRESENCA: false,
    BANHO: false,
    REFEICAO: false,
  });

  // controle do modo "nova atividade"
  const [novaAtividadeMode, setNovaAtividadeMode] = useState(false);
  const [novaAtividade, setNovaAtividade] = useState({
    nome: "",
    observacao: "",
  });

  const navigate = useNavigate();

  // Função para buscar beneficiários com paginação
  const fetchBeneficiarios = useCallback(async (page = currentPage, searchValue = searchTerm, isSearch = false) => {
    // Se for busca, usar listLoading; se for carregamento inicial, usar loading
    if (isSearch) {
      setListLoading(true);
    } else {
      setLoading(true);
    }

    try {
      const token = localStorage.getItem("token");

      const hoje = new Date();
      const diaSemana = hoje.getDay() === 0 ? 1 : hoje.getDay() + 1;

      const [frequenciaRes, allRes] = await Promise.all([
        api.get("/beneficiarios/listar-page-frequencia", {
          params: {
            diaSemana,
            page,
            size: pageSize,
            search: searchValue || null
          },
          headers: { Authorization: `Bearer ${token}` },
        }),
        api.get("/beneficiarios", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      console.log("Frequência:", frequenciaRes.data);
      console.log("Todos os beneficiários:", allRes.data);

      // Lista paginada
      if (frequenciaRes.data && Array.isArray(frequenciaRes.data.items)) {
        setBeneficiariosList(frequenciaRes.data.items);
        setTotalItems(frequenciaRes.data.total);
        setTotalPages(Math.ceil(frequenciaRes.data.total / pageSize));
        setCurrentPage(frequenciaRes.data.page);
      } else {
        setBeneficiariosList([]);
        setTotalItems(0);
        setTotalPages(0);
        console.warn("Formato inesperado (frequência):", frequenciaRes.data);
      }

      // Lista completa
      if (Array.isArray(allRes.data)) {
        setTotalCount(allRes.data.length);
        setAtivosCount(allRes.data.filter((b) => b && b.status === "ATIVO").length);
      } else {
        setTotalCount(0);
        setAtivosCount(0);
        console.warn("Formato inesperado (todos):", allRes.data);
      }
    } catch (err) {
      console.error("Erro ao buscar beneficiários:", err);
      setError("Não foi possível carregar os beneficiários.");
    } finally {
      setLoading(false);
      setListLoading(false);
    }
  }, [currentPage, pageSize, searchTerm]);

  useEffect(() => {
    fetchBeneficiarios(1);
  }, []);

  // Estado para atividades cadastradas
  const [atividadesCadastradas, setAtividadesCadastradas] = useState([]);
  const [loadingAtividades, setLoadingAtividades] = useState(true);
  const [errorAtividades, setErrorAtividades] = useState(null);

  // Paginação para modais: 4 atividades por página
  const ITEMS_PER_PAGE = 4;
  const [atividadesModalPage, setAtividadesModalPage] = useState(0);
  const [presencaAtividadesPage, setPresencaAtividadesPage] = useState(0);

  // Busca atividades do banco
  useEffect(() => {
    const fetchAtividades = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/atendimentos", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (Array.isArray(res.data)) {
          setAtividadesCadastradas(res.data);
        } else {
          setAtividadesCadastradas([]);
        }
      } catch (err) {
        console.error("Erro ao carregar atividades:", err);
        setErrorAtividades("Não foi possível carregar as atividades");
      } finally {
        setLoadingAtividades(false);
      }
    };

    fetchAtividades();
  }, []);

  // Debounce para a busca
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm !== search) {
        setSearchTerm(search);
        setCurrentPage(1);
        fetchBeneficiarios(1, search, true); // true indica que é uma busca
      }
    }, 500); // 500ms de delay

    return () => clearTimeout(timeoutId);
  }, [search, fetchBeneficiarios]);

  // Função para navegar para uma página específica
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      fetchBeneficiarios(page, searchTerm, true); // true indica que é navegação
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


  const filteredList = beneficiariosList || [];

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

  const handleConfirmarPresenca = () => {
    const selecionadas = Object.keys(atividades).filter((k) => atividades[k]);
    const nomeBeneficiario = presencaBeneficiario?.nomeRegistro || presencaBeneficiario?.nome || presencaBeneficiario?.nomeSocial || "Beneficiário";
    console.log(
      `Atividades confirmadas para ${nomeBeneficiario}:`,
      selecionadas
    );


    setAtividades({ BANHO: false, REFEICAO: false });
    setPresencaBeneficiario(null);
  };

  const handleSalvarNovaAtividade = () => {
    if (!novaAtividade.nome.trim()) {
      alert("Informe o nome da atividade!");
      return;
    }

    console.log("Nova atividade cadastrada:", novaAtividade);


    setNovaAtividade({ nome: "", observacao: "" });
    setNovaAtividadeMode(false);
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
          {ativosCount} ativo(s) de {totalCount} total
        </span>
      </div>

      {/* Campo de busca */}
      <div className="beneficiarios-search">
        <img src={IconLupa} alt="Buscar" className="beneficiarios-search-img" />
        <input
          type="text"
          placeholder="Busque pelo nome..."
          value={search}
          onChange={handleSearchChange}
          className="beneficiarios-input"
        />
      </div>

      {/* Lista de beneficiários */}
      <div className="beneficiarios-list">
        {listLoading ? (
          <div className="beneficiarios-list-loading">
            <div className="loading-spinner"></div>
            <span>Carregando...</span>
          </div>
        ) : (
          <>
            {filteredList.map((item, i) => {
              const nome = item.nomeRegistro || item.nome || item.nomeSocial || "";
              console.log("🧩 item recebido:", item);
              return (
                <div key={item.id || i} className="beneficiarios-card">
                  <div
                    className="beneficiarios-card-info"
                    onClick={() => setPresencaBeneficiario(item)}
                    style={{ cursor: "pointer" }}
                  >
                    {/* Caso não exista e imagem sera utilizado ícone padrão */}
                    <img
                      src={item.imagemUrl || Icon}
                      alt={nome}
                      className="beneficiarios-card-img"
                    />
                    <span className="beneficiarios-card-name">{nome}</span>
                  </div>

                  {/* Ícone de deletar */}
                  <img
                    src={DeleteIcon}
                    alt="Deletar"
                    className="beneficiarios-delete-icon"
                    onClick={() => setSelectedBeneficiario(item)} // abre modal de exclusão
                  />
                </div>
              );
            })}

            {filteredList.length === 0 && !listLoading && (
              <div className="beneficiarios-empty">Nenhum beneficiário encontrado.</div>
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
            {currentPage} / {totalPages} ({totalItems} itens)
          </div>
        </div>
      )}

      {/* === MODAL DE EXCLUSÃO === */}
      {selectedBeneficiario && (
        <div className="modal-overlay">
          <div className="modal-card">
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

            <div className="modal-actions-delete">
              <button
                className="btn-verde"
                onClick={() => handleDelete(selectedBeneficiario)}
              >
                Sim
              </button>
              <button
                className="btn-vermelho"
                onClick={() => setSelectedBeneficiario(null)}
              >
                Não
              </button>
            </div>
          </div>
        </div>
      )}

      {/* === MODAL DE PRESENÇA === */}
      {presencaBeneficiario && (
        <div className="modal-overlay">
          <div className="modal-card">
            <button
              className="modal-close"
              onClick={() => {
                setPresencaBeneficiario(null);
                setNovaAtividadeMode(false);
              }}
            >
              ✕
            </button>

            {!novaAtividadeMode ? (
              <>
                {console.log("🔍 Modal - presencaBeneficiario:", presencaBeneficiario)}
                {console.log("🔍 Modal - Propriedades:", Object.keys(presencaBeneficiario || {}))}
                <h3>Selecione a Atividade Realizada</h3>
                <p>
                  Beneficiário:{" "}
                  <strong>
                    {presencaBeneficiario.nomeRegistro || presencaBeneficiario.nome || presencaBeneficiario.nomeSocial || "Nome não encontrado"}
                  </strong>
                </p>

                <div className="modal-switches">
                  {loadingAtividades ? (
                    <p>Carregando atividades...</p>
                  ) : errorAtividades ? (
                    <p>{errorAtividades}</p>
                  ) : atividadesCadastradas.length === 0 ? (
                    <p>Nenhuma atividade cadastrada.</p>
                  ) : (
                    (() => {
                      const totalPages = Math.max(1, Math.ceil(atividadesCadastradas.length / ITEMS_PER_PAGE));
                      const start = presencaAtividadesPage * ITEMS_PER_PAGE;
                      const pageItems = atividadesCadastradas.slice(start, start + ITEMS_PER_PAGE);

                      return (
                        <>
                          {pageItems.map((atividade) => (
                            <div
                              key={atividade.id}
                              className="atividade-card"
                            >
                              <label className="switch" style={{ margin: 0, flex: 1 }}>
                                {atividade.nome}
                                <input
                                  type="checkbox"
                                  checked={atividades[atividade.nome] || false}
                                  onChange={() =>
                                    setAtividades((prev) => ({
                                      ...prev,
                                      [atividade.nome]: !prev[atividade.nome],
                                    }))
                                  }
                                />
                                <span className="slider"></span>
                              </label>
                            </div>
                          ))}
                        </>
                      );
                    })()
                  )}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                  <div className="modal-paginacao" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '8px' }}>
                    <button
                      type="button"
                      onClick={() => setPresencaAtividadesPage((p) => Math.max(0, p - 1))}
                      disabled={presencaAtividadesPage <= 0}
                      style={presencaAtividadesPage <= 0 ? { background: 'transparent', border: 'none', padding: 0, margin: 0, fontSize: '1.2rem', color: '#ccc', cursor: 'default' } : { background: 'transparent', border: 'none', padding: 0, margin: 0, fontSize: '1.2rem', color: '#000', cursor: 'pointer' }}
                      aria-label="Página anterior"
                    >
                      ‹
                    </button>
                    <span style={{ fontSize: '0.9rem' }}>{presencaAtividadesPage + 1} / {Math.max(1, Math.ceil(atividadesCadastradas.length / ITEMS_PER_PAGE))}</span>
                    <button
                      type="button"
                      onClick={() => setPresencaAtividadesPage((p) => Math.min(Math.max(1, Math.ceil(atividadesCadastradas.length / ITEMS_PER_PAGE)) - 1, p + 1))}
                      disabled={presencaAtividadesPage >= Math.max(1, Math.ceil(atividadesCadastradas.length / ITEMS_PER_PAGE)) - 1}
                      style={presencaAtividadesPage >= Math.max(1, Math.ceil(atividadesCadastradas.length / ITEMS_PER_PAGE)) - 1 ? { background: 'transparent', border: 'none', padding: 0, margin: 0, fontSize: '1.2rem', color: '#ccc', cursor: 'default' } : { background: 'transparent', border: 'none', padding: 0, margin: 0, fontSize: '1.2rem', color: '#000', cursor: 'pointer' }}
                      aria-label="Próxima página"
                    >
                      ›
                    </button>
                  </div>

                  <div className="modal-actions">
                    <button
                      className="btn-verde"
                      onClick={() => {
                        setPresencaBeneficiario(null);
                        navigate(`/prontuario?idBeneficiario=${presencaBeneficiario.id}`);
                      }}
                    >
                      Visualizar prontuário
                    </button>
                    <button className="btn-vermelho" onClick={handleConfirmarPresenca}>
                      Salvar
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h3>Cadastrar nova atividade</h3>
                <div className="modal-form">
                  <label>Nome de Atividade</label>
                  <input
                    type="text"
                    placeholder="Nome da atividade"
                    value={novaAtividade.nome}
                    onChange={(e) =>
                      setNovaAtividade((prev) => ({
                        ...prev,
                        nome: e.target.value,
                      }))
                    }
                  />
                  <label>Observação</label>
                  <textarea
                    placeholder="Observação"
                    value={novaAtividade.observacao}
                    onChange={(e) =>
                      setNovaAtividade((prev) => ({
                        ...prev,
                        observacao: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="beneficiarios-actions">
                  <div className="modal-actions">
                    <button
                      className="btn-verde"
                      onClick={() => setNovaAtividadeMode(false)}
                    >
                      Voltar
                    </button>
                    <button className="btn-vermelho" onClick={handleSalvarNovaAtividade}>
                      Salvar
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}


      {/* === MODAL DE ATIVIDADES === */}

      {modalAtividadesOpen && (
        <div className="modal-overlay">
          <div className="modal-card">
            <button className="modal-close" onClick={handleFecharModalAtividades}>
              ✕
            </button>

            {!novaAtividadeMode ? (
              <>
                <h3>Atividades Cadastradas</h3>

                <div className="modal-atividades-list">
                  {loadingAtividades ? (
                    <p>Carregando atividades...</p>
                  ) : errorAtividades ? (
                    <p>{errorAtividades}</p>
                  ) : atividadesCadastradas.length === 0 ? (
                    <p>Nenhuma atividade cadastrada.</p>
                  ) : (
                    (() => {
                      const totalPages = Math.max(1, Math.ceil(atividadesCadastradas.length / ITEMS_PER_PAGE));
                      const start = atividadesModalPage * ITEMS_PER_PAGE;
                      const pageItems = atividadesCadastradas.slice(start, start + ITEMS_PER_PAGE);

                      return (
                        <>
                          {pageItems.map((atividade) => (
                            <div key={atividade.id} className="atividade-card">
                              <span className="atividade-nome">{atividade.nome}</span>
                              <img
                                src={DeleteIcon}
                                alt="Deletar"
                                className="beneficiarios-delete-icon"
                                onClick={async () => {
                                  try {
                                    const token = localStorage.getItem("token");
                                    await api.delete(`/atendimentos/${atividade.id}`, {
                                      headers: { Authorization: `Bearer ${token}` },
                                    });

                                    // remove locally and adjust pagination pages if needed
                                    setAtividadesCadastradas((prev) => {
                                      const updated = prev.filter((a) => a.id !== atividade.id);
                                      const totalPages = Math.max(1, Math.ceil(updated.length / ITEMS_PER_PAGE));
                                      setAtividadesModalPage((p) => Math.min(p, totalPages - 1));
                                      setPresencaAtividadesPage((p) => Math.min(p, totalPages - 1));
                                      return updated;
                                    });
                                  } catch (err) {
                                    console.error("Erro ao deletar atividade:", err);
                                    alert("Não foi possível excluir a atividade");
                                  }
                                }}
                              />
                            </div>
                          ))}
                        </>
                      );
                    })()
                  )}
                </div>

                {/* Paginação (lado esquerdo) e botão (lado direito) em uma linha */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                  <div className="modal-paginacao" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '8px' }}>
                    <button
                      type="button"
                      onClick={() => setAtividadesModalPage((p) => Math.max(0, p - 1))}
                      disabled={atividadesModalPage <= 0}
                      style={atividadesModalPage <= 0 ? { background: 'transparent', border: 'none', padding: 0, margin: 0, fontSize: '1.2rem', color: '#ccc', cursor: 'default' } : { background: 'transparent', border: 'none', padding: 0, margin: 0, fontSize: '1.2rem', color: '#000', cursor: 'pointer' }}
                      aria-label="Página anterior"
                    >
                      ‹
                    </button>
                    <span style={{ fontSize: '0.9rem' }}>{atividadesModalPage + 1} / {Math.max(1, Math.ceil(atividadesCadastradas.length / ITEMS_PER_PAGE))}</span>
                    <button
                      type="button"
                      onClick={() => setAtividadesModalPage((p) => Math.min(Math.max(1, Math.ceil(atividadesCadastradas.length / ITEMS_PER_PAGE)) - 1, p + 1))}
                      disabled={atividadesModalPage >= Math.max(1, Math.ceil(atividadesCadastradas.length / ITEMS_PER_PAGE)) - 1}
                      style={atividadesModalPage >= Math.max(1, Math.ceil(atividadesCadastradas.length / ITEMS_PER_PAGE)) - 1 ? { background: 'transparent', border: 'none', padding: 0, margin: 0, fontSize: '1.2rem', color: '#ccc', cursor: 'default' } : { background: 'transparent', border: 'none', padding: 0, margin: 0, fontSize: '1.2rem', color: '#000', cursor: 'pointer' }}
                      aria-label="Próxima página"
                    >
                      ›
                    </button>
                  </div>

                  <div>
                    <Botao
                      type="button"
                      className="botao botao-primario btn-salvar"
                      onClick={() => setNovaAtividadeMode(true)}
                    >
                      Adicionar nova atividade
                    </Botao>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h3>Cadastrar nova atividade</h3>
                <div className="modal-form">
                  <label>Nome de Atividade</label>
                  <input
                    type="text"
                    placeholder="Nome da atividade"
                    value={novaAtividade.nome}
                    onChange={(e) =>
                      setNovaAtividade((prev) => ({ ...prev, nome: e.target.value }))
                    }
                  />
                  <label>Observação</label>
                  <textarea
                    placeholder="Observação"
                    value={novaAtividade.observacao}
                    onChange={(e) =>
                      setNovaAtividade((prev) => ({ ...prev, observacao: e.target.value }))
                    }
                  />
                </div>

                <div className="modal-actions">
                  <button
                    className="btn-verde"
                    onClick={() => setNovaAtividadeMode(false)}
                  >
                    Voltar
                  </button>
                  <button
                    className="btn-vermelho"
                    onClick={async () => {
                      if (!novaAtividade.nome.trim()) {
                        alert("Informe o nome da atividade!");
                        return;
                      }

                      try {
                        const token = localStorage.getItem("token");
                        const idFuncionario = localStorage.getItem("idFuncionario"); // se você já salva o ID do funcionário logado
                        const payload = {
                          nome: novaAtividade.nome,
                          descricao: novaAtividade.observacao,
                          dtCriacao: new Date().toISOString(), // gera automaticamente a data/hora atual
                          idFuncionario: idFuncionario ? Number(idFuncionario) : 1 // fallback pra 1 se não tiver
                        };

                        const res = await api.post("/atendimentos", payload, {
                          headers: { Authorization: `Bearer ${token}` },
                        });

                        setAtividadesCadastradas(prev => [...prev, res.data]);
                        setNovaAtividade({ nome: "", observacao: "" });
                        setNovaAtividadeMode(false);
                      } catch (err) {
                        console.error("Erro ao cadastrar nova atividade:", err);
                        alert("Não foi possível cadastrar a atividade");
                      }
                    }}

                  >
                    Salvar
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Botões do rodapé */}
      <div className="beneficiarios-actions">

        <Botao type="button" className="btn-pular" onClick={handleAbrirModalAtividades}>
          Atividades
        </Botao>
        <Botao className="btn-salvar" type="button" onClick={handleCadastro}>
          Cadastrar novo beneficiário
        </Botao>
      </div>
    </section>
  );
}
