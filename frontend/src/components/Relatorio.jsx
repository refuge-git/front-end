import "../css/Relatorio.css";
import React, { useState, useEffect } from "react";

export default function Relatorio() {

  const [loadingId, setLoadingId] = useState(null);
  const [message, setMessage] = useState("");
  const [meses, setMeses] = useState([]);
  const [mesSelecionado, setMesSelecionado] = useState("");
  const [relatorios, setRelatorios] = useState([]);

  // Buscar meses disponíveis ao montar a página
  useEffect(() => {
    const fetchMeses = async () => {
      try {
        const token = localStorage.getItem("token");
        const apiModule = await import("../provider/api");
        const api = apiModule.default;

        const response = await api.get("/registros-atendimentos/relatorios/meses-disponiveis", {
          headers: { Authorization: `Bearer ${token}` }
        });

        setMeses(response.data);

        // Seleciona automaticamente o primeiro mês
        if (response.data.length > 0) {
          setMesSelecionado(response.data[0].mesReferencia);
        }
      } catch (error) {
        console.error("Erro ao buscar meses:", error);
        setMeses([]);
      }
    };

    fetchMeses();
  }, []);

  // Atualizar a lista de relatórios conforme mês selecionado
  useEffect(() => {
    if (!mesSelecionado) return;

    const mesExibicao = meses.find(m => m.mesReferencia === mesSelecionado)?.mesExibicao;

    if (mesExibicao) {
      setRelatorios([
        {
          id: 1,
          nome: `Relatório do mês ${mesExibicao}`
        }
      ]);
    } else {
      setRelatorios([]);
    }
  }, [mesSelecionado, meses]);

  const handleSendEmail = async (id) => {
    setLoadingId(id);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const apiModule = await import("../provider/api");
      const api = apiModule.default;

      await api.get(`/registros-atendimentos/relatorios/geral`, {
        params: { mes: mesSelecionado },
        headers: { Authorization: `Bearer ${token}` }
      });

      const mesExibicao = meses.find(m => m.mesReferencia === mesSelecionado)?.mesExibicao;
      setMessage(`Relatório de ${mesExibicao} enviado com sucesso por e-mail!`);

    } catch (error) {
      console.error("Erro ao enviar relatório:", error);
      setMessage("Erro ao enviar email do relatório.");
    }

    setLoadingId(null);

    setTimeout(() => {
      setMessage("");
    }, 4000);
  };

  return (
    <div className="relatorio-section">
      <div className="relatorio-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="relatorio-title">Relatórios</h2>

        <div className="relatorio-select-wrapper" style={{ minWidth: 140 }}>
          <select
            id="mes-relatorio"
            className="relatorio-select"
            value={mesSelecionado}
            onChange={e => setMesSelecionado(e.target.value)}
          >
            {meses.map(mes => (
              <option key={mes.mesReferencia} value={mes.mesReferencia}>
                {mes.mesExibicao}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="relatorio-lista">
        {relatorios.map((relatorio) => (
          <div key={relatorio.id} className="relatorio-item">
            <span className="relatorio-nome">{relatorio.nome}</span>

            <button
              className="relatorio-btn"
              onClick={() => handleSendEmail(relatorio.id)}
              disabled={loadingId === relatorio.id}
            >
              {loadingId === relatorio.id ? "Enviando..." : "Enviar por Email"}
            </button>
          </div>
        ))}
      </div>

      {message && <div className="relatorio-message">{message}</div>}
    </div>
  );
}
