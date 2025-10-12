import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../provider/api";

import Input from "../components/Input";
import Botao from "../components/Botao";
import SidebarCondicoes from "../components/SideBarCondicoes";
import "../css/App.css";

export default function EnderecoForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const idBeneficiario = queryParams.get("idBeneficiario");

  const [form, setForm] = useState({
    cep: "",
    tipoLogradouro: "",
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    observacao: "",
  });

  const [erro, setErro] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    // setForm({ ...form, [e.target.name]: e.target.value });
    const updatedForm = { ...form, [e.target.name]: e.target.value };
    setForm(updatedForm);
    sessionStorage.setItem("formEndereco", JSON.stringify(updatedForm));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    if (!form.cep || !form.logradouro || !form.numero || !form.bairro || !form.cidade) {
      setErro("Preencha todos os campos obrigatórios!");
      return;
    }

    try {
      const payload = {
        cep: form.cep,
        tipoLogradouro: form.tipoLogradouro,
        nomeLogradouro: form.logradouro,
        numero: form.numero,
        complemento: form.complemento,
        bairro: form.bairro,
        nomeLocalidade: form.cidade,
        observacao: form.observacao,
        idBeneficiario: idBeneficiario,
      };

      const response = await api.post("/enderecos", payload);

      setShowConfirm(true);

      setTimeout(() => {
        navigate(`/condicoes-saude?idBeneficiario=${idBeneficiario}`);
      }, 2000);
    } catch (error) {
      console.error(error);
      setErro("Erro ao cadastrar endereço. Tente novamente.");
    }
  };

  const handleClose2 = () => {
    navigate(`/condicoes-saude?idBeneficiario=${idBeneficiario}`);
  };

  const handleClose = () => {
    localStorage.removeItem("formBeneficiario");
    sessionStorage.removeItem("formEndereco");
    localStorage.removeItem("idBeneficiario");
    navigate("/home");
  };


  const [activeSection, setActiveSection] = useState("endereco");

  useEffect(() => {
    const savedForm = sessionStorage.getItem("formEndereco");
    if (savedForm) {
      setForm(JSON.parse(savedForm));
    }
  }, []);

  return (
    <div className="condicoes-saude-container">
      <div className="condicoes-saude-box">
        <button className="close-button" onClick={handleClose}>✕</button>

        <SidebarCondicoes
          activeSection={activeSection}
          onSectionChange={(sectionId) => {
            const idBeneficiario = localStorage.getItem("idBeneficiario");
            if (sectionId === "prontuario") {
              navigate("/registro-cadastro");
            } else if (sectionId === "condicao-saude") {
              navigate(`/condicoes-saude?idBeneficiario=${idBeneficiario}`);
            } else {
              setActiveSection(sectionId);
            }
          }}
        />

        <div className="condicoes-content">
          <h2>Cadastrar Endereço</h2>

          {erro && <p className="erro">{erro}</p>}

          {/* Card de confirmação reutilizado */}
          {showConfirm && (
            <div className="confirm-overlay">
              <div className="confirm-card">
                <div className="confirm-icon"></div>
                <div>
                  <h3>Cadastro realizado!</h3>
                  <p>Endereço cadastrado com sucesso.<br />Você será redirecionado para as condições de saúde.<br /></p>
                </div>
              </div>
            </div>
          )}

          <form className="form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>CEP</label>
                <Input name="cep" placeholder="CEP" value={form.cep} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Tipo de Logradouro</label>
                <Input
                  name="tipoLogradouro"
                  placeholder="Rua, Avenida, Travessa..."
                  value={form.tipoLogradouro || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Logradouro</label>
                <Input name="logradouro" placeholder="Logradouro" value={form.logradouro} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Número</label>
                <Input name="numero" placeholder="Número" value={form.numero} onChange={handleChange} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Complemento</label>
                <Input name="complemento" placeholder="Complemento" value={form.complemento} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Bairro</label>
                <Input name="bairro" placeholder="Bairro" value={form.bairro} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Cidade</label>
                <Input name="cidade" placeholder="Cidade" value={form.cidade} onChange={handleChange} />
              </div>
            </div>

            <div className="form-group full-width">
              <label>Observação</label> <br />
              <textarea
                name="observacao"
                placeholder="Observação"
                value={form.observacao}
                onChange={handleChange}
              />
            </div>

            <div className="form-buttons">
              <Botao type="button" className="btn-pular" onClick={handleClose2}>Proximo</Botao>
              <Botao type="submit" className="btn-salvar">Salvar</Botao>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
