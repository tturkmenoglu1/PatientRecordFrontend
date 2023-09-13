import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { getPatients, getPatientsByPage } from "../../../api/patience-service";
import { toast } from "../../../helpers/functions/swal";

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
  const [sortValue, setSortValue] = useState("id");
  const [directionValue, setDirectionValue] = useState("DESC");
  const [paging, setPaging] = useState({});
  const [filters, setFilters] = useState({ q: "" })


    const loadData = async () => {
        try {
          // const resp = await getPatients();
          // setPatients(resp.data);
        } catch (err) {
          console.log(err);
        } finally {
        }
    };
    
    useEffect(() => {
      const timer = setTimeout(() => {
        getPatientsPage(0);
      }, 1000);
      return () => {
        clearTimeout(timer);
      }
    }, [filters,sortValue,directionValue]);
  
    useEffect(() => {
      loadData(0);
      // eslint-disable-next-line
  }, []);
  
    const getPatientsPage = async (page) => {
      try {
        const resp = await getPatientsByPage({
          q: filters.q,
          name: filters.categories,
          lastName: filters.brands,
          phoneNumber: filters.number,
          page,
          sort: sortValue,
          direction: directionValue
        });
        const { content, totalPages, pageable } = resp.data;
        setPatients(content);
        setPaging({ totalPages, pageNumber: pageable.pageNumber });
      } catch (err) {
        const message = err.response ? err.response.data.message : err;
        toast(message, "error");
      }
    };
  
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
              name="name"
              value={filters.name}
              onChange={handleFilterChange}
              placeholder="Isim"
              className="ms-2"
            />

            <Form.Control
              type="search"
              name="lastName"
              value={filters.lastName}
              onChange={handleFilterChange}
              placeholder="Soy isim"
              className="ms-2"
            />
            
            <Form.Control
              type="search"
              name="phoneNumber"
              value={filters.phoneNumber}
              onChange={handleFilterChange}
              placeholder="Telefon Numarası"
              className="ms-2"
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