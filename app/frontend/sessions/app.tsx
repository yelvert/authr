import react, { FunctionComponent, useCallback } from 'react'
import LoginForm from '@app/shared/LoginForm'

export const App : FunctionComponent = () => {
  const loginHandler = useCallback(() => {
    document.location = "/"
  }, [])
  return <LoginForm onSuccess={loginHandler} />
}

export default App
