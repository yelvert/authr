import AuthrApiClient from "@app/sdk"
import { ApplicationErrors, ApplicationResponse, ApplicationsCreatePayload, ApplicationsUpdatePayload } from "@app/sdk/client"
import useAsync from "@app/shared/utils/useAsync"
import { FunctionComponent, useCallback, useState } from "react"
import { Button, Form } from "react-bootstrap"
import Select from 'react-select'

export interface IApplicationFormProps {
  application : ApplicationResponse
  errors ?: ApplicationErrors
  onSubmit : (application : ApplicationsCreatePayload['application'] | ApplicationsUpdatePayload['application']) => unknown
}

export const ApplicationForm : FunctionComponent<IApplicationFormProps> = ({ application, errors, onSubmit }) => {
  const handleSubmit = useCallback(async (formData : FormData) => {
    const name = formData.get("name") as string
    const hostnames = (formData.get("hostnames") as string ?? "").split(',')
    onSubmit({ name, hostnames })
  }, [onSubmit])

  return <Form action={handleSubmit}>
    <Form.Group className="mb-3" controlId="name">
      <Form.Label>Name</Form.Label>
      <Form.Control type="name" name="name" placeholder="Name" defaultValue={application.name} isInvalid={!!errors?.name} />
      <Form.Control.Feedback type="invalid">
        { errors?.name?.join(', ') }
      </Form.Control.Feedback>
    </Form.Group>

    <Button variant="primary" type="submit">
      { application.id ? "Update" : "Create" }
    </Button>
  </Form>
}

export default ApplicationForm
