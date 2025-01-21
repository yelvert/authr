import { FunctionComponent } from 'react'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import useCurrentUser from '@shared/contexts/current_user'
import { LightDarkModeSwitch } from '@shared/LightDarkModeSwitch'
import { NavLink } from 'react-router'
import userRoutes from './pages/users/routes'
import groupRoutes from './pages/groups/routes'
import applicationsRoutes from './pages/applications/routes'
import { accountSettingsRoutes } from '@shared/pages/AccounSettings'

export const Header : FunctionComponent = () => {
  const currentUser = useCurrentUser()
  return <Navbar expand="lg" sticky="top" className="bg-dark-subtle">
    <Container>
      <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
          <NavLink to={`/`} className="nav-link">Home</NavLink>
          <NavLink to={`${userRoutes.path}`} className="nav-link">Users</NavLink>
          <NavLink to={`${groupRoutes.path}`} className="nav-link">Groups</NavLink>
          <NavLink to={`${applicationsRoutes.path}`} className="nav-link">Applications</NavLink>
        </Nav>
        <Nav className="flex-row flex-wrap ms-md-auto">
          <Nav.Item className="d-flex align-items-center">
            <LightDarkModeSwitch />
          </Nav.Item>
          <NavDropdown title={currentUser.info.name} id="basic-nav-dropdown">
            <NavDropdown.Item as={NavLink} to={accountSettingsRoutes.path!}>Account Settings</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/session/logout">Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
}

export default Header
