import react, { FunctionComponent, useCallback, useState } from 'react'

import SessionApi from '@api/SessionsApi'

export interface ILoginFormProps {
  onSuccess : () => void
}

export const LoginForm : FunctionComponent<ILoginFormProps> = ({onSuccess}) => {
  const [error, setError] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const login = useCallback(async (formData : FormData) => {
    setSubmitting(true)
    const username = formData.get("username")
    const password = formData.get("password")
    SessionApi.create({data: {username, password}, responseAs: 'response'}).then(response => {
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
