// import React from "react";
// import "../css/Status.css";

// export default function ModalEditarStatus({
//   beneficiario,
//   newStatus,
//   setNewStatus,
//   onClose,
//   onSave,
// }) {
//   if (!beneficiario) return null;

//   return (
//     <div className="modal-overlay">
//       <div className="modal-card">
//         <button className="modal-close" onClick={onClose}>
//           ✕
//         </button>

//         <h3>Alterar Status</h3>
//         <p>
//           Beneficiário:{" "}
//           <strong>{beneficiario.nomeRegistro}</strong>
//         </p>

//         <div className="modal-form">
//           <label htmlFor="status-select">Novo Status</label>
//           <select
//             id="status-select"
//             value={newStatus}
//             onChange={(e) => setNewStatus(e.target.value)}
//             className="select-categoria"
//           >
//             <option value="INATIVO">Inativo</option>
//             <option value="ATIVO">Ativo</option>
//             <option value="BANIDO">Banido</option>
//             <option value="SUSPENSO">Suspenso</option>
//           </select>
//         </div>

//         <div className="modal-actions-delete">
//           <button className="btn-verde" onClick={onSave}>
//             Salvar
//           </button>
//           <button className="btn-vermelho" onClick={onClose}>
//             Voltar
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
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

        // Filtra o status atual do beneficiário
        const filtrados = res.data.filter(
          (item) => item !== beneficiario?.status
        );

        setStatusOptions(filtrados);
      } catch (error) {
        console.error("Erro ao carregar status:", error);
      }
    }

    if (beneficiario) {
      carregarStatus();
    }
  }, [beneficiario]);


  if (!beneficiario) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        <h3>Alterar Status</h3>

        <p>
          Beneficiário: <strong>{beneficiario.nomeRegistro}</strong>
        </p>

        <div className="modal-form">
          <label htmlFor="status-select">Novo Status</label>
          {/* 
          <select
            id="status-select"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            className="select-categoria"
          >
            <option value="">Selecione...</option>

            {statusOptions.map((item) => (
              <option key={item.idStatus} value={item.idStatus}>
                {item.nomeStatus}
              </option>
            ))}
          </select> */}

          <select
            id="status-select"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            className="select-categoria"
          >
            <option value="">Selecione...</option>
            {statusOptions.map((item) => (
              <option key={item} value={item}>
                {item === "ATIVO" ? "Ativo" :
                  item === "INATIVO" ? "Inativo" :
                    item === "BANIDO" ? "Banido" :
                      item === "SUSPENSO" ? "Suspenso" : item}
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
