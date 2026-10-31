import React from "react";
import { cultoData } from "../data/cultoData.js";
import { HeartCrossIcon } from "./Icons.jsx";

export function SpotifySection() {
  return (
    <section id="louvores" className="spotify-section">
      <div className="container">
        <div className="spotify-card">
          <div className="spotify-info">
            <span className="chip chip-dark">
              <HeartCrossIcon size={15} color="#F2B661" />
              Louvores do Culto · Spotify Oficial
            </span>
            <h3>
              Prepare o coração com a <span>Playlist Oficial</span> da noite
            </h3>
            <p>
              A adoração começa muito antes do sábado às 19h. Reunimos nesta playlist
              todos os louvores que serão entoados no culto{" "}
              <strong>“{cultoData.culto.tema}”</strong> para você ouvir na semana,
              meditar nas letras e já chegar cantando junto com toda a juventude.
            </p>

            <ul className="spotify-highlights">
              <li>
                <HeartCrossIcon size={16} color="#F2B661" />
                <span>Ouça as faixas direto aqui na página ou salve no seu Spotify</span>
              </li>
              <li>
                <HeartCrossIcon size={16} color="#F2B661" />
                <span>Canções alinhadas ao tema do Salmo 31.15 — entrega e confiança</span>
              </li>
              <li>
                <HeartCrossIcon size={16} color="#F2B661" />
                <span>Compartilhe a playlist no grupo dos amigos</span>
              </li>
            </ul>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
              <a
                href={cultoData.culto.spotifyPlaylistUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-spotify"
              >
                Ouvir Playlist no App Spotify ↗
              </a>
            </div>
          </div>

          <div className="spotify-iframe-wrap">
            <iframe
              title="Playlist Oficial do Culto Ao Dono dos Meus Dias no Spotify"
              style={{ borderRadius: "16px", border: 0 }}
              src={cultoData.culto.spotifyEmbedUrl}
              width="100%"
              height="380"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
