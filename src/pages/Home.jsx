import { useState } from "react";
import Beneficiarios from "../components/Beneficiarios";
import Status from "../components/Status";
import Dashboards from "../components/Dashboards";
import Perfil from "../components/Perfil"; 
import Avatar from "../assets/Avatar.png";
import "../css/Home.css";

export default function Home() {
  const [showMenu, setShowMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="home-root">
      {/* Header */}
      <header className="home-header">
        <img
          src={Avatar}
          alt="Usuário"
          className="home-header-avatar"
          onClick={() => {
            setShowMenu(true);
            setShowProfile(false);
          }}
        />
      </header>

      {/* Main */}
      <main className="home-main">
        <Beneficiarios />
        <Status />
      </main>

      {/* Dashboards */}
      <Dashboards />

      {/* Overlay Menu */}
      {showMenu && !showProfile && (
        <div className="overlay">
          <div className="menu-card">
            <button className="close-button" onClick={() => setShowMenu(false)}>✖</button>
            {/* <button className="close-button" onClick={handleClose2}>✕</button> */}

            <img src={Avatar} alt="Perfil" className="menu-avatar" />
            <h3 className="perfil-nome">Fabiana</h3>
            <button
              className="menu-btn"
              onClick={() => setShowProfile(true)}
            >
              Seu Perfil
            </button>
            <button
              className="menu-btn"
              onClick={() => setShowMenu(false)}
            >
              Sair
            </button>
          </div>
        </div>
      )}

      {/* Overlay Perfil */}
      {showMenu && showProfile && (
        <div className="overlay">
          <div className="perfil-wrapper">
            <button
              className="close-btn"
              onClick={() => {
                setShowProfile(false);
                setShowMenu(false);
              }}
            >
              ✖
            </button>
            {/* <Perfil /> */}
            <Perfil
              onClose={() => {
                setShowProfile(false);
                setShowMenu(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
