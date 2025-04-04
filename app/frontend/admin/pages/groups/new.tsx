import { FunctionComponent, useCallback } from "react"
import { Spinner } from "react-bootstrap"
import AuthrApiClient, { GroupsCreatePayload } from "@sdk"
import useRepeatableAsync from "@shared/utils/useRepeatableAsync"
import useGrowl from "@shared/Growl"
import GroupForm from "./form"
import { useNavigate } from "react-router"

export const GroupNew : FunctionComponent = () => {
  const growl = useGrowl()
  const navigate = useNavigate()
  const create = useRepeatableAsync((groupData : GroupsCreatePayload['group']) => {
    if (create.loading) return Promise.reject()
    return AuthrApiClient.admin.groupsCreate({group: groupData}).then(res => {
      growl.add({ type: 'success', content: 'Group updated successfully' })
      navigate('/groups')
      return res
    }).catch(res => {
      if (res.status && res.error) {
        growl.add({ type: 'danger', content: 'Update update failed' })
      }
      return res
    })
  }, [])

  const submitHandler = useCallback((groupData : Partial<GroupsCreatePayload['group']>) => { create.call(groupData as GroupsCreatePayload['group']) }, [create.call])

  if (create.loading) return <div className="d-flex justify-content-center">
    <Spinner animation="grow" variant="light" style={{width: '10rem', height: '10rem'}} />
  </div>

  const groupData = create.value?.data ?? {}

  return <GroupForm group={groupData!} errors={create.value?.error} onSubmit={submitHandler} />
}

export default GroupNew
