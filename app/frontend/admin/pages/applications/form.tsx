import AuthrApiClient from "@app/sdk"
import { ApplicationErrors, ApplicationDetailResponse, ApplicationsCreatePayload, ApplicationsUpdatePayload } from "@app/sdk/client"
import useAsync from "@app/shared/utils/useAsync"
import { FunctionComponent, useCallback, useState } from "react"
import { Badge, Button, Form } from "react-bootstrap"
import Select from "react-select"

export interface IApplicationFormProps {
  application : ApplicationDetailResponse
  errors ?: ApplicationErrors
  onSubmit : (application : ApplicationsCreatePayload['application'] | ApplicationsUpdatePayload['application']) => unknown
}

export const ApplicationForm : FunctionComponent<IApplicationFormProps> = ({ application, errors, onSubmit }) => {
  const [selectedGroupIds, setSelectedGroupIds] = useState(application.groups_custom_ids)
  const groups = useAsync(() => AuthrApiClient.admin.groupsList())
  const [selectedUserIds, setSelectedUserIds] = useState(application.users_custom_ids)
  const users = useAsync(() => AuthrApiClient.admin.usersList())
  
  const handleSubmit = useCallback(async (formData : FormData) => {
    const name = formData.get("name") as string
    const hostnames = (formData.get("hostnames") as string ?? "").split(',')
    onSubmit({ name, hostnames })
  }, [onSubmit])

  return <Form action={handleSubmit}>
    <Form.Group className="mb-3" controlId="name">
      <Form.Label>Name</Form.Label>
      <Form.Control type="input" name="name" placeholder="Name" defaultValue={application.name} isInvalid={!!errors?.name} readOnly={application.source != 'custom'} />
      <Form.Control.Feedback type="invalid">
        { errors?.name?.join(', ') }
      </Form.Control.Feedback>
    </Form.Group>

    <Form.Group className="mb-3" controlId="hostnames">
      <Form.Label>Hostnames</Form.Label>
      <Form.Control type="input" name="hostnames" placeholder="Hostnames" defaultValue={application.hostnames} isInvalid={!!errors?.hostnames} readOnly={application.source != 'custom'} />
      <Form.Control.Feedback type="invalid">
        { errors?.hostnames?.join(', ') }
      </Form.Control.Feedback>
    </Form.Group>

    <Form.Group className="mb-3" controlId="active">
      <Form.Label>Active</Form.Label>
      <Form.Check
        type="checkbox"
        name="active"
        checked={application.active}
        isInvalid={!!errors?.hostnames}
        readOnly={application.source != 'custom'}
      />
      <Form.Control.Feedback type="invalid">
        { errors?.active?.join(', ') }
      </Form.Control.Feedback>
    </Form.Group>

    <Form.Group className="mb-3" controlId="source">
      <Form.Label>Source</Form.Label>
      <Form.Control type="input" name="source" placeholder="Source" defaultValue={application.source} isInvalid={!!errors?.source} readOnly />
      <Form.Control.Feedback type="invalid">
        { errors?.source?.join(', ') }
      </Form.Control.Feedback>
    </Form.Group>

    <Form.Group className="mb-3" controlId="groups_custom_ids">
      <Form.Label>Groups</Form.Label>
      {groups.loading || <div className="mb-2">{application.groups_generated_ids.map(x => <Badge bg="light" text="dark" className="me-1">{groups.value?.data.find(g => g.id == x)?.name}</Badge>)}</div>}
      {groups.loading || <Select
        options={(groups.value?.data ?? []).filter(x => !application.groups_generated_ids.includes(x.id))}
        getOptionLabel={x => x.name}
        getOptionValue={x => `${x.id}`}
        value={(groups.value?.data ?? []).filter(x => selectedGroupIds.includes(x.id))}
        isMulti
        styles={{option: (baseStyles) => ({
          ...baseStyles,
          color: "var(--bs-dark)",
        })}}
        onChange={x => setSelectedGroupIds(x.map(o=>o.id))}
        isOptionDisabled={x => application.groups_generated_ids.includes(x.id)}
      />}
      <Form.Control type="hidden" name="groups_custom_ids" value={selectedGroupIds.join(',')} />
      <Form.Control.Feedback type="invalid">
        { errors?.groups_custom_ids?.join(', ') }
      </Form.Control.Feedback>
    </Form.Group>

    <Form.Group className="mb-3" controlId="users_custom_ids">
      <Form.Label>Users</Form.Label>
      {users.loading || <div className="mb-2">{application.users_generated_ids.map(x => <Badge bg="light" text="dark" className="me-1">{users.value?.data.find(g => g.id == x)?.name}</Badge>)}</div>}
      {users.loading || <Select
        options={(users.value?.data ?? []).filter(x => !application.users_generated_ids.includes(x.id))}
        getOptionLabel={x => x.name}
        getOptionValue={x => `${x.id}`}
        value={(users.value?.data ?? []).filter(x => selectedUserIds.includes(x.id))}
        isMulti
        styles={{option: (baseStyles) => ({
          ...baseStyles,
          color: "var(--bs-dark)",
        })}}
        onChange={x => setSelectedUserIds(x.map(o=>o.id))}
        isOptionDisabled={x => application.users_generated_ids.includes(x.id)}
      />}
      <Form.Control type="hidden" name="users_custom_ids" value={selectedUserIds.join(',')} />
      <Form.Control.Feedback type="invalid">
        { errors?.users_custom_ids?.join(', ') }
      </Form.Control.Feedback>
    </Form.Group>

    <Button variant="primary" type="submit">
      { application.id ? "Update" : "Create" }
    </Button>
  </Form>
}

export default ApplicationForm
