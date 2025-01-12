import { FunctionComponent, useCallback } from "react"
import { Spinner } from "react-bootstrap"
import AuthrApiClient, { UsersUpdatePayload } from "@sdk"
import useAsync from "@app/shared/utils/useAsync"
import useRepeatableAsync from "@app/shared/utils/useRepeatableAsync"
import useGrowl from "@app/shared/Growl"
import UserForm from "./form"

export interface IUserDetailProps {
  userId : number
}

export const UserDetails : FunctionComponent<IUserDetailProps> = ({ userId }) => {
  const userReq = useAsync(() => AuthrApiClient.admin.usersDetail(userId))
  const growl = useGrowl()
  const update = useRepeatableAsync((userData : UsersUpdatePayload['user']) => {
    if (update.loading) return Promise.reject()
    return AuthrApiClient.admin.usersUpdate(userId, {user: userData}).then(res => {
      growl.add({ type: 'success', content: 'User updated successfully' })
      return res
    }).catch(res => {
      if (res.status && res.error) {
        growl.add({ type: 'danger', content: 'Update update failed' })
      }
      return res
    })
  }, [userId])

  const submitHandler = useCallback((userData : UsersUpdatePayload['user']) => { update.call(userData) }, [update.call])

  if (userReq.loading || update.loading) return <div className="d-flex justify-content-center">
    <Spinner animation="grow" variant="light" style={{width: '10rem', height: '10rem'}} />
  </div>

  if (userReq.error) return <div className="d-flex justify-content-center">
    Error loading User: { userId }, reload and try again.
  </div>

const userData = update.value?.data ?? userReq.value?.data ?? {}

  return <UserForm user={userData!} errors={update.value?.error} onSubmit={submitHandler} />
}

export default UserDetails
