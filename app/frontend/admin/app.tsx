import { FunctionComponent } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { withGrowl } from '@shared/Growl'
import { withLightDarkMode } from '@shared/LightDarkModeSwitch'
import { withCurrentUser } from '@shared/contexts/current_user'
import { accountSettingsRoutes } from '@shared/pages/AccounSettings'
import Header from '@admin/Header'
import Content from '@admin/Content'
import usersRoutes from './pages/users/routes'
import groupsRoutes from './pages/groups/routes'
import applicationsRoutes from './pages/applications/routes'

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
      usersRoutes,
      groupsRoutes,
      applicationsRoutes,
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
