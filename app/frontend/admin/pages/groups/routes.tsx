import { RouteObject, useLoaderData, useParams } from "react-router";
import { GroupsIndex } from "./list";
import GroupNew from "./new";
import GroupDetails from "./details";
import AuthrApiClient from "@app/sdk";

export const groupsRoutes : RouteObject = {
  path: "/groups",
  handle: { breadcrumb: 'Groups' },
  children: [
    {
      index: true,
      Component: GroupsIndex,
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
      handle: { breadcrumb: 'Edit' },
    },
  ],
}

export default groupsRoutes
