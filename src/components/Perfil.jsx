import Avatar from "../assets/Avatar.png";
import "../css/App.css";
import Input from "../components/Input";

export default function Perfil({ onClose }) {

    const dados = {
        email: "Fabiana@achiropita.com",
        telefone: "11988765432",
        cpf: "657.394.837-43",
    };

    return (
        <div className="perfil-container">
            <button className="close-button" onClick={onClose}>✖</button>

            {/* Avatar e Nome */}
            <div className="perfil-header">
                <h2>Seu Perfil</h2>

                <div className="avatar-container">
                    <img src={Avatar} alt="Foto de Perfil" className="perfil-avatar" />
                    <div className="avatar-edit-icon">✎</div>
                </div>

                <h3 className="perfil-nome">Fabiana</h3>
            </div>

            <div className="perfil-grid-one-columns">
                <div className="form-group">
                    <label>Email</label>
                    <Input className="input-des" type="email" placeholder="Digite seu email" value={dados.email} disabled/>
                </div>
            </div>

            <div className="perfil-grid">
                <div className="form-group">
                    <label>Telefone</label>
                    <Input className="input-des" type="text" placeholder="Digite seu telefone" value={dados.telefone} disabled/>
                </div>

                <div className="form-group">
                    <label>CPF</label>
                    <Input className="input-des" type="text" placeholder="Digite seu CPF" value={dados.cpf} disabled />
                </div>
            </div>

            <button className="perfil-edit-btn">Editar</button>
        </div>
    );
}
