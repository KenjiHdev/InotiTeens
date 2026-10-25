import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar.jsx";
import { UnderConstruction } from "./pages/UnderConstruction.jsx";
import { CultPage } from "./pages/CultPage.jsx";
import { cultoData } from "./data/cultoData.js";
import { HeartCrossIcon } from "./components/Icons.jsx";

export function App() {
  const [activeTab, setActiveTab] = useState("inicio");

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash === "cultos" || hash === "confirmar" || hash === "louvores") {
      setActiveTab("cultos");
    } else if (hash === "sobre" || hash === "eventos" || hash === "inicio") {
      setActiveTab(hash);
    }
  }, []);

  const handleSelectTab = (tabId) => {
    setActiveTab(tabId);
    window.history.replaceState(null, "", `#${tabId}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const sectionLabels = {
    inicio: "Página Inicial",
    sobre: "Sobre o INOTI Teens",
    eventos: "Agenda & Galeria de Fotos",
  };

  return (
    <div>
      <Navbar activeTab={activeTab} onSelectTab={handleSelectTab} />

      {activeTab === "cultos" ? (
        <CultPage />
      ) : (
        <UnderConstruction
          sectionName={sectionLabels[activeTab] || "Portal Geral"}
          onGoToCult={() => handleSelectTab("cultos")}
        />
      )}

      {/* Rodapé global */}
      <footer className="footer">
        <div className="container footer-inner">
          <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
            <div className="brand-logo-wrap">
              <img
                src="/assets/logo-inoti-teens.png"
                alt="Logo INOTI Teens"
                className="brand-logo-img"
              />
            </div>
            <div>
              <strong style={{ fontFamily: "var(--font-ui)", fontSize: "1.05rem" }}>
                {cultoData.grupo.nome} · {cultoData.grupo.igreja}
              </strong>
              <p style={{ fontSize: "0.82rem", color: "var(--madeira)" }}>
                Salmo 31.15 — “Nas tuas mãos estão os meus dias.”
              </p>
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center" }}>
            {activeTab !== "cultos" && (
              <button
                type="button"
                className="btn btn-primary"
                style={{ padding: "0.6rem 1.2rem", fontSize: "0.85rem" }}
                onClick={() => handleSelectTab("cultos")}
              >
                <HeartCrossIcon size={16} color="#FAF7F2" />
                Ir para a Aba do Culto (07/11)
              </button>
            )}
            <a
              href={cultoData.culto.spotifyPlaylistUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary-light"
              style={{ padding: "0.6rem 1.2rem", fontSize: "0.85rem" }}
            >
              Playlist no Spotify ↗
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
