import React, { useEffect, useState, useRef } from "react";
import api from "../provider/api";
import DatePicker from "react-datepicker";
import { Calendar } from "lucide-react";

import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

import "react-datepicker/dist/react-datepicker.css";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function DashboardAtendimentos() {
  const lineChartRef = useRef(null);
  const lineChartInstance = useRef(null);

  const [viewMode, setViewMode] = useState("dia");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDayPicker, setShowDayPicker] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const destroyChart = () => {
    if (lineChartInstance.current) {
      lineChartInstance.current.destroy();
      lineChartInstance.current = null;
    }
  };

  const createChart = async () => {
    const ctx = lineChartRef.current;
    if (!ctx) return;

    let labels = [];
    let data = [];

    try {
      let response;

      if (viewMode === "dia") {
        response = await api.get("/registros-atendimentos/dia", {
          params: {
            data: selectedDate.toISOString().split("T")[0],
          },
        });
      }

      if (viewMode === "personalizada" && startDate && endDate) {
        response = await api.get("/registros-atendimentos/intervalo", {
          params: {
            inicio: startDate.toISOString().split("T")[0],
            fim: endDate.toISOString().split("T")[0],
          },
        });
      }

      const registros = response?.data || [];

      labels = registros.map((item) => item.hora || item.data);
      data = registros.map(
        (item) => item.quantidade_atendimentos ?? item.quantidadeAtendimentos
      );
    } catch (err) {
      console.error("Erro ao carregar dados:", err);
    }

    destroyChart();

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
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: {
            title: {
              display: true,
              text: "Quantidade de Atendimentos",
              font: { size: 16 },
            },
          },
        },
      },
    });
  };

  useEffect(() => {
    createChart();
  }, [viewMode, selectedDate, startDate, endDate]);

  useEffect(() => {
    if (viewMode !== "dia") return;

    const interval = setInterval(() => createChart(), 30000);
    return () => clearInterval(interval);
  }, [viewMode]);

  return (
    <div className="dashboard-grafico">

      {/* NOVO CONTAINER DE CONTROLES */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "15px",
          width: "100%",
          marginBottom: "20px",
        }}
      >
        {/* ---------------- MODO DIA ---------------- */}
        {viewMode === "dia" && (
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setShowDayPicker(!showDayPicker)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 20px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                background: "#fff",
                color: "#000",
                cursor: "pointer",
              }}
            >
              <Calendar size={18} color="#000" />
              {selectedDate.toLocaleDateString("pt-BR")}
            </button>

            {showDayPicker && (
              <div
                style={{
                  position: "absolute",
                  top: 45,
                  right: 0,
                  zIndex: 999,
                  background: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.20)",
                }}
              >
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => {
                    setSelectedDate(date);
                    setShowDayPicker(false);
                  }}
                  inline
                />
              </div>
            )}
          </div>
        )}


        {/* ---------------- MODO PERSONALIZADO ---------------- */}
        {viewMode === "personalizada" && (
          <div
            style={{
              position: "absolute",
              width: "130px",
              height: "30px",
              top: "30px",
              right: "170px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <DatePicker
              selected={startDate}
              onChange={setStartDate}
              placeholderText="Início"
              dateFormat="dd/MM/yyyy"
            />

            <DatePicker
              selected={endDate}
              onChange={setEndDate}
              placeholderText="Fim"
              dateFormat="dd/MM/yyyy"
            />
          </div>
        )}

        {/* SELECT PRINCIPAL */}
        <select
          value={viewMode}
          onChange={(e) => setViewMode(e.target.value)}
          style={{
            width: "130px",
            height: "37px",
            padding: "5px 10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        >
          <option value="dia">Dia</option>
          <option value="personalizada">Personalizada</option>
        </select>
      </div>
      
      <h2 className="dashboard-grafico-title" style={{ color: "black" }}>
        Atendimentos
      </h2>
      <div style={{ width: "80%", height: 310, margin: "0 auto" }}>
        <canvas ref={lineChartRef}></canvas>
      </div>
    </div>
  );
}
