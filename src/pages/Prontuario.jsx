import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/App.css';
import Perfil from '../assets/Avatar.png';
import Input from "../components/Input";
import SidebarCondicoes from '../components/SideBarCondicoes';

export default function RegistrationForm() {
    const navigate = useNavigate();

    // Dados iniciais (último salvo)
    const initialData = {
        registro: "José Santos",
        sisa: "123456",
        nomeMae: "Maria Souza Santos",
        nascimento: "12/05/1985",
        cpf: "123.456.789-00",
        genero: "Masculino",
        raca: "Parda",
        egresso: "Não",
        estrangeiro: "Não",
        sexo: "Masculino",
        sexualidade: "Heterossexual",
        nomeSocial: "",
        localDormir: "Rua",
        status: "Ativo",
        observacao: "Beneficiário compareceu pela primeira vez em 2025.",
    };

    // Estado atual do formulário
    const [form, setForm] = useState(initialData);
    // Backup para restaurar quando clicar em "Cancelar"
    const [backupBeforeEdit, setBackupBeforeEdit] = useState(initialData);
    // Controle de edição
    const [isEditing, setIsEditing] = useState(false);
    // Toggle do Nome Social (começa ativo se houver valor)
    const [nomeSocialAtivo, setNomeSocialAtivo] = useState(Boolean(initialData.nomeSocial));
    // Sidebar
    const [activeSection, setActiveSection] = useState('prontuario');

    const handleClosetwo= () => {
        navigate('/registro-nova-atividade');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: enviar form para API aqui
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

    const handleClose = () => navigate('/home');

    return (
        <div className="condicoes-saude-container">
            <div className="condicoes-saude-box">
                <button className="close-button" onClick={handleClose}>✕</button>

                <SidebarCondicoes
                    activeSection={activeSection}
                    onSectionChange={(sectionId) => {
                        if (sectionId === 'condicao-saude') {
                            navigate('/condicoes-saude-teste');
                        } else if (sectionId === 'endereco') {
                            navigate('/Endereco');
                        } else {
                            setActiveSection(sectionId);
                        }
                    }}
                />

                <div className="condicoes-content">
                    <h2>Dados do Beneficiário</h2>

                    <form className="form" onSubmit={handleSubmit}>
                        <div className="avatarSection">
                            <img src={Perfil} alt="Avatar" className="avatar" />

                            <div className="avatar-fields">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Nome de Registro</label>
                                        <Input
                                            className="input-des"
                                            name="registro"
                                            placeholder="Nome de Registro"
                                            value={form.registro}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>SISA</label>
                                        <Input
                                            className="input-des"
                                            name="sisa"
                                            placeholder="SISA"
                                            value={form.sisa}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Nome da Mãe</label>
                                        <Input
                                            className="input-des"
                                            name="nomeMae"
                                            placeholder="Nome da Mãe"
                                            value={form.nomeMae}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Data de Nascimento</label>
                                        <Input
                                            className="input-des"
                                            name="nascimento"
                                            placeholder="DD/MM/AAAA"
                                            value={form.nascimento}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Linha 2 */}
                        <div className="form-row">
                            <div className="form-group">
                                <label>CPF</label>
                                <Input
                                    className="input-des"
                                    name="cpf"
                                    placeholder="CPF"
                                    value={form.cpf}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                            </div>

                            <div className="form-group">
                                <label>Gênero</label>
                                {isEditing ? (
                                    <select
                                        name="genero"
                                        value={form.genero}
                                        onChange={handleChange}
                                        className="select-categoria"
                                    >
                                        <option value="">Selecione</option>
                                        <option value="Masculino">Masculino</option>
                                        <option value="Feminino">Feminino</option>
                                        <option value="Outro">Outro</option>
                                    </select>
                                ) : (
                                    <Input className="input-des" value={form.genero} disabled />
                                )}
                            </div>

                            <div className="form-group">
                                <label>Raça</label>
                                {isEditing ? (
                                    <select
                                        name="raca"
                                        value={form.raca}
                                        onChange={handleChange}
                                        className="select-categoria"
                                    >
                                        <option value="">Selecione</option>
                                        <option value="Branca">Branca</option>
                                        <option value="Preta">Preta</option>
                                        <option value="Parda">Parda</option>
                                        <option value="Amarela">Amarela</option>
                                        <option value="Indígena">Indígena</option>
                                    </select>
                                ) : (
                                    <Input className="input-des" value={form.raca} disabled />
                                )}
                            </div>

                            <div className="form-group">
                                <label>Egresso Prisional</label>
                                {isEditing ? (
                                    <select
                                        name="egresso"
                                        value={form.egresso}
                                        onChange={handleChange}
                                        className="select-categoria"
                                    >
                                        <option value="">Selecione</option>
                                        <option value="Sim">Sim</option>
                                        <option value="Não">Não</option>
                                    </select>
                                ) : (
                                    <Input className="input-des" value={form.egresso} disabled />
                                )}
                            </div>
                        </div>

                        {/* Linha 3 */}
                        <div className="form-row">
                            <div className="form-group">
                                <label>Sexo</label>
                                {isEditing ? (
                                    <select
                                        name="sexo"
                                        value={form.sexo}
                                        onChange={handleChange}
                                        className="select-categoria"
                                    >
                                        <option value="">Selecione</option>
                                        <option value="Masculino">Masculino</option>
                                        <option value="Feminino">Feminino</option>
                                        <option value="Intersexo">Intersexo</option>
                                        <option value="Outro">Outro</option>
                                    </select>
                                ) : (
                                    <Input className="input-des" value={form.sexo} disabled />
                                )}
                            </div>

                            <div className="form-group">
                                <label>Sexualidade</label>
                                {isEditing ? (
                                    <select
                                        name="sexualidade"
                                        value={form.sexualidade}
                                        onChange={handleChange}
                                        className="select-categoria"
                                    >
                                        <option value="">Selecione</option>
                                        <option value="Heterossexual">Heterossexual</option>
                                        <option value="Homossexual">Homossexual</option>
                                        <option value="Bissexual">Bissexual</option>
                                        <option value="Assexual">Assexual</option>
                                        <option value="Outro">Outro</option>
                                    </select>
                                ) : (
                                    <Input className="input-des" value={form.sexualidade} disabled />
                                )}
                            </div>

                            <div className="form-group">
                                <label>Local onde Dorme</label>
                                {isEditing ? (
                                    <select
                                        name="localDormir"
                                        value={form.localDormir}
                                        onChange={handleChange}
                                        className="select-categoria"
                                    >
                                        <option value="">Selecione</option>
                                        <option value="Casa">Casa</option>
                                        <option value="Abrigo">Abrigo</option>
                                        <option value="Rua">Rua</option>
                                    </select>
                                ) : (
                                    <Input className="input-des" value={form.localDormir} disabled />
                                )}
                            </div>

                            <div className="form-group">
                                <label>Status</label>
                                <div className="input-with-indicator">
                                    <span className="status-indicator"></span>
                                    <Input
                                        name="status"
                                        value={form.status}
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
                                        disabled={!isEditing}
                                    />
                                    <span className="slider"></span>
                                </label>
                                <div className='nome-social-input'>
                                    <Input
                                        name="nomeSocial"
                                        placeholder="Nome Social"
                                        value={form.nomeSocial}
                                        onChange={handleChange}
                                        disabled={!nomeSocialAtivo || !isEditing}
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
                                disabled={!isEditing}
                                className="input-des"
                            />
                        </div>

                        {/* BOTÕES DO RODAPÉ */}
                        <div className="form-buttons" style={{ display: 'flex', gap: 8 }}>
                            {!isEditing ? (
                                <>
                                    {/* Mantive o botão original "Registrar Atividade".
                      Se ele não deve submeter o form, troque para type="button". */}
                                    <button type="button" className="btn-salvar" onClick={handleClosetwo}>
                                        Registrar Atividade
                                    </button>

                                    {/* Editar: AGORA liga o modo de edição (não navega mais) */}
                                    <button
                                        type="button"
                                        className="btn-pular"
                                        onClick={handleStartEdit}
                                    >
                                        Editar
                                    </button>
                                </>
                            ) : (
                                <>
                                    <div className="form-buttons">
                                        <button type="button" className="btn-pular" onClick={handleCancel}>Cancelar</button>
                                        <button type="submit" className="btn-salvar">Salvar</button>
                                    </div>
                                </>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
