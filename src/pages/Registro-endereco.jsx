// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../css/App.css';
// import Perfil from '../assets/Avatar.png';
// import Input from "../components/Input";
// import Botao from "../components/Botao";
// import SidebarCondicoes from '../components/SideBarCondicoes';

// export default function EnderecoForm() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     Logradouro: '',
//     numero: '',
//     complemento: '',
//     bairro: '',
//     cidade: '',
//     genero: '',
//     cep: '',
//     observacao: '',
//   });

//   const [nomeSocialAtivo, setNomeSocialAtivo] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   alert('Cadastro realizado!');
//   // };

  

//   const handleClose = () => {
//     navigate('/condicoes-saude');
//   };

//   const handleClose2 = () => {
//     navigate('/home');
//   };

//   const [activeSection, setActiveSection] = useState('endereco');

//   return (
//     <div className="condicoes-saude-container">
//       <div className="condicoes-saude-box">
//         <button className="close-button" onClick={handleClose2}>✕</button>
//         <SidebarCondicoes
//           activeSection={activeSection}
//           onSectionChange={(sectionId) => {
//             if (sectionId === 'condicao-saude') {
//               navigate('/condicoes-saude');
//             } else if (sectionId === 'prontuario') {
//               navigate('/registro-cadastro');
//             } else {
//               setActiveSection(sectionId);
//             }
//           }} />
//         <div className="condicoes-content">
//           <h2>Cadastrar Endereço</h2>
//           <form className="form" onSubmit={handleSubmit}>



//             <div className="avatar-fields">
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Cep</label>
//                   <Input name="cep" placeholder="Cep" value={form.cep} onChange={handleChange} />
//                 </div>
//                 <div className="form-group">
//                   <label>Logradouro</label>
//                   <Input name="Logradouro" placeholder="Logradouro" value={form.logradouro} onChange={handleChange} />
//                 </div>
//                 <div className="form-group">
//                   <label>Número</label>
//                   <Input name="numero" placeholder="Numero" value={form.numero} onChange={handleChange} />
//                 </div>
//               </div>

//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Complemento</label>
//                   <Input name="complemento" placeholder="Complemento" value={form.complemento} onChange={handleChange} />
//                 </div>
//                 <div className="form-group">
//                   <label>Bairro</label>
//                   <Input name="bairro" placeholder="Bairro" value={form.bairro} onChange={handleChange} />
//                 </div>
//                 <div className="form-group">
//                   <label>Cidade</label>
//                   <Input name="cidade" placeholder="Cidade" value={form.cidade} onChange={handleChange} />
//                 </div>
//               </div>
//               <div className="form-group full-width">
//                 <label>Observação</label> <br />
//                 <textarea
//                   name="observacao"
//                   placeholder="Observação"
//                   value={form.observacao}
//                   onChange={handleChange}
//                 />
//               </div>

//             </div>

//             <div className="form-buttons-end">
//               <Botao type="button" className="btn-pular" onClick={handleClose}>Pular</Botao>
//               <Botao type="submit" className="btn-salvar">Salvar</Botao>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../provider/api";

import Input from "../components/Input";
import Botao from "../components/Botao";
import SidebarCondicoes from "../components/SideBarCondicoes";
import "../css/App.css";

export default function EnderecoForm() {
  const navigate = useNavigate();
  const location = useLocation();

  // Pega o id do beneficiário da URL
  const queryParams = new URLSearchParams(location.search);
  const idBeneficiario = queryParams.get("idBeneficiario");

  const [form, setForm] = useState({
    cep: "",
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    observacao: "",
  });

  const [erro, setErro] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
        logradouro: form.logradouro,
        numero: form.numero,
        complemento: form.complemento,
        bairro: form.bairro,
        cidade: form.cidade,
        observacao: form.observacao,
        idBeneficiario: idBeneficiario, 
      };

      const response = await api.post("/enderecos", payload);

      alert("Endereço cadastrado com sucesso!");
      navigate("/home"); // volta para a home ou onde quiser
    } catch (error) {
      console.error(error);
      setErro("Erro ao cadastrar endereço. Tente novamente.");
    }
  };

  const handleClose = () => {
    navigate("/home");
  };

  const [activeSection, setActiveSection] = useState("endereco");

  return (
    <div className="condicoes-saude-container">
      <div className="condicoes-saude-box">
        <button className="close-button" onClick={handleClose}>✕</button>

        <SidebarCondicoes
          activeSection={activeSection}
          onSectionChange={(sectionId) => {
            setActiveSection(sectionId);
            if (sectionId === "prontuario") navigate("/registro-cadastro");
          }}
        />

        <div className="condicoes-content">
          <h2>Cadastrar Endereço</h2>

          {erro && <p className="erro">{erro}</p>}

          <form className="form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>CEP</label>
                <Input name="cep" placeholder="CEP" value={form.cep} onChange={handleChange} />
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
              <Botao type="button" className="btn-pular" onClick={handleClose}>Cancelar</Botao>
              <Botao type="submit" className="btn-salvar">Salvar</Botao>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
