import React from "react";
import { cultoData } from "../data/cultoData.js";
import { HeartCrossIcon } from "../components/Icons.jsx";

export function UnderConstruction({ sectionName = "Portal Geral", onGoToCult }) {
  return (
    <main className="under-construction-page">
      <div className="container">
        <div className="uc-grid">
          <div>
            <div className="uc-logo-card">
              <img
                src="/assets/logo-inoti-teens.png"
                alt="Logo INOTI Teens"
              />
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontWeight: 700,
                    fontSize: "1.2rem",
                    color: "var(--tinta)",
                  }}
                >
                  INOTI <span style={{ color: "var(--teens)" }}>TEENS</span>
                </div>
                <div style={{ fontSize: "0.85rem", color: "var(--sepia)" }}>
                  {cultoData.grupo.igreja}
                </div>
              </div>
            </div>

            <div>
              <span className="uc-status-banner">
                <span className="pulse-dot" />
                Página em Construção · {sectionName}
              </span>
            </div>

            <h1 className="uc-heading">
              Estamos preparando a nova casa digital do{" "}
              <span className="gold">INOTI Teens</span>.
            </h1>

            <p className="uc-lead">
              O portal completo dos jovens da{" "}
              <strong>{cultoData.grupo.igreja}</strong> está{" "}
              <strong>em construção</strong> com conteúdos devocionais, fotos,
              agenda de pequenos grupos e eventos. Enquanto finalizamos tudo, a
              página oficial do nosso próximo culto já está no ar!
            </p>

            <div className="uc-progress-box">
              <div className="uc-progress-header">
                <span>Status do Portal INOTI Teens</span>
                <span>Em construção · 65%</span>
              </div>
              <div className="uc-progress-bar">
                <div className="uc-progress-fill" />
              </div>
              <p
                style={{
                  fontSize: "0.82rem",
                  color: "var(--sepia)",
                  marginTop: "0.55rem",
                }}
              >
                Disponível agora: <strong>Aba Cultos → “Ao Dono dos Meus Dias”</strong>
              </p>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.85rem" }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={onGoToCult}
              >
                <HeartCrossIcon size={18} color="#FAF7F2" />
                Acessar Aba do Culto (07/11) →
              </button>
            </div>
          </div>

          {/* Card lateral convidando para o Culto disponível na aba Cultos */}
          <aside className="uc-cult-spotlight">
            <span className="chip chip-dark">
              Já disponível na aba Cultos
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.9rem",
                marginTop: "0.75rem",
                lineHeight: 1.12,
              }}
            >
              Culto Especial:{" "}
              <span style={{ color: "var(--brasa)" }}>
                {cultoData.culto.tema}
              </span>
            </h2>
            <p
              style={{
                fontSize: "0.92rem",
                color: "rgba(250, 247, 242, 0.8)",
                marginTop: "0.4rem",
              }}
            >
              {cultoData.culto.versiculoReferencia} — “{cultoData.culto.versiculoTexto}”
            </p>

            <div className="uc-art-preview">
              <img
                src="/assets/arte-culto.jpg"
                alt="Arte do culto Ao Dono dos Meus Dias"
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "0.5rem",
                fontSize: "0.88rem",
                color: "var(--madeira)",
                marginBottom: "1.2rem",
              }}
            >
              <span>📅 {cultoData.culto.dataCurta} às {cultoData.culto.horario}</span>
              <span>🎙️ {cultoData.culto.preletor}</span>
              <span>📍 {cultoData.culto.endereco}</span>
            </div>

            <button
              type="button"
              className="btn btn-primary"
              style={{ width: "100%" }}
              onClick={onGoToCult}
            >
              Abrir Página do Culto & Playlist Spotify
            </button>
          </aside>
        </div>
      </div>
    </main>
  );
}
