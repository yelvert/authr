import { FunctionComponent } from 'react'
import { NavLink } from 'react-router'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import useCurrentUser from '@shared/contexts/current_user'
import { LightDarkModeSwitch } from '@shared/LightDarkModeSwitch'
import { accountSettingsRoutes } from '@shared/pages/AccountSettings'
import useEnvironmentSettings from '@shared/contexts/environment_settings'

export const Header : FunctionComponent = () => {
  const { site_name } = useEnvironmentSettings()
  const currentUser = useCurrentUser()
  return <Navbar expand="lg" sticky="top" className="bg-dark-subtle">
    <Container>
      <Navbar.Brand href="#">{ site_name }</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
          <NavLink to={`/`} className="nav-link">Home</NavLink>
          <NavLink to={accountSettingsRoutes.path!} className="nav-link">Account Settings</NavLink>
        </Nav>
        <Nav className="flex-row flex-wrap ms-md-auto">
          <Nav.Item className="d-flex align-items-center">
            <LightDarkModeSwitch />
          </Nav.Item>
          <NavDropdown title={currentUser.info.name}>
            <NavDropdown.Item href="/session/logout">Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
}

export default Header
