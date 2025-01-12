import { FunctionComponent } from "react";
import { Route } from "react-router";
import { UsersIndex } from "./list";

export const userRoutes = {
  index: "/"
}

export const UsersRoute : FunctionComponent = () => {
  return <>
    <Route index element={<UsersIndex />} />
  </>
}

export default UsersRoute
