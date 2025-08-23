import React, { useState } from "react";
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    // Validação simples
    if (!form.nome || !form.cpf || !form.email || !form.senha || !form.confirmarSenha) {
      setErro("Preencha todos os campos!");
      return;
    }

    if (form.senha !== form.confirmarSenha) {
      setErro("As senhas não conferem!");
      return;
    }

    try {
      await api.post("/funcionarios", {
        nome: form.nome,
        cpf: form.cpf,
        telefone: form.telefone,
        email: form.email,
        senha: form.senha
      });

      alert("Cadastro realizado com sucesso!");
      navigate("/");
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.error) {
        setErro(error.response.data.error);
      } else {
        setErro("Erro ao cadastrar. Tente novamente.");
      }
    }
  };

  return (
    <div className="container">
      <div className="right-side">
        <Carrossel />
      </div>

      <div className="left-side">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>CADASTRE-SE</h2>

          {erro && <p className="erro">{erro}</p>} {/* mensagem de erro */}

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
