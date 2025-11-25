import Avatar from "../assets/Avatar.png";
import "../css/App.css";
import Input from "../components/Input";
import api from "../provider/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Perfil({ onClose }) {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [dados, setDados] = useState({
    nome: "",
    email: "",
    telefone: "",
    cpf: ""
  });

  const [emailOriginal, setEmailOriginal] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [confirmacao, setConfirmacao] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    api
      .get("/funcionarios/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const f = res.data || {};

        const nomeObtido =
          f.nome ||
          f.nomeRegistro ||
          f.nomeCompleto ||
          f.fullName ||
          "";

        setNome(nomeObtido);

        setDados({
          nome: nomeObtido,            // ✔ agora correto
          email: f.email || "",
          telefone: f.telefone || "",
          cpf: f.cpf || "",
        });

        setEmailOriginal(f.email || "");
      })
      .catch((err) => {
        console.error("Erro ao carregar perfil:", err);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const token = localStorage.getItem("token");

    try {
      await api.put("/funcionarios/me", dados, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const emailFoiAlterado = dados.email !== emailOriginal;

      setConfirmacao({
        status: "sucesso",
        mensagem: emailFoiAlterado
          ? "E-mail atualizado com sucesso! Você será desconectado..."
          : "Perfil atualizado com sucesso!",
      });

      setTimeout(() => setConfirmacao(null), 2500);

      if (emailFoiAlterado) {
        setTimeout(() => {
          localStorage.removeItem("token");
          navigate("/");
        }, 1500);
        return;
      }

      const refresh = await api.get("/funcionarios/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const f = refresh.data;

      const nomeAtualizado =
        f.nome ||
        f.nomeRegistro ||
        f.nomeCompleto ||
        f.fullName ||
        dados.nome;

      setNome(nomeAtualizado);

      setDados({
        nome: nomeAtualizado,
        email: f.email || "",
        telefone: f.telefone || "",
        cpf: f.cpf || "",
      });

      setEmailOriginal(f.email || "");
      setIsEditing(false);

    } catch (err) {
      console.error("Erro ao atualizar perfil:", err);

      setConfirmacao({
        status: "erro",
        mensagem: "Erro ao atualizar perfil.",
      });

      setTimeout(() => setConfirmacao(null), 3500);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="perfil-container">
      <button className="close-button" onClick={onClose}>✖</button>

      <div className="perfil-header">
        <h2>Seu Perfil</h2>

        <div className="avatar-container">
          <img src={Avatar} alt="Foto de Perfil" className="perfil-avatar" />
        </div>
      </div>

      <div className="perfil-grid-one-columns">
        <div className="form-group">
          <label>Nome</label>
          <Input
            className="input-des"
            type="text"
            value={dados.nome}
            disabled={!isEditing}
            onChange={(e) =>
              setDados({ ...dados, nome: e.target.value })
            }
          />
        </div>
      </div>

      {/* Email */}
      <div className="perfil-grid-one-columns">
        <div className="form-group">
          <label>Email</label>
          <Input
            className="input-des"
            type="email"
            value={dados.email}
            disabled={!isEditing}
            onChange={(e) =>
              setDados({ ...dados, email: e.target.value })
            }
          />
        </div>
      </div>

      <div className="perfil-grid">
        <div className="form-group">
          <label>Telefone</label>
          <Input
            className="input-des"
            type="text"
            value={dados.telefone}
            disabled={!isEditing}
            onChange={(e) =>
              setDados({ ...dados, telefone: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>CPF</label>
          <Input
            className="input-des"
            type="text"
            value={dados.cpf}
            disabled={!isEditing}
            onChange={(e) =>
              setDados({ ...dados, cpf: e.target.value })
            }
          />
        </div>
      </div>

      {!isEditing ? (
        <button className="perfil-edit-btn" onClick={() => setIsEditing(true)}>
          Editar
        </button>
      ) : (
        <div className="perfil-actions">
          <button className="perfil-save-btn" onClick={handleSave} disabled={saving}>
            {saving ? "Salvando..." : "Salvar"}
          </button>

          <button
            className="perfil-cancel-btn"
            onClick={() => setIsEditing(false)}
            disabled={saving}
          >
            Cancelar
          </button>
        </div>
      )}

      {confirmacao && (
        <div className={`confirmacao-card confirmacao-${confirmacao.status}`}>
          <div className="confirmacao-content">
            {confirmacao.status === "sucesso" ? (
              <>
                <span className="confirmacao-icon">✓</span>
                <span className="confirmacao-mensagem">
                  {confirmacao.mensagem}
                </span>
              </>
            ) : (
              <>
                <span className="confirmacao-icon confirmacao-erro-icon">✕</span>
                <span className="confirmacao-mensagem">
                  {confirmacao.mensagem}
                </span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
