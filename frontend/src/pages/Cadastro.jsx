import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../provider/api";

import Botao from "../components/Botao";
import Carrossel from "../components/Carrossel";
import Input from "../components/Input";
import "../css/App.css";

export default function Cadastro() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: '',
    cpf: '',
    telefone: '',
    email: '',
    senha: '',
    confirmarSenha: '',
  });

  const [erro, setErro] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  function maskCPF(value) {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
      .slice(0, 14);
  }

  function maskTelefone(value) {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .slice(0, 15);
  }

  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.name === "cpf") {
      value = maskCPF(value);
    }
    if (e.target.name === "telefone") {
      value = maskTelefone(value);
    }
    setForm({ ...form, [e.target.name]: value });
  };

  const validateForm = () => {

    if (!form.nome || form.nome.trim().length < 3) {
      return "Nome deve ter pelo menos 3 caracteres.";
    }

    if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(form.cpf)) {
      return "CPF inválido. Use o formato 000.000.000-00.";
    }

    if (form.telefone && !/^\(\d{2}\) \d{5}-\d{4}$/.test(form.telefone)) {
      return "Telefone inválido. Use o formato (00) 00000-0000.";
    }

    if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email)) {
      return "Email inválido.";
    }

    if (!form.senha ||
      form.senha.length < 6 ||
      !/[A-Z]/.test(form.senha) ||
      !/[a-z]/.test(form.senha) ||
      !/[0-9]/.test(form.senha) ||
      !/[!@#$]/.test(form.senha)
    ) {
      return "Senha deve ter pelo menos 6 caracteres e conter número, letra maiúscula, letra minúscula e símbolo (!, @, #, $).";
    }
    // Confirmar senha
    if (form.senha !== form.confirmarSenha) {
      return "As senhas não conferem!";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    const erroValidacao = validateForm();
    if (erroValidacao) {
      setErro(erroValidacao);
      return;
    }

    const telefoneSemMascara = form.telefone.replace(/\D/g, "");
    const cpfSemMascara = form.cpf.replace(/\D/g, "");

    try {
      await api.post("/funcionarios", {
        nome: form.nome,
        cpf: cpfSemMascara,
        telefone: telefoneSemMascara,
        email: form.email,
        senha: form.senha
      });

      setShowConfirm(true);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.error) {
        setErro(error.response.data.error);
      } else {
        setErro("Erro ao cadastrar. Tente novamente.");
      }
    }
  };

  useEffect(() => {
    if (erro) {
      const timer = setTimeout(() => setErro(""), 1200);
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
            <h3>Erro no cadastro</h3>
            <p style={{ whiteSpace: "pre-line" }}>{erro}</p>
          </div>
        </div>
      )}
      {/* Card de confirmação */}
      {showConfirm && (
        <div className="confirm-overlay">
          <div className="confirm-card">
            <div className="confirm-icon"></div>
            <h3>Cadastro realizado!</h3>
            <p>Você será redirecionado para o login.</p>
          </div>
        </div>
      )}

      <div className="right-side">
        <Carrossel />
      </div>

      <div className="left-side">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>CADASTRE-SE</h2>


          <div className="form-group-atv">
            <label>Nome Completo</label>
            <Input
              name="nome"
              placeholder="Nome Completo"
              value={form.nome}
              onChange={handleChange}
            />
          </div>

          <div className="linha-2">
            <div className="form-group-atv small">
              <label>CPF</label>
              <Input
                name="cpf"
                placeholder="000.000.000-00"
                value={form.cpf}
                onChange={handleChange}
              />
            </div>

            <div className="form-group-atv small">
              <label>Telefone</label>
              <Input
                name="telefone"
                placeholder="(00) 00000-0000"
                value={form.telefone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group-atv">
            <label>Email</label>
            <Input
              name="email"
              placeholder="Digite seu email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="linha-2">
            <div className="form-group-atv small">
              <label>Senha</label>
              <Input
                type="password"
                name="senha"
                placeholder="Senha"
                value={form.senha}
                onChange={handleChange}
              />
            </div>

            <div className="form-group-atv small">
              <label>Confirmar Senha</label>
              <Input
                type="password"
                name="confirmarSenha"
                placeholder="Confirmar Senha"
                value={form.confirmarSenha}
                onChange={handleChange}
              />
            </div>
          </div>

          <Botao variant="cadastro" type="submit">Cadastrar</Botao>

          <div className="links">
            <p className="senha">
              Já tem Cadastro?{" "}
              <Link to="../" className="criar-conta">Clique Aqui</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
