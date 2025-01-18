import { RouteObject, UIMatch, useLoaderData, useParams, useRouteLoaderData } from "react-router";
import { GroupsList } from "./list";
import GroupNew from "./new";
import GroupDetails from "./details";
import AuthrApiClient from "@app/sdk";

export const groupsRoutes : RouteObject = {
  path: "/groups",
  handle: { breadcrumb: 'Groups' },
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
