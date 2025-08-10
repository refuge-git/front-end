import React, { useState } from 'react';
import '../css/registroforms.css';
import Botao from "../components/Botao";
import IconLoc from '../assets/icon-loc.png';
import IconLocHover from '../assets/icon-loc-branco.png';
import IconList from '../assets/icon-list-branco.png';
import IconSaude from '../assets/cond-saude.png';
import IconSaudeHover from '../assets/cond-saude-branco.png';
import Perfil from '../assets/avatar-perfil.png';
import Voltar from '../assets/icon-voltar.png';
import VoltarHover from '../assets/icon-voltar-hover.png';

const RegistrationForm = () => {
  const [form, setForm] = useState({
    registro: '',
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
  const [hovered, setHovered] = useState('');
  const [voltarHover, setVoltarHover] = useState(false);

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
        <aside className="sidebar">
          <button
            className="menuItem"
            onMouseEnter={() => setHovered('prontuario')}
            onMouseLeave={() => setHovered('')}
          >
            <img
              src={IconList}
              alt="Prontuário"
              className="menuIcon"
            />
            Prontuário
            <span className="arrowIcon">&gt;</span>
          </button>
          <button
            className="menuItem"
            onMouseEnter={() => setHovered('endereco')}
            onMouseLeave={() => setHovered('')}
          >
            <img
              src={hovered === 'endereco' ? IconLocHover : IconLoc}
              alt="Endereço"
              className="menuIcon"
            />
            Endereço
            <span className="arrowIcon">&gt;</span>
          </button>
          <button
            className="menuItem"
            onMouseEnter={() => setHovered('saude')}
            onMouseLeave={() => setHovered('')}
          >
            <img
              src={hovered === 'saude' ? IconSaudeHover : IconSaude}
              alt="Condição de Saúde"
              className="menuIcon"
            />
            Condição de Saúde
            <span className="arrowIcon">&gt;</span>
          </button>
          <div style={{ flexGrow: 1 }}></div>
          <button
            className="voltarBtn"
            onClick={() => window.history.back()}
            onMouseEnter={() => setVoltarHover(true)}
            onMouseLeave={() => setVoltarHover(false)}
          >
            <img
              src={voltarHover ? VoltarHover : Voltar}
              alt="Seta para esquerda"
              className="voltarIcon"
            />
            <span>Voltar</span>
          </button>
        </aside>
        <form className="form" onSubmit={handleSubmit}>
          <h2 className="form-title">Cadastrar novo beneficiário</h2>
          <div className="avatarAndFields">
            <div className="avatarSection">
              <img
                src={Perfil}
                alt="Avatar"
                className="avatar"
              />
            </div>
            <div className="mainFields">
              <div className="row">
                <input name="registro" placeholder="Nome de Registro" value={form.registro} onChange={handleChange} />
                <input name="sisa" placeholder="Sisa" value={form.sisa} onChange={handleChange} />
              </div>
              <div className="row">
                <input name="nomeMae" placeholder="Nome da Mãe" value={form.nomeMae} onChange={handleChange} />
                <input name="nascimento" placeholder="Data de Nascimento" value={form.nascimento} onChange={handleChange} />
              </div>
            </div>
          </div>
          <div className="fields">
            <div className="row-cpf-genero-raca-egresso">
              <input name="cpf" placeholder="CPF" value={form.cpf} onChange={handleChange} />
              <select name="genero" value={form.genero} onChange={handleChange}>
                <option value="">Gênero</option>
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
              </select>
              <select name="raca" value={form.raca} onChange={handleChange}>
                <option value="">Raça</option>
                <option value="branca">Branca</option>
                <option value="preta">Preta</option>
                <option value="parda">Parda</option>
                <option value="amarela">Amarela</option>
                <option value="indigena">Indígena</option>
              </select>
              <select name="egresso" value={form.egresso} onChange={handleChange}>
                <option value="">Egresso Prisional</option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
              </select>
            </div>
            <div>
              <div className="row-cpf-genero-raca-egresso">
                <select name="sexo" value={form.sexo} onChange={handleChange}>
                  <option value="">Sexo</option>
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                </select>
                <select name="sexualidade" value={form.sexualidade} onChange={handleChange}>
                  <option value="">Sexualidade</option>
                  <option value="hetero">Heterossexual</option>
                  <option value="homo">Homossexual</option>
                  <option value="bi">Bissexual</option>
                  <option value="outro">Outro</option>
                </select>
                <select name="localDormir" value={form.localDormir} onChange={handleChange}>
                  <option value="">Local onde Dorme</option>
                  <option value="casa">Casa</option>
                  <option value="abrigo">Abrigo</option>
                  <option value="rua">Rua</option>
                </select>
                <input name="status" placeholder="Status" value={form.status} onChange={handleChange} />
              </div>
              <input name="nomeSocial" placeholder="Nome Social" value={form.nomeSocial} onChange={handleChange} />
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
          <Botao variant="registro">Salvar</Botao>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;