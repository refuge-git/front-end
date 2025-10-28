import "../css/Relatorio.css";
import React, { useState } from "react";

export default function Relatorio() {
  const [loadingId, setLoadingId] = useState(null);
  const [message, setMessage] = useState("");

  const relatorios = [
    { id: 1, nome: "Relatório do mês de Outubro de 2025" }
  ];

  const handleSendEmail = async (id) => {
    setLoadingId(id);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const apiModule = await import("../provider/api");
      const api = apiModule.default;

      await api.get(`/registros-atendimentos/relatorios/presencas-por-dia`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMessage(`Email do relatório ${id} enviado com sucesso!`);
    } catch (error) {
      setMessage("Erro ao enviar email.");
    }

    setLoadingId(null);

    setTimeout(() => {
      setMessage("");
    }, 4000);
  };

  return (
    <div className="relatorio-section">
      <h2 className="relatorio-title">Relatórios</h2>

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
