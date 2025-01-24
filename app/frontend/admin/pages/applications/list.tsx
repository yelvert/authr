import { FunctionComponent } from "react"
import { Table } from "react-bootstrap"
import { NavLink } from "react-router"
import { ApplicationListResponse } from "@sdk"

export interface IApplicationsListProps {
  applications : ApplicationListResponse[]
}

export const ApplicationsList : FunctionComponent<IApplicationsListProps> = ({ applications }) => {
  return <Table striped bordered hover>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Hostnames</th>
        <th>Source</th>
        <th>Active?</th>
        <th><NavLink to="/applications/new" className="btn btn-success">New</NavLink></th>
      </tr>
    </thead>
    <tbody>
      { applications!.map(application => <tr key={application.id}>
          <td>{application.id}</td>
          <td>{application.name}</td>
          <td>{application.hostnames.join(', ')}</td>
          <td>{application.source}</td>
          <td>{application.active ? "✅" : "❌" }</td>
          <td>
            <NavLink to={`/applications/${application.id}`} className="link-primary">Edit</NavLink>
          </td>
        </tr>) }
    </tbody>
  </Table>
}

export default ApplicationsList
