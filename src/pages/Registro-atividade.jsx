import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/App.css';
import SidebarCondicoes from '../components/SideBarCondicoes';
import '../css/Registro-atividade.css';


export default function AtividadesForm() {
    const navigate = useNavigate();

    const initialData = {
        presenca: false,
        banho: false,
        refeicao: false,
        novasAtividades: [],
    };

    const [form, setForm] = useState(initialData);
    const [backupBeforeEdit, setBackupBeforeEdit] = useState(initialData);
    const [novaAtividade, setNovaAtividade] = useState('');
    const [activeSection, setActiveSection] = useState('prontuario');

    const handleToggle = (name) => {
        setForm((prev) => ({ ...prev, [name]: !prev[name] }));
    };

    const handleAddAtividade = () => {
        if (novaAtividade.trim() !== '') {
            setForm((prev) => ({
                ...prev,
                novasAtividades: [...prev.novasAtividades, novaAtividade],
            }));
            setNovaAtividade('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setBackupBeforeEdit(form);
        alert('Atividades salvas com sucesso!');
    };

    const handleCancel = () => {
        navigate('/prontuario');
    };

    const handleClose = () => navigate('/condicoes-saude-teste');
    const handleClose2 = () => navigate('/home');

    return (
        <div className="condicoes-saude-container">
            <div className="condicoes-saude-box">
                <button className="close-button" onClick={handleClose2}>✕</button>
                <SidebarCondicoes
                    activeSection={activeSection}
                    onSectionChange={(sectionId) => {
                        if (sectionId === 'condicao-saude') {
                            navigate('/condicoes-saude-teste');
                        } else if (sectionId === 'endereco') {
                            navigate('/endereco-form');
                        } else {
                            setActiveSection(sectionId);
                        }
                    }}
                />

                <div className="condicoes-content">
                    <h2>Selecione a Atividade Realizada</h2>
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="form-row">
                            <label>Presença</label>
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={form.presenca}
                                    onChange={() => handleToggle('presenca')}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>

                        <div className="form-row">
                            <label>Banho</label>
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={form.banho}
                                    onChange={() => handleToggle('banho')}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>

                        <div className="form-row">
                            <label>Refeição</label>
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={form.refeicao}
                                    onChange={() => handleToggle('refeicao')}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>

                        <br /><br />
                        <button
                            type="button"
                            className="btn-add-atividade"
                            onClick={() => navigate('/registro-nova-atividade')}
                        >
                            + Adicionar nova atividade
                        </button><br /><br /><br />

                        {form.novasAtividades.length > 0 && (
                            <ul>
                                {form.novasAtividades.map((a, i) => (
                                    <li key={i}>{a}</li>
                                ))}
                            </ul>
                        )}

                        {/* Botões */}
                        <div className="form-buttons" style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 20 }}>
                            <button type="button" className="btn-pular" onClick={handleCancel}>Cancelar</button>
                            <button type="submit" className="btn-salvar">Salvar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
