import type { PortfolioContent } from '@/types/portfolio'

export const portfolioContent: PortfolioContent = {
  name: 'Matheus Duarte da Silva',
  title:
    'Desenvolvedor Front-end focado em produtos digitais, arquitetura e fluxos críticos de conversão',
  summary:
    'Atuo em produtos digitais de grande escala, especialmente em jornadas de venda e checkout que exigem estabilidade, SEO, segurança, performance e confiabilidade em produção. Trabalho principalmente com TypeScript, Vue.js, Nuxt, React e integrações com APIs em ambientes Node.js.',
  about: {
    sections: [
      {
        title: 'O que eu faço',
        lines: [
          'Transformo fluxos complexos em interfaces claras, rápidas e confiáveis, atuando na interseção entre engenharia front-end, arquitetura e produto.',
          'Além da entrega de features, também tenho forte interesse em escalabilidade, organização de sistemas e Dev Experience — pensando em como tornar aplicações mais fáceis de evoluir, debugar, testar e manter no longo prazo.',
          'Gosto de trabalhar próximo de Produto, Design e QA para garantir que as decisões técnicas estejam alinhadas com impacto real no produto, comportamento do usuário e objetivos de negócio.',
          'Mais do que “entregar telas”, me interessa entender:',
          '- onde existe fricção na experiência,',
          '- quais riscos técnicos podem crescer com o tempo,',
          '- e como construir soluções que continuem sustentáveis conforme o produto evolui.',
        ],
      },
      {
        title: 'Trajetória',
        lines: [
          'Iniciei minha carreira como estagiário front-end, trabalhando diretamente em entregas reais de produto enquanto aprendia engenharia de software em ambientes de produção.',
          'Desde o começo da minha trajetória, atuei principalmente com JavaScript, TypeScript, Vue.js e Nuxt, participando da construção e evolução de aplicações focadas em performance, experiência do usuário e confiabilidade.',
          'Na Petlove, atuei em um dos principais canais da BU de Saúde, evoluindo fluxos críticos de venda e checkout com foco em conversão, estabilidade e manutenção de produção.',
          { text: 'Participei da evolução de produtos e iniciativas como:', tone: 'accent' },
          '- migração de aplicações de Nuxt 2 para Nuxt 4,',
          '- estruturação de arquitetura em monólito modular,',
          '- implementação de testes E2E para proteção de fluxos críticos,',
          '- melhorias de SEO técnico e schema estruturado,',
          '- rastreabilidade com Google Tag Manager,',
          '- correção de vulnerabilidades críticas,',
          '- e investigação de erros reais em produção utilizando observabilidade e monitoramento.',
          'Grande parte desse trabalho envolveu equilibrar velocidade de entrega com confiabilidade operacional em sistemas utilizados diariamente por milhares de usuários.',
        ],
      },
      {
        title: 'Forma de trabalho',
        lines: [
          'Busco construir interfaces e sistemas que continuem claros, previsíveis e sustentáveis mesmo conforme o produto cresce em complexidade, com atenção especial aos detalhes que normalmente aparecem depois do deploy: performance real, estados de erro, observabilidade, rastreabilidade, acessibilidade, SEO e manutenção de longo prazo.',
          'Também valorizo muito Dev Experience, documentação e organização arquitetural, buscando criar código e estruturas que outras pessoas consigam continuar evoluindo sem aumentar a complexidade do sistema.',
          'Tenho interesse especial em:',
          '- arquitetura front-end,',
          '- modularização,',
          '- confiabilidade,',
          '- escalabilidade,',
          '- observabilidade,',
          '- e engenharia de produto orientada a impacto.',
        ],
      },
      {
        title: 'Stack principal',
        lines: [
          {
            text: 'TypeScript, Vue.js, Nuxt, React, Next.js, Node.js',
            tone: 'success',
          },
        ],
      },
      {
        title: 'Agora',
        lines: [
          'Atualmente estou focado em amadurecer como engenheiro front-end, aprofundando conhecimentos em arquitetura de software, confiabilidade, escalabilidade e engenharia de produto.',
          'Meu objetivo é contribuir não apenas com entrega de features, mas também com decisões técnicas, evolução de sistemas, qualidade de desenvolvimento e construção de produtos sustentáveis no longo prazo.',
        ],
      },
    ],
    cta: '→ /projects para ver entregas selecionadas · /resume para abrir o currículo',
  },
  desktopIntro:
    'A experiência desktop evolui para uma metáfora de sistema operacional, onde navegador, terminal e explorador de arquivos funcionam como diferentes formas de navegar pela minha trajetória, projetos e currículo.',
  mobileIntro: 'Acesse esse portfólio em um desktop para uma experiência completa :)',
  metrics: [
    { label: 'Foco', value: 'Checkout, vendas e confiabilidade de produto' },
    { label: 'Força', value: 'Performance, SEO e qualidade de código' },
    { label: 'Stack', value: 'TypeScript, Vue/Nuxt, React e Node.js' },
  ],
  projects: [
    {
      name: 'Migração Nuxt 2 → Nuxt 4',
      summary:
        'Participação na migração de uma aplicação legado de Nuxt 2 para Nuxt 4, ajudando na modernização da stack, organização arquitetural e evolução gradual da base do projeto.',
      role: 'Front-end Architecture / Modernização de Stack',
      year: '2026',
      highlights: [
        'Apoio na transição para arquitetura de monólito modular',
        'Evolução da estrutura front-end visando escalabilidade e manutenção',
        'Melhorias contínuas de performance e Dev Experience',
        'Redução gradual de acoplamento em fluxos críticos',
        'Atuação em ambiente com múltiplas integrações e alto volume de negócio',
      ],
    },
    {
      name: 'Fluxos Críticos de Checkout',
      summary:
        'Desenvolvimento e manutenção de jornadas críticas de venda e checkout em um dos principais canais da BU de Saúde da Petlove.',
      role: 'Front-end Engineering / Product Flows',
      year: '2024–2026',
      highlights: [
        'Implementação de features com impacto direto em conversão',
        'Evolução de fluxos complexos focando estabilidade e experiência',
        'Correção de problemas em produção e análise de comportamento real do usuário',
        'Investigação de bugs e observabilidade utilizando Honeybadger e monitoramento',
        'Colaboração próxima com Produto, Design, QA e times cross',
      ],
    },
    {
      name: 'SEO Técnico & Estruturação de Schema',
      summary:
        'Implementação de estrutura completa de SEO técnico e schema estruturado para uma nova experiência de rede credenciada.',
      role: 'SEO Engineering / Front-end Performance',
      year: '2025',
      highlights: [
        'Definição de schemas semânticos para melhor indexação',
        'Melhoria da consistência estrutural para mecanismos de busca',
        'Apoio à performance orgânica e visibilidade do produto',
        'Integração do SEO técnico ao fluxo de desenvolvimento front-end',
      ],
    },
  ],
  experience: [
    {
      company: 'Petlove',
      role: 'Desenvolvedor Front-end Júnior',
      period: 'Jan 2026 - Atual',
      summary:
        'Atuação em produtos e fluxos críticos de venda e checkout no principal canal da BU de Saúde, com foco em confiabilidade, performance, manutenção de longo prazo e estabilidade em produção. Participação ativa na evolução arquitetural e técnica da aplicação, contribuindo para melhorias de escalabilidade, organização de código, observabilidade e experiência de desenvolvimento.',
      highlights: [
        'Migração gradual de aplicações de Nuxt 2 para Nuxt 4',
        'Contribuição na evolução para arquitetura de monólito modular',
        'Implementação e manutenção de testes E2E para proteção de fluxos críticos',
        'Investigação e resolução de problemas reais em produção',
        'Evolução de rastreabilidade, SEO técnico e qualidade operacional',
        'Colaboração próxima com Produto, Design, QA e times cross',
      ],
    },
    {
      company: 'Petlove',
      role: 'Desenvolvedor Front-end Estagiário',
      period: 'Ago 2024 - Dez 2025',
      summary:
        'Início da trajetória profissional atuando diretamente em entregas reais de produto dentro do maior canal de vendas da BU de Saúde. Participação no desenvolvimento e evolução de features críticas, trabalhando com foco em performance, experiência do usuário, estabilidade e conversão em ambientes de produção de alta escala.',
      highlights: [
        'Desenvolvimento e manutenção de fluxos críticos como checkout e jornadas de venda',
        'Implementação de testes A/B alinhados a objetivos de produto e conversão',
        'Estruturação completa de SEO técnico e schema para nova experiência de rede credenciada',
        'Participação em iniciativas de microfrontend e organização arquitetural',
        'Correção de vulnerabilidades críticas e manutenção de dependências',
        'Atuação em debugging, observabilidade e análise de erros em produção',
      ],
    },
  ],
  skills: [
    {
      title: 'Front-end',
      items: [
        { value: 'TypeScript e JavaScript moderno em aplicações de produto' },
        { value: 'Vue.js e Nuxt em interfaces críticas e fluxos transacionais' },
        { value: 'React e Next.js para construção de experiências web escaláveis' },
        { value: 'HTML semântico, acessibilidade e componentização de UI' },
        { value: 'Performance front-end, Core Web Vitals e otimização de carregamento' },
      ],
    },
    {
      title: 'Back-end e integrações',
      items: [
        { value: 'Node.js e Express para APIs, serviços e camadas de integração' },
        { value: 'Consumo e modelagem de integrações REST em ambientes distribuídos' },
        { value: 'SQL e MongoDB como base para leitura, persistência e investigação de dados' },
        { value: 'Integração com microservices e contratos entre front-end e back-end' },
      ],
    },
    {
      title: 'Mobile e experiência responsiva',
      items: [
        { value: 'Interfaces mobile-first para jornadas de compra e checkout' },
        { value: 'Adaptação de fluxos complexos para telas pequenas e interações touch' },
        { value: 'Atenção a estados de erro, carregamento, abandono e recuperação de fluxo' },
        { value: 'Consistência visual e funcional entre desktop, tablet e mobile web' },
      ],
    },
    {
      title: 'Arquitetura e qualidade',
      items: [
        { value: 'Monólito modular, microfrontends e redução gradual de acoplamento' },
        { value: 'Testes E2E para proteção de fluxos críticos de negócio' },
        { value: 'SEO técnico, schema estruturado e rastreabilidade com GTM' },
        { value: 'Observabilidade, investigação de bugs e análise de erros em produção' },
        { value: 'CI/CD com GitHub Actions e deploy em ambientes cloud' },
        { value: 'Dev Experience, documentação e organização de base legada' },
      ],
    },
  ],
  education: [
    {
      institution: 'FATEC Luigi Papaiz',
      program: 'Tecnólogo em Desenvolvimento de Software Multiplataforma',
      period: '2023 - 2025',
      summary:
        'Formação com foco em engenharia de software, arquitetura de sistemas, estruturas de dados, orientação a objetos, redes, estatística e matemática aplicada.',
    },
  ],
  certifications: [
    {
      name: 'TOEIC — Test of English for International Communication',
      issuer: 'TOEIC',
      year: '2025',
      summary: 'Pontuação: 860/990 (nível B2).',
    },
    {
      name: 'Cybersecurity Essentials',
      issuer: 'Cisco',
      year: '2023',
      summary:
        'Fundamentos de segurança da informação, redes, tipos de ataques, prevenção e princípios de confidencialidade, integridade e disponibilidade.',
    },
    {
      name: 'Full Stack JavaScript Developer',
      issuer: 'OneBitCode',
      year: '2023',
      summary:
        'Desenvolvimento full stack com JavaScript e TypeScript, incluindo Node.js, React, APIs REST, SQL e MongoDB.',
    },
  ],
  languages: [
    {
      name: 'Inglês',
      level: 'Avançado',
      detail: 'B2 — TOEIC 860/990',
    },
    {
      name: 'Português',
      level: 'Nativo',
    },
  ],
  contacts: [
    {
      label: 'Email',
      value: 'matheus.duartesilva42@gmail.com',
      href: 'mailto:matheus.duartesilva42@gmail.com',
    },
    {
      label: 'Localização',
      value: 'São Paulo, Brasil',
      href: '#',
    },
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/matheus-duarte-7bb04b266',
      href: 'https://www.linkedin.com/in/matheus-duarte-7bb04b266',
    },
    {
      label: 'GitHub',
      value: 'github.com/matheusduartedevs',
      href: 'https://github.com/matheusduartedevs',
    },
  ],
  resume: {
    label: 'Meu currículo',
    publicPath: '/documents/matheus-duarte-cv.pdf',
    downloadName: 'matheus-duarte-cv.pdf',
    sourceFilePath: 'public/documents/matheus-duarte-cv.pdf',
  },
}
