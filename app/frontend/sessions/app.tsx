import react, { FunctionComponent, useCallback } from 'react'
import LoginForm from '@shared/LoginForm'
import { Card } from 'react-bootstrap'
import AuthrConfig from '@shared/useAuthrConfig'
import { withLightDarkMode } from '@shared/LightDarkModeSwitch'

const _App : FunctionComponent = () => {
  const loginHandler = useCallback(() => {
    document.location = "/"
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
