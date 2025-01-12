import { FunctionComponent } from "react"
import { Spinner, Table } from "react-bootstrap"
import { NavLink } from "react-router"
import AuthrApiClient from "@sdk"
import useAsync from "@app/shared/utils/useAsync"

export const UsersIndex : FunctionComponent = () => {
  const { loading, error, value} = useAsync(() => AuthrApiClient.admin.usersList())
  if (loading) return <div className="d-flex justify-content-center">
    <Spinner animation="grow" variant="light" style={{width: '10rem', height: '10rem'}} />
  </div>
  if (error) return <div className="d-flex justify-content-center">
    Error loading Users, reload and try again.
  </div>
  const users = value!.data
  return <Table striped bordered hover>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Username</th>
        <th><NavLink to="/users/new" className="btn btn-success">New</NavLink></th>
      </tr>
    </thead>
    <tbody>
      { users!.map(user => <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.username}</td>
          <td>
            <NavLink to={`/users/${user.id}`} className="link-primary">Edit</NavLink>
          </td>
        </tr>) }
    </tbody>
  </Table>
}

export default UsersIndex
