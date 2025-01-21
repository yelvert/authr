import { createContext, useContext, ComponentType, FunctionComponent, PropsWithChildren, useState, useEffect } from 'react'
import useAsync from '@shared/utils/useAsync'
import AuthrApiClient, { CurrentUserUpdateErrors, CurrentUserUpdatePayload } from '@sdk'
import useRepeatableAsync, { TUseRepeatableAsync } from '@shared/utils/useRepeatableAsync'
import { isEmpty } from 'lodash'

export interface ICurrentUserInfo {
  id : number
  name : string
  username : string
}

export interface ICurrentUserContext {
  info : ICurrentUserInfo
  update : TUseRepeatableAsync<ICurrentUserInfo, [userData : CurrentUserUpdatePayload['current_user']], CurrentUserUpdateErrors | null>
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
  const [info, setInfo] = useState<ICurrentUserInfo>({} as ICurrentUserInfo)
  const userReq = useAsync(() => AuthrApiClient.currentUser.whoami())
  useEffect(() => {userReq.value?.data && setInfo(userReq.value?.data)}, [userReq.value])
  const update : ICurrentUserContext['update'] = useRepeatableAsync((userData) => {
    if (update.loading) return Promise.reject()
    return AuthrApiClient.currentUser.currentUserUpdate({current_user: userData})
      .then(res => { setInfo(res.data); return res.data })
      .catch(res => Promise.reject(res?.error))
  }, [])
  
  const Loading = loadingRender || (() => "Loading")
  if (isEmpty(info)) return <Loading />

  const Error = errorRender || (() => "Failed to load current user")
  if (userReq.error) return <Error />
  
  const ctx : ICurrentUserContext = {
    info: info!,
    update,
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
