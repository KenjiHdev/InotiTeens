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
    if (
      hash === "cultos" ||
      hash === "como-chegar" ||
      hash === "louvores" ||
      hash === "redes-sociais"
    ) {
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
          <div className="footer-brand">
            <div className="brand-logo-wrap">
              <img
                src="./assets/logo-inoti-teens.png"
                alt="Logo INOTI Teens"
                className="brand-logo-img"
              />
            </div>
            <div>
              <strong style={{ fontFamily: "var(--font-ui)", fontSize: "1.02rem" }}>
                {cultoData.grupo.nome} · {cultoData.grupo.igreja}
              </strong>
              <p style={{ fontSize: "0.8rem", color: "var(--madeira)" }}>
                Salmo 31.15 — “Nas tuas mãos estão os meus dias.”
              </p>
            </div>
          </div>

          <div className="footer-actions">
            {activeTab !== "cultos" && (
              <button
                type="button"
                className="btn btn-primary"
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
