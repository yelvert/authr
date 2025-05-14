import { createContext, useContext, ComponentType, FunctionComponent, PropsWithChildren, useState, useEffect } from 'react'
import isEmpty from 'lodash/isEmpty'
import { type EnvironmentSettingsResponse } from '@sdk'
import { getDataElement } from '@shared/utils/getDataElement'

export interface IEnvironmentSettingsContext extends EnvironmentSettingsResponse {}

/* @ts-expect-error null */
export const EnvironmentSettingsContext = createContext<IEnvironmentSettingsContext>(null)
export const EnvironmentSettingsProvider = EnvironmentSettingsContext.Provider
export const EnvironmentSettingsConsumer = EnvironmentSettingsContext.Consumer

export interface IEnvironmentSettingsProps {
  errorRender ?: ComponentType
}

export const EnvironmentSettings : FunctionComponent<PropsWithChildren<IEnvironmentSettingsProps>> = ({ children, errorRender }) => {
  const [ctx] = useState(getDataElement<EnvironmentSettingsResponse>('environment-settings-data'))
  const Error = errorRender || (() => "Failed to load Environment Settings")
  if (isEmpty(ctx)) return <Error />
  return <EnvironmentSettingsProvider value={ctx}>
    { children }
  </EnvironmentSettingsProvider>
}

export const withEnvironmentSettings =
  (WrappedComponent : ComponentType): FunctionComponent<IEnvironmentSettingsProps> =>
  ({...props}) : ReturnType<FunctionComponent> => (
    <EnvironmentSettings {...props}>
      <WrappedComponent />
    </EnvironmentSettings>
  )

export const useEnvironmentSettings : () => IEnvironmentSettingsContext = () => useContext(EnvironmentSettingsContext)

export default useEnvironmentSettings
