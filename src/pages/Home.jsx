import Beneficiarios from "./Beneficiarios";
import Status from "./Status";
import Dashboards from "./Dashboards";
import Avatar from "../assets/Avatar.png";
import "../css/Home.css";

export default function Home() {
  return (
    <div className="home-root">
      {/* Header */}
      <header className="home-header">
        {/* <span className="home-header-icon">🏠</span> */}
        {/* <span className="home-header-user">👤</span> */}
        <img
          src={Avatar}
          alt="Usuário"
          className="home-header-avatar"
        />
      </header>

      {/* Main */}
      <main className="home-main">
        <Beneficiarios />
        <Status />
      </main>

      {/* Dashboards */}
      <Dashboards />
    </div>
  );
}