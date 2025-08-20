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
    Logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: 'São Paulo',
    cep: '',
    observacao: 'Morador de rua, sem residência fixa. Precisa de acompanhamento social.',
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
    navigate('/condicoes-saude');
  };

  const handleClose2 = () => {
    navigate('/home');
  };

  const [activeSection, setActiveSection] = useState('endereco');

  return (
    <div className="condicoes-saude-container">
      <div className="condicoes-saude-box">
        <button className="close-button" onClick={handleClose2}>✕</button>
        <SidebarCondicoes
          activeSection={activeSection}
          onSectionChange={(sectionId) => {
            if (sectionId === 'condicao-saude') {
              navigate('/condicoes-saude');
            } else if (sectionId === 'prontuario') {
              navigate('/prontuario');
            } else {
              setActiveSection(sectionId);
            }
          }} />
        <div className="condicoes-content">
          <h2>Dados de Endereço</h2>
          <form className="form" onSubmit={handleSubmit}>



            <div className="avatar-fields">
              <div className="form-row">
                <div className="form-group">
                  <label>Logradouro</label>
                  <Input name="Logradouro" placeholder="Logradouro" value={form.logradouro} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Número</label>
                  <Input name="numero" placeholder="Numero" value={form.numero} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Complemento</label>
                  <Input name="complemento" placeholder="Complemento" value={form.complemento} onChange={handleChange} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Bairro</label>
                  <Input name="bairro" placeholder="Bairro" value={form.bairro} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Cidade</label>
                  <Input name="cidade" placeholder="Cidade" value={form.cidade} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Cep</label>
                  <Input name="cep" placeholder="Cep" value={form.cep} onChange={handleChange} />
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

            </div>

            <div className="form-buttons-end">
              <button type="submit" className="btn-salvar">Editar</button>
              {/* <button type="button" className="btn-pular" onClick={handleClose}>Pular</button> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
