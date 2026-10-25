import React, { useState, useEffect } from "react";
import { cultoData } from "../data/cultoData.js";
import { HeartCrossIcon, CrownOfThornsDivider } from "../components/Icons.jsx";
import { SpotifySection } from "../components/SpotifySection.jsx";

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

export function CultPage() {
  const [timeLeft, setTimeLeft] = useState(() =>
    calculateTimeLeft(cultoData.culto.dataISO)
  );
  const [beamPos, setBeamPos] = useState({ x: 50, y: 0 });
  const [parallaxY, setParallaxY] = useState(0);

  // Estado do formulário de confirmação
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [perfil, setPerfil] = useState("Sou do INOTI Teens");
  const [confirmado, setConfirmado] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(cultoData.culto.dataISO));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = Math.min(24, window.scrollY * 0.05);
      setParallaxY(y);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleHeroMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 50);
    setBeamPos({ x, y });
  };

  const handleSubmitRsvp = (e) => {
    e.preventDefault();
    if (!nome.trim()) return;
    setConfirmado(true);
  };

  const shareMessage = encodeURIComponent(
    `Ei! No sábado (07/11 às 19h) vai rolar o culto do INOTI Teens com o tema "${cultoData.culto.tema}" (Salmo 31.15) na ${cultoData.culto.igreja || "Igreja Evangélica Caminho da Vida"} (${cultoData.culto.endereco}). Bora comigo? 🙌\n\nOuça a playlist dos louvores aqui: ${cultoData.culto.spotifyPlaylistUrl}`
  );
  const whatsappShareUrl = `https://wa.me/?text=${shareMessage}`;

  return (
    <main>
      {/* 1. HERO: MODO ESCURO "PALCO" COM BRILHO ÂMBAR E ARTE EM XILOGRAVURA */}
      <section
        className="cult-hero"
        onMouseMove={handleHeroMouseMove}
        style={{
          "--beam-x": `${beamPos.x}%`,
          "--beam-y": `${beamPos.y}%`,
          "--parallax-y": `${parallaxY}px`,
        }}
      >
        <div className="ember-container" aria-hidden="true">
          <span className="ember" />
          <span className="ember" />
          <span className="ember" />
          <span className="ember" />
          <span className="ember" />
        </div>

        <div className="container hero-grid">
          <div>
            <div className="hero-top-meta">
              <span className="chip chip-dark">
                <HeartCrossIcon size={15} color="#F2B661" />
                Culto INOTI Teens · {cultoData.culto.dataCurta} às {cultoData.culto.horario}
              </span>
              <span className="chip chip-dark">Entrada Franca</span>
            </div>

            {/* Truque de marca: alternar cores dentro do mesmo título */}
            <h1 className="display-title hero-title">
              <span className="word-reveal t-light">AO </span>
              <span className="word-reveal t-gold">DONO </span>
              <br />
              <span className="word-reveal t-light">DOS MEUS </span>
              <span className="word-reveal t-gold">DIAS</span>
            </h1>

            <span className="hero-verse-tag">
              {cultoData.culto.versiculoReferencia} — “{cultoData.culto.versiculoTexto}”
            </span>

            <p className="hero-lead">
              Teus dias estão em boas mãos. Uma noite de adoração profunda,
              entrega e comunhão com os jovens da{" "}
              <strong>{cultoData.grupo.igreja}</strong>.
            </p>

            {/* Informações essenciais visíveis sem rolar */}
            <div className="hero-info-strip">
              <div className="hero-info-item">
                <span className="hero-info-label">Quando</span>
                <span className="hero-info-value">
                  {cultoData.culto.diaSemana}, {cultoData.culto.dataCurta} · {cultoData.culto.horario}
                </span>
              </div>
              <div className="hero-info-item">
                <span className="hero-info-label">Ministração</span>
                <span className="hero-info-value">{cultoData.culto.preletor}</span>
              </div>
              <div className="hero-info-item">
                <span className="hero-info-label">Onde</span>
                <span className="hero-info-value">{cultoData.culto.endereco}</span>
              </div>
            </div>

            <div className="hero-actions">
              <a href="#confirmar" className="btn btn-primary">
                <HeartCrossIcon size={18} color="#FAF7F2" />
                Confirmar presença
              </a>
              <a href="#louvores" className="btn btn-secondary-light">
                🎧 Ouvir Playlist no Spotify
              </a>
            </div>
          </div>

          {/* Arte oficial com cruz em xilogravura, pano ocre e coroa de espinhos */}
          <div className="hero-artwork-frame">
            <img
              src="/assets/arte-culto.jpg"
              alt="Arte oficial do culto Ao Dono dos Meus Dias — Salmo 31.15"
              className="hero-artwork-img"
            />
            <div className="hero-artwork-badge">
              <img
                src="/assets/logo-inoti-teens.png"
                alt="Selo INOTI Teens"
              />
              <span>INOTI Teens · Caminho da Vida</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VERSÍCULO EM DESTAQUE (SALMO 31.15) */}
      <section className="verse-banner">
        <div className="container verse-box">
          <span className="verse-ref">{cultoData.culto.versiculoReferencia}</span>
          <blockquote className="verse-quote">
            “Nas <span>tuas mãos</span> estão os meus dias.”
          </blockquote>
          <p className="verse-reflection">
            {cultoData.culto.versiculoComplemento}
          </p>
        </div>
      </section>

      {/* MENSAGENS COM O TEMA "AO DONO DOS MEUS DIAS" */}
      <section className="theme-messages-section">
        <div className="container">
          <div className="section-header">
            <span className="chip">Mensagens do Tema</span>
            <h2 className="section-title">
              O que significa viver para o <span className="gold">Dono dos nossos dias</span>?
            </h2>
            <p className="section-subtitle">
              Três verdades que vão guiar nossa noite de adoração e Palavra.
            </p>
          </div>

          <div className="messages-grid">
            {cultoData.mensagensTema.map((msg, idx) => (
              <article key={msg.titulo} className="message-card">
                <span className="message-number">0{idx + 1}</span>
                <h3 className="message-title">{msg.titulo}</h3>
                <div className="message-sub">{msg.subtitulo}</div>
                <p style={{ color: "var(--sepia)", fontSize: "0.96rem" }}>
                  {msg.texto}
                </p>
              </article>
            ))}
          </div>

          <CrownOfThornsDivider />
        </div>
      </section>

      {/* 3. CONTAGEM REGRESSIVA ATÉ O CULTO */}
      <section className="countdown-section" aria-label="Contagem regressiva para o culto">
        <div className="container countdown-wrap">
          <div>
            <span className="chip chip-dark">Contagem Regressiva · 07/11 às 19h</span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)",
                marginTop: "0.65rem",
              }}
            >
              Falta pouco para estarmos juntos
            </h2>
          </div>

          <div className="countdown-grid">
            <div className="countdown-item">
              <span className="countdown-number">{timeLeft.dias}</span>
              <span className="countdown-label">Dias</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-number">{timeLeft.horas}</span>
              <span className="countdown-label">Horas</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-number">{timeLeft.minutos}</span>
              <span className="countdown-label">Minutos</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-number">{timeLeft.segundos}</span>
              <span className="countdown-label">Segundos</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. INTEGRAÇÃO COM SPOTIFY (PLAYLIST DOS LOUVORES) */}
      <SpotifySection />

      {/* 5. PROGRAMAÇÃO DO CULTO (TIMELINE VERTICAL) */}
      <section className="timeline-section">
        <div className="container">
          <div className="section-header">
            <span className="chip">Programação da Noite</span>
            <h2 className="section-title">
              Cada momento preparado com <span className="gold">propósito</span>
            </h2>
            <p className="section-subtitle">
              Sábado, {cultoData.culto.dataTexto} a partir das 18h45 · Ministração com{" "}
              <strong>{cultoData.culto.preletor}</strong>.
            </p>
          </div>

          <div className="timeline">
            {cultoData.programacao.map((item) => (
              <div key={item.horario} className="timeline-item">
                <div className="timeline-node" aria-hidden="true">
                  <HeartCrossIcon size={16} color="#E0272D" />
                </div>
                <div className="timeline-card">
                  <div className="timeline-meta">
                    <span className="timeline-time">{item.horario}</span>
                    <span className="chip">{item.tag}</span>
                  </div>
                  <h3 className="timeline-title">{item.titulo}</h3>
                  <p style={{ color: "var(--sepia)", fontSize: "0.95rem" }}>
                    {item.descricao}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 & 7. SOBRE O INOTI TEENS + COMO CHEGAR */}
      <section className="about-location-section">
        <div className="container about-location-grid">
          {/* Sobre o culto e INOTI Teens */}
          <div className="card card-paper" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <span className="chip">Sobre nós</span>
              <h2 className="section-title" style={{ marginTop: "0.75rem" }}>
                Quem é o <span className="gold">INOTI Teens</span>?
              </h2>
              <p style={{ color: "var(--sepia)", marginBottom: "1.1rem" }}>
                Somos a juventude da <strong>{cultoData.grupo.igreja}</strong>.
                Acreditamos em uma geração autêntica, apaixonada por Jesus e que
                vive a fé de forma real no dia a dia — na escola, na faculdade, em
                casa e com os amigos.
              </p>
              <p style={{ color: "var(--sepia)", marginBottom: "1.5rem" }}>
                No culto <strong>“{cultoData.culto.tema}”</strong>, receberemos o{" "}
                <strong>{cultoData.culto.preletor}</strong> para uma noite de
                renovação espiritual. Mesmo que seja a sua primeira vez em uma
                igreja, este lugar também é para você!
              </p>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                padding: "1rem",
                borderRadius: "16px",
                background: "rgba(217, 203, 181, 0.3)",
                border: "1px solid var(--madeira)",
              }}
            >
              <img
                src="/assets/logo-inoti-teens.png"
                alt="Logo INOTI Teens"
                style={{ width: "54px", height: "54px", objectFit: "contain", borderRadius: "12px", background: "#fff", padding: "4px" }}
              />
              <div>
                <strong style={{ display: "block", fontFamily: "var(--font-ui)" }}>
                  {cultoData.grupo.nome} · {cultoData.grupo.igreja}
                </strong>
                <span style={{ fontSize: "0.86rem", color: "var(--sepia)" }}>
                  “{cultoData.grupo.slogan}”
                </span>
              </div>
            </div>
          </div>

          {/* Como chegar */}
          <div className="card card-paper">
            <span className="chip">Como Chegar</span>
            <h2 className="section-title" style={{ marginTop: "0.75rem" }}>
              Nos vemos na <span className="gold">Igreja</span>
            </h2>
            <p style={{ color: "var(--sepia)" }}>
              📍 <strong>{cultoData.culto.endereco}</strong> — {cultoData.culto.bairroCidade}
            </p>

            <div className="map-frame">
              <iframe
                title="Mapa de localização Praça Haroldo Daltro, 460"
                src={cultoData.culto.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="location-actions">
              <a
                href={cultoData.culto.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Abrir no Google Maps ↗
              </a>
              <a
                href={cultoData.culto.wazeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                Abrir no Waze ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CONFIRMAÇÃO DE PRESENÇA & COMPARTILHAR NO WHATSAPP */}
      <section id="confirmar" className="rsvp-section">
        <div className="container rsvp-grid">
          <div className="rsvp-form-card">
            <span className="chip">Presença Gratuita</span>
            <h2 className="section-title" style={{ marginTop: "0.65rem" }}>
              Quero estar <span className="gold">lá!</span>
            </h2>
            <p style={{ color: "var(--sepia)", marginBottom: "1.5rem" }}>
              Confirme sua presença em menos de 30 segundos para prepararmos a
              melhor recepção para você.
            </p>

            {confirmado ? (
              <div className="rsvp-success" role="status">
                <div style={{ marginBottom: "0.65rem" }}>
                  <HeartCrossIcon size={34} color="#E0272D" />
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.65rem",
                    marginBottom: "0.4rem",
                  }}
                >
                  Tá confirmado, {nome}! Te esperamos 🙌
                </h3>
                <p style={{ color: "var(--sepia)", marginBottom: "1.25rem" }}>
                  Anote na agenda: <strong>Sábado, 07/11 às 19h</strong> na{" "}
                  <strong>{cultoData.culto.endereco}</strong>. Aproveite para
                  chamar um amigo no WhatsApp!
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center" }}>
                  <a
                    href={whatsappShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    Chama um amigo no WhatsApp 💬
                  </a>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setNome("");
                      setWhatsapp("");
                      setConfirmado(false);
                    }}
                  >
                    Confirmar outra pessoa
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitRsvp}>
                <div className="form-group">
                  <label className="form-label" htmlFor="rsvp-nome">
                    Seu nome *
                  </label>
                  <input
                    id="rsvp-nome"
                    type="text"
                    className="form-input"
                    placeholder="Ex.: Lucas Oliveira"
                    required
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="rsvp-whats">
                    Seu WhatsApp (opcional)
                  </label>
                  <input
                    id="rsvp-whats"
                    type="tel"
                    className="form-input"
                    placeholder="(11) 99999-9999"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(formatPhone(e.target.value))}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="rsvp-perfil">
                    Você já faz parte do INOTI Teens?
                  </label>
                  <select
                    id="rsvp-perfil"
                    className="form-input"
                    value={perfil}
                    onChange={(e) => setPerfil(e.target.value)}
                  >
                    <option value="Sou do INOTI Teens">Já sou do INOTI Teens</option>
                    <option value="Sou visitante / convidado">É minha primeira vez / Sou convidado(a)</option>
                    <option value="Vou levar amigos">Vou com amigos!</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: "100%", marginTop: "0.5rem" }}
                >
                  <HeartCrossIcon size={18} color="#FAF7F2" />
                  Confirmar presença
                </button>
              </form>
            )}
          </div>

          {/* Convite rápido para compartilhar */}
          <div className="share-card">
            <span
              className="chip"
              style={{
                background: "rgba(250, 247, 242, 0.2)",
                color: "#FAF7F2",
                borderColor: "rgba(250, 247, 242, 0.4)",
              }}
            >
              Convite Especial
            </span>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
                lineHeight: 1.12,
                margin: "0.85rem 0",
              }}
            >
              Quem você vai trazer com você?
            </h3>
            <p style={{ opacity: 0.95, marginBottom: "1.5rem" }}>
              Um simples convite pode mudar a história de um amigo que precisa
              ouvir que os dias dele estão nas mãos de Deus. Envie a mensagem já
              pronta com o endereço e o link da nossa playlist!
            </p>

            <div
              style={{
                background: "rgba(18, 16, 18, 0.25)",
                borderRadius: "16px",
                padding: "1.1rem",
                fontSize: "0.9rem",
                marginBottom: "1.5rem",
                border: "1px solid rgba(250, 247, 242, 0.25)",
              }}
            >
              “Ei! No sábado (07/11 às 19h) vai rolar o culto do INOTI Teens com
              o tema <strong>Ao Dono dos Meus Dias</strong> na Praça Haroldo
              Daltro, 460. Bora comigo? 🙌”
            </div>

            <a
              href={whatsappShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              style={{
                background: "var(--papel)",
                color: "var(--tinta)",
                width: "100%",
              }}
            >
              Chama um amigo no WhatsApp 📲
            </a>
          </div>
        </div>
      </section>

      {/* 9. FAQ RÁPIDO */}
      <section className="faq-section">
        <div className="container">
          <div className="section-header">
            <span className="chip">Dúvidas Frequentes</span>
            <h2 className="section-title">
              Tudo o que você precisa <span className="gold">saber</span>
            </h2>
          </div>

          <div className="faq-grid">
            {cultoData.faq.map((item) => (
              <div key={item.pergunta} className="card card-paper">
                <h3
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontWeight: 700,
                    fontSize: "1.05rem",
                    marginBottom: "0.4rem",
                    color: "var(--tinta)",
                  }}
                >
                  {item.pergunta}
                </h3>
                <p style={{ color: "var(--sepia)", fontSize: "0.94rem" }}>
                  {item.resposta}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STICKY BAR MOBILE */}
      <div className="mobile-sticky-bar">
        <div className="mobile-sticky-info">
          <strong>Culto 07/11 às 19h</strong>
          <span>Praça Haroldo Daltro, 460</span>
        </div>
        <a href="#confirmar" className="btn btn-primary" style={{ padding: "0.65rem 1.2rem", fontSize: "0.86rem" }}>
          Confirmar presença
        </a>
      </div>
    </main>
  );
}
