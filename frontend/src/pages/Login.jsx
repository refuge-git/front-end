import Botao from "../components/Botao";
import Carrossel from "../components/Carrossel";
import Input from "../components/Input";
import logo from '../assets/logo-vinho.png';
import { Link, useNavigate } from "react-router-dom";
import '../css/App.css';
import { useState, useEffect } from 'react';
import api from "../provider/api";

export default function Login() {
  const [form, setForm] = useState({
    email: '',
    senha: ''
  });
  const [erro, setErro] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/funcionarios/login', {
        email: form.email,
        senha: form.senha
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('email', response.data.email);
      if (response.data.userId) {
        localStorage.setItem('funcionarioId', response.data.userId);
      }
      setShowConfirm(true);
      setTimeout(() => {
        navigate('/home');
      }, 2000);
    } catch (error) {
      setErro("Usuário ou senha inválidos!\n");
    }
  };

  useEffect(() => {
    if (erro) {
      const timer = setTimeout(() => setErro(""), 1000);
      return () => clearTimeout(timer);
    }
  }, [erro]);

  return (
    <div className="container">
      {/* Card de erro */}
      {erro && (
        <div className="confirm-overlay">
          <div className="error-card">
            <div className="error-icon"></div>
            <h3>Erro no login</h3>
            <p style={{ whiteSpace: "pre-line" }}>{erro}</p>
          </div>
        </div>
      )}
      {/* Card de confirmação */}
      {showConfirm && (
        <div className="confirm-overlay">
          <div className="confirm-card">
            <div className="confirm-icon"></div>
            <h3>Login realizado!</h3>
            <p>Você será redirecionado para a página inicial.</p>
          </div>
        </div>
      )}

      <div className="right-side">
        <Carrossel />
      </div>

      <div className="left-side">
        <div className="logo-container">
          {/* <img src={logo} alt="Logo Achiropita" className="logo" /> */}
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <h2>SAIR</h2>

          <div className="form-group-atv">
            <label>Email</label>
            <Input
              type="email"
              name="email"
              placeholder="Digite seu email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group-atv">
            <label>Senha</label>
            <Input
              type="password"
              name="senha"
              placeholder="Digite sua senha"
              value={form.senha}
              onChange={handleChange}
              required
            />
          </div>

          <Botao variant="cadastro" type="submit">Entrar</Botao>

          <div className="links">
            <p className="senha">
              Esqueceu a Senha? <a href="#">Clique Aqui</a>
            </p>
            <Link to="/cadastro" className="criar-conta">CRIAR CONTA</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
