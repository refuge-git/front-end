import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/App.css';
import Perfil from '../assets/Avatar.png';
import Input from "../components/Input";
import SidebarCondicoes from '../components/SideBarCondicoes';
import api from '../provider/api'; // sua instância axios

export default function Prontuario() {
    const user = JSON.parse(localStorage.getItem("user"));

    const navigate = useNavigate();
    const location = useLocation();
    const [showEditConfirm, setShowEditConfirm] = useState(false);
    const [editError, setEditError] = useState("");


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

                setForm({
                    nomeRegistro: data.nomeRegistro || '',
                    sisa: data.sisa || '',
                    nomeMae: data.nomeMae || '',
                    dtNasc: formatDateBR(data.dtNasc),
                    cpf: data.cpf || '',
                    genero: data.tipoGenero?.nome || '',
                    generoId: data.tipoGenero?.id || null,
                    sexualidade: data.tipoSexualidade?.nome || '',
                    sexualidadeId: data.tipoSexualidade?.id || null,
                    raca: data.raca?.toUpperCase() || '',
                    egresso: data.egressoPrisional ? 'Sim' : 'Não',
                    estrangeiro: data.estrangeiro ? 'Sim' : 'Não',
                    sexo: capitalize(data.sexo) || '',
                    nomeSocial: data.nomeSocial || '',
                    localDormir: capitalize(data.localDorme) || '',
                    status: data.status || '',
                    observacao: data.observacao || '',
                });

                setNomeSocialAtivo(Boolean(data.nomeSocial));

            } catch (error) {
                console.error("Erro ao atualizar:", error);

                const msg =
                    error?.response?.data?.error ||
                    "Não foi possível atualizar os dados. Tente novamente.";

                setEditError(msg);
                setTimeout(() => setEditError(""), 2500);
            }

            setLoading(false);
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

    const racaLabel = {
        BRANCO: "Branco(a)",
        PRETO: "Preto(a)",
        PARDO: "Pardo(a)",
        AMARELA: "Amarelo(a)",
        INDIGENA: "Indígena",
        NAO_DECLARADO: "Não declarado"
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            idFuncionario: user.userId,
            nomeRegistro: form.nomeRegistro,
            sisa: form.sisa,
            nomeMae: form.nomeMae,
            dtNasc: convertToISO(form.dtNasc),
            cpf: form.cpf,
            raca: form.raca?.toUpperCase(),

            egressoPrisional: form.egresso === "Sim",
            estrangeiro: form.estrangeiro === "Sim",

            sexo: form.sexo?.toUpperCase(),
            localDorme: form.localDormir,
            status: form.status,
            observacao: form.observacao,

            // tipoGenero: { id: mapGenero(form.genero) },
            // tipoSexualidade: { id: mapSexualidade(form.sexualidade) },
            // tipoGenero: { id: form.generoId },
            // tipoSexualidade: { id: form.sexualidadeId }
            idTipoGenero: form.generoId,
            idTipoSexualidade: form.sexualidadeId,



        };

        console.log("📌 PAYLOAD ENVIADO:", payload);

        console.log("Enviando para PUT:", payload);

        try {
            await api.put(`/beneficiarios/${idBeneficiario}`, payload);
            setShowEditConfirm(true);
            setTimeout(() => setShowEditConfirm(false), 2000);

            setIsEditing(false);
        } catch (err) {
            console.error("Erro no PUT:", err);

            setEditError("Erro ao salvar");
            setTimeout(() => setEditError(""), 2500);
        }

        function convertToISO(dateBR) {
            if (!dateBR) return null;
            const [day, month, year] = dateBR.split("/");
            return `${year}-${month}-${day}`;
        }

    };

    function mapGenero(genero) {
        const map = {
            "Cisgênero": 1,
            "Transgênero": 2,
            "Agênero": 3,
            "Não declarado": 4,
        };
        return map[genero] || null;
    }

    function mapSexualidade(sexualidade) {
        const map = {
            "Heterossexual": 1,
            "Homossexual": 2,
            "Bissexual": 3,
            "Assexual": 4,
            "Outro": 5
        };
        return map[sexualidade] || null;
    }



    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         await api.put(`/beneficiarios/${idBeneficiario}`, form);
    //         setBackupBeforeEdit(form);
    //         setIsEditing(false);
    //         alert('Dados salvos com sucesso!');
    //     } catch (err) {
    //         console.error(err);
    //         alert('Erro ao salvar dados!');
    //     }
    // };

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

                {/* Card de confirmação de edição */}
                {showEditConfirm && (
                    <div className="confirm-overlay">
                        <div className="confirm-card">
                            <div className="confirm-icon"></div>
                            <div>
                                <h3>Alterações Salvas!</h3>
                                <p>Os dados do beneficiário foram atualizados com sucesso.</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Card de erro de edição */}
                {editError && (
                    <div className="confirm-overlay">
                        <div className="error-card">
                            <div className="error-icon"></div>
                            <div>
                                <h3>Erro ao atualizar</h3>
                                <p>{editError}</p>
                            </div>
                        </div>
                    </div>
                )}


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
                                            value={form.nomeRegistro || ''}
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
                                            value={form.dtNasc}
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
                                        name="generoId"
                                        value={form.generoId || ""}
                                        onChange={(e) => {
                                            const id = Number(e.target.value)
                                            const nome = id === 1 ? "Masculino" :
                                                id === 2 ? "Feminino" :
                                                    "Outro";

                                            setForm(prev => ({
                                                ...prev,
                                                generoId: id,
                                                genero: nome,
                                            }));
                                        }}
                                    >

                                        <option value="">Selecione</option>
                                        <option value={1}>Cisgênero</option>
                                        <option value={2}>Transgênero</option>
                                        <option value={3}>Agênero</option>
                                        <option value={4}>Não declarado</option>

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
                                        <option value="BRANCO">Branco(a)</option>
                                        <option value="PRETO">Preto(a)</option>
                                        <option value="PARDO">Pardo(a)</option>
                                        <option value="AMARELA">Amarelo(a)</option>
                                        <option value="INDIGENA">Indigena</option>
                                        <option value="NAO_DECLARADO">Não declarado</option>
                                    </select>
                                ) : (
                                    <Input value={racaLabel[form.raca] || ''} disabled />

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

                            <div className="form-group">
                                <label>Estrangeiro</label>
                                {isEditing ? (
                                    <select
                                        name="estrangeiro"
                                        value={form.estrangeiro || ''}
                                        onChange={handleChange}
                                    >
                                        <option value="">Selecione</option>
                                        <option value="Sim">Sim</option>
                                        <option value="Não">Não</option>
                                    </select>
                                ) : (
                                    <Input value={form.estrangeiro || ''} disabled />
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
                                        name="sexualidadeId"
                                        value={form.sexualidadeId || ""}
                                        onChange={(e) => {
                                            const id = Number(e.target.value)

                                            const map = {
                                                1: "Heterossexual",
                                                2: "Homossexual",
                                                3: "Bissexual",
                                                4: "Assexual",
                                                5: "Outro"
                                            };

                                            setForm(prev => ({
                                                ...prev,
                                                sexualidadeId: id,
                                                sexualidade: map[id]
                                            }));
                                        }}
                                    >
                                        <option value="">Selecione</option>
                                        <option value={1}>Heterossexual</option>
                                        <option value={2}>Homossexual</option>
                                        <option value={3}>Bissexual</option>
                                        <option value={4}>Assexual</option>
                                        <option value={5}>Outro</option>

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
                                <label className="switch-two">
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
