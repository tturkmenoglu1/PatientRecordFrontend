import React from 'react'
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { question } from "../../../../helpers/functions/swal";
import { useAppDispatch } from "../../../../store/hooks";
import "./sidebar.scss"


const Sidebar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  
  return (
    <Navbar expand="lg" className="admin-navbar" variant="dark">
    <Container>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to={"/"}>
            Ana Sayfa
          </Nav.Link>
          <Nav.Link
          >
            Yeni Hasta Kaydı
          </Nav.Link>
          <Nav.Link
          >
            Hastalar
          </Nav.Link>
          <Nav.Link
          >
            Randevular
          </Nav.Link>
          <Nav.Link
          >
            Cari Hesap
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default Sidebar