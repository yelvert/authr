import { FunctionComponent } from 'react'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import useCurrentUser from './contexts/current_user'
import { LightDarkModeSwitch } from '@app/shared/LightDarkModeSwitch'

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
          <Nav.Link>Home</Nav.Link>
          <Nav.Link>Users</Nav.Link>
          <Nav.Link>Groups</Nav.Link>
        </Nav>
        <Nav className="flex-row flex-wrap ms-md-auto">
          <Nav.Item className="d-flex align-items-center">
            <LightDarkModeSwitch />
          </Nav.Item>
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item>{currentUser.info.name}</NavDropdown.Item>
            <NavDropdown.Item>
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
}

export default Header
