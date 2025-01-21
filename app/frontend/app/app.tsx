import { FunctionComponent } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { withLightDarkMode } from '@shared/LightDarkModeSwitch'
import { withGrowl } from '@shared/Growl'
import { withCurrentUser } from '@shared/contexts/current_user'
import Header from '@app/Header'
import Content from '@app/Content'
import { accountSettingsRoutes } from '@shared/pages/AccounSettings'

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
  withCurrentUser,
  withGrowl,
  withLightDarkMode,
]

const _App : FunctionComponent = () => {
  return <RouterProvider router={routes} />
}

export const App = hocs.reduce((m, f) => f(m), _App)

export default App
