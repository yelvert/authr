import { FunctionComponent, useCallback } from "react"
import { Spinner } from "react-bootstrap"
import AuthrApiClient, { GroupResponse, GroupsUpdatePayload } from "@sdk"
import useRepeatableAsync from "@shared/utils/useRepeatableAsync"
import useGrowl from "@shared/Growl"
import GroupForm from "./form"
import { useNavigate } from "react-router"

export interface IGroupDetailProps {
  group : GroupResponse
}

export const GroupDetails : FunctionComponent<IGroupDetailProps> = ({ group }) => {
  const growl = useGrowl()
  const navigate = useNavigate()
  const update = useRepeatableAsync((groupData : GroupsUpdatePayload['group']) => {
    if (update.loading) return Promise.reject()
    return AuthrApiClient.admin.groupsUpdate(group.id, {group: groupData}).then(res => {
      growl.add({ type: 'success', content: 'Group updated successfully' })
      navigate('/groups')
      return res
    }).catch(res => {
      if (res.status && res.error) growl.add({ type: 'danger', content: 'Update update failed' })
      return res
    })
  }, [group.id])

  const submitHandler = useCallback((groupData : GroupsUpdatePayload['group']) => { update.call(groupData) }, [update.call])

  if (update.loading) return <div className="d-flex justify-content-center">
    <Spinner animation="grow" variant="light" style={{width: '10rem', height: '10rem'}} />
  </div>

  const groupData = update.value?.data ?? group

  return <GroupForm group={groupData!} errors={update.value?.error} onSubmit={submitHandler} />
}

export default GroupDetails
