import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { getPatients } from "../../../api/patience-service";

const columns = [
    {
      name: "Isim",
      selector: (row) => row.firstName,
      sortable: true,
    },
    {
      name: "Soy isim",
      selector: (row) => row.lastName,
      sortable: true,
  },
  {
    name: "Telefon",
    selector: (row) => row.phoneNumber,
    }
  ];

const PatientList = () => {
    const [patients, setPatients] = useState([]);
  const navigate = useNavigate();
  const [filters, setFilters] = useState({ q: ""})


    const loadData = async () => {
        try {
          const resp = await getPatients();
          setPatients(resp.data);
        } catch (err) {
          console.log(err);
        } finally {
        }
    };
    
    useEffect(() => {
        loadData(0);
        // eslint-disable-next-line
    }, []);
  
    const handleFilterChange = (e) => {
      const name = e.target.name;
      const value = name === "q" ? e.target.value : [e.target.value];
  
      setFilters((prevFilters) => ({
        ...prevFilters,
  
        [name]: value,
      }));
    };

  return (
    <Container>
    
      <Row className="mt-5">
        <Col md={12} className="mb-1">
          <InputGroup>
            <Form.Control
              type="search"
              name="q"
              value={filters.q}
              onChange={handleFilterChange}
              placeholder="Search"
            />
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
            <Link to="/new-patient">
              <Button variant="secondary">New Patient</Button>
            </Link>
          </InputGroup>
        </Col>
      </Row>

    <DataTable
        columns={columns}
          data={patients}
      >
          
      </DataTable>
      
    </Container>
    
    
  )
}

export default PatientList