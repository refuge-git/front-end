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

    const dados = {
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
        // nomeSocial: "Marina",
        localDormir: "Rua",
        status: "Ativo",
        observacao: "Beneficiario compareceu pela primeira vez em 2025.",
    };

    const [nomeSocialAtivo, setNomeSocialAtivo] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Cadastro realizado!');
    };

    const handleClose = () => {
        navigate('/home');
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
                            navigate('/condicoes-saude-teste');
                        } else if (sectionId === 'endereco') {
                            navigate('/Endereco');
                        } else {
                            setActiveSection(sectionId);
                        }
                    }} />
                <div className="condicoes-content">
                    <h2>Dados do Beneficiario</h2>
                    <form className="form" onSubmit={handleSubmit}>

                        <div className="avatarSection">
                            <img src={Perfil} alt="Avatar" className="avatar" />

                            <div className="avatar-fields">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Nome de Registro</label>
                                        <Input className="input-des" name="registro" placeholder="Nome de Registro" value={dados.registro} disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>SISA</label>
                                        <Input className="input-des" name="sisa" placeholder="SISA" value={dados.sisa} onChange={handleChange} />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Nome da Mãe</label>
                                        <Input className="input-des" name="nomeMae" placeholder="Nome da Mãe" value={dados.nomeMae} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Data de Nascimento</label>
                                        <Input className="input-des" name="nascimento" placeholder="DD/MM/AAAA" value={dados.nascimento} onChange={handleChange} />
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="form-row">
                            <div className="form-group">
                                <label>CPF</label>
                                <Input className="input-des" name="cpf" placeholder="CPF" value={dados.cpf} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Gênero</label>
                                {/* <select name="genero" value={dados.genero} onChange={handleChange} className="select-categoria">
                                        <option value="">Selecione</option>
                                        <option value="masculino">Masculino</option>
                                        <option value="feminino">Feminino</option>
                                    </select> */}
                                <Input className="input-des" name="genero" placeholder="genero" value={dados.genero} onChange={handleChange} />

                            </div>
                            <div className="form-group">
                                <label>Raça</label>
                                {/* <select name="raca" value={form.raca} onChange={handleChange} className="select-categoria">
                                    <option value="">Selecione</option>
                                    <option value="branca">Branca</option>
                                    <option value="preta">Preta</option>
                                    <option value="parda">Parda</option>
                                    <option value="amarela">Amarela</option>
                                    <option value="indigena">Indígena</option>
                                </select> */}
                                <Input className="input-des" name="genero" placeholder="genero" value={dados.raca} onChange={handleChange} />

                            </div>
                            <div className="form-group">
                                <label>Egresso Prisional</label>
                                {/* <select name="egresso" value={form.egresso} onChange={handleChange} className="select-categoria">
                                    <option value="">Selecione</option>
                                    <option value="sim">Sim</option>
                                    <option value="nao">Não</option>
                                </select> */}
                                <Input className="input-des" name="genero" placeholder="genero" value={dados.egresso} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Sexo</label>
                                {/* <select name="sexo" value={form.sexo} onChange={handleChange} className="select-categoria">
                                    <option value="">Selecione</option>
                                    <option value="masculino">Masculino</option>
                                    <option value="feminino">Feminino</option>
                                </select> */}
                                <Input className="input-des" name="genero" placeholder="genero" value={dados.sexo} onChange={handleChange} />

                            </div>
                            <div className="form-group">
                                <label>Sexualidade</label>
                                {/* <select name="sexualidade" value={form.sexualidade} onChange={handleChange} className="select-categoria">
                                    <option value="">Selecione</option>
                                    <option value="hetero">Heterossexual</option>
                                    <option value="homo">Homossexual</option>
                                    <option value="bi">Bissexual</option>
                                    <option value="outro">Outro</option>
                                </select> */}
                                <Input className="input-des" name="genero" placeholder="genero" value={dados.sexualidade} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Local onde Dorme</label>
                                {/* <select name="localDormir" value={form.localDormir} onChange={handleChange} className="select-categoria">
                                    <option value="">Selecione</option>
                                    <option value="casa">Casa</option>
                                    <option value="abrigo">Abrigo</option>
                                    <option value="rua">Rua</option>
                                </select> */}
                                <Input className="input-des" name="genero" placeholder="genero" value={dados.localDormir} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Status</label>
                                <div className="input-with-indicator">
                                    <span className="status-indicator"></span>
                                    <Input
                                        name="status"
                                        placeholder="Status"
                                        value={dados.status}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

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
                                <div className='nome-social-input'>
                                    <Input
                                        name="nomeSocial"
                                        placeholder="Nome Social"
                                        value={form.nomeSocial}
                                        onChange={handleChange}
                                        disabled={!nomeSocialAtivo}
                                    /></div>
                            </div>
                        </div>

                        <div className="form-group full-width">
                            <label>Observação</label> <br />
                            <textarea
                                name="observacao"
                                placeholder="Observação"
                                value={dados.observacao}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-buttons">
                            <button type="submit" className="btn-salvar">Registrar Atividade</button>
                            <button type="button" className="btn-pular" onClick={handleClose}>Editar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
