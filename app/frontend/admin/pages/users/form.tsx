import { FunctionComponent, useCallback, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Select from 'react-select'
import useAsync from "@shared/utils/useAsync";
import AuthrApiClient, { UserErrors, UserResponse, UsersCreatePayload, UsersUpdatePayload } from "@sdk";

export interface IUserFormProps {
  user : UserResponse
  errors ?: UserErrors
  onSubmit : (user : UsersCreatePayload['user'] | UsersUpdatePayload['user']) => unknown
}

export const UserForm : FunctionComponent<IUserFormProps> = ({ user, errors, onSubmit }) => {
  const groups = useAsync(() => AuthrApiClient.admin.groupsList());
  
  const handleSubmit = useCallback(async (formData : FormData) => {
    const name = formData.get("name") as string
    const username = formData.get("username") as string
    const password = formData.get("password") as string
    const password_confirmation = formData.get("password_confirmation") as string
    const group_ids = (formData.get("group_ids") as string ?? "").split(',').map(Number)
    onSubmit({ name, username, password, password_confirmation, group_ids })
  }, [onSubmit])

  const [selectedGroupIds, setSelectedGroupIds] = useState(user.group_ids || [])

  return <Form action={handleSubmit}>
    <Form.Group className="mb-3" controlId="name">
      <Form.Label>Name</Form.Label>
      <Form.Control type="text" name="name" placeholder="Name" defaultValue={user.name} isInvalid={!!errors?.name} />
      <Form.Control.Feedback type="invalid">
        { errors?.name?.join(', ') }
      </Form.Control.Feedback>
    </Form.Group>

    <Form.Group className="mb-3" controlId="username">
      <Form.Label>Username</Form.Label>
      <Form.Control type="username" name="username" placeholder="Username" defaultValue={user.username} isInvalid={!!errors?.username} />
      <Form.Control.Feedback type="invalid">
        { errors?.username?.join(', ') }
      </Form.Control.Feedback>
    </Form.Group>

    <Form.Group className="mb-3" controlId="groups">
      <Form.Label>Groups</Form.Label>
      {groups.loading || <Select
        options={groups.value?.data ?? []}
        getOptionLabel={x => x.name}
        getOptionValue={x => `${x.id}`}
        value={(groups.value?.data ?? []).filter(x => selectedGroupIds.includes(x.id))}
        isMulti
        styles={{option: (baseStyles) => ({
          ...baseStyles,
          color: "var(--bs-dark)",
        })}}
        onChange={x => setSelectedGroupIds(x.map(o=>o.id))}
      />}
      <Form.Control type="hidden" name="group_ids" value={selectedGroupIds.join(',')} />
      <Form.Control.Feedback type="invalid">
        { errors?.group_ids?.join(', ') }
      </Form.Control.Feedback>
    </Form.Group>

    <Form.Group className="mb-3" controlId="password">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" name="password" placeholder="Password" isInvalid={!!errors?.password} />
      <Form.Control.Feedback type="invalid">
        { errors?.password?.join(', ') }
      </Form.Control.Feedback>
    </Form.Group>

    <Form.Group className="mb-3" controlId="password_confirmation">
      <Form.Label>Confirm Password</Form.Label>
      <Form.Control type="password" name="password_confirmation" placeholder="Confirm Password" isInvalid={!!errors?.password_confirmation} />
      <Form.Control.Feedback type="invalid">
        { errors?.password_confirmation?.join(', ') }
      </Form.Control.Feedback>
    </Form.Group>

    <Button variant="primary" type="submit">
      { user.id ? "Update" : "Create" }
    </Button>
  </Form>
}

export default UserForm
