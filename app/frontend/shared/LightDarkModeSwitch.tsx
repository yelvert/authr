import { createContext, useContext, ComponentType, FunctionComponent, PropsWithChildren, useState, useEffect, useCallback } from 'react'
import { DarkModeSwitch } from 'react-toggle-dark-mode'

export type TLightDarkMode = 'light' | 'dark'
export interface ILightDarkModeContext {
  value : TLightDarkMode
  set : (TLightDarkMode) => void
}

const initial = (localStorage.getItem('light_dark_mode') as TLightDarkMode) || 'light'

/* @ts-expect-error null */
export const LightDarkModeContext = createContext<ILightDarkModeContext>(null)
export const LightDarkModeProvider = LightDarkModeContext.Provider
export const LightDarkModeConsumer = LightDarkModeContext.Consumer

export const LightDarkMode : FunctionComponent<PropsWithChildren<Record<never, never>>> = ({ children }) => {
  const [value, set] = useState<TLightDarkMode>(initial)
  useEffect(() => {
    localStorage.setItem('light_dark_mode', value)
    document.body.setAttribute('data-bs-theme', value)
  }, [value])
  return <LightDarkModeProvider value={{value, set}}>
    { children }
  </LightDarkModeProvider>
}

export const withLightDarkMode =
  (WrappedComponent : ComponentType): FunctionComponent<Record<never, never>> =>
  ({...props}) : ReturnType<FunctionComponent> => (
    <LightDarkMode {...props}>
      <WrappedComponent />
    </LightDarkMode>
  )

export const useLightDarkMode : () => ILightDarkModeContext = () => useContext(LightDarkModeContext)

export default useLightDarkMode

export const LightDarkModeSwitch : FunctionComponent = () => {
  const lightDarkMode = useLightDarkMode()
  const toggleDarkMode = useCallback((checked: boolean) => {
    lightDarkMode.set(checked ? 'dark' : 'light');
  }, [lightDarkMode.set])
  return <DarkModeSwitch
    checked={lightDarkMode.value == 'dark'}
    onChange={toggleDarkMode}
    size={25}
  />
}
