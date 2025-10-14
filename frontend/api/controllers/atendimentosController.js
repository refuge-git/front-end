import { connection } from "../database/connection.js";

export async function getAtendimentosDia(req, res) {
  try {
    const [rows] = await connection.query(`
      SELECT 
      DATE_FORMAT(data_hora, '%H:00') AS hora,
      COUNT(*) AS quantidade_atendimentos
      FROM registro_atendimento
      WHERE data_hora BETWEEN CONCAT(CURDATE(), ' 07:00:00')
                        AND CONCAT(CURDATE(), ' 20:00:00')
      GROUP BY DATE_FORMAT(data_hora, '%H:00')
      ORDER BY hora;
    `);

    res.status(200).json(rows);
  } catch (error) {
    console.error("❌ Erro ao buscar atendimentos do dia:", error);
    res.status(500).json({ error: "Erro ao buscar dados de atendimentos." });
  }
}

