import React from 'react'
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link} from "react-router-dom";
import logo from "../../../../assets/img/lifecenter.png"
import "./sidebar.scss"

const Sidebar = () => {
  return (
    <Navbar bg="primary" expand="lg" className="admin-navbar" variant="dark">
    <Container>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link>
            Dashboard
          </Nav.Link>
          <Nav.Link
          >
            Products
          </Nav.Link>
          <Nav.Link
          >
            Categories
          </Nav.Link>
          <Nav.Link
          >
            Brands
          </Nav.Link>
          <Nav.Link
          >
            Users
          </Nav.Link>
          <Nav.Link
          >
            Reviews
          </Nav.Link>
          <Nav.Link
          >
            Contact Messages
          </Nav.Link>
          <Nav.Link
          >
            Orders
          </Nav.Link>
          <Nav.Link
          >
            Coupons
          </Nav.Link>
          <Nav.Link
          >
            Reports
          </Nav.Link>
          <Nav.Link>
            Web Site
          </Nav.Link>
          <Nav.Link> Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default Sidebar