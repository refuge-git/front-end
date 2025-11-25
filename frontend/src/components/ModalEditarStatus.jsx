import React, { useEffect, useState } from "react";
import api from "../provider/api";
import "../css/Status.css";

export default function ModalEditarStatus({
  beneficiario,
  newStatus,
  setNewStatus,
  onClose,
  onSave,
}) {
  const [statusOptions, setStatusOptions] = useState([]);

  useEffect(() => {
    async function carregarStatus() {
      try {
        const res = await api.get("/beneficiarios/statusEnum");
        console.log("Status carregados do backend:", res.data);

        if (beneficiario) {
          console.log("Beneficiário recebido:", beneficiario);
          console.log("Campos disponíveis:", Object.keys(beneficiario));

          const statusAtual =
            beneficiario.status ||
            beneficiario.statusEnum ||
            beneficiario.estado ||
            "";
          console.log("Status atual do beneficiário:", statusAtual);

          // ⬇️ Filtra as opções removendo o status atual
          const filtrados = res.data.filter((s) => s !== statusAtual);
          setStatusOptions(filtrados);

          // ⬇️ Inicia o select vazio, já que o atual não estará na lista
          setNewStatus("");
        }
      } catch (error) {
        console.error("Erro ao carregar status:", error);
      }
    }

    if (beneficiario) {
      carregarStatus();
    }
  }, [beneficiario, setNewStatus]);

  if (!beneficiario) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        <h3>Alterar Status</h3>

        <p>
          Beneficiário:{" "}
          <strong>{beneficiario.nomeRegistro || beneficiario.nome || "Sem nome"}</strong>
        </p>

        <div className="modal-form">
          <label htmlFor="status-select">Novo Status</label>

          <select
            id="status-select"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            className="select-categoria"
          >
            <option value="">Selecione...</option>
            {statusOptions.map((item) => (
              <option key={item} value={item}>
                {item === "ATIVO"
                  ? "Ativo"
                  : item === "INATIVO"
                  ? "Inativo"
                  : item === "BANIDO"
                  ? "Banido"
                  : item === "SUSPENSO"
                  ? "Suspenso"
                  : item}
              </option>
            ))}
          </select>
        </div>

        <div className="modal-actions-delete">
          <button className="btn-verde" onClick={onSave}>
            Salvar
          </button>
          <button className="btn-vermelho" onClick={onClose}>
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}
