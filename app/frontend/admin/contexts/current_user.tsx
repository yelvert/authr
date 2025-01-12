import { createContext, useContext, ComponentType, FunctionComponent, PropsWithChildren } from 'react'
import useAsync from '@app/shared/utils/useAsync'
import AuthrApiClient from '@sdk'

export interface ICurrentUserInfo {
  id : number
  name : string
  username : string
}

export interface ICurrentUserContext {
  info : ICurrentUserInfo
}

/* @ts-expect-error null */
export const CurrentUserContext = createContext<ICurrentUserContext>(null)
export const CurrentUserProvider = CurrentUserContext.Provider
export const CurrentUserConsumer = CurrentUserContext.Consumer

export interface ICurrentUserProps {
  loadingRender ?: ComponentType
  errorRender ?: ComponentType
}

export const CurrentUser : FunctionComponent<PropsWithChildren<ICurrentUserProps>> = ({ children, loadingRender, errorRender }) => {
  const userReq = useAsync(() => AuthrApiClient.currentUser.whoami())
  
  const Loading = loadingRender || (() => "Loading")
  if (userReq.loading) return <Loading />

  const Error = errorRender || (() => "Failed to load current user")
  if (userReq.error) return <Error />
  
  const ctx : ICurrentUserContext = {
    info: userReq.value!.data
  }
  
  return <CurrentUserProvider value={ctx}>
    { children }
  </CurrentUserProvider>
}

export const withCurrentUser =
  (WrappedComponent : ComponentType): FunctionComponent<ICurrentUserProps> =>
  ({...props}) : ReturnType<FunctionComponent> => (
    <CurrentUser {...props}>
      <WrappedComponent />
    </CurrentUser>
  )

export const useCurrentUser : () => ICurrentUserContext = () => useContext(CurrentUserContext)

export default useCurrentUser
