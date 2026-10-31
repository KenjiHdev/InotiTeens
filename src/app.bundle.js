import { cultoData } from "./data/cultoData.js";

const heartCrossSvg = (size = 18, color = "#E0272D") => `
  <svg width="${size}" height="${size}" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M12.5 22.5L7.2 17.2C4.9 14.9 4.9 11.2 7.2 8.9C9.5 6.6 13.2 6.6 15.5 8.9" stroke="${color}" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M16.5 8.9C18.8 6.6 22.5 6.6 24.8 8.9C27.1 11.2 27.1 14.9 24.8 17.2L16 26V17.2H19.5" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12.5 15.2H15.2V11.8" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
`;

const instagramIconSvg = (size = 20, color = "currentColor") => `
  <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
`;

const facebookIconSvg = (size = 20, color = "currentColor") => `
  <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
`;

const crownOfThornsDividerHtml = () => `
  <div class="thorn-divider" role="separator" aria-hidden="true">
    <svg class="thorn-icon-spin" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="18" stroke="currentColor" stroke-width="2" stroke-dasharray="6 3"/>
      <circle cx="32" cy="32" r="14" stroke="currentColor" stroke-width="1.5"/>
      <path d="M32 8L34 14L30 14Z M32 56L34 50L30 50Z M8 32L14 34L14 30Z M56 32L50 34L50 30Z M15 15L20 19L17 21Z M49 49L44 45L47 43Z M49 15L44 19L47 21Z M15 49L20 45L17 43Z" fill="currentColor"/>
    </svg>
  </div>
`;

const state = {
  activeTab: "inicio",
};

function renderNavbar() {
  const tabs = [
    { id: "inicio", label: "Início" },
    { id: "cultos", label: "Cultos", badge: "07/11" },
    { id: "sobre", label: "Sobre" },
    { id: "eventos", label: "Agenda" },
  ];

  return `
    <header class="navbar">
      <div class="container navbar-inner">
        <button type="button" class="brand-trigger" data-tab-target="inicio" aria-label="Ir para a página inicial do INOTI Teens">
          <div class="brand-logo-wrap">
            <img src="./assets/logo-inoti-teens.png" alt="Logo INOTI Teens" class="brand-logo-img" />
          </div>
          <div>
            <div class="brand-title">INOTI <span>TEENS</span></div>
            <span class="brand-subtitle">${cultoData.grupo.igreja}</span>
          </div>
        </button>

        <nav class="nav-tabs" aria-label="Navegação principal do site">
          ${tabs
            .map((tab) => {
              const isActive = state.activeTab === tab.id;
              return `
                <button
                  type="button"
                  class="nav-tab ${isActive ? "active" : ""}"
                  data-tab-target="${tab.id}"
                  ${isActive ? 'aria-current="page"' : ""}
                >
                  <span>${tab.label}</span>
                  ${tab.badge ? `<span class="nav-tab-badge">${tab.badge}</span>` : ""}
                </button>
              `;
            })
            .join("")}
        </nav>
      </div>
    </header>
  `;
}

function renderUnderConstruction(sectionName) {
  return `
    <main class="under-construction-page">
      <div class="container">
        <div class="uc-grid">
          <div>
            <div class="uc-logo-card">
              <img src="./assets/logo-inoti-teens.png" alt="Logo INOTI Teens" />
              <div>
                <div style="font-family: var(--font-ui); font-weight: 700; font-size: 1.1rem; color: var(--tinta);">
                  INOTI <span style="color: var(--teens);">TEENS</span>
                </div>
                <div style="font-size: 0.8rem; color: var(--sepia);">
                  ${cultoData.grupo.igreja}
                </div>
              </div>
            </div>

            <div>
              <span class="uc-status-banner">
                <span class="pulse-dot"></span>
                Em Construção · ${sectionName}
              </span>
            </div>

            <h1 class="uc-heading">
              Estamos preparando a nova casa digital do <span class="gold">INOTI Teens</span>.
            </h1>

            <p class="uc-lead">
              O portal completo dos jovens da <strong>${cultoData.grupo.igreja}</strong> está
              <strong> em construção</strong> com conteúdos devocionais, fotos, agenda de pequenos
              grupos e eventos. Enquanto finalizamos tudo, a página oficial do nosso próximo culto
              já está no ar na aba <strong>Cultos</strong>!
            </p>

            <div class="uc-progress-box">
              <div class="uc-progress-header">
                <span>Status do Portal INOTI Teens</span>
                <span>Em construção · 65%</span>
              </div>
              <div class="uc-progress-bar">
                <div class="uc-progress-fill"></div>
              </div>
              <p style="font-size: 0.8rem; color: var(--sepia); margin-top: 0.5rem;">
                Disponível agora: <strong>Aba Cultos → “Ao Dono dos Meus Dias”</strong>
              </p>
            </div>

            <div>
              <button type="button" class="btn btn-primary" data-tab-target="cultos">
                ${heartCrossSvg(18, "#FAF7F2")}
                Acessar Aba do Culto (07/11) →
              </button>
            </div>
          </div>

          <aside class="uc-cult-spotlight">
            <span class="chip chip-dark">Já disponível na aba Cultos</span>
            <h2 style="font-family: var(--font-display); font-size: clamp(1.5rem, 5vw, 1.9rem); margin-top: 0.65rem; line-height: 1.14;">
              Culto Especial: <span style="color: var(--brasa);">${cultoData.culto.tema}</span>
            </h2>
            <p style="font-size: 0.88rem; color: rgba(250, 247, 242, 0.82); margin-top: 0.35rem;">
              ${cultoData.culto.versiculoReferencia} — “${cultoData.culto.versiculoTexto}”
            </p>

            <div class="uc-art-preview">
              <img src="./assets/arte-culto.jpg" alt="Arte do culto Ao Dono dos Meus Dias" />
            </div>

            <div style="display: grid; gap: 0.35rem; font-size: 0.85rem; color: var(--madeira); margin-bottom: 1.1rem;">
              <span>📅 <strong>${cultoData.culto.diaSemana}, ${cultoData.culto.dataCurta} às ${cultoData.culto.horario}</strong></span>
              <span>🎙️ Ministração: <strong>${cultoData.culto.preletor}</strong></span>
              <span>📍 ${cultoData.culto.endereco}</span>
            </div>

            <button type="button" class="btn btn-primary" style="width: 100%;" data-tab-target="cultos">
              Abrir Página do Culto & Playlist Spotify
            </button>
          </aside>
        </div>
      </div>
    </main>
  `;
}

function renderCultPage() {
  return `
    <main>
      <!-- 1. HERO MOBILE-FIRST -->
      <section class="cult-hero" id="cult-hero-section">
        <div class="ember-container" aria-hidden="true">
          <span class="ember"></span>
          <span class="ember"></span>
          <span class="ember"></span>
          <span class="ember"></span>
          <span class="ember"></span>
        </div>

        <div class="container hero-grid">
          <div>
            <div class="hero-top-meta">
              <span class="chip chip-dark">
                ${heartCrossSvg(14, "#F2B661")}
                Culto INOTI Teens · ${cultoData.culto.dataCurta} às ${cultoData.culto.horario}
              </span>
              <span class="chip chip-dark">Entrada Franca</span>
            </div>

            <h1 class="display-title hero-title">
              <span class="word-reveal t-light">AO </span>
              <span class="word-reveal t-gold">DONO </span>
              <br />
              <span class="word-reveal t-light">DOS MEUS </span>
              <span class="word-reveal t-gold">DIAS</span>
            </h1>

            <span class="hero-verse-tag">
              ${cultoData.culto.versiculoReferencia} — “${cultoData.culto.versiculoTexto}”
            </span>

            <p class="hero-lead">
              Teus dias estão em boas mãos. Uma noite de adoração profunda, entrega e comunhão com
              os jovens da <strong>${cultoData.grupo.igreja}</strong>.
            </p>

            <div class="hero-info-strip">
              <div class="hero-info-item">
                <span class="hero-info-label">Quando</span>
                <span class="hero-info-value">${cultoData.culto.diaSemana}, ${cultoData.culto.dataCurta} · ${cultoData.culto.horario}</span>
              </div>
              <div class="hero-info-item">
                <span class="hero-info-label">Ministração</span>
                <span class="hero-info-value">${cultoData.culto.preletor}</span>
              </div>
              <div class="hero-info-item">
                <span class="hero-info-label">Onde</span>
                <span class="hero-info-value">${cultoData.culto.endereco}</span>
              </div>
            </div>

            <div class="hero-actions">
              <a href="#louvores" class="btn btn-primary" data-scroll-to="louvores">
                🎧 Ouvir Playlist no Spotify
              </a>
              <a href="#como-chegar" class="btn btn-secondary-light" data-scroll-to="como-chegar">
                📍 Como Chegar
              </a>
            </div>
          </div>

          <div class="hero-artwork-frame">
            <img
              src="./assets/arte-culto.jpg"
              alt="Arte oficial do culto Ao Dono dos Meus Dias — Salmo 31.15"
              class="hero-artwork-img"
            />
            <div class="hero-artwork-badge">
              <img src="./assets/logo-inoti-teens.png" alt="Selo INOTI Teens" />
              <span>INOTI Teens · Caminho da Vida</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 2. VERSÍCULO EM DESTAQUE -->
      <section class="verse-banner">
        <div class="container verse-box">
          <span class="verse-ref">${cultoData.culto.versiculoReferencia}</span>
          <blockquote class="verse-quote">
            “Nas <span>tuas mãos</span> estão os meus dias.”
          </blockquote>
          <p class="verse-reflection">
            ${cultoData.culto.versiculoComplemento}
          </p>
        </div>
      </section>

      <!-- MENSAGENS COM O TEMA "AO DONO DOS MEUS DIAS" -->
      <section class="theme-messages-section">
        <div class="container">
          <div class="section-header">
            <span class="chip">Mensagens do Tema</span>
            <h2 class="section-title">
              O que significa viver para o <span class="gold">Dono dos nossos dias</span>?
            </h2>
            <p class="section-subtitle">
              Três reflexões que preparam o nosso coração para o culto de jovens.
            </p>
          </div>

          <div class="messages-grid">
            ${cultoData.mensagensTema
              .map(
                (msg, idx) => `
              <article class="message-card">
                <span class="message-number">0${idx + 1}</span>
                <h3 class="message-title">${msg.titulo}</h3>
                <div class="message-sub">${msg.subtitulo}</div>
                <p style="color: var(--sepia); font-size: 0.94rem;">${msg.texto}</p>
              </article>
            `
              )
              .join("")}
          </div>

          ${crownOfThornsDividerHtml()}
        </div>
      </section>

      <!-- INTEGRAÇÃO COM SPOTIFY -->
      <section id="louvores" class="spotify-section">
        <div class="container">
          <div class="spotify-card">
            <div class="spotify-info">
              <span class="chip chip-dark">
                ${heartCrossSvg(14, "#F2B661")}
                Louvores do Culto · Spotify Oficial
              </span>
              <h3>
                Prepare o coração com a <span>Playlist Oficial</span> da noite
              </h3>
              <p>
                A adoração começa muito antes do sábado às 19h. Reunimos nesta playlist todos os
                louvores que serão tocados no culto <strong>“${cultoData.culto.tema}”</strong> para
                você ouvir na semana, meditar nas letras e já chegar cantando junto com toda a
                juventude.
              </p>

              <ul class="spotify-highlights">
                <li>
                  ${heartCrossSvg(15, "#F2B661")}
                  <span>Ouça as faixas direto aqui na página ou salve no seu Spotify</span>
                </li>
                <li>
                  ${heartCrossSvg(15, "#F2B661")}
                  <span>Canções alinhadas ao tema do Salmo 31.15 — entrega e confiança</span>
                </li>
                <li>
                  ${heartCrossSvg(15, "#F2B661")}
                  <span>Compartilhe a playlist no grupo dos amigos</span>
                </li>
              </ul>

              <div>
                <a
                  href="${cultoData.culto.spotifyPlaylistUrl}"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn btn-spotify"
                >
                  Ouvir Playlist no App Spotify ↗
                </a>
              </div>
            </div>

            <div class="spotify-iframe-wrap">
              <iframe
                title="Playlist Oficial do Culto Ao Dono dos Meus Dias no Spotify"
                style="border-radius: 14px; border: 0; display: block;"
                src="${cultoData.culto.spotifyEmbedUrl}"
                width="100%"
                height="352"
                allowfullscreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <!-- MINISTRAÇÃO DA PALAVRA — PASTOR JOEL HAYASHI + INSTAGRAM DELE -->
      <section class="preacher-section">
        <div class="container">
          <div class="preacher-card">
            <div class="preacher-badge-avatar" aria-hidden="true">
              JH
            </div>
            <div class="preacher-content">
              <span class="chip">${cultoData.culto.preletorCargo}</span>
              <h3>${cultoData.culto.preletor}</h3>
              <p>${cultoData.culto.preletorBio}</p>
            </div>
            <div>
              <a
                href="${cultoData.culto.preletorInstagram}"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-primary"
              >
                ${instagramIconSvg(18, "#FAF7F2")}
                Instagram ${cultoData.culto.preletorInstagramHandle} ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- SOBRE O INOTI TEENS + COMO CHEGAR -->
      <section id="como-chegar" class="about-location-section">
        <div class="container about-location-grid">
          <div class="card card-paper" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <span class="chip">Sobre nós</span>
              <h2 class="section-title" style="margin-top: 0.65rem;">
                Quem é o <span class="gold">INOTI Teens</span>?
              </h2>
              <p style="color: var(--sepia); font-size: 0.95rem; margin-bottom: 0.9rem;">
                Somos a juventude da <strong>${cultoData.grupo.igreja}</strong>. Acreditamos em uma
                geração autêntica, apaixonada por Jesus e que vive a fé de forma real no dia a dia
                — na escola, na faculdade, em casa e com os amigos.
              </p>
              <p style="color: var(--sepia); font-size: 0.95rem; margin-bottom: 1.25rem;">
                No culto <strong>“${cultoData.culto.tema}”</strong>, receberemos o
                <strong> ${cultoData.culto.preletor}</strong> para uma noite de renovação espiritual.
                Mesmo que seja a sua primeira vez em uma igreja, este lugar também é para você!
              </p>
            </div>

            <div style="display: flex; align-items: center; gap: 0.85rem; padding: 0.85rem; border-radius: 14px; background: rgba(217, 203, 181, 0.3); border: 1px solid var(--madeira);">
              <img
                src="./assets/logo-inoti-teens.png"
                alt="Logo INOTI Teens"
                style="width: 48px; height: 48px; object-fit: contain; border-radius: 10px; background: #fff; padding: 4px; flex-shrink: 0;"
              />
              <div>
                <strong style="display: block; font-family: var(--font-ui); font-size: 0.92rem;">
                  ${cultoData.grupo.nome} · ${cultoData.grupo.igreja}
                </strong>
                <span style="font-size: 0.8rem; color: var(--sepia);">
                  “${cultoData.grupo.slogan}”
                </span>
              </div>
            </div>
          </div>

          <div class="card card-paper">
            <span class="chip">Como Chegar</span>
            <h2 class="section-title" style="margin-top: 0.65rem;">
              Nos vemos na <span class="gold">Igreja</span>
            </h2>
            <p style="color: var(--sepia); font-size: 0.94rem;">
              📍 <strong>${cultoData.culto.endereco}</strong> — ${cultoData.culto.bairroCidade}
            </p>

            <div class="map-frame">
              <iframe
                title="Mapa de localização Praça Haroldo Daltro, 460"
                src="${cultoData.culto.mapEmbedUrl}"
                width="100%"
                height="100%"
                style="border: 0;"
                allowfullscreen
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <div class="location-actions">
              <a
                href="${cultoData.culto.googleMapsUrl}"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-primary"
              >
                Abrir no Google Maps ↗
              </a>
              <a
                href="${cultoData.culto.wazeUrl}"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-secondary"
              >
                Abrir no Waze ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- REDES SOCIAIS AO FINAL DO SITE -->
      <section id="redes-sociais" class="socials-section">
        <div class="container">
          <div class="section-header">
            <span class="chip">Conecte-se Conosco</span>
            <h2 class="section-title">
              Nossas <span class="gold">Redes Sociais</span>
            </h2>
            <p class="section-subtitle">
              Siga os perfis oficiais do INOTI Teens, da Igreja Evangélica Caminho da Vida e da EBD para acompanhar nossos cultos, eventos e estudos.
            </p>
          </div>

          <div class="socials-grid">
            ${cultoData.redesSociais
              .map(
                (rede) => `
              <a
                href="${rede.url}"
                target="_blank"
                rel="noopener noreferrer"
                class="social-card"
              >
                <div>
                  <div class="social-card-top">
                    <div class="social-icon-box">
                      ${
                        rede.tipo === "facebook"
                          ? facebookIconSvg(20, "#A67C4E")
                          : instagramIconSvg(20, "#E0272D")
                      }
                    </div>
                    <span class="chip">${rede.destaque}</span>
                  </div>
                  <h3 class="social-title">${rede.nome}</h3>
                  <span class="social-handle">${rede.handle}</span>
                  <p class="social-desc">${rede.descricao}</p>
                </div>
                <span class="social-link-cta">
                  Acessar página oficial ↗
                </span>
              </a>
            `
              )
              .join("")}
          </div>
        </div>
      </section>

      <!-- BARRA INFERIOR DE NAVEGAÇÃO RÁPIDA NO CELULAR -->
      <nav class="mobile-quick-bar" aria-label="Atalhos rápidos do culto no celular">
        <a href="#louvores" class="mobile-quick-link highlight" data-scroll-to="louvores">
          🎧 Louvores
        </a>
        <a href="#como-chegar" class="mobile-quick-link" data-scroll-to="como-chegar">
          📍 Como Chegar
        </a>
        <a href="#redes-sociais" class="mobile-quick-link" data-scroll-to="redes-sociais">
          📱 Redes
        </a>
      </nav>
    </main>
  `;
}

function renderFooter() {
  return `
    <footer class="footer">
      <div class="container footer-inner">
        <div class="footer-brand">
          <div class="brand-logo-wrap">
            <img src="./assets/logo-inoti-teens.png" alt="Logo INOTI Teens" class="brand-logo-img" />
          </div>
          <div>
            <strong style="font-family: var(--font-ui); font-size: 1rem;">
              ${cultoData.grupo.nome} · ${cultoData.grupo.igreja}
            </strong>
            <p style="font-size: 0.8rem; color: var(--madeira);">
              Salmo 31.15 — “Nas tuas mãos estão os meus dias.”
            </p>
          </div>
        </div>

        <div class="footer-actions">
          ${
            state.activeTab !== "cultos"
              ? `
            <button
              type="button"
              class="btn btn-primary"
              data-tab-target="cultos"
            >
              ${heartCrossSvg(16, "#FAF7F2")}
              Ir para a Aba do Culto (07/11)
            </button>
          `
              : ""
          }
          <a
            href="${cultoData.culto.spotifyPlaylistUrl}"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-secondary-light"
          >
            Playlist no Spotify ↗
          </a>
        </div>
      </div>
    </footer>
  `;
}

function renderApp() {
  const root = document.getElementById("root");
  if (!root) return;

  const sectionLabels = {
    inicio: "Página Inicial",
    sobre: "Sobre o INOTI Teens",
    eventos: "Agenda & Galeria de Fotos",
  };

  root.innerHTML = `
    <div>
      ${renderNavbar()}
      ${
        state.activeTab === "cultos"
          ? renderCultPage()
          : renderUnderConstruction(sectionLabels[state.activeTab] || "Portal Geral")
      }
      ${renderFooter()}
    </div>
  `;

  attachEvents();
}

function attachEvents() {
  document.querySelectorAll("[data-tab-target]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetTab = btn.getAttribute("data-tab-target");
      if (targetTab) {
        state.activeTab = targetTab;
        window.history.replaceState(null, "", `#${targetTab}`);
        renderApp();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  });

  document.querySelectorAll("[data-scroll-to]").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("data-scroll-to");
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  const heroSection = document.getElementById("cult-hero-section");
  if (heroSection) {
    heroSection.addEventListener("mousemove", (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
      const y = Math.round(((e.clientY - rect.top) / rect.height) * 50);
      heroSection.style.setProperty("--beam-x", `${x}%`);
      heroSection.style.setProperty("--beam-y", `${y}%`);
    });
  }
}

// Inicialização da rota por hash
const initialHash = window.location.hash.replace("#", "");
if (
  initialHash === "cultos" ||
  initialHash === "como-chegar" ||
  initialHash === "louvores" ||
  initialHash === "redes-sociais"
) {
  state.activeTab = "cultos";
} else if (initialHash === "sobre" || initialHash === "eventos" || initialHash === "inicio") {
  state.activeTab = initialHash;
}

renderApp();

// Parallax suave na arte da cruz no scroll (apenas em telas maiores)
window.addEventListener(
  "scroll",
  () => {
    if (window.innerWidth < 920) return;
    const heroSection = document.getElementById("cult-hero-section");
    if (heroSection) {
      const y = Math.min(24, window.scrollY * 0.05);
      heroSection.style.setProperty("--parallax-y", `${y}px`);
    }
  },
  { passive: true }
);
