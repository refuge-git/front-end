// import Avatar from "../assets/Avatar.png";
// import "../css/App.css";
// import Input from "../components/Input";
// import api from "../provider/api";
// import { useEffect, useState } from "react";

// export default function Perfil({ onClose }) {

//     const [nome, setNome] = useState("");
//     const [dados, setDados] = useState({ email: "", telefone: "", cpf: "" });

//     useEffect(() => {
//         const token = localStorage.getItem("token");
//         api.get("/funcionarios/me", {
//             headers: { Authorization: `Bearer ${token}` }
//         })
//         .then(res => {
//             const funcionario = res.data;
//             setNome(funcionario.nome || "");
//             setDados({
//                 email: funcionario.email || "",
//                 telefone: funcionario.telefone || "",
//                 cpf: funcionario.cpf || ""
//             });
//         })
//         .catch(() => {
//             setNome("");
//             setDados({ email: "", telefone: "", cpf: "" });
//         });
//     }, []);

//     return (
//         <div className="perfil-container">
//             <button className="close-button" onClick={onClose}>✖</button>

//             {/* Avatar e Nome */}
//             <div className="perfil-header">
//                 <h2>Seu Perfil</h2>

//                 <div className="avatar-container">
//                     <img src={Avatar} alt="Foto de Perfil" className="perfil-avatar" />
//                     <div className="avatar-edit-icon">✎</div>
//                 </div>

//                 <h3 className="perfil-nome">{nome}</h3>
//             </div>

//             <div className="perfil-grid-one-columns">
//                 <div className="form-group">
//                     <label>Email</label>
//                     <Input className="input-des" type="email" placeholder="Digite seu email" value={dados.email} disabled/>
//                 </div>
//             </div>

//             <div className="perfil-grid">
//                 <div className="form-group">
//                     <label>Telefone</label>
//                     <Input className="input-des" type="text" placeholder="Digite seu telefone" value={dados.telefone} disabled/>
//                 </div>

//                 <div className="form-group">
//                     <label>CPF</label>
//                     <Input className="input-des" type="text" placeholder="Digite seu CPF" value={dados.cpf} disabled />
//                 </div>
//             </div>

//             <button className="perfil-edit-btn">Editar</button>
//         </div>
//     );
// }

import Avatar from "../assets/Avatar.png";
import "../css/App.css";
import Input from "../components/Input";
import api from "../provider/api";
import { useEffect, useState } from "react";

export default function Perfil({ onClose }) {

    const [nome, setNome] = useState("");
    const [dados, setDados] = useState({ email: "", telefone: "", cpf: "" });

    useEffect(() => {
        const token = localStorage.getItem("token");
        api.get("/funcionarios/me", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
            const funcionario = res.data;
            setNome(funcionario.nome || "");
            setDados({
                email: funcionario.email || "",
                telefone: funcionario.telefone || "",
                cpf: funcionario.cpf || ""
            });
        })
        .catch(() => {
            setNome("");
            setDados({ email: "", telefone: "", cpf: "" });
        });
    }, []);

    return (
        <div className="perfil-container">
            <button className="close-button" onClick={onClose}>✖</button>

            {/* Cabeçalho do Perfil */}
            <div className="perfil-header">
                <h2>Seu Perfil</h2>

                <div className="avatar-container">
                    <img src={Avatar} alt="Foto de Perfil" className="perfil-avatar" />
                    <div className="avatar-edit-icon">✎</div>
                </div>

                <h3 className="perfil-nome">{nome}</h3>

            </div>

            {/* Input do e-mail */}
            <div className="perfil-grid-one-columns">
                <div className="form-group">
                    <label>Email</label>
                    <Input 
                        className="input-des" 
                        type="email" 
                        placeholder="Digite seu email" 
                        value={dados.email} 
                        disabled
                    />
                </div>
            </div>

            {/* Inputs de telefone e CPF */}
            <div className="perfil-grid">
                <div className="form-group">
                    <label>Telefone</label>
                    <Input 
                        className="input-des" 
                        type="text" 
                        placeholder="Digite seu telefone" 
                        value={dados.telefone} 
                        disabled
                    />
                </div>

                <div className="form-group">
                    <label>CPF</label>
                    <Input 
                        className="input-des" 
                        type="text" 
                        placeholder="Digite seu CPF" 
                        value={dados.cpf} 
                        disabled 
                    />
                </div>
            </div>

            <button className="perfil-edit-btn">Editar</button>
        </div>
    );
}

