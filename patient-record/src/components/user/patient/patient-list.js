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
  const [filters, setFilters] = useState({ q: "", name:"", lastName:"", phoneNumber:""});



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
        name: filters.name,
        lastName: filters.lastName,
        phoneNumber: filters.phoneNumber,
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
    
  useEffect(() => {
    loadData(0);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      getPatients(0);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line
  }, [filters, sortValue, directionValue]);


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
              placeholder="Ara"
              value={filters.q}
              onChange={handleFilterChange}
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

        
      {loading ? (
        <Loading />
      ) : (
        <>
          {patients.map((patient, i) => (
            <Link to={`/patient/${patient.id}`} key={i}>
              <Card>
                <Row className="content">
                  <Col md={8}>
                    <Card.Title>{patient.name} {patient.lastName}</Card.Title>
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