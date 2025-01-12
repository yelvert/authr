import { FunctionComponent, useCallback, useState } from 'react'

import AuthrApiClient from '@sdk'

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
  return (
    <form action={login}>
      { error && <div>Incorrect username or password</div> }
      <div>
        <label>
          Username:
          <input type="text" name="username" required />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input type="password" name="password" required />
        </label>
      </div>
      <div>
        <button type="submit" disabled={submitting}>Login</button>
      </div>
    </form>
  );
}

export default LoginForm
