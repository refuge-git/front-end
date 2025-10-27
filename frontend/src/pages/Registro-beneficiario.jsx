import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../provider/api";
import Perfil from "../assets/Avatar.png";
import Input from "../components/Input";
import Botao from "../components/Botao";
import SidebarCondicoes from "../components/SideBarCondicoes";
import "../css/App.css";

export default function RegistrationForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    registro: "",
    sisa: "",
    nomeMae: "",
    nascimento: "",
    cpf: "",
    genero: "",
    raca: "",
    egresso: "",
    estrangeiro: "",
    sexo: "",
    sexualidade: "",
    nomeSocial: "",
    localDormir: "",
    status: "",
    observacao: "",
  });

  const [nomeSocialAtivo, setNomeSocialAtivo] = useState(false);
  const [erro, setErro] = useState("");
  const [activeSection, setActiveSection] = useState("prontuario");
  const [showConfirm, setShowConfirm] = useState(false);
  const [alerta, setAlerta] = useState(""); // Novo estado para o card de alerta


  // Estado de imagem
  const [previewImg, setPreviewImg] = useState(null);

  // Referência para o input file (fica escondido)
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImg(URL.createObjectURL(file));

      // Conversão para base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(",")[1];
        setForm({ ...form, imagem: base64String })
      };
      reader.readAsDataURL(file);
    }
  }



  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    if (!form.registro || !form.cpf || !form.nascimento) {
      setErro("Preencha os campos obrigatórios!");
      return;
    }

    try {
      const payloadBeneficiario = {
        ...form, // 
        nomeRegistro: form.registro,
        nomeSocial: nomeSocialAtivo ? form.nomeSocial : form.registro,
        dtNasc: form.nascimento.split("/").reverse().join("-"),
        cpf: form.cpf,
        estrangeiro: false,
        raca: form.raca,
        sexo: form.sexo.toUpperCase(),
        nomeMae: form.nomeMae,
        egressoPrisional: form.egresso === "sim",
        localDorme: form.localDormir.toUpperCase(),
        imagem: form.imagem,
        sisa: form.sisa,
        status: form.status || "ATIVO",
        observacao: form.observacao,
        idFuncionario: 1,
        idEndereco: null,
        idTipoGenero: form.genero === "masculino" ? 1 : 2,
        idTipoSexualidade:
          form.sexualidade === "hetero" ? 1 :
            form.sexualidade === "homo" ? 2 :
              form.sexualidade === "bi" ? 3 : 4,
      };

      const response = await api.post("/beneficiarios", payloadBeneficiario);

      const idBeneficiario = response.data.id;
      console.log("ID do beneficiário cadastrado:", idBeneficiario);
      localStorage.setItem("formBeneficiario", JSON.stringify(form));
      localStorage.setItem("idBeneficiario", idBeneficiario);
      setShowConfirm(true);

      setTimeout(() => {
        navigate(`/Registro-endereco?idBeneficiario=${idBeneficiario}`);
      }, 2000);

    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.error) {
        setErro(error.response.data.error);
      } else {
        setErro("Erro ao cadastrar beneficiário. Tente novamente.");
      }
    }
  };


  const handleClose = () => {
    localStorage.removeItem("formBeneficiario");
    // sessionStorage.removeItem("formEndereco");
    // localStorage.removeItem("idBeneficiario");
    navigate("/home");
  };

  useEffect(() => {
    if (erro) {
      const timer = setTimeout(() => setErro(""), 1000);
      return () => clearTimeout(timer);
    }
  }, [erro]);

  useEffect(() => {

    // const savedForm = localStorage.getItem("formBeneficiario");
    // if (savedForm) {
    //   setForm(JSON.parse(savedForm));
    // }

    const savedNomeSocial = localStorage.getItem("nomeSocialAtivo");
    if (savedNomeSocial) {
      setNomeSocialAtivo(savedNomeSocial === "true");
    }
  }, []);

  // faz o card de alerta sumir automaticamente após 2 segundos
  useEffect(() => {
    if (!alerta) return;
    const timer = setTimeout(() => setAlerta(""), 2000);
    return () => clearTimeout(timer);
  }, [alerta]);

  return (
    <div className="condicoes-saude-container">
      <div className="condicoes-saude-box">
        <button className="close-button" onClick={handleClose}>✕</button>

        <SidebarCondicoes
          activeSection={activeSection}
          onSectionChange={(sectionId) => {

            const idBeneficiario = localStorage.getItem("idBeneficiario");

            if (sectionId === "condicao-saude") {
              if (idBeneficiario) {
                navigate(`/condicoes-saude?idBeneficiario=${idBeneficiario}`);
              } else {
                setAlerta("Cadastre um beneficiário antes de cadastrar condições de saúde.");
              }
            } else if (sectionId === "endereco") {
              if (idBeneficiario) {
                navigate(`/Registro-endereco?idBeneficiario=${idBeneficiario}`);
              } else {
                setAlerta("Cadastre um beneficiário antes de cadastrar um endereço.");
              }
            }
            else {
              setActiveSection(sectionId);
            }
          }}
        />

        <div className="condicoes-content">
          <h2>Cadastrar novo beneficiário</h2>

          {/* Card de erro */}
          {erro && (
            <div className="confirm-overlay">
              <div className="error-card">
                <div className="error-icon"></div>
                <div>
                  <h3>Erro ao cadastrar</h3>
                  <p>{erro}</p>
                </div>
              </div>
            </div>
          )}

          {/* Card de confirmação */}
          {showConfirm && (
            <div className="confirm-overlay">
              <div className="confirm-card">
                <div className="confirm-icon"></div>
                <div>
                  <h3>Cadastro realizado!</h3>
                  <p>Beneficiário cadastrado com sucesso.<br />Você será redirecionado para cadastrar o endereço.<br /></p>
                </div>
              </div>
            </div>
          )}

          {/* Card de alerta */}
          {alerta && (
            <div className="confirm-overlay">
              <div
                className="error-card"
                style={{
                  height: 150,

                }}
              >
                <div className="error-icon" style={{ marginRight: 16 }}></div>
                <div style={{ textAlign: "center" }}>
                  <h3>Atenção</h3>
                  <p>{alerta}</p>
                </div>
              </div>
            </div>
          )}

          <form className="form" onSubmit={handleSubmit}>
            <div className="avatarSection">
              <img
                src={previewImg || Perfil}
                alt="Avatar"
                className="avatar"
                onClick={handleAvatarClick}
                style={{ cursor: "pointer" }}
              />

              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleImageChange}
              />

              <div className="avatar-fields">
                <div className="form-row">
                  <div className="form-group">
                    <label>Nome de Registro</label>
                    <Input
                      name="registro"
                      placeholder="Nome de Registro"
                      value={form.registro}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>SISA</label>
                    <Input
                      name="sisa"
                      placeholder="SISA"
                      value={form.sisa}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Nome da Mãe</label>
                    <Input
                      name="nomeMae"
                      placeholder="Nome da Mãe"
                      value={form.nomeMae}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Data de Nascimento</label>
                    <Input
                      type="date"
                      name="nascimento"
                      placeholder="DD/MM/AAAA"
                      value={form.nascimento}
                      onChange={handleChange}
                      style={{
                        color: form.nascimento ? "#000000" : "#aaa", // preto ao digitar, cinza quando vazio
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* CPF + Gênero + Raça + Egresso */}
            <div className="form-row">
              <div className="form-group">
                <label>CPF</label>
                <Input
                  name="cpf"
                  placeholder="CPF"
                  value={form.cpf}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Gênero</label>
                <select
                  name="genero"
                  value={form.genero}
                  onChange={handleChange}
                  className="select-categoria"
                >
                  <option value="">Selecione</option>
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                </select>
              </div>
              <div className="form-group">
                <label>Raça</label>
                <select
                  name="raca"
                  value={form.raca}
                  onChange={handleChange}
                  className="select-categoria"
                >
                  <option value="">Selecione</option>
                  <option value="BRANCO">Branco(a)</option>
                  <option value="PRETO">Preto(a)</option>
                  <option value="PARDO">Pardo(a)</option>
                  <option value="AMARELA">Amarelo(a)</option>
                  <option value="INDIGENA">Indigena</option>
                  <option value="NAO_DECLARADO">Não declarado</option>

                </select>
              </div>
              <div className="form-group">
                <label>Egresso Prisional</label>
                <select
                  name="egresso"
                  value={form.egresso}
                  onChange={handleChange}
                  className="select-categoria"
                >
                  <option value="">Selecione</option>
                  <option value="sim">Sim</option>
                  <option value="nao">Não</option>
                </select>
              </div>
            </div>

            {/* Sexo + Sexualidade + Local + Status */}
            <div className="form-row">
              <div className="form-group">
                <label>Sexo</label>
                <select
                  name="sexo"
                  value={form.sexo}
                  onChange={handleChange}
                  className="select-categoria"
                >
                  <option value="">Selecione</option>
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                </select>
              </div>
              <div className="form-group">
                <label>Sexualidade</label>
                <select
                  name="sexualidade"
                  value={form.sexualidade}
                  onChange={handleChange}
                  className="select-categoria"
                >
                  <option value="">Selecione</option>
                  <option value="hetero">Heterossexual</option>
                  <option value="homo">Homossexual</option>
                  <option value="bi">Bissexual</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
              <div className="form-group">
                <label>Local onde Dorme</label>
                <select
                  name="localDormir"
                  value={form.localDormir}
                  onChange={handleChange}
                  className="select-categoria"
                >
                  <option value="">Selecione</option>
                  <option value="casa">Casa</option>
                  <option value="abrigo">Abrigo</option>
                  <option value="rua">Rua</option>
                </select>
              </div>
              <div className="form-group">
                <label>Status</label>
                <div className="input-with-indicator">
                  <span className="status-indicator"></span>
                  <Input
                    name="status"
                    value="Ativo"
                    disabled
                    className="input-des"
                  />
                </div>
              </div>
            </div>

            {/* Nome social */}
            <div className="form-group full-width nome-social-section">
              <label>Nome Social</label>
              <div className="switch-container">
                <label className="switch-two">
                  <input
                    type="checkbox"
                    checked={nomeSocialAtivo}
                    onChange={() => setNomeSocialAtivo(!nomeSocialAtivo)}
                  />
                  <span className="slider"></span>
                </label>
                <div className="nome-social-input">
                  <Input
                    name="nomeSocial"
                    placeholder="Nome Social"
                    value={form.nomeSocial}
                    onChange={handleChange}
                    disabled={!nomeSocialAtivo}
                  />
                </div>
              </div>
            </div>

            {/* Observação */}
            <div className="form-group full-width">
              <label>Observação</label> <br />
              <textarea
                name="observacao"
                placeholder="Observação"
                value={form.observacao}
                onChange={handleChange}
              />
            </div>

            {/* Botões */}
            <div className="form-buttons">
              <Botao type="button" className="btn-pular" onClick={handleClose}>
                Cancelar
              </Botao>
              <Botao type="submit" className="btn-salvar">
                Salvar
              </Botao>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
