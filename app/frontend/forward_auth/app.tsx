import react, { FunctionComponent, useCallback } from 'react'
import LoginForm from '@app/shared/LoginForm'
import { Card } from 'react-bootstrap'
import { withLightDarkMode } from '@app/shared/LightDarkModeSwitch'
import AuthrConfig from '@app/shared/useAuthrConfig'

const _App : FunctionComponent = () => {
  const loginHandler = useCallback(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const url = searchParams.get('rd');
    if (url) { document.location = url }
    else { alert('Dunno where to send ya') }
  }, [])
  return <div className="d-flex h-100">
    <Card className="mx-auto my-auto">
      <Card.Body>
        <Card.Title className="d-flex w-100">
          <div className="mx-auto">{ AuthrConfig.siteName }</div>
        </Card.Title>
        <LoginForm onSuccess={loginHandler} />
      </Card.Body>
    </Card>
  </div>
}

export const App = withLightDarkMode(_App)

export default App
