import React from 'react'
import logo from '../../../../assets/img/lifecenter.png'
import { Button, Container, Form, Nav, NavDropdown, Navbar, Row } from 'react-bootstrap';
import "./header.scss"

const Header = () => {
  return (
      <div className='home'>
              <Navbar>
            <Container className='container'>
              <Row>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                
                <Nav className="me-auto">
                <Navbar.Brand href="#home">
                  <img
                    src={logo}
                    className="d-inline-block align-top"
                    alt="Life Center"
                  />
                </Navbar.Brand>
                  <NavDropdown title="Link" id="navbarScrollingDropdown">
                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Something else here
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Form className="d-flex">
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      className="me-2"
                      aria-label="Search"
                    />
                    <Button variant="outline-success">Search</Button>
                  </Form>
                  </Nav>
                </Navbar.Collapse>
                </Row>
              </Container>
            </Navbar>
    </div>
  )
}

export default Header