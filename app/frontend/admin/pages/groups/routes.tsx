import { RouteObject, UIMatch, useLoaderData, useRouteLoaderData } from "react-router";
import RouterError from "@shared/RouterError";
import AuthrApiClient from "@sdk";
import { GroupsList } from "./list";
import GroupNew from "./new";
import GroupDetails from "./details";

export const groupsRoutes : RouteObject = {
  path: "/groups",
  handle: { breadcrumb: 'Groups' },
  ErrorBoundary: RouterError,
  children: [
    {
      index: true,
      loader: () => AuthrApiClient.admin.groupsList(),
      Component: () => <GroupsList groups={useLoaderData()} />,
    },
    {
      path: "new",
      Component: GroupNew,
      handle: { breadcrumb: 'New' },
    },
    {
      path: ":groupId",
      loader: ({ params }) => {
        return AuthrApiClient.admin.groupsDetail(Number(params.groupId))
      },
      Component: () => <GroupDetails group={useLoaderData()} />,
      handle: { breadcrumb: ({match} : { match: UIMatch }) => useRouteLoaderData(match.id)?.name },
    },
  ],
}

export default groupsRoutes
