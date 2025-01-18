export interface IAuthrConfig {
  siteName: string
}

// @ts-expect-error
export const AuthrConfig : IAuthrConfig = window.AUTHR_CONFIG

export default AuthrConfig
