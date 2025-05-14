import { FunctionComponent, useCallback } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { RouteObject } from "react-router";
import useCurrentUser from "@shared/contexts/current_user";
import useGrowl from "@shared/Growl";
import RouterError from "@shared/RouterError";

export const AccountSettings : FunctionComponent<{}> = () => {
  const currentUser = useCurrentUser()
  
  const growl = useGrowl()

  const handleSubmit = useCallback(async (formData : FormData) => {
    const name = formData.get("name") as string
    const username = formData.get("username") as string
    // const old_password = formData.get("old_password") as string
    const password = formData.get("password") as string
    const password_confirmation = formData.get("password_confirmation") as string
    currentUser.update.call({ name, username,/* old_password,*/ password, password_confirmation })
      .then(_ => growl.add({ type: 'success', content: 'User updated successfully' }))
      .catch(_ => growl.add({ type: 'danger', content: 'Update update failed' }))
  }, [currentUser.update.call])


  if (currentUser.update.loading) return <div className="d-flex justify-content-center">
    <Spinner animation="grow" variant="light" style={{width: '10rem', height: '10rem'}} />
  </div>

  const errors = currentUser.update.error

  return <Form action={handleSubmit}>
    <Form.Group className="mb-3" controlId="name">
      <Form.Label>Name</Form.Label>
      <Form.Control type="text" name="name" placeholder="Name" defaultValue={currentUser.info.name} isInvalid={!!errors?.name} />
      <Form.Control.Feedback type="invalid">
        { errors?.name?.join(', ') }
      </Form.Control.Feedback>
    </Form.Group>

    <Form.Group className="mb-3" controlId="username">
      <Form.Label>Username</Form.Label>
      <Form.Control type="username" name="username" placeholder="Username" defaultValue={currentUser.info.username} isInvalid={!!errors?.username} />
      <Form.Control.Feedback type="invalid">
        { errors?.username?.join(', ') }
      </Form.Control.Feedback>
    </Form.Group>

    {/* <Form.Group className="mb-3" controlId="old_password">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" name="old_password" placeholder="Old Password" isInvalid={!!errors?.old_password} />
      <Form.Control.Feedback type="invalid">
        { errors?.old_password?.join(', ') }
      </Form.Control.Feedback>
    </Form.Group> */}

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

    <Button variant="primary" type="submit">Update</Button>
  </Form>
}

export const accountSettingsRoutes : RouteObject = {
  path: "/account_settings",
  handle: { breadcrumb: 'Account Settings' },
  ErrorBoundary: RouterError,
  Component: AccountSettings,
}

export default AccountSettings
