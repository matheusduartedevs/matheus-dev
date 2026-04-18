import type { PortfolioContent } from '@/types/portfolio'

export const portfolioContent: PortfolioContent = {
  name: 'Matheus Duarte da Silva',
  title:
    'Desenvolvedor Front-end focado em produtos digitais, performance e fluxos críticos de conversão',
  summary:
    'Desenvolvedor Front-end com experiência em produtos digitais de grande escala, atuando em fluxos críticos de vendas e checkout com foco em performance, SEO, segurança e confiabilidade. Experiência sólida com JavaScript, TypeScript, Vue.js, Nuxt, React e integrações com APIs em ambientes Node.js.',
  desktopIntro:
    'A experiência desktop evolui para uma metáfora de sistema operacional, onde navegador, terminal e explorador de arquivos funcionam como diferentes formas de navegar pela minha trajetória, projetos e currículo.',
  mobileIntro:
    'Acesse esse portfólio em um desktop para uma experiência completa :)',
  metrics: [
    { label: 'Foco', value: 'Checkout, vendas e confiabilidade de produto' },
    { label: 'Força', value: 'Performance, SEO e qualidade de código' },
    { label: 'Stack', value: 'TypeScript, Vue/Nuxt, React e Node.js' },
  ],
  projects: [
    {
      name: 'Migração Nuxt 2 → Nuxt 4',
      summary:
        'Atuação na migração de um projeto legado em Nuxt 2 para Nuxt 4, contribuindo para a modernização da stack, definição de arquitetura de monólito modular e melhoria contínua de performance.',
      role: 'Desenvolvimento front-end, apoio arquitetural',
      year: '2026',
    },
    {
      name: 'Fluxos Críticos de Checkout',
      summary:
        'Desenvolvimento e manutenção de fluxos críticos de vendas e checkout, garantindo estabilidade, confiabilidade e qualidade em produção em um dos principais canais do negócio.',
      role: 'Desenvolvimento front-end, implementação de fluxos',
      year: '2024–2026',
    },
    {
      name: 'SEO Técnico e Estruturação de Schema',
      summary:
        'Implementação completa de SEO técnico e schema estruturado para uma nova rede credenciada, melhorando indexação, semântica e performance orgânica.',
      role: 'SEO técnico, desenvolvimento front-end',
      year: '2025',
    },
  ],
  experience: [
    {
      company: 'Petlove',
      role: 'Desenvolvedor Front-end Júnior',
      period: 'Jan 2026 - Atual',
      summary:
        'Atuação em fluxos críticos de vendas e checkout no principal canal da BU de Saúde, com foco em estabilidade, performance e confiabilidade em produção.',
      highlights: [
        'Participação na migração de Nuxt 2 para Nuxt 4',
        'Contribuição na definição de arquitetura de monólito modular',
        'Implementação e manutenção de testes E2E',
        'Evolução de tagueamento com Google Tag Manager',
        'Colaboração com Produto, Design e QA',
        'Manutenção corretiva e evolutiva com foco em qualidade de código',
      ],
    },
    {
      company: 'Petlove',
      role: 'Desenvolvedor Front-end Estagiário',
      period: 'Ago 2024 - Dez 2025',
      summary:
        'Atuação no maior canal de vendas da BU de Saúde, desenvolvendo features críticas com foco em performance, escalabilidade e conversão.',
      highlights: [
        'Desenvolvimento de fluxos críticos como checkout',
        'Implementação de testes A/B',
        'Criação de schema SEO completo',
        'Atuação em arquitetura de microfrontend',
        'Correção de vulnerabilidades críticas (GitHub Security)',
        'Análise e resolução de erros em produção (Honeybadger)',
        'Refatoração de código legado',
      ],
    },
  ],
  skills: [
    {
      title: 'Base front-end',
      items: [
        { value: 'JavaScript (ES6+)' },
        { value: 'TypeScript' },
        { value: 'SEO Técnico' },
        { value: 'Web Performance' },
        { value: 'Testes A/B' },
      ],
    },
    {
      title: 'Frameworks e ecossistema',
      items: [{ value: 'Vue.js' }, { value: 'Nuxt.js' }, { value: 'React' }, { value: 'Next.js' }],
    },
    {
      title: 'Back-end e dados',
      items: [
        { value: 'Node.js' },
        { value: 'Express' },
        { value: 'REST APIs' },
        { value: 'SQL' },
        { value: 'MongoDB' },
      ],
    },
    {
      title: 'Arquitetura e entrega',
      items: [
        { value: 'Microfrontends' },
        { value: 'Monólito Modular' },
        { value: 'Integração com microservices' },
        { value: 'GitHub Actions (CI/CD)' },
        { value: 'Google Cloud Platform' },
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
