# Site INOTI Teens — Culto "Ao Dono dos Meus Dias"

Site oficial do grupo **INOTI Teens** (Jovens da **Igreja Evangélica Caminho da Vida**), contendo:
- **Página Geral ("Início", "Sobre o INOTI", "Agenda & Fotos")**: Apresenta o estado moderno **"Em construção"** do portal geral do ministério, com atalho em destaque para o culto atual.
- **Aba "Cultos" → Culto Especial "Ao Dono dos Meus Dias" (Salmo 31.15 & Marcos 10:17–26)**:
  - Identidade visual completa seguindo o Design System (*Sagrado + Jovem*, paleta Papel `#FAF7F2`, Ouro Terroso `#A67C4E`, Tinta `#1C1A18`, Noite `#121012`, Brasa `#F2B661`, Vermelho Coração `#E0272D` e Laranja Teens `#D9693A`).
  - Arte oficial da cruz em xilogravura integrada ao layout e logo do **INOTI Teens**.
  - **Seção Mensagens do Tema (Roteiro Marcos 10:17–26 — O Jovem Rico)**:
    - *O Encontro que Expôs o Coração* (Contexto bíblico de Marcos 10:17–26).
    - *Os 3 Pilares*: **01. A Religiosidade Não Salva**, **02. Salvador e Senhor**, **03. Viver o Reino de Deus**.
    - Citações devocionais (*Danila Araújo* e *Isa Drops*) e apelo final de entrega (*“O que falta para você?”*).
  - Informações essenciais e programação do culto (**07/11 às 19h**).
  - **Integração com Spotify** exibindo a playlist oficial dos louvores (`1NNfmAHJeeVVrRkidoYuXh`).
  - Ministração do **Pastor Joel Hayashi** (`@joel_hayashi`).
  - Localização (`Praça Haroldo Daltro, 460`) com mapa integrado e botões para **Google Maps** e **Waze**.
  - **Redes Sociais**: Instagram INOTI Teens, Instagram Oficial da Igreja (Vila Carrão), Facebook da Igreja (Vila Carrão), **Facebook da Igreja de Santo André** e Instagram EBD INOTI.

---

## Como visualizar o site localmente

### Opção 1: Servidor imediato (Zero instalação extra, via Python)
Na pasta do projeto (`C:\Users\kenji\.gemini\antigravity\scratch\inoti-teens-site`), execute:
```powershell
py -m http.server 3000
```
E abra no navegador: **http://localhost:3000** (ou **http://localhost:3000/#cultos** para ir direto à aba do culto).

### Opção 2: Com Node.js / Vite
Caso tenha Node.js instalado:
```bash
npm install
npm run dev
```

---

## Onde editar informações do culto
Todas as informações de texto, horários, endereço, link da playlist do Spotify e perguntas frequentes estão centralizadas em:
- [`src/data/cultoData.js`](./src/data/cultoData.js)
