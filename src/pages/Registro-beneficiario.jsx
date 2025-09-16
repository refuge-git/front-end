// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../provider/api";

// import Perfil from "../assets/Avatar.png";
// import Input from "../components/Input";
// import Botao from "../components/Botao";
// import SidebarCondicoes from "../components/SideBarCondicoes";
// import "../css/App.css";

// export default function RegistrationForm() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     registro: "",
//     sisa: "",
//     nomeMae: "",
//     nascimento: "",
//     cpf: "",
//     genero: "",
//     raca: "",
//     egresso: "",
//     estrangeiro: "",
//     sexo: "",
//     sexualidade: "",
//     nomeSocial: "",
//     localDormir: "",
//     status: "",
//     observacao: "",
//   });

//   const [nomeSocialAtivo, setNomeSocialAtivo] = useState(false);
//   const [erro, setErro] = useState("");

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   setErro("");

//   //   // Validações simples
//   //   if (!form.registro || !form.cpf || !form.nascimento) {
//   //     setErro("Preencha os campos obrigatórios!");
//   //     return;
//   //   }

//   //   try {
//   //     const payload = {
//   //       nomeRegistro: form.registro,
//   //       nomeSocial: nomeSocialAtivo ? form.nomeSocial : form.registro,
//   //       dtNasc: form.nascimento.split("/").reverse().join("-"), 
//   //       cpf: form.cpf,
//   //       estrangeiro: false, 
//   //       raca: form.raca,
//   //       sexo: form.sexo.toUpperCase(),
//   //       nomeMae: form.nomeMae,
//   //       egressoPrisional: form.egresso === "sim",
//   //       localDorme: form.localDormir.toUpperCase(),
//   //       fotoPerfil: "", 
//   //       sisa: form.sisa,
//   //       status: form.status || "ATIVO",
//   //       observacao: form.observacao,
//   //       idFuncionario: 1, 
//   //       idEndereco: 3,   
//   //       idTipoGenero: form.genero === "masculino" ? 1 : 2, 
//   //       idTipoSexualidade:
//   //         form.sexualidade === "hetero" ? 1 :
//   //           form.sexualidade === "homo" ? 2 :
//   //             form.sexualidade === "bi" ? 3 : 4,
//   //     };

//   //     await api.post("/beneficiarios", payload);

//   //     alert("Beneficiário cadastrado com sucesso!");
//   //     navigate("/home");
//   //   } catch (error) {
//   //     console.error(error);
//   //     if (error.response && error.response.data && error.response.data.error) {
//   //       setErro(error.response.data.error);
//   //     } else {
//   //       setErro("Erro ao cadastrar beneficiário. Tente novamente.");
//   //     }
//   //   }
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErro("");

//     if (!form.registro || !form.cpf || !form.nascimento) {
//       setErro("Preencha os campos obrigatórios!");
//       return;
//     }

//     try {
//       const payloadBeneficiario = {
//         nomeRegistro: form.registro,
//         nomeSocial: nomeSocialAtivo ? form.nomeSocial : form.registro,
//         dtNasc: form.nascimento.split("/").reverse().join("-"),
//         cpf: form.cpf,
//         estrangeiro: false,
//         raca: form.raca,
//         sexo: form.sexo.toUpperCase(),
//         nomeMae: form.nomeMae,
//         egressoPrisional: form.egresso === "sim",
//         localDorme: form.localDormir.toUpperCase(),
//         fotoPerfil: "",
//         sisa: form.sisa,
//         status: form.status || "ATIVO",
//         observacao: form.observacao,
//         idFuncionario: 1,
//         idEndereco: null, 
//         idTipoGenero: form.genero === "masculino" ? 1 : 2,
//         idTipoSexualidade:
//           form.sexualidade === "hetero" ? 1 :
//             form.sexualidade === "homo" ? 2 :
//               form.sexualidade === "bi" ? 3 : 4,
//       };

//       const response = await api.post("/beneficiarios", payloadBeneficiario);

//       const idBeneficiario = response.data.id; // pega o ID retornado

//       navigate(`/Registro-endereco?idBeneficiario=${idBeneficiario}`);

//       alert("Beneficiário cadastrado com sucesso! Agora cadastre o endereço.");

//     } catch (error) {
//       console.error(error);
//       if (error.response && error.response.data && error.response.data.error) {
//         setErro(error.response.data.error);
//       } else {
//         setErro("Erro ao cadastrar beneficiário. Tente novamente.");
//       }
//     }
//   };


//   const handleClose = () => {
//     navigate("/home");
//   };

//   const [activeSection, setActiveSection] = useState("prontuario");

//   return (
//     <div className="condicoes-saude-container">
//       <div className="condicoes-saude-box">
//         <button className="close-button" onClick={handleClose}>✕</button>

//         <SidebarCondicoes
//           activeSection={activeSection}
//           onSectionChange={(sectionId) => {
//             if (sectionId === "condicao-saude") {
//               navigate("/condicoes-saude");
//             } else if (sectionId === "endereco") {
//               navigate("/Registro-endereco");
//             } else {
//               setActiveSection(sectionId);
//             }
//           }}
//         />

//         <div className="condicoes-content">
//           <h2>Cadastrar novo beneficiário</h2>

//           {erro && <p className="erro">{erro}</p>}

//           <form className="form" onSubmit={handleSubmit}>
//             <div className="avatarSection">
//               <img src={Perfil} alt="Avatar" className="avatar" />

//               <div className="avatar-fields">
//                 <div className="form-row">
//                   <div className="form-group">
//                     <label>Nome de Registro</label>
//                     <Input
//                       name="registro"
//                       placeholder="Nome de Registro"
//                       value={form.registro}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label>SISA</label>
//                     <Input
//                       name="sisa"
//                       placeholder="SISA"
//                       value={form.sisa}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </div>

//                 <div className="form-row">
//                   <div className="form-group">
//                     <label>Nome da Mãe</label>
//                     <Input
//                       name="nomeMae"
//                       placeholder="Nome da Mãe"
//                       value={form.nomeMae}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label>Data de Nascimento</label>
//                     <Input
//                       name="nascimento"
//                       placeholder="DD/MM/AAAA"
//                       value={form.nascimento}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* CPF + Gênero + Raça + Egresso */}
//             <div className="form-row">
//               <div className="form-group">
//                 <label>CPF</label>
//                 <Input
//                   name="cpf"
//                   placeholder="CPF"
//                   value={form.cpf}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Gênero</label>
//                 <select
//                   name="genero"
//                   value={form.genero}
//                   onChange={handleChange}
//                   className="select-categoria"
//                 >
//                   <option value="">Selecione</option>
//                   <option value="masculino">Masculino</option>
//                   <option value="feminino">Feminino</option>
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Raça</label>
//                 <select
//                   name="raca"
//                   value={form.raca}
//                   onChange={handleChange}
//                   className="select-categoria"
//                 >
//                   <option value="BRANCO">Branco(a)</option>
//                   <option value="PRETO">Preto(a)</option>
//                   <option value="PARDO">Pardo(a)</option>
//                   <option value="AMARELA">Amarelo(a)</option>
//                   <option value="INDIGENA">Indigena</option>
//                   <option value="NAO_DECLARADO">Não declarado</option>

//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Egresso Prisional</label>
//                 <select
//                   name="egresso"
//                   value={form.egresso}
//                   onChange={handleChange}
//                   className="select-categoria"
//                 >
//                   <option value="">Selecione</option>
//                   <option value="sim">Sim</option>
//                   <option value="nao">Não</option>
//                 </select>
//               </div>
//             </div>

//             {/* Sexo + Sexualidade + Local + Status */}
//             <div className="form-row">
//               <div className="form-group">
//                 <label>Sexo</label>
//                 <select
//                   name="sexo"
//                   value={form.sexo}
//                   onChange={handleChange}
//                   className="select-categoria"
//                 >
//                   <option value="">Selecione</option>
//                   <option value="masculino">Masculino</option>
//                   <option value="feminino">Feminino</option>
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Sexualidade</label>
//                 <select
//                   name="sexualidade"
//                   value={form.sexualidade}
//                   onChange={handleChange}
//                   className="select-categoria"
//                 >
//                   <option value="">Selecione</option>
//                   <option value="hetero">Heterossexual</option>
//                   <option value="homo">Homossexual</option>
//                   <option value="bi">Bissexual</option>
//                   <option value="outro">Outro</option>
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Local onde Dorme</label>
//                 <select
//                   name="localDormir"
//                   value={form.localDormir}
//                   onChange={handleChange}
//                   className="select-categoria"
//                 >
//                   <option value="">Selecione</option>
//                   <option value="casa">Casa</option>
//                   <option value="abrigo">Abrigo</option>
//                   <option value="rua">Rua</option>
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Status</label>
//                 <Input
//                   name="status"
//                   placeholder="Status"
//                   value={form.status}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>

//             {/* Nome social */}
//             <div className="form-group full-width nome-social-section">
//               <label>Nome Social</label>
//               <div className="switch-container">
//                 <label className="switch">
//                   <input
//                     type="checkbox"
//                     checked={nomeSocialAtivo}
//                     onChange={() => setNomeSocialAtivo(!nomeSocialAtivo)}
//                   />
//                   <span className="slider"></span>
//                 </label>
//                 <div className="nome-social-input">
//                   <Input
//                     name="nomeSocial"
//                     placeholder="Nome Social"
//                     value={form.nomeSocial}
//                     onChange={handleChange}
//                     disabled={!nomeSocialAtivo}
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Observação */}
//             <div className="form-group full-width">
//               <label>Observação</label> <br />
//               <textarea
//                 name="observacao"
//                 placeholder="Observação"
//                 value={form.observacao}
//                 onChange={handleChange}
//               />
//             </div>

//             {/* Botões */}
//             <div className="form-buttons">
//               <Botao type="button" className="btn-pular" onClick={handleClose}>
//                 Cancelar
//               </Botao>
//               <Botao type="submit" className="btn-salvar">
//                 Salvar
//               </Botao>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
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

  const [generos, setGeneros] = useState([]);
  const [racas, setRacas] = useState([]);
  const [sexos, setSexos] = useState([]);
  const [sexualidade, setSexualidade] = useState([]);
  const [locais, setLocais] = useState([]);


  useEffect(() => {
    api.get("/tipos_generos")
      .then((res) => setGeneros(res.data))
      .catch((err) => console.error("Erro ao carregar gêneros:", err));
  }, []);

  useEffect(() => {
    async function carregarRacas() {
      try {
        const response = await api.get("/beneficiarios/opcoes_racas");
        console.log("RACAS DO BACK:", response.data);
        setRacas(response.data || []); // garante array
      } catch (error) {
        console.error("Erro ao carregar raças:", error);
        setRacas([]);
      }
    }
    carregarRacas();
  }, []);

  useEffect(() => {
    async function carregarSexos() {
      try {
        const response = await api.get("/beneficiarios/opcoes_sexo");
        console.log("SEXOS DO BACK:", response.data);
        setSexos(response.data || []);
      } catch (error) {
        console.error("Erro ao carregar sexos:", error);
        setSexos([]);
      }
    }
    carregarSexos();
  }, []);

  useEffect(() => {
    api.get("/tipos_sexualidades")
      .then((res) => setSexualidade(res.data))
      .catch((err) => console.error("Erro ao carregar sexualidades:", err));
  }, []);

  useEffect(() => {
    async function carregarLocais() {
      try {
        const response = await api.get("/beneficiarios/opcoes_local");
        console.log("LOCAIS DO BACK:", response.data);
        setLocais(response.data || []);
      } catch (error) {
        console.error("Erro ao carregar locais:", error);
        setLocais([]);
      }
    }
    carregarLocais();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
        nomeRegistro: form.registro,
        nomeSocial: nomeSocialAtivo ? form.nomeSocial : null,
        dtNasc: form.nascimento.split("/").reverse().join("-"),
        cpf: form.cpf,
        estrangeiro: false,
        raca: form.raca,
        sexo: form.sexo.toUpperCase(),
        nomeMae: form.nomeMae,
        egressoPrisional: form.egresso === "sim",
        localDorme: form.localDormir.toUpperCase(),
        fotoPerfil: "",
        sisa: form.sisa,
        status: form.status || "ATIVO",
        observacao: form.observacao,
        idFuncionario: Number(localStorage.getItem('funcionarioId')),
        idEndereco: null,
        idTipoGenero: form.genero ? Number(form.genero) : null,
        idTipoSexualidade: form.sexualidade ? Number(form.sexualidade) : null,
      };

      const response = await api.post("/beneficiarios", payloadBeneficiario);

      const idBeneficiario = response.data.id;
      navigate(`/Registro-endereco?idBeneficiario=${idBeneficiario}`);

      alert("Beneficiário cadastrado com sucesso! Agora cadastre o endereço.");
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
    navigate("/home");
  };

  const handleClose2 = () => {
    navigate("/Registro-endereco");
  };

  return (
    <div className="condicoes-saude-container">
      <div className="condicoes-saude-box">
        <button className="close-button" onClick={handleClose}>✕</button>

        <SidebarCondicoes
          activeSection={activeSection}
          onSectionChange={(sectionId) => {
            if (sectionId === "condicao-saude") {
              navigate("/condicoes-saude");
            } else if (sectionId === "endereco") {
              navigate("/Registro-endereco");
            } else {
              setActiveSection(sectionId);
            }
          }}
        />

        <div className="condicoes-content">
          <h2>Cadastrar novo beneficiário</h2>

          {erro && <p className="erro">{erro}</p>}

          <form className="form" onSubmit={handleSubmit}>
            <div className="avatarSection">
              <img src={Perfil} alt="Avatar" className="avatar" />

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
                      name="nascimento"
                      placeholder="DD/MM/AAAA"
                      value={form.nascimento}
                      onChange={handleChange}
                      type="date"
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
                  {generos.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.nome}
                    </option>
                  ))}
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
                  {racas.map((raca, index) => (
                    <option key={index} value={raca.value}>
                      {raca.descricao}
                    </option>
                  ))}
                </select>

                {/* <select
                  name="raca"
                  value={form.raca}
                  onChange={handleChange}
                  className="select-categoria"
                >
                  <option value="BRANCO">Branco(a)</option>
                  <option value="PRETO">Preto(a)</option>
                  <option value="PARDO">Pardo(a)</option>
                  <option value="AMARELA">Amarelo(a)</option>
                  <option value="INDIGENA">Indigena</option>
                  <option value="NAO_DECLARADO">Não declarado</option>
                </select> */}
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
                  {sexos.map((sexo, index) => (
                    <option key={index} value={sexo.value}>
                      {sexo.descricao}
                    </option>
                  ))}
                  {/* <option value="">Selecione</option>
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option> */}
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
                  {sexualidade.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.nome}
                    </option>
                  ))}
                  {/* <option value="">Selecione</option>
                  <option value="hetero">Heterossexual</option>
                  <option value="homo">Homossexual</option>
                  <option value="bi">Bissexual</option>
                  <option value="outro">Outro</option> */}
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
                  {locais.map((local, index) => (
                    <option key={index} value={local.value}>
                      {local.descricao}
                    </option>
                  ))}
                  {/* <option value="">Selecione</option>
                  <option value="casa">Casa</option>
                  <option value="abrigo">Abrigo</option>
                  <option value="rua">Rua</option> */}
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
                <label className="switch">
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
              <Botao type="button" className="btn-pular" onClick={handleClose2}>
                Proximo
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
