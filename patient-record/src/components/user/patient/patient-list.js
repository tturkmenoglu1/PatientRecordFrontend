import React, { Fragment ,useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, InputGroup, Pagination, Row } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { getPatientsByPage } from "../../../api/patience-service";
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
  const [perPage, setPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");


    const loadData = async (page) => {
        try {
          const resp = await getPatientsByPage(page, perPage);
          const { content, totalElements } = resp.data;
          setPatients(content);
          setTotalRows(totalElements)
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
  };
  
  const handlePageChange = (page) => {
    loadData(page - 1);
  };

  const handleRowClicked = (row) => {
    navigate(`/patient/${row.id}`);
  };

    
    useEffect(() => {
      loadData(0);
      // eslint-disable-next-line
  }, []);
  
  const handlePerRowsChange = async (newPerPage, page) => {
    try {
      const resp = await getPatientsByPage(page - 1, newPerPage);
      const { content } = resp.data;
      setPatients(content);
      setPerPage(newPerPage);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
    
      <Row className="mt-5">
        <Col md={12} className="mb-1">
          <InputGroup>
            <Form.Control
              type="search"
              placeholder="Ara"
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
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
        data={patients.filter((item) => {
          if (searchValue === "") {
            return item;
          } else if (
            item.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
            item.lastName.toLowerCase().includes(searchValue.toLowerCase()) ||
            item.phoneNumber.toLowerCase().includes(searchValue.toLowerCase())
          ) {
            return item;
          }
        })}
        progressPending={loading}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        onRowClicked={handleRowClicked}
      />
        
    </Container>
    
    
  )
}

export default PatientList