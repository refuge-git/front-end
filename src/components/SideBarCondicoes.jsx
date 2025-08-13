import { useState } from 'react';
import IconLoc from '../assets/icon-loc.png';
import IconLocHover from '../assets/icon-loc-branco.png';
import IconList from '../assets/icon-list.png';
import IconListHover from '../assets/icon-list-branco.png';
import IconSaude from '../assets/cond-saude.png';
import IconSaudeHover from '../assets/cond-saude-branco.png';

export default function SidebarCondicoes({ activeSection, onSectionChange }) {
  const menuItems = [
    {
      id: 'prontuario',
      label: 'Prontuário',
      icon: IconList,
      iconHover: IconListHover
    },
    {
      id: 'endereco',
      label: 'Endereço',
      icon: IconLoc,
      iconHover: IconLocHover
    },
    {
      id: 'condicao-saude',
      label: 'Condição de Saúde',
      icon: IconSaude,
      iconHover: IconSaudeHover
    }
  ];

  return (
    <div className="sidebar-condicoes">
      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const isActive = activeSection === item.id;
          const iconSrc = isActive ? item.iconHover : item.icon;

          return (
            <button
              key={item.id}
              className={`sidebar-item ${isActive ? 'active' : ''}`}
              onClick={() => onSectionChange(item.id)}
            >
              <img src={iconSrc} alt={item.label} className="sidebar-icon" />
              <span className="sidebar-label">{item.label}</span>
              <span className="sidebar-arrow">{'>'}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
