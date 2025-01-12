import { FunctionComponent } from "react"
import { Container } from "react-bootstrap"
import { Route, Routes, useParams } from "react-router"
import { GrowlOutlet } from "@app/shared/Growl"
import UsersIndex from "@admin/pages/users/list"
import UserDetails from "./pages/users/details"
import UserNew from "./pages/users/new"

export const Content : FunctionComponent = () => {
  return <Container className="my-3 position-relative">
    <div className="position-absolute top-0 w-25" style={{ right: '1rem' }}>
      <GrowlOutlet />
    </div>
    <Routes>
      <Route index element={<div>HOME</div>} />
      <Route path="users">
        <Route index Component={UsersIndex} />
        <Route path="new" Component={() => <UserNew />} />
        <Route path=":userId" Component={() => <UserDetails userId={Number(useParams().userId!)} />} />
      </Route>
    </Routes>
  </Container>
}

export default Content
