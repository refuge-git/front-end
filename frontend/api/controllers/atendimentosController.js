import { getConnection } from "../database/connection.js";

export async function getAtendimentosDia(req, res) {
  try {
    const connection = await getConnection();
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
    console.error("Erro ao buscar atendimentos do dia:", error);
    res.status(500).json({ error: "Erro ao buscar dados de atendimentos." });
  }
}

export async function getAtendimentosSemana(req, res) {
  try {
    const connection = await getConnection();
    const [rows] = await connection.query(`
      SELECT 
          DATE_FORMAT(data_hora, '%a') AS dia_semana,
          COUNT(*) AS quantidade_atendimentos
      FROM registro_atendimento
      WHERE data_hora >= DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY)
        AND data_hora <  DATE_ADD(DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY), INTERVAL 7 DAY)
      GROUP BY DATE_FORMAT(data_hora, '%a'), DAYOFWEEK(data_hora)
      ORDER BY DAYOFWEEK(data_hora);
    `);

    res.status(200).json(rows);
  } catch (error) {
    console.error("Erro ao buscar atendimentos da semana:", error);
    res.status(500).json({ error: "Erro ao buscar dados de atendimentos." });
  }
}

export async function getAtendimentosMes(req, res) {
  try {
    const connection = await getConnection();
    const [rows] = await connection.query(`
      SELECT 
          DATE_FORMAT(data_hora, '%d/%m') AS dia_mes,
          COUNT(*) AS quantidade_atendimentos
      FROM registro_atendimento
      WHERE MONTH(data_hora) = MONTH(CURRENT_DATE())
        AND YEAR(data_hora) = YEAR(CURRENT_DATE())
      GROUP BY dia_mes
      ORDER BY STR_TO_DATE(dia_mes, '%d/%m');
    `);

    res.status(200).json(rows);
  } catch (error) {
    console.error("Erro ao buscar atendimentos da semana:", error);
    res.status(500).json({ error: "Erro ao buscar dados de atendimentos." });
  }
}

export async function getServicosMes(req, res) {
  const query = `
    SELECT 
        DATE_FORMAT(ra.data_hora, '%b') AS mes,
        ta.nome AS tipo_atendimento,
        COUNT(*) AS total
    FROM registro_atendimento ra
    JOIN tipo_atendimento ta 
        ON ra.fk_tipo = ta.id_tipo_atendimento
    WHERE ra.data_hora >= DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 5 MONTH), '%Y-%m-01')
      AND ra.data_hora <  DATE_FORMAT(DATE_ADD(CURDATE(), INTERVAL 1 MONTH), '%Y-%m-01')
    GROUP BY 
        YEAR(ra.data_hora),
        MONTH(ra.data_hora),
        DATE_FORMAT(ra.data_hora, '%b'),
        ta.nome
    ORDER BY 
        YEAR(ra.data_hora),
        MONTH(ra.data_hora),
        total DESC;
  `;

  try {
    const connection = await getConnection();
    const [rows] = await connection.query(query);
    res.json(rows);
  } catch (error) {
    console.error("Erro ao buscar atendimentos por mês:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}
