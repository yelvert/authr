import { FunctionComponent, useCallback, useMemo, useState } from 'react'

import AuthrApiClient from '@sdk'
import { Button, FloatingLabel, Form } from 'react-bootstrap'

export interface ILoginFormProps {
  onSuccess : () => void
}

export const LoginForm : FunctionComponent<ILoginFormProps> = ({onSuccess}) => {
  const [error, setError] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const login = useCallback(async (formData : FormData) => {
    setSubmitting(true)
    const username = formData.get("username") as string
    const password = formData.get("password") as string
    AuthrApiClient.session.login({username, password}).then(() => {
      setError(false)
      setSubmitting(false)
      onSuccess()
    }).catch(err => {
      setError(true)
      setSubmitting(false)
    })
  }, [onSuccess])
  const isUnauthorized = useMemo(() => {
    const searchParams = new URLSearchParams(window.location.search)
    return searchParams.has('unauthorized')
  }, [])
  return (
    <Form action={login}>
      <div className="mb-3">
        <Form.Text className="text-danger">
          { isUnauthorized && "You do not have permission to access this application." } 
          { error && "Incorrect username or password" }
        </Form.Text>
      </div>
      <FloatingLabel
        controlId="username"
        label="Username"
        className="mb-3"
      >
        <Form.Control type="text" name="username" placeholder="Username" required />
      </FloatingLabel>
      <FloatingLabel
        controlId="password"
        label="Password"
        className="mb-3"
      >
        <Form.Control type="password" name="password" placeholder="Password" required />
      </FloatingLabel>
      <div className="d-grid">
        <Button size="lg" variant="primary" type="submit" disabled={submitting}>Login</Button>
      </div>
    </Form>
  );
}

export default LoginForm
