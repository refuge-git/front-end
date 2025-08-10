import React, { useState } from 'react';
import '../css/registroforms.css';
import Botao from "../components/Botao";
// import IconLoc from '../assets/icon-loc.png';
// import IconLocHover from '../assets/icon-loc-branco.png';
// import IconList from '../assets/icon-list-branco.png';
// import IconSaude from '../assets/cond-saude.png';
// import IconSaudeHover from '../assets/cond-saude-branco.png';
// import Perfil from '../assets/avatar-perfil.png';
// import Voltar from '../assets/icon-voltar.png';
// import VoltarHover from '../assets/icon-voltar-hover.png';
import Input from "../components/Input";
import Menu from '../components/Menu';


const RegistrationForm = () => {
  const [form, setForm] = useState({
    registro: '',
    nomeAtividade: '',
    sisa: '',
    nomeMae: '',
    nascimento: '',
    cpf: '',
    genero: '',
    raca: '',
    egresso: '',
    estrangeiro: '',
    sexo: '',
    sexualidade: '',
    nomeSocial: '',
    localDormir: '',
    status: '',
    observacao: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Cadastro realizado!');
  };

  return (
    <div className="wrapper">
      <div className="container-pront">
        <Menu />
        <form className="form" onSubmit={handleSubmit}>
          <div className="card-atv">
            <h2 className="form-title">Cadastrar nova Atividade</h2>
            <div className="mainFields">
              <div className="row-atv">
                <Input name="nomeAtividade" placeholder="Nome de Atividade" value={form.nomeAtividade} onChange={handleChange} />
              </div>
            </div>
            <textarea
              name="observacao"
              placeholder="Observação"
              value={form.observacao}
              onChange={handleChange}
              rows={3}
              style={{ width: '100%' }}
            />
          </div>
          <Botao variant="registro">Salvar</Botao>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
