import React, { Fragment ,useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Col, Container, Form, InputGroup, Pagination, Row } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { getPatientsByPage } from "../../../api/patience-service";
import { toast } from "../../../helpers/functions/swal";
import Loading from "../../common/loading/loading";


const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [paging, setPaging] = useState({});
  const [sortValue, setSortValue] = useState("id");
  const [directionValue, setDirectionValue] = useState("DESC");
  const [filters, setFilters] = useState({ q: "", firstName:"", lastName:"", phoneNumber:""});



  const loadData = async (page) => {
        try {

        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
  };

  const getPatients = async (page) => {
    try {
      const resp = await getPatientsByPage({
        q: filters.q,
        firstName: filters.firstName,
        lastName: filters.lastName,
        phoneNumber: filters.phoneNumber,
        page,
        sort: sortValue,
        direction: directionValue
      });
      const { content, totalPages, pageable } = resp.data;
      setPatients(content);
      setPaging({ totalPages, pageNumber: pageable.pageNumber });
      console.log(content)
    } catch (err) {
      const message = err.response ? err.response.data.message : err;
      toast(message, "error");
    }
  };
    
  useEffect(() => {
    loadData(0);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      getPatients(0);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line
  }, [filters, sortValue, directionValue]);


  const handleFilterChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFilters((prevFilters) => ({
      ...prevFilters,

      [name]: value,
    }));
  };

  return (
    <Container>
    
      <Row>
        <Col md={12} className="mb-1">
          <InputGroup className="mb-3">
            <Form.Control
              type="search"
              name="firstName"
              placeholder="İsim"
              value={filters.firstName}
              onChange={handleFilterChange}
            />
            <Form.Control
              type="search"
              name="lastName"
              placeholder="Soy isim"
              value={filters.lastName}
              className="ms-2"
              onChange={handleFilterChange}
            />
            <Form.Control
              type="search"
              name="phoneNumber"
              placeholder="Telefon Numarası"
              value={filters.phoneNumber}
              className="ms-2"
              onChange={handleFilterChange}
            />
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
            <Link to="/patient/new">
              <Button variant="secondary">Yeni Hasta</Button>
            </Link>
          </InputGroup>
        </Col>
      </Row>

        
      {loading ? (
        <Loading />
      ) : (
        <>
          {patients.map((patient, i) => (
            <Link to={`/patient/${patient.id}`} key={i}>
              <Card>
                <Row className="content">
                  <Col md={8}>
                    <Card.Title>{patient.firstName + ' '+ patient.lastName}</Card.Title>
                    <Row>
                      <Col xs={6} sm={4}>
                        <span>{patient.phoneNumber}</span>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Card>
              <hr />
            </Link>
          ))}
          {paging.totalPages > 1 && (
            <Row className="mt-5 justify-content-center">
              <Pagination className="pagination">
                {paging.pageNumber > 0 && (
                  <>
                    <Pagination.First onClick={() => getPatients(0)} />
                    <Pagination.Prev
                      onClick={() => getPatients(paging.pageNumber - 1)}
                    />
                  </>
                )}
                {paging.pageNumber > 2 && (
                  <Pagination.Ellipsis
                    onClick={() => getPatients(paging.pageNumber - 2)}
                  />
                )}
                {[...Array(paging.totalPages)].map((item, index) => (
                  <Fragment key={index}>
                    {index === paging.pageNumber && (
                      <Pagination.Item active>
                        {index + 1}
                      </Pagination.Item>
                    )}
                    {index !== paging.pageNumber &&
                      index >= Math.max(0, paging.pageNumber - 1) &&
                      index <=
                        Math.min(
                          paging.totalPages - 1,
                          paging.pageNumber + 1
                        ) && (
                        <Pagination.Item
                          key={index}
                          onClick={() => getPatients(index)}
                        >
                          {index + 1}
                        </Pagination.Item>
                      )}
                  </Fragment>
                ))}
                {paging.pageNumber < paging.totalPages - 3 && (
                  <Pagination.Ellipsis
                    onClick={() => getPatients(paging.pageNumber + 2)}
                  />
                )}
                {paging.pageNumber < paging.totalPages - 1 && (
                  <>
                    <Pagination.Next
                      onClick={() => getPatients(paging.pageNumber + 1)}
                    />
                    <Pagination.Last
                      onClick={() => getPatients(paging.totalPages - 1)}
                    />
                  </>
                )}
              </Pagination>
            </Row>
          )}
        </>
      )}
    </Container>
    
    
  )
}

export default PatientList