import type { PortfolioResume } from '@/types/portfolio'

export const getResumeOpenHref = (resume: PortfolioResume) => resume.publicPath

export const getResumeDownloadHref = (resume: PortfolioResume) => resume.publicPath
