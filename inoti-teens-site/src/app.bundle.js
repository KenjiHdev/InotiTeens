import { cultoData } from "./data/cultoData.js";

const heartCrossSvg = (size = 18, color = "#E0272D") => `
  <svg width="${size}" height="${size}" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M12.5 22.5L7.2 17.2C4.9 14.9 4.9 11.2 7.2 8.9C9.5 6.6 13.2 6.6 15.5 8.9" stroke="${color}" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M16.5 8.9C18.8 6.6 22.5 6.6 24.8 8.9C27.1 11.2 27.1 14.9 24.8 17.2L16 26V17.2H19.5" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12.5 15.2H15.2V11.8" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
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
  rsvpConfirmed: false,
  rsvpNome: "",
  rsvpWhatsapp: "",
  rsvpPerfil: "Sou do INOTI Teens",
};

function calculateTimeLeft(targetIso) {
  const target = new Date(targetIso).getTime();
  const now = Date.now();
  const diff = Math.max(0, target - now);

  const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diff / 1000 / 60) % 60);
  const segundos = Math.floor((diff / 1000) % 60);

  return {
    dias: String(dias).padStart(2, "0"),
    horas: String(horas).padStart(2, "0"),
    minutos: String(minutos).padStart(2, "0"),
    segundos: String(segundos).padStart(2, "0"),
  };
}

function formatPhone(value) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function getWhatsappShareUrl() {
  const shareMessage = encodeURIComponent(
    `Ei! No sábado (07/11 às 19h) vai rolar o culto do INOTI Teens com o tema "${cultoData.culto.tema}" (Salmo 31.15) na ${cultoData.grupo.igreja} (${cultoData.culto.endereco}). Bora comigo? 🙌\n\nOuça a playlist dos louvores aqui: ${cultoData.culto.spotifyPlaylistUrl}`
  );
  return `https://wa.me/?text=${shareMessage}`;
}

function renderNavbar() {
  const tabs = [
    { id: "inicio", label: "Início" },
    { id: "cultos", label: "Cultos", badge: "07/11 · Novo" },
    { id: "sobre", label: "Sobre o INOTI" },
    { id: "eventos", label: "Agenda & Fotos" },
  ];

  return `
    <header class="navbar">
      <div class="container navbar-inner">
        <button type="button" class="brand-trigger" data-tab-target="inicio" aria-label="Ir para a página inicial do INOTI Teens">
          <div class="brand-logo-wrap">
            <img src="/assets/logo-inoti-teens.png" alt="Logo INOTI Teens" class="brand-logo-img" />
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
              <img src="/assets/logo-inoti-teens.png" alt="Logo INOTI Teens" />
              <div>
                <div style="font-family: var(--font-ui); font-weight: 700; font-size: 1.2rem; color: var(--tinta);">
                  INOTI <span style="color: var(--teens);">TEENS</span>
                </div>
                <div style="font-size: 0.85rem; color: var(--sepia);">
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
              <p style="font-size: 0.82rem; color: var(--sepia); margin-top: 0.55rem;">
                Disponível agora: <strong>Aba Cultos → “Ao Dono dos Meus Dias”</strong>
              </p>
            </div>

            <div style="display: flex; flex-wrap: wrap; gap: 0.85rem;">
              <button type="button" class="btn btn-primary" data-tab-target="cultos">
                ${heartCrossSvg(18, "#FAF7F2")}
                Acessar Aba do Culto (07/11) →
              </button>
            </div>
          </div>

          <aside class="uc-cult-spotlight">
            <span class="chip chip-dark">Já disponível na aba Cultos</span>
            <h2 style="font-family: var(--font-display); font-size: 1.9rem; margin-top: 0.75rem; line-height: 1.12;">
              Culto Especial: <span style="color: var(--brasa);">${cultoData.culto.tema}</span>
            </h2>
            <p style="font-size: 0.92rem; color: rgba(250, 247, 242, 0.8); margin-top: 0.4rem;">
              ${cultoData.culto.versiculoReferencia} — “${cultoData.culto.versiculoTexto}”
            </p>

            <div class="uc-art-preview">
              <img src="/assets/arte-culto.jpg" alt="Arte do culto Ao Dono dos Meus Dias" />
            </div>

            <div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem; font-size: 0.88rem; color: var(--madeira); margin-bottom: 1.2rem;">
              <span>📅 ${cultoData.culto.dataCurta} às ${cultoData.culto.horario}</span>
              <span>🎙️ ${cultoData.culto.preletor}</span>
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
  const timeLeft = calculateTimeLeft(cultoData.culto.dataISO);
  const whatsappShareUrl = getWhatsappShareUrl();

  return `
    <main>
      <!-- 1. HERO -->
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
                ${heartCrossSvg(15, "#F2B661")}
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
              <a href="#confirmar" class="btn btn-primary" data-scroll-to="confirmar">
                ${heartCrossSvg(18, "#FAF7F2")}
                Confirmar presença
              </a>
              <a href="#louvores" class="btn btn-secondary-light" data-scroll-to="louvores">
                🎧 Ouvir Playlist no Spotify
              </a>
            </div>
          </div>

          <div class="hero-artwork-frame">
            <img
              src="/assets/arte-culto.jpg"
              alt="Arte oficial do culto Ao Dono dos Meus Dias — Salmo 31.15"
              class="hero-artwork-img"
            />
            <div class="hero-artwork-badge">
              <img src="/assets/logo-inoti-teens.png" alt="Selo INOTI Teens" />
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
                <p style="color: var(--sepia); font-size: 0.96rem;">${msg.texto}</p>
              </article>
            `
              )
              .join("")}
          </div>

          ${crownOfThornsDividerHtml()}
        </div>
      </section>

      <!-- 3. CONTAGEM REGRESSIVA -->
      <section class="countdown-section" aria-label="Contagem regressiva para o culto">
        <div class="container countdown-wrap">
          <div>
            <span class="chip chip-dark">Contagem Regressiva · 07/11 às 19h</span>
            <h2 style="font-family: var(--font-display); font-size: clamp(1.7rem, 3.5vw, 2.4rem); margin-top: 0.65rem;">
              Falta pouco para estarmos juntos
            </h2>
          </div>

          <div class="countdown-grid">
            <div class="countdown-item">
              <span class="countdown-number" id="cd-dias">${timeLeft.dias}</span>
              <span class="countdown-label">Dias</span>
            </div>
            <div class="countdown-item">
              <span class="countdown-number" id="cd-horas">${timeLeft.horas}</span>
              <span class="countdown-label">Horas</span>
            </div>
            <div class="countdown-item">
              <span class="countdown-number" id="cd-minutos">${timeLeft.minutos}</span>
              <span class="countdown-label">Minutos</span>
            </div>
            <div class="countdown-item">
              <span class="countdown-number" id="cd-segundos">${timeLeft.segundos}</span>
              <span class="countdown-label">Segundos</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 4. INTEGRAÇÃO COM SPOTIFY -->
      <section id="louvores" class="spotify-section">
        <div class="container">
          <div class="spotify-card">
            <div class="spotify-info">
              <span class="chip chip-dark">
                ${heartCrossSvg(15, "#F2B661")}
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
                  ${heartCrossSvg(16, "#F2B661")}
                  <span>Ouça as faixas direto aqui na página ou salve no seu Spotify</span>
                </li>
                <li>
                  ${heartCrossSvg(16, "#F2B661")}
                  <span>Canções alinhadas ao tema do Salmo 31.15 — entrega e confiança</span>
                </li>
                <li>
                  ${heartCrossSvg(16, "#F2B661")}
                  <span>Compartilhe a playlist no grupo dos amigos</span>
                </li>
              </ul>

              <div style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
                <a
                  href="${cultoData.culto.spotifyPlaylistUrl}"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn btn-spotify"
                >
                  Ouvir Playlist no App Spotify ↗
                </a>
                <a href="#confirmar" class="btn btn-secondary-light" data-scroll-to="confirmar">
                  Confirmar Presença
                </a>
              </div>
            </div>

            <div class="spotify-iframe-wrap">
              <iframe
                title="Playlist Oficial do Culto Ao Dono dos Meus Dias no Spotify"
                style="border-radius: 16px; border: 0;"
                src="${cultoData.culto.spotifyEmbedUrl}"
                width="100%"
                height="380"
                allowfullscreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <!-- 5. PROGRAMAÇÃO -->
      <section class="timeline-section">
        <div class="container">
          <div class="section-header">
            <span class="chip">Programação da Noite</span>
            <h2 class="section-title">
              Cada momento preparado com <span class="gold">propósito</span>
            </h2>
            <p class="section-subtitle">
              Sábado, ${cultoData.culto.dataTexto} a partir das 18h45 · Ministração com
              <strong> ${cultoData.culto.preletor}</strong>.
            </p>
          </div>

          <div class="timeline">
            ${cultoData.programacao
              .map(
                (item) => `
              <div class="timeline-item">
                <div class="timeline-node" aria-hidden="true">
                  ${heartCrossSvg(16, "#E0272D")}
                </div>
                <div class="timeline-card">
                  <div class="timeline-meta">
                    <span class="timeline-time">${item.horario}</span>
                    <span class="chip">${item.tag}</span>
                  </div>
                  <h3 class="timeline-title">${item.titulo}</h3>
                  <p style="color: var(--sepia); font-size: 0.95rem;">${item.descricao}</p>
                </div>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
      </section>

      <!-- 6 & 7. SOBRE O INOTI TEENS + COMO CHEGAR -->
      <section class="about-location-section">
        <div class="container about-location-grid">
          <div class="card card-paper" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <span class="chip">Sobre nós</span>
              <h2 class="section-title" style="margin-top: 0.75rem;">
                Quem é o <span class="gold">INOTI Teens</span>?
              </h2>
              <p style="color: var(--sepia); margin-bottom: 1.1rem;">
                Somos a juventude da <strong>${cultoData.grupo.igreja}</strong>. Acreditamos em uma
                geração autêntica, apaixonada por Jesus e que vive a fé de forma real no dia a dia
                — na escola, na faculdade, em casa e com os amigos.
              </p>
              <p style="color: var(--sepia); margin-bottom: 1.5rem;">
                No culto <strong>“${cultoData.culto.tema}”</strong>, receberemos o
                <strong> ${cultoData.culto.preletor}</strong> para uma noite de renovação espiritual.
                Mesmo que seja a sua primeira vez em uma igreja, este lugar também é para você!
              </p>
            </div>

            <div style="display: flex; align-items: center; gap: 1rem; padding: 1rem; border-radius: 16px; background: rgba(217, 203, 181, 0.3); border: 1px solid var(--madeira);">
              <img
                src="/assets/logo-inoti-teens.png"
                alt="Logo INOTI Teens"
                style="width: 54px; height: 54px; object-fit: contain; border-radius: 12px; background: #fff; padding: 4px;"
              />
              <div>
                <strong style="display: block; font-family: var(--font-ui);">
                  ${cultoData.grupo.nome} · ${cultoData.grupo.igreja}
                </strong>
                <span style="font-size: 0.86rem; color: var(--sepia);">
                  “${cultoData.grupo.slogan}”
                </span>
              </div>
            </div>
          </div>

          <div class="card card-paper">
            <span class="chip">Como Chegar</span>
            <h2 class="section-title" style="margin-top: 0.75rem;">
              Nos vemos na <span class="gold">Igreja</span>
            </h2>
            <p style="color: var(--sepia);">
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

      <!-- 8. CONFIRMAÇÃO DE PRESENÇA & COMPARTILHAR -->
      <section id="confirmar" class="rsvp-section">
        <div class="container rsvp-grid">
          <div class="rsvp-form-card" id="rsvp-card-container">
            ${renderRsvpContent()}
          </div>

          <div class="share-card">
            <span class="chip" style="background: rgba(250, 247, 242, 0.2); color: #FAF7F2; border-color: rgba(250, 247, 242, 0.4);">
              Convite Especial
            </span>
            <h3 style="font-family: var(--font-display); font-size: clamp(1.8rem, 3.5vw, 2.5rem); line-height: 1.12; margin: 0.85rem 0;">
              Quem você vai trazer com você?
            </h3>
            <p style="opacity: 0.95; margin-bottom: 1.5rem;">
              Um simples convite pode mudar a história de um amigo que precisa ouvir que os dias
              dele estão nas mãos de Deus. Envie a mensagem já pronta com o endereço e o link da
              nossa playlist!
            </p>

            <div style="background: rgba(18, 16, 18, 0.25); border-radius: 16px; padding: 1.1rem; font-size: 0.9rem; margin-bottom: 1.5rem; border: 1px solid rgba(250, 247, 242, 0.25);">
              “Ei! No sábado (07/11 às 19h) vai rolar o culto do INOTI Teens com o tema
              <strong> Ao Dono dos Meus Dias</strong> na Praça Haroldo Daltro, 460. Bora comigo? 🙌”
            </div>

            <a
              href="${whatsappShareUrl}"
              target="_blank"
              rel="noopener noreferrer"
              class="btn"
              style="background: var(--papel); color: var(--tinta); width: 100%;"
            >
              Chama um amigo no WhatsApp 📲
            </a>
          </div>
        </div>
      </section>

      <!-- 9. FAQ RÁPIDO -->
      <section class="faq-section">
        <div class="container">
          <div class="section-header">
            <span class="chip">Dúvidas Frequentes</span>
            <h2 class="section-title">
              Tudo o que você precisa <span class="gold">saber</span>
            </h2>
          </div>

          <div class="faq-grid">
            ${cultoData.faq
              .map(
                (item) => `
              <div class="card card-paper">
                <h3 style="font-family: var(--font-ui); font-weight: 700; font-size: 1.05rem; margin-bottom: 0.4rem; color: var(--tinta);">
                  ${item.pergunta}
                </h3>
                <p style="color: var(--sepia); font-size: 0.94rem;">${item.resposta}</p>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
      </section>

      <!-- STICKY BAR MOBILE -->
      <div class="mobile-sticky-bar">
        <div class="mobile-sticky-info">
          <strong>Culto 07/11 às 19h</strong>
          <span>Praça Haroldo Daltro, 460</span>
        </div>
        <a href="#confirmar" class="btn btn-primary" data-scroll-to="confirmar" style="padding: 0.65rem 1.2rem; font-size: 0.86rem;">
          Confirmar presença
        </a>
      </div>
    </main>
  `;
}

function renderRsvpContent() {
  const whatsappShareUrl = getWhatsappShareUrl();

  if (state.rsvpConfirmed) {
    return `
      <span class="chip">Presença Confirmada</span>
      <div class="rsvp-success" role="status" style="margin-top: 1rem;">
        <div style="margin-bottom: 0.65rem;">
          ${heartCrossSvg(34, "#E0272D")}
        </div>
        <h3 style="font-family: var(--font-display); font-size: 1.65rem; margin-bottom: 0.4rem;">
          Tá confirmado, ${state.rsvpNome}! Te esperamos 🙌
        </h3>
        <p style="color: var(--sepia); margin-bottom: 1.25rem;">
          Anote na agenda: <strong>Sábado, 07/11 às 19h</strong> na
          <strong> ${cultoData.culto.endereco}</strong>. Aproveite para chamar um amigo no WhatsApp!
        </p>
        <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; justify-content: center;">
          <a href="${whatsappShareUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
            Chama um amigo no WhatsApp 💬
          </a>
          <button type="button" class="btn btn-secondary" id="btn-reset-rsvp">
            Confirmar outra pessoa
          </button>
        </div>
      </div>
    `;
  }

  return `
    <span class="chip">Presença Gratuita</span>
    <h2 class="section-title" style="margin-top: 0.65rem;">
      Quero estar <span class="gold">lá!</span>
    </h2>
    <p style="color: var(--sepia); margin-bottom: 1.5rem;">
      Confirme sua presença em menos de 30 segundos para prepararmos a melhor recepção para você.
    </p>

    <form id="rsvp-form">
      <div class="form-group">
        <label class="form-label" for="rsvp-nome">Seu nome *</label>
        <input
          id="rsvp-nome"
          type="text"
          class="form-input"
          placeholder="Ex.: Lucas Oliveira"
          required
          value="${state.rsvpNome}"
        />
      </div>

      <div class="form-group">
        <label class="form-label" for="rsvp-whats">Seu WhatsApp (opcional)</label>
        <input
          id="rsvp-whats"
          type="tel"
          class="form-input"
          placeholder="(11) 99999-9999"
          value="${state.rsvpWhatsapp}"
        />
      </div>

      <div class="form-group">
        <label class="form-label" for="rsvp-perfil">Você já faz parte do INOTI Teens?</label>
        <select id="rsvp-perfil" class="form-input">
          <option value="Sou do INOTI Teens">Já sou do INOTI Teens</option>
          <option value="Sou visitante / convidado">É minha primeira vez / Sou convidado(a)</option>
          <option value="Vou levar amigos">Vou com amigos!</option>
        </select>
      </div>

      <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 0.5rem;">
        ${heartCrossSvg(18, "#FAF7F2")}
        Confirmar presença
      </button>
    </form>
  `;
}

function renderFooter() {
  return `
    <footer class="footer">
      <div class="container footer-inner">
        <div style="display: flex; align-items: center; gap: 0.85rem;">
          <div class="brand-logo-wrap">
            <img src="/assets/logo-inoti-teens.png" alt="Logo INOTI Teens" class="brand-logo-img" />
          </div>
          <div>
            <strong style="font-family: var(--font-ui); font-size: 1.05rem;">
              ${cultoData.grupo.nome} · ${cultoData.grupo.igreja}
            </strong>
            <p style="font-size: 0.82rem; color: var(--madeira);">
              Salmo 31.15 — “Nas tuas mãos estão os meus dias.”
            </p>
          </div>
        </div>

        <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; align-items: center;">
          ${
            state.activeTab !== "cultos"
              ? `
            <button
              type="button"
              class="btn btn-primary"
              style="padding: 0.6rem 1.2rem; font-size: 0.85rem;"
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
            style="padding: 0.6rem 1.2rem; font-size: 0.85rem;"
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

  const whatsInput = document.getElementById("rsvp-whats");
  if (whatsInput) {
    whatsInput.addEventListener("input", (e) => {
      e.target.value = formatPhone(e.target.value);
      state.rsvpWhatsapp = e.target.value;
    });
  }

  const form = document.getElementById("rsvp-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const nomeInput = document.getElementById("rsvp-nome");
      if (!nomeInput || !nomeInput.value.trim()) return;
      state.rsvpNome = nomeInput.value.trim();
      state.rsvpConfirmed = true;
      const rsvpContainer = document.getElementById("rsvp-card-container");
      if (rsvpContainer) {
        rsvpContainer.innerHTML = renderRsvpContent();
        attachRsvpReset();
      }
    });
  }

  attachRsvpReset();
}

function attachRsvpReset() {
  const resetBtn = document.getElementById("btn-reset-rsvp");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      state.rsvpConfirmed = false;
      state.rsvpNome = "";
      state.rsvpWhatsapp = "";
      const rsvpContainer = document.getElementById("rsvp-card-container");
      if (rsvpContainer) {
        rsvpContainer.innerHTML = renderRsvpContent();
        attachEvents();
      }
    });
  }
}

// Inicialização da rota por hash
const initialHash = window.location.hash.replace("#", "");
if (initialHash === "cultos" || initialHash === "confirmar" || initialHash === "louvores") {
  state.activeTab = "cultos";
} else if (initialHash === "sobre" || initialHash === "eventos" || initialHash === "inicio") {
  state.activeTab = initialHash;
}

renderApp();

// Atualização em tempo real da contagem regressiva
setInterval(() => {
  if (state.activeTab !== "cultos") return;
  const t = calculateTimeLeft(cultoData.culto.dataISO);
  const elDias = document.getElementById("cd-dias");
  const elHoras = document.getElementById("cd-horas");
  const elMin = document.getElementById("cd-minutos");
  const elSeg = document.getElementById("cd-segundos");
  if (elDias) elDias.textContent = t.dias;
  if (elHoras) elHoras.textContent = t.horas;
  if (elMin) elMin.textContent = t.minutos;
  if (elSeg) elSeg.textContent = t.segundos;
}, 1000);

// Parallax suave na arte da cruz no scroll
window.addEventListener(
  "scroll",
  () => {
    const heroSection = document.getElementById("cult-hero-section");
    if (heroSection) {
      const y = Math.min(24, window.scrollY * 0.05);
      heroSection.style.setProperty("--parallax-y", `${y}px`);
    }
  },
  { passive: true }
);
