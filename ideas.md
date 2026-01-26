# Brainstorming de Design: Guia Interativo Cerimonial Inclusivo

<response>
<text>
<idea>
  **Design Movement**: Cyberpunk Acessível / Neon Futurism
  **Core Principles**:
  1. **Contraste Funcional**: O neon não é apenas estético, mas guia a atenção e define hierarquia.
  2. **Imersão Focada**: O conteúdo (imagens das páginas) é o protagonista; a interface é a moldura brilhante.
  3. **Fluidez Digital**: Transições suaves que simulam o folhear de páginas em um dispositivo holográfico.
  4. **Acessibilidade Radical**: Alto contraste, botões grandes e claros, foco em legibilidade mesmo com estética neon.

  **Color Philosophy**:
  - Fundo: `oklch(0.15 0.02 280)` (Deep Void Blue) - Um azul quase preto para destacar o neon.
  - Primária (Neon): `oklch(0.7 0.2 140)` (Cyber Green) - Para ações principais (avançar/iniciar).
  - Secundária (Neon): `oklch(0.6 0.2 300)` (Electric Purple) - Para elementos de navegação secundária e bordas ativas.
  - Texto: `oklch(0.95 0.01 280)` (Holographic White) - Branco puro com leve tintura azulada para leitura confortável.
  - A escolha reforça a modernidade e a tecnologia assistiva, temas centrais do guia.

  **Layout Paradigm**:
  - **Theater Mode**: A imagem da página ocupa o centro, maximizada, com controles flutuantes nas laterais (desktop) ou abaixo (mobile).
  - **Glassmorphism Controls**: Barra de controle com efeito de vidro fosco e bordas neon sutis.
  - **Progress Bar Holográfica**: Uma linha de luz no topo ou base indicando o progresso no módulo.

  **Signature Elements**:
  - **Glow Borders**: As imagens das páginas têm um brilho suave (box-shadow) que pulsa levemente quando o usuário interage.
  - **Neon Icons**: Ícones de navegação (setas, play) desenhados com traços de luz.
  - **Grid de Fundo Sutil**: Um padrão de grade muito sutil e escuro no fundo para dar profundidade técnica.

  **Interaction Philosophy**:
  - "Touch of Light": Ao passar o mouse ou tocar, os elementos acendem/intensificam o brilho.
  - Feedback imediato e visual para cada ação.

  **Animation**:
  - **Slide Transition**: As páginas deslizam horizontalmente com um rastro de luz (motion blur).
  - **Module Unlock**: Ao terminar um módulo, o vídeo se revela com um efeito de "desmaterialização" da página anterior.

  **Typography System**:
  - Títulos/Interface: **Orbitron** ou **Rajdhani** (Google Fonts) - Fontes tecnológicas, quadradas, futuristas.
  - Corpo (se houver texto extra): **Inter** ou **Roboto** para legibilidade máxima, mas o foco são as imagens.
</idea>
</text>
<probability>0.08</probability>
</response>

<response>
<text>
<idea>
  **Design Movement**: Dark Mode Minimalist / High-Tech Corporate
  **Core Principles**:
  1. **Sobriedade Elegante**: Neon usado apenas como "accent" (detalhe), não como base.
  2. **Estrutura Clara**: Navegação lateral fixa, sempre visível.
  3. **Foco no Conteúdo**: Nada compete com a informação das páginas.
  
  **Color Philosophy**:
  - Fundo: Cinza chumbo muito escuro.
  - Acentos: Azul ciano elétrico para botões e links.
  
  **Layout Paradigm**:
  - Split Screen: Menu à esquerda, conteúdo à direita.
  
  **Signature Elements**:
  - Linhas finas de separação.
  - Botões retangulares sólidos.
  
  **Interaction Philosophy**:
  - Cliques precisos, transições rápidas (cut).
  
  **Animation**:
  - Fade in/out simples.
  
  **Typography System**:
  - Roboto Mono para títulos, Open Sans para corpo.
</idea>
</text>
<probability>0.05</probability>
</response>

<response>
<text>
<idea>
  **Design Movement**: Retro Wave / 80s Digital
  **Core Principles**:
  1. **Nostalgia Digital**: Estética de computadores antigos com cores vibrantes.
  2. **Gamificação Visual**: Interface parece um jogo ou terminal antigo.
  
  **Color Philosophy**:
  - Fundo: Roxo profundo.
  - Acentos: Rosa choque e Amarelo neon.
  
  **Layout Paradigm**:
  - Moldura de monitor CRT ao redor do conteúdo.
  
  **Signature Elements**:
  - Scanlines (linhas de varredura).
  - Glitch effects ocasionais.
  
  **Interaction Philosophy**:
  - Botões com "click" sonoro e visual (afundam).
  
  **Animation**:
  - Efeito de ligar/desligar TV antiga.
  
  **Typography System**:
  - Press Start 2P (pixel art) para títulos.
</idea>
</text>
<probability>0.03</probability>
</response>

# Decisão de Design

Vou seguir com a **Opção 1: Cyberpunk Acessível / Neon Futurism**.

**Justificativa**:
- Alinha-se perfeitamente com o pedido de "estilo neon" e "identidade visual" das imagens (que já possuem elementos 3D e fundo escuro).
- Acomoda a necessidade de acessibilidade (contraste alto) sem sacrificar o estilo.
- O conceito de "Theater Mode" é ideal para exibir as páginas do guia como imagens, garantindo que sejam legíveis em mobile e desktop.
- A tipografia tecnológica (Orbitron/Rajdhani) complementa o visual das imagens do PDF.

**Implementação Prática**:
- Usarei Tailwind para criar os efeitos de brilho (shadows coloridos) e gradientes.
- As cores serão baseadas na paleta `oklch` definida.
- A navegação será intuitiva, com botões grandes e brilhantes.
