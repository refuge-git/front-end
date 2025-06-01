import Botao from "../components/Botao";
import Carrossel from "../components/Carrossel";
import logo from '../assets/logo-vinho.png'
import { Link } from "react-router-dom";

export default function Login(){
    return (
    <div className="container">
      <div className="left-side">

        <div className="logo-container">
          <img src={logo} alt="Logo Achiropita" className="logo" />
        </div>

        <form className="login-form">
          <h2>ENTRAR</h2>

          <label htmlFor="email"> Seu email:</label>
          <input type="email" id="email" name="email" required />

          <label htmlFor="password"> Sua senha:</label>
          <input type="password" id="password" name="password" required />

          <Botao type="submit">Entrar</Botao>

          <div className="links">
            <p className="senha">
              Esqueceu a Senha? <a href="#">Clique Aqui</a>
            </p>
            <Link to="/cadastro" className="criar-conta">CRIAR CONTA</Link>
            {/* <a href="./Cadastro.jsx" className="criar-conta">CRIAR CONTA</a> */}
          </div>
        </form>


      </div>

      <div className="right-side">
        <Carrossel />
      </div>

    </div>
    )
}