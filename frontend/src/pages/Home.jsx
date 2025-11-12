// import { useState, useEffect, useRef } from "react";
// import Beneficiarios from "../components/Beneficiarios";
// import Status from "../components/Status";
// import Dashboards from "../components/Dashboards";
// import Perfil from "../components/Perfil";
// import Indicadores from "../components/Indicadores";
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
//           .then(res => {
//             setNomePerfil(res.data.nome || "");
//           })
//           .catch(() => setNomePerfil(""));
//       });
//     }
//   }, [showMenu]);

//   const handleGoToDashboard = () => {
//     dashboardRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   return (
//     <div className="home-root">
//       {/* Header estilo navbar */}
//       <header className="navbar">
//         <div className="navbar-left">
//           <img src={Logo} alt="Logo" className="navbar-logo" />
//         </div>
//         <nav className="navbar-center">
//           <span onClick={handleGoToDashboard}>Atendimentos ao mês</span>
//           <span>Serviços ao mês</span>
//           <span>Relatório</span>
//         </nav>
//         {/* <div className="navbar-right">
//           <img
//             src={Avatar}
//             alt="Usuário"
//             className="navbar-avatar"
//             onClick={() => {
//               setShowMenu(true);
//               setShowProfile(false);
//             }}
//           />
//         </div> */}
//         <div className="navbar-right">
//           <span className="navbar-username">{nomePerfil}</span>
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

//       {/* Indicadores incluídos no topo */}
//       <section className="top-indicators">
//         <Indicadores />  {/* <-- componente adicionado */}
//       </section>

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
import Indicadores from "../components/Indicadores";
import Avatar from "../assets/Avatar.png";
import Logo from "../assets/icon-logo-branca.png";
import "../css/Home.css";
import Relatorio from "../components/Relatorio";

export default function Home() {
  // Função para logout
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  const [showMenu, setShowMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [nomePerfil, setNomePerfil] = useState("");
  const [emailPerfil, setEmailPerfil] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    import("../provider/api").then(({ default: api }) => {
      api
        .get("/funcionarios/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setNomePerfil(res.data.nome || "");
          setEmailPerfil(res.data.email || "");
        })
        .catch(() => {
          setNomePerfil("");
          setEmailPerfil("");
        });
    });
  }, []);

  const dashboardRef = useRef(null);
  const relatorioRef = useRef(null);

  // 👉 Busca nome do usuário ao carregar a página
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    import("../provider/api").then(({ default: api }) => {
      api.get("/funcionarios/me", {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => {
          setNomePerfil(res.data.nome || "");
        })
        .catch(() => setNomePerfil(""));
    });
  }, []);

  const handleGoToDashboard = () => {
    dashboardRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleGoToRelatorio = () => {
    relatorioRef.current?.scrollIntoView({ behavior: "smooth" });
  }

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
          <span onClick={handleGoToRelatorio}>Relatório</span>
        </nav>
        {/* <div className="navbar-right">
          {nomePerfil && <span className="navbar-username">{nomePerfil}</span>}
          <img
            src={Avatar}
            alt="Usuário"
            className="navbar-avatar"
            onClick={() => {
              setShowMenu(true);
              setShowProfile(false);
            }}
          />
        </div> */}

        <div className="navbar-right">
          <div className="separator"></div> {/* Linha antes do avatar */}
          <img
            src={Avatar}
            alt="Usuário"
            className="navbar-avatar"
            onClick={() => {
              setShowMenu(true);
              setShowProfile(false);
            }}
          />
          {/* {nomePerfil && <span className="navbar-username">{nomePerfil}</span>} */}
          <div className="user-text">
            <span className="navbar-username">{nomePerfil}</span>
            <span className="user-role">Funcionário(a)</span>
          </div>
        </div>
      </header>

      {/* Indicadores incluídos no topo */}
      <section className="top-indicators">
        <Indicadores />
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

      {/* Seção Relatório */}
      <section ref={relatorioRef}>
        <Relatorio />
      </section>

      {/* Overlay Menu */}
      {showMenu && !showProfile && (
        <div className="overlay">
          <div className="menu-card">
            <button className="close-button" onClick={() => setShowMenu(false)}>✖</button>
            <img src={Avatar} alt="Perfil" className="menu-avatar" />
            <h3 className="perfil-nome">{nomePerfil}</h3>
                  <p className="perfil-email">{emailPerfil}</p>

            <button
              className="menu-btn"
              onClick={() => setShowProfile(true)}
            >
              Seu Perfil
            </button>
            <button
              className="menu-btn-exit"
              onClick={handleLogout}
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
