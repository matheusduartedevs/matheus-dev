import type { PortfolioContent } from '@/types/portfolio'
import type {
  TerminalCommandContext,
  TerminalCommandDefinition,
  TerminalCommandResult,
  TerminalEntryTone,
} from '@/types/terminal'

const print = (
  lines: string[],
  tone: Exclude<TerminalEntryTone, 'input'> = 'output',
): TerminalCommandResult => ({
  type: 'print',
  tone,
  lines,
})

const joinInline = (items: string[]) => items.filter(Boolean).join(' · ')

const getCommandLabel = (command: TerminalCommandDefinition) => {
  const aliases = command.aliases?.slice(0, 2) ?? []
  return aliases.length ? `${command.name} (${aliases.join(', ')})` : command.name
}

const getContentSection = (content: PortfolioContent, target: string) => {
  const normalizedTarget = target.toLowerCase()

  if (normalizedTarget === 'about') {
    return [content.name, content.title, content.summary]
  }

  if (normalizedTarget === 'experience') {
    return content.experience
      .flatMap((entry) => [
        `${entry.role} - ${entry.company}`,
        `${entry.period}`,
        `${entry.summary}`,
        `Destaques: ${joinInline(entry.highlights.slice(0, 4))}`,
        '',
      ])
      .slice(0, -1)
  }

  if (normalizedTarget === 'projects') {
    return content.projects
      .flatMap((project) => [
        `${project.name} (${project.year})`,
        `${project.role}`,
        `${project.summary}`,
        '',
      ])
      .slice(0, -1)
  }

  if (normalizedTarget === 'skills') {
    return ['Habilidades:', ...content.skills.map((skill) => `- ${skill.value}`)]
  }

  if (normalizedTarget === 'education') {
    return content.education
      .flatMap((entry) => [
        `${entry.program} - ${entry.institution}`,
        `${entry.period}`,
        `${entry.summary}`,
        '',
      ])
      .slice(0, -1)
  }

  if (normalizedTarget === 'certifications') {
    return content.certifications
      .flatMap((certification) => [
        `${certification.name} - ${certification.issuer} (${certification.year})`,
        `${certification.summary}`,
        '',
      ])
      .slice(0, -1)
  }

  if (normalizedTarget === 'languages') {
    return content.languages.map((language) =>
      [language.name, language.level, language.detail].filter(Boolean).join(' · '),
    )
  }

  if (normalizedTarget === 'contact') {
    return content.contacts.map((contact) => `${contact.label}: ${contact.value}`)
  }

  if (normalizedTarget === 'resume') {
    return [content.resume.label, content.resume.href]
  }

  return null
}

const createCommandList = (): TerminalCommandDefinition[] => [
  {
    name: 'help',
    aliases: ['ajuda'],
    description: 'Lista os comandos disponíveis no terminal.',
    usage: 'help',
    execute: ({ commands }) =>
      print(
        [
          'Comandos disponíveis:',
          ...commands.map((command) => `${getCommandLabel(command)} - ${command.description}`),
        ],
        'system',
      ),
  },
  {
    name: 'whoami',
    aliases: ['quem-sou-eu'],
    description: 'Mostra identidade, foco e stack principal.',
    usage: 'whoami',
    execute: ({ content }) =>
      print([
        content.name,
        content.title,
        `Foco: ${content.metrics[0]?.value ?? 'Engenharia front-end'}`,
        `Stack principal: ${joinInline(content.skills.slice(0, 6).map((skill) => skill.value))}`,
      ]),
  },
  {
    name: 'about',
    aliases: ['sobre-mim'],
    description: 'Mostra um resumo profissional.',
    usage: 'about',
    execute: ({ content }) => print([content.name, content.title, content.summary]),
  },
  {
    name: 'projects',
    aliases: ['projetos'],
    description: 'Lista os projetos selecionados.',
    usage: 'projects',
    execute: ({ content }) =>
      print(
        content.projects
          .flatMap((project) => [
            `${project.name} (${project.year})`,
            `${project.role}`,
            `${project.summary}`,
            '',
          ])
          .slice(0, -1),
      ),
  },
  {
    name: 'experience',
    aliases: ['experiencias'],
    description: 'Mostra as experiências profissionais.',
    usage: 'experience',
    execute: ({ content }) =>
      print(
        content.experience
          .flatMap((entry) => [
            `${entry.role} - ${entry.company}`,
            `${entry.period}`,
            `${entry.summary}`,
            `Destaques: ${joinInline(entry.highlights.slice(0, 3))}`,
            '',
          ])
          .slice(0, -1),
      ),
  },
  {
    name: 'skills',
    aliases: ['habilidades'],
    description: 'Mostra as principais habilidades técnicas.',
    usage: 'skills',
    execute: ({ content }) =>
      print(['Habilidades:', ...content.skills.map((skill) => `- ${skill.value}`)]),
  },
  {
    name: 'education',
    aliases: ['formacao'],
    description: 'Mostra formação acadêmica.',
    usage: 'education',
    execute: ({ content }) =>
      print(
        content.education
          .flatMap((entry) => [
            `${entry.program} - ${entry.institution}`,
            `${entry.period}`,
            `${entry.summary}`,
            '',
          ])
          .slice(0, -1),
      ),
  },
  {
    name: 'certifications',
    aliases: ['certificados'],
    description: 'Lista certificações e provas relevantes.',
    usage: 'certifications',
    execute: ({ content }) =>
      print(
        content.certifications
          .flatMap((certification) => [
            `${certification.name} - ${certification.issuer} (${certification.year})`,
            `${certification.summary}`,
            '',
          ])
          .slice(0, -1),
      ),
  },
  {
    name: 'languages',
    aliases: ['idiomas'],
    description: 'Mostra idiomas e nível de proficiência.',
    usage: 'languages',
    execute: ({ content }) =>
      print(
        content.languages.map((language) =>
          [language.name, language.level, language.detail].filter(Boolean).join(' · '),
        ),
      ),
  },
  {
    name: 'contact',
    aliases: ['contato'],
    description: 'Mostra os canais de contato.',
    usage: 'contact',
    execute: ({ content }) =>
      print(content.contacts.map((contact) => `${contact.label}: ${contact.value}`)),
  },
  {
    name: 'resume',
    aliases: ['curriculo'],
    description: 'Mostra o caminho do currículo.',
    usage: 'resume',
    execute: ({ content }) => print([content.resume.label, content.resume.href], 'system'),
  },
  {
    name: 'ls',
    aliases: ['ls', 'dir'],
    description: 'Lista as seções navegáveis do terminal.',
    usage: 'ls',
    execute: () =>
      print(
        [
          'about',
          'experience',
          'projects',
          'skills',
          'education',
          'certifications',
          'languages',
          'contact',
          'resume',
        ],
        'system',
      ),
  },
  {
    name: 'cat',
    aliases: ['cat'],
    description: 'Abre uma seção específica. Ex.: cat projects',
    usage: 'cat <section>',
    execute: ({ content, args }) => {
      const target = args[0]?.toLowerCase()

      if (!target) {
        return print(
          ['Uso: cat <about|experience|projects|skills|education|certifications|languages|contact|resume>'],
          'error',
        )
      }

      const section = getContentSection(content, target)

      if (!section) {
        return print([`Seção não encontrada: ${target}`, 'Tente: ls'], 'error')
      }

      return print(section)
    },
  },
  {
    name: 'pwd',
    aliases: ['pwd'],
    description: 'Mostra o diretório simbólico atual.',
    usage: 'pwd',
    execute: () => print(['/Users/matheus/portfolio-os/terminal'], 'system'),
  },
  {
    name: 'clear',
    aliases: ['limpar'],
    description: 'Limpa o histórico de saída do terminal.',
    usage: 'clear',
    execute: () => ({ type: 'clear' }),
  },
]

export const getTerminalCommands = (_content: PortfolioContent) => createCommandList()

export const findTerminalCommand = (
  commands: TerminalCommandDefinition[],
  rawInput: string,
) => {
  const normalizedInput = rawInput.trim().toLowerCase().split(/\s+/)[0] ?? ''

  return commands.find((command) => {
    const aliases = command.aliases ?? []
    return command.name === normalizedInput || aliases.includes(normalizedInput)
  })
}

export const executeTerminalCommand = (
  commands: TerminalCommandDefinition[],
  content: PortfolioContent,
  rawInput: string,
) => {
  const normalizedInput = rawInput.trim()
  const [commandName, ...args] = normalizedInput.split(/\s+/)
  const command = findTerminalCommand(commands, commandName ?? '')

  if (!command) {
    return print(
      [
        `Comando não encontrado: ${normalizedInput}`,
        'Digite "help" para ver os comandos disponíveis.',
      ],
      'error',
    )
  }

  const context: TerminalCommandContext = {
    content,
    commands,
    rawInput: normalizedInput,
    args,
  }

  return command.execute(context)
}
