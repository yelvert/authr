import { FunctionComponent, useCallback } from "react"
import { Spinner } from "react-bootstrap"
import AuthrApiClient, { ApplicationResponse, ApplicationsUpdatePayload } from "@sdk"
import useRepeatableAsync from "@shared/utils/useRepeatableAsync"
import useGrowl from "@shared/Growl"
import ApplicationForm from "./form"
import { useNavigate } from "react-router"

export interface IApplicationDetailProps {
  application : ApplicationResponse
}

export const ApplicationDetails : FunctionComponent<IApplicationDetailProps> = ({ application }) => {
  const growl = useGrowl()
  const navigate = useNavigate()
  const update = useRepeatableAsync((applicationData : ApplicationsUpdatePayload['application']) => {
    if (update.loading) return Promise.reject()
    return AuthrApiClient.admin.applicationsUpdate(application.id, {application: applicationData}).then(res => {
      growl.add({ type: 'success', content: 'Application updated successfully' })
      navigate('/applications')
      return res
    }).catch(res => {
      if (res.status && res.error) growl.add({ type: 'danger', content: 'Update update failed' })
      return res
    })
  }, [application.id])

  const submitHandler = useCallback((applicationData : ApplicationsUpdatePayload['application']) => { update.call(applicationData) }, [update.call])

  if (update.loading) return <div className="d-flex justify-content-center">
    <Spinner animation="grow" variant="light" style={{width: '10rem', height: '10rem'}} />
  </div>

  const applicationData = update.value?.data ?? application

  return <ApplicationForm application={applicationData!} errors={update.value?.error} onSubmit={submitHandler} />
}

export default ApplicationDetails
