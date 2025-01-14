import { FunctionComponent } from "react"
import { Table } from "react-bootstrap"
import { NavLink } from "react-router"
import { ApplicationResponse } from "@sdk"

export interface IApplicationsListProps {
  applications : ApplicationResponse[]
}

export const ApplicationsList : FunctionComponent<IApplicationsListProps> = ({ applications }) => {
  return <Table striped bordered hover>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Hostnames</th>
        <th>Source</th>
        <th><NavLink to="/applications/new" className="btn btn-success">New</NavLink></th>
      </tr>
    </thead>
    <tbody>
      { applications!.map(application => <tr key={application.id}>
          <td>{application.id}</td>
          <td>{application.name}</td>
          <td>{application.hostnames.join(', ')}</td>
          <td>{application.source}</td>
          <td>
            <NavLink to={`/applications/${application.source == 'database' ? application.id : btoa(application.name)}`} className="link-primary">Edit</NavLink>
          </td>
        </tr>) }
    </tbody>
  </Table>
}

export default ApplicationsList
