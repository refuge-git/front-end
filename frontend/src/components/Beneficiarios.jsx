import React, { useState, useEffect } from "react";
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

    useEffect(() => {
      const fetchBeneficiarios = async () => {
        try {
          const token = localStorage.getItem("token");
          // buscar lista de frequência (o que você já fazia) e também a lista completa
          const [frequenciaRes, allRes] = await Promise.all([
            api.get("/beneficiarios/frequencia-dia-semana", {
              headers: { Authorization: `Bearer ${token}` },
            }),
            api.get("/beneficiarios", {
              headers: { Authorization: `Bearer ${token}` },
            }),
          ]);

          console.log("Frequência:", frequenciaRes.data);
          console.log("Todos os beneficiários:", allRes.data);

          if (Array.isArray(frequenciaRes.data)) {
            setBeneficiariosList(frequenciaRes.data);
          } else {
            setBeneficiariosList([]);
            console.warn("Formato inesperado (frequência):", frequenciaRes.data);
          }

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

    const handleConfirmarPresenca = () => {
      const selecionadas = Object.keys(atividades).filter((k) => atividades[k]);
      console.log(
        `Atividades confirmadas para ${presencaBeneficiario?.nome}:`,
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
                  onClick={() => setPresencaBeneficiario(item)} 
                  style={{ cursor: "pointer" }}
                >
                  {/* Caso não exista e imagem sera utilizado ícone padrão */}
                  <img
                    src={item.fotoPerfil || Icon}
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

          {filteredList.length === 0 && (
            <div className="beneficiarios-empty">Nenhum beneficiário encontrado.</div>
          )}
        </div>

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
                  <h3>Selecione a Atividade Realizada</h3>
                  <p>
                    Beneficiário:{" "}
                    <strong>
                      {presencaBeneficiario.nomeRegistro || presencaBeneficiario.nome}
                    </strong>
                  </p>

                  <div className="modal-switches">
                    {/* <label className="switch">
                      Presença
                      <input
                        type="checkbox"
                        checked={atividades.PRESENCA}
                        onChange={() =>
                          setAtividades((prev) => ({
                            ...prev,
                            PRESENCA: !prev.PRESENCA,
                          }))
                        }
                      />
                      <span className="slider"></span>
                    </label> */}

                    <label className="switch">
                      Banho
                      <input
                        type="checkbox"
                        checked={atividades.BANHO}
                        onChange={() =>
                          setAtividades((prev) => ({
                            ...prev,
                            BANHO: !prev.BANHO
                          }))
                        }
                      />
                      <span className="slider"></span>
                    </label>

                    <label className="switch">
                      Refeição
                      <input
                        type="checkbox"
                        checked={atividades.REFEICAO}
                        onChange={() =>
                          setAtividades((prev) => ({
                            ...prev,
                            REFEICAO: !prev.REFEICAO
                          }))
                        }
                      />
                      <span className="slider"></span>
                    </label>

                    <button
                      type="button"
                      className="btn-add-atividade"
                      onClick={() => setNovaAtividadeMode(true)}
                    >
                      + Adicionar nova atividade
                    </button>
                  </div>

                  <div className="modal-actions">
                    <button
                      className="btn-verde"
                      onClick={() => {
                        setPresencaBeneficiario(null);
                        navigate("/prontuario");    
                      }}

                    >
                      Visualizar prontuário
                    </button>
                    <button className="btn-vermelho" onClick={handleConfirmarPresenca}>
                      Salvar
                    </button>

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

        {/* Botões do rodapé */}
        <div className="beneficiarios-actions">
  

          <Botao className="btn-salvar" type="button" onClick={handleCadastro}>
            Cadastrar novo beneficiário
          </Botao>
        </div>
      </section>
    );
  }
