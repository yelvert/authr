import { RouteObject, UIMatch, useLoaderData, useRouteLoaderData } from "react-router";
import AuthrApiClient from "@sdk";
import RouterError from "@shared/RouterError";
import { UsersList } from "./list";
import UserNew from "./new";
import UserDetails from "./details";

export const usersRoutes : RouteObject = {
  path: "/users",
  handle: { breadcrumb: 'Users' },
  ErrorBoundary: RouterError,
  children: [
    {
      index: true,
      loader: () => AuthrApiClient.admin.usersList(),
      Component: () => <UsersList users={useLoaderData()} />,
    },
    {
      path: "new",
      Component: UserNew,
      handle: { breadcrumb: 'New' },
    },
    {
      path: ":userId",
      loader: ({ params }) => {
        return AuthrApiClient.admin.usersDetail(Number(params.userId))
      },
      Component: () => <UserDetails user={useLoaderData()} />,
      handle: { breadcrumb: ({match} : { match: UIMatch }) => useRouteLoaderData(match.id)?.name },
    },
  ],
}

export default usersRoutes
