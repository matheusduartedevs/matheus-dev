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

const createCommandList = (): TerminalCommandDefinition[] => [
  {
    name: 'help',
    aliases: ['ajuda'],
    description: 'Lista os comandos disponíveis no terminal.',
    execute: ({ commands }) =>
      print(
        [
          'Comandos disponíveis:',
          ...commands.map((command) => `${command.name} - ${command.description}`),
        ],
        'system',
      ),
  },
  {
    name: 'about',
    aliases: ['sobre-mim'],
    description: 'Mostra um resumo profissional.',
    execute: ({ content }) => print([content.name, content.title, content.summary]),
  },
  {
    name: 'projects',
    aliases: ['projetos'],
    description: 'Lista os projetos selecionados.',
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
    execute: ({ content }) =>
      print(['Habilidades:', ...content.skills.map((skill) => `- ${skill.value}`)]),
  },
  {
    name: 'contact',
    aliases: ['contacts', 'contato'],
    description: 'Mostra os canais de contato.',
    execute: ({ content }) =>
      print(content.contacts.map((contact) => `${contact.label}: ${contact.value}`)),
  },
  {
    name: 'resume',
    aliases: ['curriculo'],
    description: 'Mostra o caminho do currículo.',
    execute: ({ content }) => print([content.resume.label, content.resume.href], 'system'),
  },
  {
    name: 'clear',
    aliases: ['limpar'],
    description: 'Limpa o histórico de saída do terminal.',
    execute: () => ({ type: 'clear' }),
  },
]

export const getTerminalCommands = (_content: PortfolioContent) => createCommandList()

export const findTerminalCommand = (
  commands: TerminalCommandDefinition[],
  rawInput: string,
) => {
  const normalizedInput = rawInput.trim().toLowerCase()

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
  const command = findTerminalCommand(commands, rawInput)

  if (!command) {
    return print(
      [
        `Comando não encontrado: ${rawInput.trim()}`,
        'Digite "help" para ver os comandos disponíveis.',
      ],
      'error',
    )
  }

  const context: TerminalCommandContext = {
    content,
    commands,
  }

  return command.execute(context)
}
