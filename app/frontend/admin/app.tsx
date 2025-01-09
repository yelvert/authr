import { FunctionComponent } from 'react'
import { withCurrentUser } from '@admin/contexts/current_user'
import { withLightDarkMode } from '@app/shared/LightDarkModeSwitch'
import Header from '@admin/Header'
import Content from '@admin/Content'
import { BrowserRouter } from 'react-router'

export const App : FunctionComponent = withLightDarkMode(withCurrentUser(
  () => {
    return <>
      <BrowserRouter>
        <Header />
        <Content />
      </BrowserRouter>
    </>
  }
))

export default App
