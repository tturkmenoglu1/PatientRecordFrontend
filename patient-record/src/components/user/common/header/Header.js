import React from 'react'
import logo from '../../../../assets/img/lifecenter.png'
import { Button, Container, Form, Nav, NavDropdown, Navbar, Row } from 'react-bootstrap';
import "./header.scss"
import { Link } from 'react-router-dom';

const Header = () => {
  return (
      <div className='menu'>
      <Navbar expand="lg" className="bg-body-tertiary p-3">
            <Navbar.Brand as={Link} to={"/home"}>
            <div className="logo">
             <img src={logo} alt="Life Center" className='img-fluid'/>
             </div>
           </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <NavDropdown title="Bildirim" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
    </Navbar>
      </div>
  )
}

export default Header