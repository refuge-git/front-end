// // import React, { useEffect, useRef, useState } from "react";
// // import api, { apiPrefix } from "../provider/api";
// // import axios from "axios";
// // import { Bar } from "react-chartjs-2";

// // import {
// //   Chart,
// //   LineController,
// //   LineElement,
// //   BarController,
// //   BarElement,
// //   PointElement,
// //   LinearScale,
// //   CategoryScale,
// //   Tooltip,
// //   Legend,
// // } from "chart.js";
// // import { color } from "chart.js/helpers";

// // Chart.register(
// //   LineController,
// //   LineElement,
// //   BarController,
// //   BarElement,
// //   PointElement,
// //   LinearScale,
// //   CategoryScale,
// //   Tooltip,
// //   Legend
// // );



// // export default function DashboardGraficos() {
// //   const lineChartRef = useRef(null);
// //   const barChartRef = useRef(null);
// //   const lineChartInstance = useRef(null);
// //   const barChartInstance = useRef(null);

// //   const [viewMode, setViewMode] = useState("mes");

// //   // Função que destrói o gráfico atual para recriar quando mudar o modo
// //   const destroyChart = () => {
// //     if (lineChartInstance.current) {
// //       lineChartInstance.current.destroy();
// //       lineChartInstance.current = null;
// //     }
// //   };


// //   // Função que cria o gráfico de atendimentos conforme o modo selecionado
// //   // const createChart = async (mode) => {
// //   //   const ctx = lineChartRef.current;
// //   //   if (!ctx) return;

// //   //   let labels = [];
// //   //   let data = [];

// //   //   if (mode === "mes") {
// //   //     labels = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
// //   //     data = Array.from({ length: 12 }, () => Math.floor(Math.random() * 1000));
// //   //   } else if (mode === "semana") {
// //   //     labels = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
// //   //     data = [450, 700, 320, 800, 950, 600, 400];
// //   //   } else if (mode === "dia") {
// //   //     try {

// //   //       const response = await apiPrefix.get("/atendimentos/dia");
// //   //       const registros = response.data;

// //   //       labels = registros.map((item) => item.hora);
// //   //       data = registros.map((item) => item.quantidade_atendimentos);
// //   //     } catch (error) {
// //   //       console.error("Erro ao buscar dados de atendimentos por dia:", error);
// //   //     }
// //   //   }

// //   //   // Destroi o gráfico anterior se existir
// //   //   if (lineChartInstance.current) {
// //   //     lineChartInstance.current.destroy();
// //   //   }

// //   //   // Cria o gráfico atualizado
// //   //   lineChartInstance.current = new Chart(ctx, {
// //   //     type: "line",
// //   //     data: {
// //   //       labels,
// //   //       datasets: [
// //   //         {
// //   //           label: "Atendimentos",
// //   //           data,
// //   //           borderColor: "#800000",
// //   //           backgroundColor: "#800000",
// //   //           pointBackgroundColor: "#fff",
// //   //           pointBorderColor: "#800000",
// //   //           pointBorderWidth: 2,
// //   //           tension: 0.3,
// //   //         },
// //   //       ],
// //   //     },
// //   //     options: {
// //   //       responsive: true,
// //   //       maintainAspectRatio: false,
// //   //       plugins: {
// //   //         legend: { display: false },
// //   //       },
// //   //       scales: {
// //   //         x: {
// //   //           grid: { color: "#eee" },
// //   //           ticks: { color: "#888", font: { size: 14 } },
// //   //         },
// //   //         y: {
// //   //           beginAtZero: true,
// //   //           grid: { color: "#eee" },
// //   //           ticks: { stepSize: 250, color: "#888", font: { size: 14 } },
// //   //         },
// //   //       },
// //   //     },
// //   //   });
// //   // };

// //   const createChart = async (mode) => {
// //     const ctx = lineChartRef.current;
// //     if (!ctx) return;

// //     let labels = [];
// //     let data = [];

// //     try {
// //       if (mode === "mes") {
// //         const response = await apiPrefix.get("/registros-atendimentos/relatorios/atendimentos-mes");
// //         console.log("Dados do backend para mês:", response.data); // <-- Log do que vem do Spring
// //         const registros = response.data;
// //         labels = registros.map((item) => item.mes); // supondo que AtendimentosPorMesDto tem campo 'mes'
// //         data = registros.map((item) => item.total); // supondo que AtendimentosPorMesDto tem campo 'total'
// //       } else if (mode === "semana") {
// //         const response = await apiPrefix.get("/registros-atendimentos/relatorios/atendimentos-semana");
// //         console.log("Dados do backend para semana:", response.data); // <-- Log do que vem do Spring
// //         const registros = response.data;
// //         labels = registros.map((item) => item.dia); // ou 'label', dependendo do DTO do backend
// //         data = registros.map((item) => item.quantidade_atendimentos); // ou 'total'
// //       } else if (mode === "dia") {
// //         const response = await apiPrefix.get("/registros-atendimentos/relatorios/atendimentos-dia");
// //         console.log("Dados do backend para dia:", response.data);
// //         const registros = response.data;
// //         labels = registros.map((item) => item.hora);
// //         data = registros.map((item) => item.quantidade_atendimentos);
// //       }
// //     } catch (error) {
// //       console.error("Erro ao buscar dados do backend:", error);
// //     }

// //     // Destroi o gráfico anterior se existir
// //     if (lineChartInstance.current) {
// //       lineChartInstance.current.destroy();
// //     }

// //     // Cria o gráfico atualizado
// //     lineChartInstance.current = new Chart(ctx, {
// //       type: "line",
// //       data: {
// //         labels,
// //         datasets: [
// //           {
// //             label: "Atendimentos",
// //             data,
// //             borderColor: "#800000",
// //             backgroundColor: "#800000",
// //             pointBackgroundColor: "#fff",
// //             pointBorderColor: "#800000",
// //             pointBorderWidth: 2,
// //             tension: 0.3,
// //           },
// //         ],
// //       },
// //       options: {
// //         responsive: true,
// //         maintainAspectRatio: false,
// //         plugins: { legend: { display: false } },
// //         scales: {
// //           x: { grid: { color: "#eee" }, ticks: { color: "#888", font: { size: 14 } } },
// //           y: { beginAtZero: true, grid: { color: "#eee" }, ticks: { stepSize: 250, color: "#888", font: { size: 14 } } },
// //         },
// //       },
// //     });
// //   };


// //   // Atualiza o gráfico quando o modo muda
// //   useEffect(() => {
// //     destroyChart();
// //     createChart(viewMode);
// //   }, [viewMode]);

// //   useEffect(() => {
// //     if (viewMode !== 'dia') return undefined;

// //     let intervalId = null;
// //     const doUpdate = () => {
// //       createChart('dia');
// //     };

// //     doUpdate();
// //     intervalId = setInterval(doUpdate, 30 * 1000)
// //     console.log("Intervalo iniciado para atualizar gráfico de dia a cada 30s");

// //     return () => {
// //       if (intervalId) clearInterval(intervalId);
// //     };
// //   }, [viewMode]);

// //   // Cria o gráfico de barras uma única vez
// //   DashAtendimentos
// //   return (
// //     <>
// //       {/* DASHBOARD DE ATENDIMENTOS */}
// //       <div className="dashboard-grafico" style={{ position: "relative" }}>
// //         <h2 className="dashboard-grafico-title">Atendimentos</h2>

// //         {/* Select no canto superior direito */}
// //         <select
// //           value={viewMode}
// //           onChange={(e) => setViewMode(e.target.value)}
// //           style={{
// //             position: "absolute",
// //             width: "200px",
// //             top: "10px",
// //             right: "20px",
// //             padding: "5px 10px",
// //             borderRadius: "5px",
// //             border: "1px solid #ccc",
// //           }}
// //         >
// //           <option value="mes">Mês</option>
// //           <option value="semana">Semana</option>
// //           <option value="dia">Dia</option>
// //         </select>

// //         <div style={{ width: "90%", height: "320px", margin: "0 auto" }}>
// //           <canvas ref={lineChartRef}></canvas>
// //         </div>
// //       </div>

// //       {/* DASHBOARD DE SERVIÇOS */}
// //       <div className="dashboard-grafico dashboard-grafico-bar" style={{
// //         margintop: "10px",
// //       }}>
// //         <h2 className="dashboard-grafico-title " style={{ color: 'black' }}>Serviços no Mês (2025)</h2>

// //         {/* Container com altura fixa para o gráfico ocupar totalmente */}
// //         <div style={{ width: "90%", height: "360px", margin: "0 auto" }}>
// //           <div style={{ width: '100%', height: '100%' }}>
// //             {/* Render da DashAtendimentos (gráfico de barras por tipo/mês) */}
// //             <DashAtendimentos />
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // }

// import React, { useEffect, useRef, useState } from "react";
// import api, { apiPrefix } from "../provider/api";
// import axios from "axios";
// import { Bar } from "react-chartjs-2";

// import {
//   Chart,
//   LineController,
//   LineElement,
//   BarController,
//   BarElement,
//   PointElement,
//   LinearScale,
//   CategoryScale,
//   Tooltip,
//   Legend,
// } from "chart.js";

// Chart.register(
//   LineController,
//   LineElement,
//   BarController,
//   BarElement,
//   PointElement,
//   LinearScale,
//   CategoryScale,
//   Tooltip,
//   Legend
// );

// export default function DashboardGraficos() {
//   const lineChartRef = useRef(null);
//   const lineChartInstance = useRef(null);
//   const [viewMode, setViewMode] = useState("mes");

//   // Destrói gráfico atual
//   const destroyChart = () => {
//     if (lineChartInstance.current) {
//       lineChartInstance.current.destroy();
//       lineChartInstance.current = null;
//     }
//   };

//   // Função que cria o gráfico de linha
//   const createChart = async (mode) => {
//     const ctx = lineChartRef.current;
//     if (!ctx) return;

//     let labels = [];
//     let data = [];

//     try {
//       if (mode === "mes") {
//         const response = await apiPrefix.get("/registros-atendimentos/relatorios/atendimentos-mes");
//         console.log("Dados do backend para mês:", response.data);
//         const registros = response.data;
//         labels = registros.map((item) => item.mes);
//         data = registros.map((item) => item.total);
//       } else if (mode === "semana") {
//         const response = await apiPrefix.get("/registros-atendimentos/relatorios/atendimentos-semana");
//         console.log("Dados do backend para semana:", response.data);
//         const registros = response.data;
//         labels = registros.map((item) => item.dia);
//         data = registros.map((item) => item.quantidade_atendimentos);
//       } else if (mode === "dia") {
//         const response = await apiPrefix.get("/registros-atendimentos/relatorios/atendimentos-dia");
//         console.log("Dados do backend para dia:", response.data);
//         const registros = response.data;
//         labels = registros.map((item) => item.hora);
//         data = registros.map((item) => item.quantidade_atendimentos);
//       }
//     } catch (error) {
//       console.error("Erro ao buscar dados do backend:", error);
//     }

//     if (lineChartInstance.current) {
//       lineChartInstance.current.destroy();
//     }

//     lineChartInstance.current = new Chart(ctx, {
//       type: "line",
//       data: {
//         labels,
//         datasets: [
//           {
//             label: "Atendimentos",
//             data,
//             borderColor: "#800000",
//             backgroundColor: "#800000",
//             pointBackgroundColor: "#fff",
//             pointBorderColor: "#800000",
//             pointBorderWidth: 2,
//             tension: 0.3,
//           },
//         ],
//       },
//       options: {
//         responsive: true,
//         maintainAspectRatio: false,
//         plugins: { legend: { display: false } },
//         scales: {
//           x: { grid: { color: "#eee" }, ticks: { color: "#888", font: { size: 14 } } },
//           y: { beginAtZero: true, grid: { color: "#eee" }, ticks: { stepSize: 250, color: "#888", font: { size: 14 } } },
//         },
//       },
//     });
//   };

//   useEffect(() => {
//     destroyChart();
//     createChart(viewMode);
//   }, [viewMode]);

//   // Componente interno para gráfico de barras (semana)
//   function DashAtendimentos() {
//     const [dados, setDados] = useState([]);

//     useEffect(() => {
//       axios
//         .get("http://localhost:8080/registros-atendimentos/relatorios/atendimentos-semana")
//         .then((res) => {
//           console.log("Dados recebidos para gráfico de barras (semana):", res.data);
//           setDados(res.data);
//         })
//         .catch((err) => console.error("Erro ao buscar dados do backend:", err));
//     }, []);

//     const dias = [...new Set(dados.map((item) => item.dia))];

//     const datasets = [
//       {
//         label: "Atendimentos",
//         data: dias.map((d) => {
//           const registro = dados.find((item) => item.dia === d);
//           return registro ? registro.quantidade_atendimentos : 0;
//         }),
//         backgroundColor: "#A52A2A",
//       },
//     ];

//     return (
//       <div style={{ marginTop: "8px", height: "100%" }}>
//         <h2 style={{ marginBottom: "8px" }}>Atendimentos por Dia da Semana</h2>
//         <div style={{ width: "100%", height: "calc(100% - 36px)" }}>
//           <Bar
//             data={{ labels: dias, datasets }}
//             options={{
//               responsive: true,
//               maintainAspectRatio: false,
//               plugins: { legend: { position: "top" } },
//               scales: {
//                 y: { beginAtZero: true, title: { display: true, text: "Qtd. de Atendimentos" } },
//               },
//             }}
//           />
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       {/* DASHBOARD DE ATENDIMENTOS */}
//       <div className="dashboard-grafico" style={{ position: "relative" }}>
//         <h2 className="dashboard-grafico-title">Atendimentos</h2>

//         <select
//           value={viewMode}
//           onChange={(e) => setViewMode(e.target.value)}
//           style={{
//             position: "absolute",
//             width: "200px",
//             top: "10px",
//             right: "20px",
//             padding: "5px 10px",
//             borderRadius: "5px",
//             border: "1px solid #ccc",
//           }}
//         >
//           <option value="mes">Mês</option>
//           <option value="semana">Semana</option>
//           <option value="dia">Dia</option>
//         </select>

//         <div style={{ width: "90%", height: "320px", margin: "0 auto" }}>
//           <canvas ref={lineChartRef}></canvas>
//         </div>
//       </div>

//       {/* DASHBOARD DE SERVIÇOS (gráfico de barras) */}
//       <div className="dashboard-grafico dashboard-grafico-bar" style={{ margintop: "10px" }}>
//         <h2 className="dashboard-grafico-title" style={{ color: "black" }}>
//           Serviços da Semana
//         </h2>
//         <div style={{ width: "90%", height: "360px", margin: "0 auto" }}>
//           <DashAtendimentos />
//         </div>
//       </div>
//     </>
//   );
// }

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import api from '../provider/api';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
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



Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function DashboardGraficos() {

  const lineChartRef = useRef(null);
  const barChartRef = useRef(null);
  const lineChartInstance = useRef(null);
  const barChartInstance = useRef(null);

  const [viewMode, setViewMode] = useState("dia");

  const destroyChart = () => {
    if (lineChartInstance.current) {
      lineChartInstance.current.destroy();
      lineChartInstance.current = null;
    }
  };


  const createChart = async (mode) => {
    const ctx = lineChartRef.current;
    if (!ctx) return;

    let labels = [];
    let data = [];

    try {
      let response;

      if (mode === "mes") {
        response = await api.get("/registros-atendimentos/relatorios/atendimentos-mes");
      } else if (mode === "semana") {
        response = await api.get("/registros-atendimentos/semana");
      } else if (mode === "dia") {
        response = await api.get("/registros-atendimentos/dia");
      }

      // LOG do que o backend retornou
      console.log(`Dados recebidos para o modo "${mode}":`, response.data);

      const registros = response.data;

      if (mode === "mes") {

        labels = registros.map(item => item.diaMes);
        data = registros.map(item => item.quantidadeAtendimentos);


      } else if (mode === "semana") {
        const ordemDias = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        registros.sort((a, b) => ordemDias.indexOf(a.dia_semana ?? a.diaSemana) - ordemDias.indexOf(b.dia_semana ?? b.diaSemana));

        labels = registros.map(item => {
          const dia = item.dia_semana ?? item.diaSemana;
          switch (dia) {
            case "Mon": return "Seg";
            case "Tue": return "Ter";
            case "Wed": return "Qua";
            case "Thu": return "Qui";
            case "Fri": return "Sex";
            case "Sat": return "Sáb";
            case "Sun": return "Dom";
            default: return dia;
          }
        });

        data = registros.map(item => item.quantidade_atendimentos ?? item.quantidadeAtendimentos);
      } else if (mode === "dia") {
        labels = registros.map(item => item.hora);
        data = registros.map(item => item.quantidade_atendimentos ?? item.quantidadeAtendimento);
      }

    } catch (error) {
      console.error(`Erro ao buscar dados de atendimentos (${mode}):`, error);
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
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: "#eee" }, ticks: { color: "#888", font: { size: 14 } } },
          y: { beginAtZero: true, grid: { color: "#eee" }, ticks: { stepSize: 250, color: "#888", font: { size: 14 } } },
        },
      },
    });
  };

  // Atualiza o gráfico quando o modo muda
  useEffect(() => {
    destroyChart();
    createChart(viewMode);
  }, [viewMode]);

  // Atualiza o gráfico de "dia" a cada 30 segundos
  useEffect(() => {
    if (viewMode !== "dia") return undefined;

    const doUpdate = () => createChart("dia");

    doUpdate(); // primeira atualização imediata
    const intervalId = setInterval(doUpdate, 30 * 1000);
    console.log("Intervalo iniciado para atualizar gráfico de dia a cada 30s");

    return () => clearInterval(intervalId);
  }, [viewMode]);


  function DashAtendimentos() {
    const [dados, setDados] = useState([]);

    useEffect(() => {
      api
        .get("/registros-atendimentos/relatorios/atendimentos-semana")
        .then((res) => {
          console.log("Dados recebidos para gráfico de barras (semana):", res.data);
          setDados(res.data);
        })
        .catch((err) => console.error("Erro ao buscar dados do backend:", err));
    }, []);


    const meses = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const mesesPortugues = {
      Jan: 'Jan',
      Feb: 'Fev',
      Mar: 'Mar',
      Apr: 'Abr',
      May: 'Mai',
      Jun: 'Jun',
      Jul: 'Jul',
      Aug: 'Ago',
      Sep: 'Set',
      Oct: 'Out',
      Nov: 'Nov',
      Dec: 'Dez',
    };

    const datasets = [
      {
        label: "Banhos",
        data: meses.map((m) => {
          const registro = dados.find((item) => item.label === m);
          return registro ? registro.quantidadeBanhos : 0;
        }),
        backgroundColor: "#141515ff",
      },
      {
        label: "Refeições",
        data: meses.map((m) => {
          const registro = dados.find((item) => item.label === m);
          return registro ? registro.quantidadeRefeicoes : 0;
        }),
        backgroundColor: "#A52A2A",
      },
      {
        label: "Outros",
        data: meses.map((m) => {
          const registro = dados.find((item) => item.label === m);
          return registro ? registro.quantidadeOutros : 0;
        }),
        backgroundColor: "#d4dac6ff",
      },
    ];



    return (
      <div style={{ marginTop: "8px", height: "100%" }}>
        <h2 style={{ marginBottom: "8px" }}>Atendimentos por Dia da Semana</h2>
        <div style={{ width: "100%", height: "calc(100% - 36px)" }}>
          <Bar
            data={{
              labels: meses.map((m) => mesesPortugues[m]),
              datasets,
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { position: "top" } },
              scales: {
                y: { beginAtZero: true, title: { display: true, text: "Qtd. de Atendimentos" } },
              },
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
          <option value="dia">Dia</option>
          <option value="semana">Semana</option>
          <option value="mes">Mês</option>
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
  //   <>

  //     <div className="dashboard-grafico dashboard-grafico-bar" style={{ margintop: "10px" }}>
  //       <h2 className="dashboard-grafico-title" style={{ color: "black" }}>
  //         Atendimentos da Semana
  //       </h2>
  //       <div style={{ width: "90%", height: "400px", margin: "0 auto" }}>
  //         <DashAtendimentos />
  //       </div>
  //     </div>
  //   </>
  // );
}

