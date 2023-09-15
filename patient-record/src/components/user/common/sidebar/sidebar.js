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
    <Navbar expand="lg" className="admin-navbar p-3" variant="dark">
    <Container>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to={"/home"}>
            Ana Sayfa
          </Nav.Link>
          <Nav.Link as={Link} to={"/new-patient"}
          >
            Yeni Hasta Kaydı
          </Nav.Link>
          <Nav.Link as={Link} to={"/patient"}
          >
            Hastalar
            </Nav.Link>
            <Nav.Link as={Link} to={"/new-appointment"}
          >
            Yeni Randevu
          </Nav.Link>
          <Nav.Link as={Link} to={"/appointment"}
          >
            Randevular
          </Nav.Link>
          <Nav.Link as={Link} to={"/transaction"}
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