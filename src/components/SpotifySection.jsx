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

            <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              <a
                href={cultoData.culto.spotifyPlaylistUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-spotify"
              >
                Ouvir Playlist no App Spotify ↗
              </a>
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                  `Galera, ouçam a playlist oficial dos louvores do Culto INOTI Teens "Ao Dono dos Meus Dias" no Spotify: ${cultoData.culto.spotifyPlaylistUrl}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
              >
                Compartilhar Playlist no WhatsApp
              </a>
            </div>
          </div>

          <div className="spotify-iframe-wrap">
            <iframe
              title="Playlist Oficial do Culto Ao Dono dos Meus Dias no Spotify"
              style={{ borderRadius: "14px", border: 0, display: "block" }}
              src={cultoData.culto.spotifyEmbedUrl}
              width="100%"
              height="352"
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
