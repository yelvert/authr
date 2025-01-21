import { RouteObject, UIMatch, useLoaderData, useRouteLoaderData } from "react-router";
import ApplicationsList from "./list";
import ApplicationNew from "./new";
import ApplicationDetails from "./details";
import AuthrApiClient from "@sdk";
import RouterError from "@shared/RouterError";

export const applicationsRoutes : RouteObject = {
  path: "/applications",
  handle: { breadcrumb: 'Applications' },
  ErrorBoundary: RouterError,
  children: [
    {
      index: true,
      loader: () => AuthrApiClient.admin.applicationsList(),
      Component: () => <ApplicationsList applications={useLoaderData()} />,
    },
    {
      path: "new",
      Component: ApplicationNew,
      handle: { breadcrumb: 'New' },
    },
    {
      path: ":applicationId",
      loader: ({ params }) => AuthrApiClient.admin.applicationsDetail(params.applicationId!),
      Component: () => <ApplicationDetails application={useLoaderData()} />,
      handle: { breadcrumb: ({match} : { match: UIMatch }) => useRouteLoaderData(match.id)?.name },
    },
  ],
}

export default applicationsRoutes
