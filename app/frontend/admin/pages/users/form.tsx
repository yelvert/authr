import { UserErrors, UserResponse, UsersCreatePayload, UsersUpdatePayload } from "@app/sdk/client";
import { FunctionComponent, useCallback } from "react";
import { Button, Form } from "react-bootstrap";

export interface IUserFormProps {
  user : UserResponse
  errors ?: UserErrors
  onSubmit : (user : UsersCreatePayload['user'] | UsersUpdatePayload['user']) => unknown
}

export const UserForm : FunctionComponent<IUserFormProps> = ({ user, errors, onSubmit }) => {
  const handleSubmit = useCallback(async (formData : FormData) => {
    const name = formData.get("name") as string
    const username = formData.get("username") as string
    const password = formData.get("password") as string
    const password_confirmation = formData.get("password_confirmation") as string
    onSubmit({ name, username, password, password_confirmation })
  }, [onSubmit])

  const renderPassword = user.id
  ? <Button>Change Password</Button>
  : <>
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
    </>

  return <Form action={handleSubmit}>
    <Form.Group className="mb-3" controlId="name">
      <Form.Label>Name</Form.Label>
      <Form.Control type="name" name="name" placeholder="Name" defaultValue={user.name} isInvalid={!!errors?.name} />
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

    { renderPassword }

    <Button variant="primary" type="submit">
      { user.id ? "Update" : "Create" }
    </Button>
  </Form>
}

export default UserForm
