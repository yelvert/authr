import react, { FunctionComponent, useCallback } from 'react'
import LoginForm from '@app/shared/LoginForm'

export const App : FunctionComponent = () => {
  const loginHandler = useCallback(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const url = searchParams.get('rd');
    if (url) { document.location = url }
    else { alert('Dunno where to send ya') }
  }, [])
  return <LoginForm onSuccess={loginHandler} />
}

export default App
