import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/App.css';
import Perfil from '../assets/Avatar.png';
import Input from "../components/Input";
import SidebarCondicoes from '../components/SideBarCondicoes';
import api from '../provider/api'; // sua instância axios

export default function Prontuario() {
    const navigate = useNavigate();
    const location = useLocation();

    // Pegar idBeneficiario da query string
    const queryParams = new URLSearchParams(location.search);
    const idBeneficiario = queryParams.get("idBeneficiario");

    // Estado do formulário
    const [form, setForm] = useState(null);
    const [backupBeforeEdit, setBackupBeforeEdit] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [nomeSocialAtivo, setNomeSocialAtivo] = useState(false);
    const [activeSection, setActiveSection] = useState('prontuario');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const formatDateBR = (isoDate) => {
        if (!isoDate) return '';
        const [year, month, day] = isoDate.split('-');
        return `${day}/${month}/${year}`;
    };

    const capitalize = (str) => {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/beneficiarios/${idBeneficiario}`);
                const data = response.data;

                console.log('Dados do beneficiário recebidos do backend:', data);

                setForm({
                    registro: data.nomeRegistro || '',
                    sisa: data.sisa || '',
                    nomeMae: data.nomeMae || '',
                    nascimento: formatDateBR(data.dtNasc),
                    cpf: data.cpf || '',
                    genero: data.tipoGenero?.nome || '',
                    raca: capitalize(data.raca),
                    egresso: data.egressoPrisional ? 'Sim' : 'Não',
                    estrangeiro: data.estrangeiro ? 'Sim' : 'Não',
                    sexo: capitalize(data.sexo) || '',
                    sexualidade: data.tipoSexualidade?.nome || '',
                    nomeSocial: data.nomeSocial || '',
                    localDormir: capitalize(data.localDorme) || '',
                    status: data.status || '',
                    observacao: data.observacao || '',
                });

                // Ativa o toggle do nome social se houver valor
                setNomeSocialAtivo(Boolean(data.nomeSocial));

                setLoading(false); // ✅ MUITO IMPORTANTE
            } catch (error) {
                console.error('Erro ao carregar beneficiário:', error);
                setError('Erro ao carregar dados do beneficiário.');
                setLoading(false); // ✅ também desativa loading em caso de erro
            }
        };

        fetchData();
    }, [idBeneficiario]);




    if (loading) return <p>Carregando dados do beneficiário...</p>;
    if (error) return <p>{error}</p>;
    if (!form) return <p>Beneficiário não encontrado.</p>;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleStartEdit = () => {
        setBackupBeforeEdit(form);
        setIsEditing(true);
    };

    const handleCancel = () => {
        setForm(backupBeforeEdit);
        setIsEditing(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/beneficiarios/${idBeneficiario}`, form);
            setBackupBeforeEdit(form);
            setIsEditing(false);
            alert('Dados salvos com sucesso!');
        } catch (err) {
            console.error(err);
            alert('Erro ao salvar dados!');
        }
    };

    const handleClose = () => {
        localStorage.removeItem("idBeneficiario");
        navigate('/home');
    }
    return (
        <div className="condicoes-saude-container">
            <div className="condicoes-saude-box">
                <button className="close-button" onClick={handleClose}>✕</button>

                <SidebarCondicoes
                    activeSection={activeSection}
                    onSectionChange={(sectionId) => {
                        if (sectionId === 'condicao-saude') {
                            navigate(`/condicoes-saude?idBeneficiario=${idBeneficiario}`);
                        } else if (sectionId === 'endereco') {
                            navigate(`/endereco?idBeneficiario=${idBeneficiario}`);
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
                                            name="nomeRegistro"
                                            value={form.registro || ''}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>SISA</label>
                                        <Input
                                            className="input-des"
                                            name="sisa"
                                            value={form.sisa || ''}
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
                                            value={form.nomeMae || ''}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Data de Nascimento</label>
                                        <Input
                                            className="input-des"
                                            name="dtNasc"
                                            value={form.nascimento || ''}
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
                                    value={form.cpf || ''}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                            </div>

                            <div className="form-group">
                                <label>Gênero</label>
                                {isEditing ? (
                                    <select
                                        name="genero"
                                        value={form.genero || ''}
                                        onChange={handleChange}
                                    >
                                        <option value="">Selecione</option>
                                        <option value="Masculino">Masculino</option>
                                        <option value="Feminino">Feminino</option>
                                        <option value="Outro">Outro</option>
                                    </select>
                                ) : (
                                    <Input value={form.genero || ''} disabled />

                                )}
                            </div>

                            <div className="form-group">
                                <label>Raça</label>
                                {isEditing ? (
                                    <select
                                        name="raca"
                                        value={form.raca || ''}
                                        onChange={handleChange}
                                    >
                                        <option value="">Selecione</option>
                                        <option value="Branca">Branca</option>
                                        <option value="Preta">Preta</option>
                                        <option value="Parda">Parda</option>
                                        <option value="Amarela">Amarela</option>
                                        <option value="Indígena">Indígena</option>
                                    </select>
                                ) : (
                                    <Input value={form.raca || ''} disabled />
                                )}
                            </div>

                            <div className="form-group">
                                <label>Egresso Prisional</label>
                                {isEditing ? (
                                    <select
                                        name="egresso"
                                        value={form.egresso || ''}
                                        onChange={handleChange}
                                    >
                                        <option value="">Selecione</option>
                                        <option value="Sim">Sim</option>
                                        <option value="Não">Não</option>
                                    </select>
                                ) : (
                                    <Input value={form.egresso || ''} disabled />
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
                                        value={form.sexo || ''}
                                        onChange={handleChange}
                                    >
                                        <option value="">Selecione</option>
                                        <option value="Masculino">Masculino</option>
                                        <option value="Feminino">Feminino</option>
                                        <option value="Intersexo">Intersexo</option>
                                        <option value="Outro">Outro</option>
                                    </select>
                                ) : (
                                    <Input value={form.sexo || ''} disabled />
                                )}
                            </div>

                            <div className="form-group">
                                <label>Sexualidade</label>
                                {isEditing ? (
                                    <select
                                        name="sexualidade"
                                        value={form.sexualidade || ''}
                                        onChange={handleChange}
                                    >
                                        <option value="">Selecione</option>
                                        <option value="Heterossexual">Heterossexual</option>
                                        <option value="Homossexual">Homossexual</option>
                                        <option value="Bissexual">Bissexual</option>
                                        <option value="Assexual">Assexual</option>
                                        <option value="Outro">Outro</option>
                                    </select>
                                ) : (
                                    <Input value={form.sexualidade || ''} disabled />
                                )}
                            </div>

                            <div className="form-group">
                                <label>Local onde Dorme</label>
                                {isEditing ? (
                                    <select
                                        name="localDormir"
                                        value={form.localDormir || ''}
                                        onChange={handleChange}
                                    >
                                        <option value="">Selecione</option>
                                        <option value="Casa">Casa</option>
                                        <option value="Abrigo">Abrigo</option>
                                        <option value="Rua">Rua</option>
                                    </select>
                                ) : (
                                    <Input value={form.localDormir || ''} disabled />
                                )}
                            </div>

                            <div className="form-group">
                                <label>Status</label>
                                <div className="input-with-indicator">
                                    <span
                                        className={`status-indicator ${form.status?.toLowerCase()}`}
                                    ></span>
                                    <Input value={form.status || ''} disabled />
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
                                        value={form.nomeSocial || ''}
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
                                value={form.observacao || ''}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="input-des"
                            />
                        </div>

                        {/* BOTÕES */}
                        <div className="form-buttons" style={{ display: 'flex', gap: 8 }}>
                            {!isEditing ? (
                                <button
                                    type="button"
                                    className="btn-salvar"
                                    onClick={handleStartEdit}
                                >
                                    Editar
                                </button>
                            ) : (
                                <>
                                    <button type="button" className="btn-pular" onClick={handleCancel}>Cancelar</button>
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
