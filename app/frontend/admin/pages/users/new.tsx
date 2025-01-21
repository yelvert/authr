import { FunctionComponent, useCallback } from "react"
import { Spinner } from "react-bootstrap"
import AuthrApiClient, { UsersCreatePayload } from "@sdk"
import useRepeatableAsync from "@shared/utils/useRepeatableAsync"
import useGrowl from "@shared/Growl"
import UserForm from "./form"
import { useLocation, useMatch, useNavigate } from "react-router"

export const UserNew : FunctionComponent = () => {
  const growl = useGrowl()
  const navigate = useNavigate()
  const create = useRepeatableAsync((userData : UsersCreatePayload['user']) => {
    if (create.loading) return Promise.reject()
    return AuthrApiClient.admin.usersCreate({user: userData}).then(res => {
      growl.add({ type: 'success', content: 'User updated successfully' })
      navigate('/users')
      return res
    }).catch(res => {
      if (res.status && res.error) {
        growl.add({ type: 'danger', content: 'Update update failed' })
      }
      return res
    })
  }, [])

  const submitHandler = useCallback((userData : Partial<UsersCreatePayload['user']>) => { create.call(userData as UsersCreatePayload['user']) }, [create.call])

  if (create.loading) return <div className="d-flex justify-content-center">
    <Spinner animation="grow" variant="light" style={{width: '10rem', height: '10rem'}} />
  </div>

  const userData = create.value?.data ?? {}

  return <UserForm user={userData!} errors={create.value?.error} onSubmit={submitHandler} />
}

export default UserNew
