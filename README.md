# portfolio-OS

`portfolio-OS` é um portfólio pessoal construído como uma SPA em Vue 3 + TypeScript que combina duas experiências dentro do mesmo aplicativo:

- no desktop, uma interface inspirada em sistemas operacionais, com navegação por apps internos;
- no mobile, uma experiência institucional mais direta, objetiva e orientada ao conteúdo.

A proposta não é reproduzir Windows, macOS ou Linux com fidelidade literal. O objetivo é aplicar referências visuais e comportamentais desses sistemas em uma arquitetura única, coesa e reaproveitável, transformando a navegação do portfólio em uma experiência mais autoral sem comprometer a clareza do conteúdo.

| Windows | MacOS | Linux | 
| :--: | :--: | :--: |
| <img width="1920" height="963" alt="Captura de Tela 2026-05-02 às 17 26 38" src="https://github.com/user-attachments/assets/edd48618-0429-4bde-b5d9-27e4e81752c2" /> | <img width="1920" height="963" alt="Captura de Tela 2026-05-02 às 17 28 54" src="https://github.com/user-attachments/assets/95e73380-0a54-438c-8876-0d41db9a1867" /> | <img width="1920" height="963" alt="Captura de Tela 2026-05-02 às 17 27 00" src="https://github.com/user-attachments/assets/be22d117-02c4-4615-8556-c06411721c76" /> |

## URL

[[portfolio-os.dev](https://portfolio-os.dev)](https://matheusduartedevs.github.io/matheus-dev/)

## O que o projeto é

O projeto foi concebido para funcionar como um único app com duas leituras complementares da mesma trajetória profissional:

- **Desktop:** um shell navegável com metáfora de sistema operacional, onde partes do portfólio são apresentadas como apps internos.
- **Mobile:** uma visão simplificada da trajetória profissional, com foco em leitura rápida, clareza e acesso direto às informações principais.

As duas experiências compartilham a mesma base de conteúdo local tipado, evitando duplicação estrutural e mantendo consistência entre plataformas.

## Princípios de implementação

O projeto segue alguns princípios técnicos:

- uma única fonte de conteúdo compartilhada entre desktop e mobile;
- estado global centralizado apenas quando realmente transversal;
- conteúdo local tipado fora de store;
- uso de composables para comportamentos focados;
- temas aplicados globalmente por tokens semânticos;
- evolução incremental, com mudanças pequenas, revisáveis e isoladas;
- manutenção do app sempre executável ao fim de cada etapa.

## Stack

- Vue 3
- TypeScript
- Vite
- Tailwind CSS v4
- CSS customizado com tokens semânticos para temas
- Pinia

## Instalação

### Pré-requisitos

- Node.js `^20.19.0 || >=22.12.0`
- npm

### Passos

```bash
npm install
```

```bash
npm run dev
```

Após iniciar o servidor, abra a URL exibida pelo Vite no terminal, normalmente:

```bash
http://localhost:5173
```

## Scripts disponíveis

```bash
npm run dev
```

Inicia o ambiente de desenvolvimento com Vite.

```bash
npm run build
```

Gera a build de produção e executa a checagem de tipos.
