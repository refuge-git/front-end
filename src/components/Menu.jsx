import React, { useState } from 'react';
import IconLoc from '../assets/icon-loc.png';
import IconLocHover from '../assets/icon-loc-branco.png';
import IconList from '../assets/icon-list-branco.png';
import IconSaude from '../assets/cond-saude.png';
import IconSaudeHover from '../assets/cond-saude-branco.png';
import Voltar from '../assets/icon-voltar.png';
import VoltarHover from '../assets/icon-voltar-hover.png';
import '../css/menu-controls.css';

export default function SidebarMenu() {
  const [hovered, setHovered] = useState('');
  const [voltarHover, setVoltarHover] = useState(false);

  return (
    <aside className="sidebar">
      <button
        className="menuItem"
        onMouseEnter={() => setHovered('prontuario')}
        onMouseLeave={() => setHovered('')}
      >
        <img
          src={IconList}
          alt="Prontuário"
          className="menuIcon"
        />
        Prontuário
        <span className="arrowIcon">&gt;</span>
      </button>
      <button
        className="menuItem"
        onMouseEnter={() => setHovered('endereco')}
        onMouseLeave={() => setHovered('')}
      >
        <img
          src={hovered === 'endereco' ? IconLocHover : IconLoc}
          alt="Endereço"
          className="menuIcon"
        />
        Endereço
        <span className="arrowIcon">&gt;</span>
      </button>
      <button
        className="menuItem"
        onMouseEnter={() => setHovered('saude')}
        onMouseLeave={() => setHovered('')}
      >
        <img
          src={hovered === 'saude' ? IconSaudeHover : IconSaude}
          alt="Condição de Saúde"
          className="menuIcon"
        />
        Condição de Saúde
        <span className="arrowIcon">&gt;</span>
      </button>
      <div style={{ flexGrow: 1 }}></div>
      <button
        className="voltarBtn"
        onClick={() => window.history.back()}
        onMouseEnter={() => setVoltarHover(true)}
        onMouseLeave={() => setVoltarHover(false)}
      >
        <img
          src={voltarHover ? VoltarHover : Voltar}
          alt="Seta para esquerda"
          className="voltarIcon"
        />
        <span>Voltar</span>
      </button>
    </aside>
  );
}
