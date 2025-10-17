import React, { useEffect, useRef, useState } from "react";
import api, { apiPrefix } from "../provider/api";
import {
  Chart,
  LineController,
  LineElement,
  BarController,
  BarElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import { color } from "chart.js/helpers";

Chart.register(
  LineController,
  LineElement,
  BarController,
  BarElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);
import axios from "axios";
import { Bar } from "react-chartjs-2";


export default function DashboardGraficos() {
  const lineChartRef = useRef(null);
  const barChartRef = useRef(null);
  const lineChartInstance = useRef(null);
  const barChartInstance = useRef(null);

  const [viewMode, setViewMode] = useState("mes");

  // Função que destrói o gráfico atual para recriar quando mudar o modo
  const destroyChart = () => {
    if (lineChartInstance.current) {
      lineChartInstance.current.destroy();
      lineChartInstance.current = null;
    }
  };


  // Função que cria o gráfico de atendimentos conforme o modo selecionado
  const createChart = async (mode) => {
    const ctx = lineChartRef.current;
    if (!ctx) return;

    let labels = [];
    let data = [];

    if (mode === "mes") {
      try {
        const response = await axios.get("http://localhost:3001/api/atendimentos/mes");
        const registros = response.data;

        labels = registros.map(item => item.dia_mes);
        data = registros.map(item => item.quantidade_atendimentos);
      } catch (error) {
        console.error("Erro ao buscar dados de atendimentos do mês:", error);
      }


    } else if (mode === "semana") {
      try {
        const response = await axios.get("http://localhost:3001/api/atendimentos/semana");
        const registros = response.data;

        // Ordena os dias na sequência correta (Seg → Dom)
        const ordemDias = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        registros.sort((a, b) => ordemDias.indexOf(a.dia_semana) - ordemDias.indexOf(b.dia_semana));

        labels = registros.map(item => {
          switch (item.dia_semana) {
            case "Mon": return "Seg";
            case "Tue": return "Ter";
            case "Wed": return "Qua";
            case "Thu": return "Qui";
            case "Fri": return "Sex";
            case "Sat": return "Sáb";
            case "Sun": return "Dom";
            default: return item.dia_semana;
          }
        });

        data = registros.map(item => item.quantidade_atendimentos);
      } catch (error) {
        console.error("Erro ao buscar dados de atendimentos semanais:", error);
      }

    } else if (mode === "dia") {
      try {

        const response = await apiPrefix.get("/atendimentos/dia");
        const registros = response.data;

        labels = registros.map((item) => item.hora);
        data = registros.map((item) => item.quantidade_atendimentos);
      } catch (error) {
        console.error("Erro ao buscar dados de atendimentos por dia:", error);
      }
    }

    // Destroi o gráfico anterior se existir
    if (lineChartInstance.current) {
      lineChartInstance.current.destroy();
    }

    // Cria o gráfico atualizado
    lineChartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Atendimentos",
            data,
            borderColor: "#800000",
            backgroundColor: "#800000",
            pointBackgroundColor: "#fff",
            pointBorderColor: "#800000",
            pointBorderWidth: 2,
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
        },
        scales: {
          x: {
            grid: { color: "#eee" },
            ticks: { color: "#888", font: { size: 14 } },
          },
          y: {
            beginAtZero: true,
            grid: { color: "#eee" },
            ticks: { stepSize: 250, color: "#888", font: { size: 14 } },
          },
        },
      },
    });
  };

  // Atualiza o gráfico quando o modo muda
  useEffect(() => {
    destroyChart();
    createChart(viewMode);
  }, [viewMode]);

  useEffect(() => {
    if (viewMode !== 'dia') return undefined;

    let intervalId = null;
    const doUpdate = () => {
      createChart('dia');
    };

    doUpdate();
    intervalId = setInterval(doUpdate, 30 * 1000)
    console.log("Intervalo iniciado para atualizar gráfico de dia a cada 30s");

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [viewMode]);

  // Cria o gráfico de barras uma única vez
  function DashAtendimentos() {
    const [dados, setDados] = useState([]);

    useEffect(() => {
      axios
        .get("http://localhost:3001/api/atendimentos/servicosmes")
        .then((res) => setDados(res.data))
        .catch((err) => console.error("Erro ao buscar dados:", err));
    }, []);

    const meses = [...new Set(dados.map((item) => item.mes))];
    const tipos = [...new Set(dados.map((item) => item.tipo_atendimento))];

    const colorFor = (tipo) => {
      if (!tipo) return '#F5DEB3';
      const t = tipo.toLowerCase();
      if (t.includes('refei')) return '#A52A2A'; // Refeição
      if (t.includes('banho')) return '#003366';
      return '#F5DEB3';
    };

    const datasets = tipos.map((tipo) => ({
      label: tipo,
      data: meses.map((m) => {
        const registro = dados.find(
          (item) => item.mes === m && item.tipo_atendimento === tipo
        );
        return registro ? registro.total : 0;
      }),
      backgroundColor: colorFor(tipo),
    }));

    return (
      <div style={{ marginTop: "8px", height: '100%' }}>
        <h2 style={{ marginBottom: '8px' }}>Atendimentos por Tipo e Mês</h2>
        <div style={{ width: '100%', height: 'calc(100% - 36px)' }}>
          <Bar
            data={{ labels: meses, datasets }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { position: 'top' } },
              scales: { y: { beginAtZero: true, title: { display: true, text: 'Qtd. de Atendimentos' } } },
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <>
      {/* DASHBOARD DE ATENDIMENTOS */}
      <div className="dashboard-grafico" style={{ position: "relative" }}>
        <h2 className="dashboard-grafico-title" style={{ color: 'black' }}>Atendimentos</h2>

        {/* Select no canto superior direito */}
        <select
          value={viewMode}
          onChange={(e) => setViewMode(e.target.value)}
          style={{
            position: "absolute",
            width: "200px",
            top: "10px",
            right: "20px",
            padding: "5px 10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        >
          <option value="mes">Mês</option>
          <option value="semana">Semana</option>
          <option value="dia">Dia</option>
        </select>

        <div style={{ width: "90%", height: "320px", margin: "0 auto" }}>
          <canvas ref={lineChartRef}></canvas>
        </div>
      </div>

      {/* DASHBOARD DE SERVIÇOS */}
      <div className="dashboard-grafico dashboard-grafico-bar" style={{
        margintop: "10px",
      }}>
        <h2 className="dashboard-grafico-title " style={{ color: 'black' }}>Serviços no Mês (2025)</h2>

        {/* Container com altura fixa para o gráfico ocupar totalmente */}
        <div style={{ width: "90%", height: "360px", margin: "0 auto" }}>
          <div style={{ width: '100%', height: '100%' }}>
            {/* Render da DashAtendimentos (gráfico de barras por tipo/mês) */}
            <DashAtendimentos />
          </div>
        </div>
      </div>
    </>
  );
}
