import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/App.css';
import Perfil from '../assets/Avatar.png';
import Input from "../components/Input";
import Botao from "../components/Botao";
import SidebarCondicoes from '../components/SideBarCondicoes';

export default function RegistrationForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nomeAtv: '',
    observacao: '',
  });

  const [nomeSocialAtivo, setNomeSocialAtivo] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Cadastro realizado!');
  };

  const handleClose = () => {
    navigate('/');
  };

  const [activeSection, setActiveSection] = useState('prontuario');

  return (
    <div className="condicoes-saude-container">
      <div className="condicoes-saude-box">
        <button className="close-button" onClick={handleClose}>✕</button>
        <SidebarCondicoes
          activeSection={activeSection}
          onSectionChange={(sectionId) => {
            if (sectionId === 'condicao-saude') {
              navigate('/condicoes-saude');
            } else {
              setActiveSection(sectionId);
            }
          }} />
        <div className="condicoes-content">
          <h2>Cadastrar nova Atividade</h2>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-row-atv">
              <div className="form-group-atv">
                <label>Nome de Atividade</label>
                <Input name="Atividade" placeholder="Nome da Atividade" value={form.nomeAtv} onChange={handleChange} />
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
              <button type="submit" className="btn-salvar">Salvar</button>
              <button type="button" className="btn-pular" onClick={handleClose}>Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
