import React from "react";
import { cultoData } from "../data/cultoData.js";

export function Navbar({ activeTab, onSelectTab }) {
  const tabs = [
    { id: "inicio", label: "Início" },
    { id: "cultos", label: "Cultos", badge: "07/11 · Novo" },
    { id: "sobre", label: "Sobre o INOTI" },
    { id: "eventos", label: "Agenda & Fotos" },
  ];

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <button
          type="button"
          className="brand-trigger"
          onClick={() => onSelectTab("inicio")}
          aria-label="Ir para a página inicial do INOTI Teens"
        >
          <div className="brand-logo-wrap">
            <img
              src="/assets/logo-inoti-teens.png"
              alt="Logo INOTI Teens"
              className="brand-logo-img"
            />
          </div>
          <div>
            <div className="brand-title">
              INOTI <span>TEENS</span>
            </div>
            <span className="brand-subtitle">{cultoData.grupo.igreja}</span>
          </div>
        </button>

        <nav className="nav-tabs" aria-label="Navegação principal do site">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                className={`nav-tab ${isActive ? "active" : ""}`}
                onClick={() => onSelectTab(tab.id)}
                aria-current={isActive ? "page" : undefined}
              >
                <span>{tab.label}</span>
                {tab.badge && <span className="nav-tab-badge">{tab.badge}</span>}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
