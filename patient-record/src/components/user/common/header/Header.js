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
            className="ms-auto me-4"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <NavDropdown title="Randevular" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
      </div>
  )
}

export default Header