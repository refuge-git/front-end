import Botao from "../components/Botao";
import { Link } from "react-router-dom";
import '../css/Registro-atividade.css';

export default function Prontuario() {
    return (
        <div className="container-prontuario">

            <div className="sidebar">
                <Link to="/">
                    <button className="voltar-btn">←</button>
                </Link>
                <nav className="menu-lateral">
                    <button className="menu-item ativo">Prontuário</button>
                    <button className="menu-item">Endereço</button>
                    <button className="menu-item">Condição de Saúde</button>
                    <button className="menu-item">Relatório Geral</button>
                </nav>
            </div>

            <div className="conteudo">
                <div className="box-dados">
                    <h2>Dados</h2>
                    <div className="dado-item">
                        <label htmlFor="presenca">Presença:</label>
                        <label className="switch">
                            <input type="checkbox" id="presenca" />
                            <span className="slider"></span>
                        </label>
                    </div>
                    <div className="dado-item">
                        <label htmlFor="banho">Banho:</label>
                        <label className="switch">
                            <input type="checkbox" id="banho" />
                            <span className="slider"></span>
                        </label>
                    </div>
                    <div className="dado-item">
                        <label htmlFor="refeicao">Refeição:</label>
                        <label className="switch">
                            <input type="checkbox" id="refeicao" />
                            <span className="slider"></span>
                        </label>
                    </div>
                </div>

                <div className="acoes">
                    <Botao type="submit">Salvar</Botao>
                    <button className="botao-atividade">Adicionar nova Atividade</button>
                </div>
            </div>

        </div>
    );
}
