import { FunctionComponent } from "react"
import { Spinner, Table } from "react-bootstrap"
import { NavLink } from "react-router"
import AuthrApiClient from "@sdk"
import useAsync from "@app/shared/utils/useAsync"

export const GroupsIndex : FunctionComponent = () => {
  const { loading, error, value} = useAsync(() => AuthrApiClient.admin.groupsList())
  if (loading) return <div className="d-flex justify-content-center">
    <Spinner animation="grow" variant="light" style={{width: '10rem', height: '10rem'}} />
  </div>
  if (error) return <div className="d-flex justify-content-center">
    Error loading Groups, reload and try again.
  </div>
  const groups = value!.data
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

export default GroupsIndex
