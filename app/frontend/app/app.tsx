import { FunctionComponent } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { withLightDarkMode } from '@shared/LightDarkModeSwitch'
import { withGrowl } from '@shared/Growl'
import { withCurrentUser } from '@shared/contexts/current_user'
import Header from '@app/Header'
import Content from '@app/Content'
import { accountSettingsRoutes } from '@shared/pages/AccountSettings'
import { withEnvironmentSettings } from '@shared/contexts/environment_settings'

const routes = createBrowserRouter([
  {
    path: "/",
    element: <>
      <Header />
      <Content />
    </>,
    children: [
      {
        index: true,
        element: <div>HOME</div>,
      },
      accountSettingsRoutes,
    ],
  },
], {
  basename: "/app"
})

const hocs = [
  withEnvironmentSettings,
  withCurrentUser,
  withGrowl,
  withLightDarkMode,
]

const _App : FunctionComponent = () => {
  return <RouterProvider router={routes} />
}

export const App = hocs.reverse().reduce((m, f) => f(m), _App)

export default App
