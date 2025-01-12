import { FunctionComponent } from 'react'
import { withCurrentUser } from '@admin/contexts/current_user'
import { withLightDarkMode } from '@app/shared/LightDarkModeSwitch'
import Header from '@admin/Header'
import Content from '@admin/Content'
import { BrowserRouter } from 'react-router'
import { withGrowl } from '@app/shared/Growl'

const hocs = [
  withCurrentUser,
  withGrowl,
  withLightDarkMode,
]

const _App : FunctionComponent = () => {
  return <>
    <BrowserRouter basename="/admin/app">
      <Header />
      <Content />
    </BrowserRouter>
  </>
}

export const App = hocs.reduce((m, f) => f(m), _App)

export default App
