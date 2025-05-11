import {createGitHubReader} from '@keystatic/core/reader/github'
import keystaticConfig from '../../keystatic.config'

export const keystaticReader = (locals: App.Locals) => {
  const {env} = locals.runtime

  return createGitHubReader(keystaticConfig, {
    repo: 'quiple/quiple.dev',
    token: env.GITHUB_PAT,
  })
}
