import { RouteObject, useLoaderData, useParams } from "react-router";
import { UsersList } from "./list";
import UserNew from "./new";
import UserDetails from "./details";
import AuthrApiClient from "@app/sdk";

export const usersRoutes : RouteObject = {
  path: "/users",
  handle: { breadcrumb: 'Users' },
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
      handle: { breadcrumb: 'Edit' },
    },
  ],
}

export default usersRoutes
