import Beneficiarios from "./Beneficiarios";
import Status from "./Status";
import Dashboards from "./Dashboards";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-root">
      {/* Header */}
      <header className="home-header">
        <span className="home-header-icon">🏠</span>
        <span className="home-header-user">👤</span>
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