export type PortfolioMetric = {
  label: string
  value: string
}

export type PortfolioProject = {
  name: string
  summary: string
  role: string
  year: string
  highlights: string[]
}

export type PortfolioExperience = {
  company: string
  role: string
  period: string
  summary: string
  highlights: string[]
}

export type PortfolioSkill = {
  value: string
}

export type PortfolioSkillSection = {
  title: string
  items: PortfolioSkill[]
}

export type PortfolioEducation = {
  institution: string
  program: string
  period: string
  summary: string
}

export type PortfolioCertification = {
  name: string
  issuer: string
  year: string
  summary: string
}

export type PortfolioLanguage = {
  name: string
  level: string
  detail?: string
}

export type PortfolioContact = {
  label: string
  value: string
  href: string
}

export type PortfolioResume = {
  label: string
  publicPath: string
  downloadName: string
  sourceFilePath: string
}

export type PortfolioTextTone = 'default' | 'accent' | 'success' | 'muted'

export type PortfolioTextLine =
  | string
  | {
      text: string
      tone?: PortfolioTextTone
    }

export type PortfolioAboutSection = {
  title: string
  lines: PortfolioTextLine[]
}

export type PortfolioAbout = {
  sections: PortfolioAboutSection[]
  cta: string
}

export type PortfolioContent = {
  name: string
  title: string
  summary: string
  about: PortfolioAbout
  desktopIntro: string
  mobileIntro: string
  skills: PortfolioSkillSection[]
  metrics: PortfolioMetric[]
  projects: PortfolioProject[]
  experience: PortfolioExperience[]
  education: PortfolioEducation[]
  certifications: PortfolioCertification[]
  languages: PortfolioLanguage[]
  contacts: PortfolioContact[]
  resume: PortfolioResume
}
