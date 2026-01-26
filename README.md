# Guia Interativo - Cerimonial Público Inclusivo

Este projeto é um guia interativo web desenvolvido com React, Tailwind CSS e Vite. Ele apresenta o conteúdo do "Cerimonial Público Inclusivo" em formato de slides interativos, com vídeos complementares ao final de cada módulo.

## Funcionalidades

- **Navegação Intuitiva**: Botões "Anterior" e "Próximo" para navegar entre as páginas.
- **Modo Cinema**: Ao reproduzir um vídeo, o fundo escurece para focar no conteúdo.
- **Layout Responsivo**: Adapta-se perfeitamente a desktops, tablets e celulares.
- **Tela Cheia**: Ocupa 100% da altura da tela, sem barras de rolagem desnecessárias.
- **Vídeos Integrados**: Vídeos do YouTube incorporados diretamente na interface.

## Como Usar (Desenvolvimento Local)

1.  Clone este repositório.
2.  Instale as dependências:
    ```bash
    npm install
    # ou
    pnpm install
    ```
3.  Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    # ou
    pnpm dev
    ```

## Como Inserir no WordPress

Existem duas formas principais de integrar este guia ao seu site WordPress:

### Opção 1: Via Iframe (Recomendado se você hospedar o guia separadamente)

Se você hospedar este projeto em plataformas como Vercel, Netlify ou GitHub Pages, basta usar um bloco "HTML Personalizado" no WordPress e colar o seguinte código:

```html
<iframe 
  src="URL_DO_SEU_PROJETO_HOSPEDADO" 
  style="width: 100%; height: 100vh; border: none;" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
  allowfullscreen
></iframe>
```

### Opção 2: Upload de Arquivos (Hospedagem Própria)

1.  Gere a versão de produção do projeto:
    ```bash
    npm run build
    ```
2.  Isso criará uma pasta `dist` com todos os arquivos necessários.
3.  Acesse o gerenciador de arquivos do seu servidor (cPanel ou FTP).
4.  Crie uma pasta chamada `guia-cerimonial` dentro da pasta `public_html` (ou onde seu WordPress está instalado).
5.  Faça o upload de todo o conteúdo da pasta `dist` para dentro dessa nova pasta `guia-cerimonial`.
6.  Agora o guia estará acessível em: `seusite.com/guia-cerimonial`.
7.  Para inserir em uma página específica do WordPress, use o iframe apontando para esse caminho:

```html
<iframe 
  src="/guia-cerimonial/index.html" 
  style="width: 100%; height: 100vh; border: none;" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
  allowfullscreen
></iframe>
```

## Estrutura do Projeto

- `client/src/pages/Home.tsx`: Contém a lógica principal e a estrutura dos módulos.
- `client/src/components/PageViewer.tsx`: Componente responsável por exibir as imagens e os vídeos.
- `client/public/images/pages/`: Pasta onde ficam as imagens das páginas do guia.

## Personalização

Para alterar as cores ou fontes, edite o arquivo `client/src/index.css`. O projeto utiliza variáveis CSS para facilitar a personalização do tema "Neon".
