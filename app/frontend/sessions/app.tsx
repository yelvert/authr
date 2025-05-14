import { FunctionComponent, useCallback } from 'react'
import LoginForm from '@shared/LoginForm'
import { Card } from 'react-bootstrap'
import { withLightDarkMode } from '@shared/LightDarkModeSwitch'
import useEnvironmentSettings, { withEnvironmentSettings } from '@shared/contexts/environment_settings'

const _App : FunctionComponent = () => {
  const { site_name } = useEnvironmentSettings()
  const loginHandler = useCallback(() => {
    document.location = "/"
  }, [])
  return <div className="d-flex h-100">
    <Card className="mx-auto my-auto">
      <Card.Body>
        <Card.Title className="d-flex w-100">
          <div className="mx-auto">{ site_name }</div>
        </Card.Title>
        <LoginForm onSuccess={loginHandler} />
      </Card.Body>
    </Card>
  </div>
}

export const App = withEnvironmentSettings(withLightDarkMode(_App))

export default App
