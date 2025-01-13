import { FunctionComponent } from 'react'
import { withCurrentUser } from '@admin/contexts/current_user'
import { withLightDarkMode } from '@app/shared/LightDarkModeSwitch'
import Header from '@admin/Header'
import Content from '@admin/Content'
import { BrowserRouter, createBrowserRouter, RouterProvider, useParams } from 'react-router'
import { withGrowl } from '@app/shared/Growl'
import UsersIndex from './pages/users/list'
import UserNew from './pages/users/new'
import UserDetails from './pages/users/details'

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
      {
        path: "/users",
        handle: { breadcrumb: 'Users' },
        children: [
          {
            index: true,
            Component: UsersIndex,
          },
          {
            path: "new",
            Component: UserNew,
            handle: { breadcrumb: 'New' },
          },
          {
            path: ":userId",
            Component: () => <UserDetails userId={Number(useParams().userId!)} />,
            handle: { breadcrumb: 'Edit' },
          },
        ],
      },
    ],
  },
], {
  basename: "/admin/app"
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
