import type { PortfolioResume } from '@/types/portfolio'

const normalizePublicPath = (path: string) => path.replace(/^\/+/, '')
const normalizeBasePath = (path: string) => path.replace(/\/+$/, '')

const getResumeHref = (resume: PortfolioResume) =>
  `${normalizeBasePath(import.meta.env.BASE_URL)}/${normalizePublicPath(resume.publicPath)}`

export const getResumeOpenHref = (resume: PortfolioResume) => getResumeHref(resume)

export const getResumeDownloadHref = (resume: PortfolioResume) => getResumeHref(resume)

export const getResumeViewerHref = (resume: PortfolioResume) =>
  `${getResumeHref(resume)}#toolbar=0&navpanes=0&scrollbar=1`
