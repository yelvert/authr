import { FunctionComponent, useCallback } from "react"
import { Spinner } from "react-bootstrap"
import AuthrApiClient, { UserResponse, UsersUpdatePayload } from "@sdk"
import useRepeatableAsync from "@app/shared/utils/useRepeatableAsync"
import useGrowl from "@app/shared/Growl"
import UserForm from "./form"

export interface IUserDetailProps {
  user : UserResponse
}

export const UserDetails : FunctionComponent<IUserDetailProps> = ({ user }) => {
  const growl = useGrowl()
  const update = useRepeatableAsync((userData : UsersUpdatePayload['user']) => {
    if (update.loading) return Promise.reject()
    return AuthrApiClient.admin.usersUpdate(user.id, {user: userData}).then(res => {
      growl.add({ type: 'success', content: 'User updated successfully' })
      return res
    }).catch(res => {
      if (res.status && res.error) growl.add({ type: 'danger', content: 'Update update failed' })
      return res
    })
  }, [user.id])

  const submitHandler = useCallback((userData : UsersUpdatePayload['user']) => { update.call(userData) }, [update.call])

  if (update.loading) return <div className="d-flex justify-content-center">
    <Spinner animation="grow" variant="light" style={{width: '10rem', height: '10rem'}} />
  </div>

  const userData = update.value?.data ?? user

  return <UserForm user={userData!} errors={update.value?.error} onSubmit={submitHandler} />
}

export default UserDetails
