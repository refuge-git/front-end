// import { useState } from "react";
// import Beneficiarios from "../components/Beneficiarios";
// import Status from "../components/Status";
// import Dashboards from "../components/Dashboards";
// import Perfil from "../components/Perfil"; 
// import Avatar from "../assets/Avatar.png";
// import "../css/Home.css";
// import { useEffect } from "react";

// export default function Home() {
//   const [showMenu, setShowMenu] = useState(false);
//   const [showProfile, setShowProfile] = useState(false);
//   const [nomePerfil, setNomePerfil] = useState("");

//   // Buscar nome do usuário logado
//   useEffect(() => {
//     if (showMenu) {
//       const token = localStorage.getItem("token");
//       import("../provider/api").then(({ default: api }) => {
//         api.get("/funcionarios/me", {
//           headers: { Authorization: `Bearer ${token}` }
//         })
//         .then(res => {
//           setNomePerfil(res.data.nome || "");
//         })
//         .catch(() => setNomePerfil(""));
//       });
//     }
//   }, [showMenu]);

//   return (
//     <div className="home-root">
//       {/* Header */}
//       <header className="home-header">
//         <img
//           src={Avatar}
//           alt="Usuário"
//           className="home-header-avatar"
//           onClick={() => {
//             setShowMenu(true);
//             setShowProfile(false);
//           }}
//         />
//       </header>

//       {/* Main */}
//       <main className="home-main">
//         <Beneficiarios />
//         <Status />
//       </main>

//       {/* Dashboards */}
//       <Dashboards />

//       {/* Overlay Menu */}
//       {showMenu && !showProfile && (
//         <div className="overlay">
//           <div className="menu-card">
//             <button className="close-button" onClick={() => setShowMenu(false)}>✖</button>
//             <img src={Avatar} alt="Perfil" className="menu-avatar" />
//             <h3 className="perfil-nome">{nomePerfil}</h3>
//             <button
//               className="menu-btn"
//               onClick={() => setShowProfile(true)}
//             >
//               Seu Perfil
//             </button>
//             <button
//               className="menu-btn"
//               onClick={() => setShowMenu(false)}
//             >
//               Sair
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Overlay Perfil */}
//       {showMenu && showProfile && (
//         <div className="overlay">
//           <div className="perfil-wrapper">
//             <button
//               className="close-btn"
//               onClick={() => {
//                 setShowProfile(false);
//                 setShowMenu(false);
//               }}
//             >
//               ✖
//             </button>
//             {/* <Perfil /> */}
//             <Perfil
//               onClose={() => {
//                 setShowProfile(false);
//                 setShowMenu(false);
//               }}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// import { useState, useEffect, useRef } from "react";
// import Beneficiarios from "../components/Beneficiarios";
// import Status from "../components/Status";
// import Dashboards from "../components/Dashboards";
// import Perfil from "../components/Perfil"; 
// import Avatar from "../assets/Avatar.png";
// import Logo from "../assets/icon-logo-branca.png";
// import "../css/Home.css";

// export default function Home() {
//   const [showMenu, setShowMenu] = useState(false);
//   const [showProfile, setShowProfile] = useState(false);
//   const [nomePerfil, setNomePerfil] = useState("");

//   const dashboardRef = useRef(null);

//   useEffect(() => {
//     if (showMenu) {
//       const token = localStorage.getItem("token");
//       import("../provider/api").then(({ default: api }) => {
//         api.get("/funcionarios/me", {
//           headers: { Authorization: `Bearer ${token}` }
//         })
//         .then(res => {
//           setNomePerfil(res.data.nome || "");
//         })
//         .catch(() => setNomePerfil(""));
//       });
//     }
//   }, [showMenu]);

//   // Rolagem suave até o Dashboard
//   const handleGoToDashboard = () => {
//     dashboardRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   return (

    
//     <div className="home-root">
//       {/* Header estilo navbar */}
//       <header className="navbar">
//         {/* Logo à esquerda */}
//         <div className="navbar-left">
//           <img src={Logo} alt="Logo" className="navbar-logo" />
//         </div>

//         {/* Menu central */}
//         <nav className="navbar-center">
//           <span onClick={handleGoToDashboard}>Atendimentos ao mês</span>
//           <span>Serviços ao mês</span>
//           <span>Relatório</span>
//           {/* <span>Marketing</span>
//           <span>Ferramentas</span>
//           <span>Suporte</span>
//           <span>Novidades</span> */}
//         </nav>

//         {/* Avatar à direita */}
//         <div className="navbar-right">
//           <img
//             src={Avatar}
//             alt="Usuário"
//             className="navbar-avatar"
//             onClick={() => {
//               setShowMenu(true);
//               setShowProfile(false);
//             }}
//           />
//         </div>
//       </header>

//       {/* Conteúdo principal */}
//       <main className="home-main">
//         <Beneficiarios />
//         <Status />
//       </main>

//       {/* Seção Dashboard */}
//       <section ref={dashboardRef}>
//         <Dashboards />
//       </section>

//       {/* Overlay Menu */}
//       {showMenu && !showProfile && (
//         <div className="overlay">
//           <div className="menu-card">
//             <button className="close-button" onClick={() => setShowMenu(false)}>✖</button>
//             <img src={Avatar} alt="Perfil" className="menu-avatar" />
//             <h3 className="perfil-nome">{nomePerfil}</h3>
//             <button
//               className="menu-btn"
//               onClick={() => setShowProfile(true)}
//             >
//               Seu Perfil
//             </button>
//             <button
//               className="menu-btn"
//               onClick={() => setShowMenu(false)}
//             >
//               Sair
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Overlay Perfil */}
//       {showMenu && showProfile && (
//         <div className="overlay">
//           <div className="perfil-wrapper">
//             <button
//               className="close-btn"
//               onClick={() => {
//                 setShowProfile(false);
//                 setShowMenu(false);
//               }}
//             >
//               ✖
//             </button>
//             <Perfil
//               onClose={() => {
//                 setShowProfile(false);
//                 setShowMenu(false);
//               }}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import { useState, useEffect, useRef } from "react";
import Beneficiarios from "../components/Beneficiarios";
import Status from "../components/Status";
import Dashboards from "../components/Dashboards";
import Perfil from "../components/Perfil"; 
import Indicadores from "../components/Indicadores"; // <-- importando o componente
import Avatar from "../assets/Avatar.png";
import Logo from "../assets/icon-logo-branca.png";
import "../css/Home.css";

export default function Home() {
  const [showMenu, setShowMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [nomePerfil, setNomePerfil] = useState("");

  const dashboardRef = useRef(null);

  useEffect(() => {
    if (showMenu) {
      const token = localStorage.getItem("token");
      import("../provider/api").then(({ default: api }) => {
        api.get("/funcionarios/me", {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
          setNomePerfil(res.data.nome || "");
        })
        .catch(() => setNomePerfil(""));
      });
    }
  }, [showMenu]);

  const handleGoToDashboard = () => {
    dashboardRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="home-root">
      {/* Header estilo navbar */}
      <header className="navbar">
        <div className="navbar-left">
          <img src={Logo} alt="Logo" className="navbar-logo" />
        </div>
        <nav className="navbar-center">
          <span onClick={handleGoToDashboard}>Atendimentos ao mês</span>
          <span>Serviços ao mês</span>
          <span>Relatório</span>
        </nav>
        <div className="navbar-right">
          <img
            src={Avatar}
            alt="Usuário"
            className="navbar-avatar"
            onClick={() => {
              setShowMenu(true);
              setShowProfile(false);
            }}
          />
        </div>
      </header>

      {/* Indicadores incluídos no topo */}
      <section className="top-indicators">
        <Indicadores />  {/* <-- componente adicionado */}
      </section>

      {/* Conteúdo principal */}
      <main className="home-main">
        <Beneficiarios />
        <Status />
      </main>

      {/* Seção Dashboard */}
      <section ref={dashboardRef}>
        <Dashboards />
      </section>

      {/* Overlay Menu */}
      {showMenu && !showProfile && (
        <div className="overlay">
          <div className="menu-card">
            <button className="close-button" onClick={() => setShowMenu(false)}>✖</button>
            <img src={Avatar} alt="Perfil" className="menu-avatar" />
            <h3 className="perfil-nome">{nomePerfil}</h3>
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
