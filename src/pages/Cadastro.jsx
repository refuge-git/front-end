import Botao from "../components/Botao";
import Carrossel from "../components/Carrossel";
import logo from '../assets/logo-vinho.png'
import { Link } from "react-router-dom";
import '../css/App.css';


export default function Cadastro() {
  return (

    <div className="container">

      <div className="right-side">
        <Carrossel />
      </div>

      <div className="left-side">

        <div className="logo-container_2">
          <img src={logo} alt="Logo Achiropita" className="logo" />
        </div>

        <form className="login-form">
          <h2>CADASTRE-SE</h2>

          <label htmlFor="nome"> Nome Completo: </label>
          <input type="text" id="nome" name="nome" required />

          <div className="linha-2">
            <div className="campo">
              <label htmlFor="CPF">CPF:</label>
              <input type="text" id="CPF" name="CPF" required />
            </div>

            <div className="campo">
              <label htmlFor="Telefone">Número de Telefone:</label>
              <input type="tel" id="Telefone" name="Telefone" required />
            </div>
          </div>

          <label htmlFor="Email">Email Para Login:</label>
          <input type="email" id="Email" name="Email" required />

          <div className="linha-4">
            <div className="campo">
              <label htmlFor="Senha">Senha de Acesso:</label>
              <input type="password" id="Senha" name="Senha" required />
            </div>

            <div className="campo">
              <label htmlFor="ConfirmarSenha">Confirmar Senha:</label>
              <input type="password" id="ConfirmarSenha" name="ConfirmarSenha" required />
            </div>
          </div>

          <Botao variant="cadastro" type="submit">Cadastrar</Botao>

          <div className="links">
            <p className="senha">
              Já tem Cadastro? <Link to="../" className="criar-conta"> <a href="#">Clique Aqui</a> </Link>
            </p>
            {/* <a href="./Cadastro.jsx" className="criar-conta">CRIAR CONTA</a> */}
          </div>
        </form>
      </div>

    </div>
  );
}
