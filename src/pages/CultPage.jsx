import React, { useState, useEffect } from "react";
import { cultoData } from "../data/cultoData.js";
import {
  HeartCrossIcon,
  CrownOfThornsDivider,
  WhatsAppIcon,
  SpotifyIcon,
  MapPinIcon,
  InstagramIcon,
  FacebookIcon,
} from "../components/Icons.jsx";
import { SpotifySection } from "../components/SpotifySection.jsx";

export function CultPage() {
  const [beamPos, setBeamPos] = useState({ x: 50, y: 0 });
  const [parallaxY, setParallaxY] = useState(0);

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

  const getWhatsAppShareLink = () => {
    const currentUrl = window.location.href.split("#")[0] + "#cultos";
    const text = `Fala galera! Bora pro Culto do INOTI Teens "Ao Dono dos Meus Dias"?\n\n📅 Sábado, 07/11 às 19h\n🎙️ Ministração: Pr. Joel Hayashi\n📍 Local: Praça Haroldo Daltro, 460 (Igreja Evangélica Caminho da Vida - Vila Carrão)\n\nOuça os louvores no Spotify e veja os detalhes aqui:\n${currentUrl}`;
    return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
  };

  return (
    <main>
      {/* 1. HERO: MODO ESCURO "PALCO" COM BRILHO ÂMBAR E ARTE EM XILOGRAVURA */}
      <section
        className="cult-hero"
        id="cult-hero-section"
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

            {/* Informações essenciais com adaptação 1 coluna abaixo de 440px */}
            <div className="hero-info-strip">
              <div className="hero-info-item">
                <span className="hero-info-label">📅 Quando</span>
                <span className="hero-info-value">
                  {cultoData.culto.diaSemana}, {cultoData.culto.dataCurta} · {cultoData.culto.horario}
                </span>
              </div>
              <div className="hero-info-item">
                <span className="hero-info-label">🎙️ Ministração</span>
                <span className="hero-info-value">{cultoData.culto.preletor}</span>
              </div>
              <div className="hero-info-item">
                <span className="hero-info-label">📍 Onde</span>
                <span className="hero-info-value">{cultoData.culto.endereco}</span>
              </div>
            </div>

            <div className="hero-actions">
              <a href="#louvores" className="btn btn-primary">
                <SpotifyIcon size={18} color="#FAF7F2" />
                <span>Ouvir Louvores no Spotify</span>
              </a>
              <a
                href={getWhatsAppShareLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
              >
                <WhatsAppIcon size={18} color="#ffffff" />
                <span>Convidar no WhatsApp</span>
              </a>
              <a href="#como-chegar" className="btn btn-secondary-light">
                <MapPinIcon size={18} color="#FAF7F2" />
                <span>Como Chegar</span>
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

      {/* MENSAGENS COM O TEMA "AO DONO DOS MEUS DIAS" (MARCOS 10:17–26) */}
      <section className="theme-messages-section" id="mensagem-tema">
        <div className="container">
          <div className="section-header">
            <span className="chip">{cultoData.mensagemRoteiro.superHeadline}</span>
            <h2 className="section-title">
              Quanto custa entregar o <span className="gold">controle de quem você é</span>?
            </h2>
            <p className="section-subtitle">
              “{cultoData.mensagemRoteiro.subheadline}”
            </p>
            <blockquote className="theme-devotional-quote">
              “{cultoData.mensagemRoteiro.apoioDevocional.citacao}”
              <cite>— {cultoData.mensagemRoteiro.apoioDevocional.autora}</cite>
            </blockquote>
          </div>

          {/* O Confronto da Passagem (Marcos 10:17–26) */}
          <article className="scripture-confront-card">
            <div className="scripture-confront-top">
              <span className="chip">{cultoData.mensagemRoteiro.confronto.referencia}</span>
              <span style={{ fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: "0.76rem", color: "var(--ouro)" }}>
                Palavra Base da Ministração
              </span>
            </div>
            <h3 className="scripture-confront-title">
              {cultoData.mensagemRoteiro.confronto.titulo}
            </h3>
            <div className="scripture-confront-body">
              <p>{cultoData.mensagemRoteiro.confronto.paragrafo1}</p>
              <p>{cultoData.mensagemRoteiro.confronto.paragrafo2}</p>
            </div>
          </article>

          {/* Os Três Pilares da Mensagem */}
          <div className="messages-grid">
            {cultoData.mensagensTema.map((msg, idx) => (
              <article key={msg.titulo} className="message-card">
                <div>
                  <div className="message-card-top">
                    <span className="message-number">0{idx + 1}</span>
                    <span className="message-ref-badge">{msg.referencia}</span>
                  </div>
                  <h3 className="message-title">{msg.titulo}</h3>
                  <div className="message-sub">{msg.subtitulo}</div>
                  <p style={{ color: "var(--sepia)", fontSize: "0.94rem" }}>
                    {msg.texto}
                  </p>
                </div>
                <div className="message-highlight-quote">
                  {msg.destaque}
                </div>
              </article>
            ))}
          </div>

          {/* O Clímax / Resposta de Adoração e Entrega */}
          <div className="theme-climax-card">
            <blockquote className="theme-climax-quote">
              “{cultoData.mensagemRoteiro.climax.citacao}”
              <cite>— {cultoData.mensagemRoteiro.climax.autora}</cite>
            </blockquote>
            <div className="theme-climax-appeal">
              <h3>{cultoData.mensagemRoteiro.climax.perguntaDestaque}</h3>
              <p>{cultoData.mensagemRoteiro.climax.apelo}</p>
            </div>
          </div>

          <CrownOfThornsDivider />
        </div>
      </section>

      {/* INTEGRAÇÃO COM SPOTIFY (PLAYLIST DOS LOUVORES) */}
      <SpotifySection />

      {/* MINISTRAÇÃO DA PALAVRA — PASTOR JOEL HAYASHI */}
      <section className="preacher-section">
        <div className="container">
          <div className="preacher-card">
            <div className="preacher-badge-avatar" aria-hidden="true">
              JH
            </div>
            <div className="preacher-content">
              <span className="chip">{cultoData.culto.preletorCargo}</span>
              <h3>{cultoData.culto.preletor}</h3>
              <p>{cultoData.culto.preletorBio}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem" }}>
              <a
                href={cultoData.culto.preletorInstagram}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Instagram {cultoData.culto.preletorInstagramHandle} ↗
              </a>
              <a
                href={cultoData.culto.preletorIgrejaInstagram}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                Igreja Triny {cultoData.culto.preletorIgrejaInstagramHandle} ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SOBRE O INOTI TEENS + COMO CHEGAR */}
      <section id="como-chegar" className="about-location-section">
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

      {/* REDES SOCIAIS AO FINAL DO SITE */}
      <section id="redes-sociais" className="socials-section">
        <div className="container">
          <div className="section-header">
            <span className="chip">Conecte-se Conosco</span>
            <h2 className="section-title">
              Nossas <span className="gold">Redes Sociais</span>
            </h2>
            <p className="section-subtitle">
              Siga os perfis oficiais do INOTI Teens, das nossas igrejas (Vila Carrão e Santo André) e da EBD para acompanhar nossos cultos, eventos e estudos.
            </p>
          </div>

          <div className="socials-grid">
            {cultoData.redesSociais.map((rede) => (
              <a
                key={rede.nome}
                href={rede.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-card"
              >
                <div>
                  <div className="social-card-top">
                    <div className="social-icon-box">
                      {rede.tipo === "facebook" ? (
                        <FacebookIcon size={20} color="#A67C4E" />
                      ) : (
                        <InstagramIcon size={20} color="#E0272D" />
                      )}
                    </div>
                    <span className="chip">{rede.destaque}</span>
                  </div>
                  <h3 className="social-title">{rede.nome}</h3>
                  <span className="social-handle">{rede.handle}</span>
                  <p className="social-desc">{rede.descricao}</p>
                </div>
                <span className="social-link-cta">
                  Acessar página oficial ↗
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* BARRA INFERIOR DE NAVEGAÇÃO RÁPIDA NO CELULAR (4 ATALHOS) */}
      <nav className="mobile-quick-bar" aria-label="Atalhos rápidos do culto no celular">
        <a href="#louvores" className="mobile-quick-link highlight">
          <SpotifyIcon size={16} color="#FAF7F2" />
          <span>Louvores</span>
        </a>
        <a href="#como-chegar" className="mobile-quick-link">
          <MapPinIcon size={16} color="#FAF7F2" />
          <span>Como Chegar</span>
        </a>
        <a
          href={getWhatsAppShareLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="mobile-quick-link"
        >
          <WhatsAppIcon size={16} color="#25D366" />
          <span>WhatsApp</span>
        </a>
        <a href="#redes-sociais" className="mobile-quick-link">
          <InstagramIcon size={16} color="#FAF7F2" />
          <span>Redes</span>
        </a>
      </nav>
    </main>
  );
}
