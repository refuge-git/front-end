// import React, { useEffect, useState, useRef } from "react";
// import { Bar } from "react-chartjs-2";
// import api from '../provider/api';
// import { Calendar } from "lucide-react";
// import {
//   Chart,
//   LineController,
//   LineElement,
//   PointElement,
//   BarController,
//   BarElement,
//   CategoryScale,
//   LinearScale,
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

//   const [viewMode, setViewMode] = useState("dia");
//   const [selectedDate, setSelectedDate] = useState(""); // NOVO ESTADO

//   const destroyChart = () => {
//     if (lineChartInstance.current) {
//       lineChartInstance.current.destroy();
//       lineChartInstance.current = null;
//     }
//   };

//   const createChart = async (mode) => {
//     const ctx = lineChartRef.current;
//     if (!ctx) return;

//     let labels = [];
//     let data = [];

//     try {
//       let response;

//       if (mode === "mes") {
//         response = await api.get("/registros-atendimentos/relatorios/atendimentos-mes");
//       } else if (mode === "semana") {
//         response = await api.get("/registros-atendimentos/semana");
//       } else if (mode === "dia") {
//         response = await api.get("/registros-atendimentos/dia");
//       }

//       const registros = response.data;

//       if (mode === "mes") {
//         labels = registros.map(item => item.diaMes);
//         data = registros.map(item => item.quantidadeAtendimentos);

//       } else if (mode === "semana") {
//         const ordemDias = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
//         registros.sort((a, b) =>
//           ordemDias.indexOf(a.dia_semana ?? a.diaSemana) -
//           ordemDias.indexOf(b.dia_semana ?? b.diaSemana)
//         );

//         labels = registros.map(item => {
//           const dia = item.dia_semana ?? item.diaSemana;
//           switch (dia) {
//             case "Mon": return "Seg";
//             case "Tue": return "Ter";
//             case "Wed": return "Qua";
//             case "Thu": return "Qui";
//             case "Fri": return "Sex";
//             case "Sat": return "Sáb";
//             case "Sun": return "Dom";
//             default: return dia;
//           }
//         });

//         data = registros.map(item => item.quantidade_atendimentos ?? item.quantidadeAtendimentos);

//       } else if (mode === "dia") {
//         labels = registros.map(item => item.hora);
//         data = registros.map(item => item.quantidade_atendimentos ?? item.quantidadeAtendimento);
//       }

//     } catch (error) {
//       console.error(`Erro ao buscar dados (${mode}):`, error);
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

//   useEffect(() => {
//     if (viewMode !== "dia") return;

//     const doUpdate = () => createChart("dia");

//     doUpdate();
//     const intervalId = setInterval(doUpdate, 30 * 1000);

//     return () => clearInterval(intervalId);
//   }, [viewMode]);

//   function DashAtendimentos() {
//     const [dados, setDados] = useState([]);

//     useEffect(() => {
//       api.get("/registros-atendimentos/relatorios/atendimentos-semana")
//         .then((res) => setDados(res.data))
//         .catch((err) => console.error(err));
//     }, []);

//     const meses = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

//     const mesesPort = {
//       Jan: 'Jan', Feb: 'Fev', Mar: 'Mar', Apr: 'Abr', May: 'Mai',
//       Jun: 'Jun', Jul: 'Jul', Aug: 'Ago', Sep: 'Set', Oct: 'Out',
//       Nov: 'Nov', Dec: 'Dez',
//     };

//     const datasets = [
//       {
//         label: "Banhos",
//         data: meses.map((m) => {
//           const r = dados.find((item) => item.label === m);
//           return r ? r.quantidadeBanhos : 0;
//         }),
//         backgroundColor: "#141515ff",
//       },
//       {
//         label: "Refeições",
//         data: meses.map((m) => {
//           const r = dados.find((item) => item.label === m);
//           return r ? r.quantidadeRefeicoes : 0;
//         }),
//         backgroundColor: "#A52A2A",
//       },
//       {
//         label: "Outros",
//         data: meses.map((m) => {
//           const r = dados.find((item) => item.label === m);
//           return r ? r.quantidadeOutros : 0;
//         }),
//         backgroundColor: "#d4dac6ff",
//       },
//     ];

//     return (
//       <div style={{ marginTop: "8px", height: "100%" }}>
//         <h2 style={{ marginBottom: "8px" }}>Atendimentos por Dia da Semana</h2>
//         <div style={{ width: "100%", height: "calc(100% - 36px)" }}>
//           <Bar
//             data={{
//               labels: meses.map((m) => mesesPort[m]),
//               datasets,
//             }}
//             options={{
//               responsive: true,
//               maintainAspectRatio: false,
//               plugins: { legend: { position: "top" } },
//               scales: {
//                 y: { beginAtZero: true },
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
//         <h2 className="dashboard-grafico-title" style={{ color: 'black' }}>Atendimentos</h2>

//         {/* NOVA ÁREA DE CONTROLES */}
//         <div style={{
//           position: "absolute",
//           top: "10px",
//           right: "20px",
//           display: "flex",
//           gap: "10px"
//         }}>

//           {/* SELECT */}
//           <select
//             value={viewMode}
//             onChange={(e) => {
//               setViewMode(e.target.value);
//               setSelectedDate("");
//             }}
//             style={{
//               padding: "5px 10px",
//               borderRadius: "5px",
//               border: "1px solid #ccc",
//               width: "130px"
//             }}
//           >
//             <option value="dia">Dia</option>
//             <option value="semana">Semana</option>
//             <option value="mes">Mês</option>
//           </select>

//           {/* BOTÃO + CALENDÁRIO OCULTO */}
//           <div style={{ position: "relative" }}>
//             <button
//               onClick={() => document.getElementById("date-picker").showPicker()}
//               style={{
//                 padding: "6px 10px",
//                 borderRadius: "6px",
//                 border: "1px solid #ccc",
//                 background: "#fff",
//                 cursor: "pointer",
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "6px",
//                 minWidth: "150px",
//                 color: "#000",
//               }}
//             >
//               <Calendar size={18} />
//               {selectedDate ? selectedDate : "Selecionar data"}
//             </button>

//             <input
//               id="date-picker"
//               type="date"
//               value={selectedDate}
//               onChange={(e) => setSelectedDate(e.target.value)}
//               style={{
//                 opacity: 0,
//                 position: "absolute",
//                 pointerEvents: "none"
//               }}
//             />
//           </div>
//         </div>

//         {/* GRÁFICO DE LINHA */}
//         <div style={{ width: "90%", height: "320px", margin: "0 auto" }}>
//           <canvas ref={lineChartRef}></canvas>
//         </div>
//       </div>

//       {/* DASHBOARD DE SERVIÇOS */}
//       <div className="dashboard-grafico dashboard-grafico-bar" style={{ margintop: "10px" }}>
//         <h2 className="dashboard-grafico-title " style={{ color: 'black' }}>Serviços no Mês (2025)</h2>

//         <div style={{ width: "90%", height: "360px", margin: "0 auto" }}>
//           <div style={{ width: '100%', height: '100%' }}>
//             <DashAtendimentos />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }


//   //   <>

//   //     <div className="dashboard-grafico dashboard-grafico-bar" style={{ margintop: "10px" }}>
//   //       <h2 className="dashboard-grafico-title" style={{ color: "black" }}>
//   //         Atendimentos da Semana
//   //       </h2>
//   //       <div style={{ width: "90%", height: "400px", margin: "0 auto" }}>
//   //         <DashAtendimentos />
//   //       </div>
//   //     </div>
//   //   </>
//   // );


