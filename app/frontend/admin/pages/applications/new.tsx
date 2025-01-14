import { FunctionComponent, useCallback } from "react"
import { Spinner } from "react-bootstrap"
import AuthrApiClient, { ApplicationsCreatePayload } from "@sdk"
import useRepeatableAsync from "@app/shared/utils/useRepeatableAsync"
import useGrowl from "@app/shared/Growl"
import ApplicationForm from "./form"
import { useLocation, useMatch, useNavigate } from "react-router"

export const ApplicationNew : FunctionComponent = () => {
  const growl = useGrowl()
  const navigate = useNavigate()
  const create = useRepeatableAsync((applicationData : ApplicationsCreatePayload['application']) => {
    if (create.loading) return Promise.reject()
    return AuthrApiClient.admin.applicationsCreate({application: applicationData}).then(res => {
      growl.add({ type: 'success', content: 'Application updated successfully' })
      navigate('/applications')
      return res
    }).catch(res => {
      if (res.status && res.error) {
        growl.add({ type: 'danger', content: 'Update update failed' })
      }
      return res
    })
  }, [])

  const submitHandler = useCallback((applicationData : Partial<ApplicationsCreatePayload['application']>) => { create.call(applicationData as ApplicationsCreatePayload['application']) }, [create.call])

  if (create.loading) return <div className="d-flex justify-content-center">
    <Spinner animation="grow" variant="light" style={{width: '10rem', height: '10rem'}} />
  </div>

  const applicationData = create.value?.data ?? {}

  return <ApplicationForm application={applicationData!} errors={create.value?.error} onSubmit={submitHandler} />
}

export default ApplicationNew
