import { connection } from "../database/connection.js";

export const listarAtendimentos = async (req, res) => {
  try {
    const [rows] = await connection.execute("SELECT * FROM atendimentos");
    res.json(rows);
  } catch (error) {
    console.error("Erro ao listar atendimentos:", error);
    res.status(500).json({ message: "Erro no servidor" });
  }
};

export const criarAtendimento = async (req, res) => {
  const { nome, descricao } = req.body;

  try {
    const [result] = await connection.execute(
      "INSERT INTO atendimentos (nome, descricao) VALUES (?, ?)",
      [nome, descricao]
    );
    res.status(201).json({ id: result.insertId, nome, descricao });
  } catch (error) {
    console.error("Erro ao criar atendimento:", error);
    res.status(500).json({ message: "Erro no servidor" });
  }
};
