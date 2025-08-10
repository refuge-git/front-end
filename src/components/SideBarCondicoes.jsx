import { useState } from 'react';

export default function SidebarCondicoes({ activeSection, onSectionChange }) {
  const menuItems = [
    {
      id: 'prontuario',
      label: 'Prontuário',
      icon: '📋'
    },
    {
      id: 'endereco',
      label: 'Endereço',
      icon: '📍'
    },
    {
      id: 'condicao-saude',
      label: 'Condição de Saúde',
      icon: '💊'
    }
  ];

  return (
    <div className="sidebar-condicoes">
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`sidebar-item ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => onSectionChange(item.id)}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
            <span className="sidebar-arrow">{'>'}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}