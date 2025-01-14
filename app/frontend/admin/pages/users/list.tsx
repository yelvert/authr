import { FunctionComponent } from "react"
import { Table } from "react-bootstrap"
import { NavLink } from "react-router"
import { UserResponse } from "@sdk"

export interface IUsersListProps {
  users : UserResponse[]
}

export const UsersList : FunctionComponent<IUsersListProps> = ({ users }) => {
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

export default UsersList
