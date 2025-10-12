import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/App.css';
import Input from "../components/Input";
import SidebarCondicoes from '../components/SideBarCondicoes';

export default function EnderecoForm() {
  const navigate = useNavigate();

  const initialData = {
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: 'São Paulo',
    cep: '',
    observacao: 'Morador de rua, sem residência fixa. Precisa de acompanhamento social.',
  };

  const [form, setForm] = useState(initialData);
  const [backupBeforeEdit, setBackupBeforeEdit] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBackupBeforeEdit(form);
    setIsEditing(false);
    alert('Dados salvos com sucesso!');
  };

  const handleStartEdit = () => {
    setBackupBeforeEdit(form);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setForm(backupBeforeEdit);
    setIsEditing(false);
  };

  const handleClose = () => navigate('/condicoes-saude-teste');
  const handleClose2 = () => navigate('/home');

  const [activeSection, setActiveSection] = useState('endereco');

  return (
    <div className="condicoes-saude-container">
      <div className="condicoes-saude-box">
        <button className="close-button" onClick={handleClose2}>✕</button>
        <SidebarCondicoes
          activeSection={activeSection}
          onSectionChange={(sectionId) => {
            if (sectionId === 'condicao-saude') {
              navigate('/condicoes-saude-teste');
            } else if (sectionId === 'prontuario') {
              navigate('/prontuario');
            } else {
              setActiveSection(sectionId);
            }
          }}
        />

        <div className="condicoes-content">
          <h2>Dados de Endereço</h2>
          <form className="form" onSubmit={handleSubmit}>
            <div className="avatar-fields">
              <div className="form-row">
                <div className="form-group">
                  <label>Logradouro</label>
                  <Input
                    name="logradouro"
                    placeholder="Logradouro"
                    value={form.logradouro}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label>Número</label>
                  <Input
                    name="numero"
                    placeholder="Número"
                    value={form.numero}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label>Complemento</label>
                  <Input
                    name="complemento"
                    placeholder="Complemento"
                    value={form.complemento}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Bairro</label>
                  <Input
                    name="bairro"
                    placeholder="Bairro"
                    value={form.bairro}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label>Cidade</label>
                  <Input
                    name="cidade"
                    placeholder="Cidade"
                    value={form.cidade}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label>CEP</label>
                  <Input
                    name="cep"
                    placeholder="CEP"
                    value={form.cep}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="form-group full-width">
                <label>Observação</label> <br />
                <textarea
                  name="observacao"
                  placeholder="Observação"
                  value={form.observacao}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="input-des"
                />
              </div>
            </div>

            {/* Botões */}
            <div className="form-buttons" style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              {!isEditing ? (
                <button type="button" className="btn-salvar" onClick={handleStartEdit}>
                  Editar
                </button>
              ) : (
                <>
                  <button type="button" className="btn-pular" onClick={handleCancel}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn-salvar">Salvar</button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
