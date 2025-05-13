import { createContext, useContext, ComponentType, FunctionComponent, PropsWithChildren, useState, useEffect, useCallback } from 'react'

export const LightSvg = <svg fill="black" height="25" width="25" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 207.628 207.628" xmlSpace="preserve">
  <circle cx="103.814" cy="103.814" r="45.868"/>
  <path d="M103.814,157.183c-29.427,0-53.368-23.941-53.368-53.368s23.941-53.368,53.368-53.368s53.368,23.941,53.368,53.368  S133.241,157.183,103.814,157.183z M103.814,65.446c-21.156,0-38.368,17.212-38.368,38.368s17.212,38.368,38.368,38.368  s38.368-17.212,38.368-38.368S124.97,65.446,103.814,65.446z"/>
  <path d="M103.814,39.385c-4.142,0-7.5-3.358-7.5-7.5V7.5c0-4.142,3.358-7.5,7.5-7.5s7.5,3.358,7.5,7.5v24.385  C111.314,36.027,107.956,39.385,103.814,39.385z"/>
  <path d="M103.814,207.628c-4.142,0-7.5-3.358-7.5-7.5v-24.385c0-4.142,3.358-7.5,7.5-7.5s7.5,3.358,7.5,7.5v24.385  C111.314,204.271,107.956,207.628,103.814,207.628z"/>
  <path d="M200.128,111.314h-24.385c-4.142,0-7.5-3.358-7.5-7.5s3.358-7.5,7.5-7.5h24.385c4.142,0,7.5,3.358,7.5,7.5  S204.271,111.314,200.128,111.314z"/>
  <path d="M31.885,111.314H7.5c-4.142,0-7.5-3.358-7.5-7.5s3.358-7.5,7.5-7.5h24.385c4.142,0,7.5,3.358,7.5,7.5  S36.027,111.314,31.885,111.314z"/>
  <path d="M154.676,60.452c-1.919,0-3.839-0.732-5.303-2.197c-2.929-2.929-2.929-7.678,0-10.606l17.243-17.242  c2.929-2.929,7.678-2.93,10.606,0c2.929,2.929,2.929,7.678,0,10.606l-17.243,17.242C158.515,59.72,156.595,60.452,154.676,60.452z"/>
  <path d="M35.709,179.419c-1.919,0-3.839-0.732-5.303-2.197c-2.929-2.929-2.929-7.678,0-10.606l17.243-17.243  c2.929-2.929,7.678-2.929,10.606,0c2.929,2.929,2.929,7.678,0,10.606l-17.243,17.243C39.548,178.687,37.629,179.419,35.709,179.419z  "/>
  <path d="M171.918,179.419c-1.919,0-3.839-0.732-5.303-2.197l-17.243-17.243c-2.929-2.929-2.929-7.678,0-10.606  c2.929-2.929,7.678-2.929,10.606,0l17.243,17.243c2.929,2.929,2.929,7.678,0,10.606  C175.757,178.687,173.838,179.419,171.918,179.419z"/>
  <path d="M52.952,60.452c-1.919,0-3.839-0.732-5.303-2.197L30.406,41.013c-2.929-2.929-2.929-7.677,0-10.606  c2.929-2.929,7.678-2.93,10.606,0l17.243,17.242c2.929,2.929,2.929,7.677,0,10.606C56.791,59.72,54.872,60.452,52.952,60.452z"/>
</svg>

export const DarkSvg = <svg width="25" height="25" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 11.5373 21.3065 11.4608 21.0672 11.8568C19.9289 13.7406 17.8615 15 15.5 15C11.9101 15 9 12.0899 9 8.5C9 6.13845 10.2594 4.07105 12.1432 2.93276C12.5392 2.69347 12.4627 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"/>
</svg>

export const LIGHT = 'light'
export const DARK = 'dark'
export type TLightDarkMode = typeof LIGHT | typeof DARK
export interface ILightDarkModeContext {
  value : TLightDarkMode
  set : (TLightDarkMode) => void
  toggle : () => void
}

const initial = (localStorage.getItem('light_dark_mode') as TLightDarkMode) || LIGHT

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
  const toggle = useCallback(() => {
    set(prev => prev == LIGHT ? DARK : LIGHT)
  }, [set])
  return <LightDarkModeProvider value={{value, set, toggle}}>
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
  return <span
    style={{cursor: 'pointer'}}
    onClick={() => lightDarkMode.toggle()}
  >
    { lightDarkMode.value == DARK ? DarkSvg : LightSvg }
  </span>
}
