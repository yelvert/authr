import { FunctionComponent } from "react"
import { Table } from "react-bootstrap"
import { NavLink } from "react-router"
import { GroupResponse } from "@sdk"

export interface IGroupsListProps {
  groups : GroupResponse[]
}

export const GroupsList : FunctionComponent<IGroupsListProps> = ({ groups }) => {
  return <Table striped bordered hover>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th><NavLink to="/groups/new" className="btn btn-success">New</NavLink></th>
      </tr>
    </thead>
    <tbody>
      { groups!.map(group => <tr key={group.id}>
          <td>{group.id}</td>
          <td>{group.name}</td>
          <td>
            <NavLink to={`/groups/${group.id}`} className="link-primary">Edit</NavLink>
          </td>
        </tr>) }
    </tbody>
  </Table>
}

export default GroupsList
