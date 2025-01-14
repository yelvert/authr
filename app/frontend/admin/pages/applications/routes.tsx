import { RouteObject, useLoaderData, useParams } from "react-router";
import ApplicationsList from "./list";
import ApplicationNew from "./new";
import ApplicationDetails from "./details";
import AuthrApiClient from "@app/sdk";

export const applicationsRoutes : RouteObject = {
  path: "/applications",
  handle: { breadcrumb: 'Applications' },
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
      handle: { breadcrumb: 'Edit' },
    },
  ],
}

export default applicationsRoutes
