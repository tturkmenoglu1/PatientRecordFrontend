import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Pagination,
  Row,
} from "react-bootstrap";
import { toast } from "../../../helpers/functions/swal";
import Loading from "../../common/loading/loading";
import { getAppointmentsByPage } from "../../../api/appointment-service";

const AppointmentList = () => {
  const [appointments, setAppointments] = useState({});
  const [loading, setLoading] = useState(true);
  const [paging, setPaging] = useState({});

  const loadData = async (page) => {
    try {
      const resp = await getAppointmentsByPage(page);
      const { content, totalPages, pageable } = resp.data;
      setAppointments(content);
      setPaging({ totalPages, pageNumber: pageable.pageNumber });
    } catch (error) {
      toast(error.response.data.message, "error");
    } finally {
      setLoading(false);
    }
  };

  //   const getAppointments = async (page) => {
  //       try {
  //         const resp = await getAppointmentsByPage({
  //           page,
  //           sort: sortValue,
  //           direction: directionValue
  //         });
  //         const { content, totalPages, pageable } = resp.data;
  //         setAppointments(content);
  //         setPaging({ totalPages, pageNumber: pageable.pageNumber });
  //       } catch (err) {
  //         const message = err.response ? err.response.data.message : err;
  //         toast(message, "error");
  //       }
  //   };

  //   useEffect(() => {
  //       const timer = setTimeout(() => {
  //         getAppointments(0);
  //       }, 500);
  //       return () => {
  //         clearTimeout(timer);
  //       };
  //       // eslint-disable-next-line
  //     }, [sortValue, directionValue]);

  useEffect(() => {
    loadData(0);
  }, []);
  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <>
          {appointments.map((appointment, i) => (
            <Link to={`/appointment/${appointment.id}`} key={i}>
              <Card>
                <Row className="content">
                  <Col md={8}>
                    <Card.Title>
                      {appointment.patient.firstName +
                        " " +
                        appointment.patient.lastName}
                    </Card.Title>
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
                    <Pagination.First onClick={() => loadData(0)} />
                    <Pagination.Prev
                      onClick={() => loadData(paging.pageNumber - 1)}
                    />
                  </>
                )}
                {paging.pageNumber > 2 && (
                  <Pagination.Ellipsis
                    onClick={() => loadData(paging.pageNumber - 2)}
                  />
                )}
                {[...Array(paging.totalPages)].map((item, index) => (
                  <Fragment key={index}>
                    {index === paging.pageNumber && (
                      <Pagination.Item active>{index + 1}</Pagination.Item>
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
                          onClick={() => loadData(index)}
                        >
                          {index + 1}
                        </Pagination.Item>
                      )}
                  </Fragment>
                ))}
                {paging.pageNumber < paging.totalPages - 3 && (
                  <Pagination.Ellipsis
                    onClick={() => loadData(paging.pageNumber + 2)}
                  />
                )}
                {paging.pageNumber < paging.totalPages - 1 && (
                  <>
                    <Pagination.Next
                      onClick={() => loadData(paging.pageNumber + 1)}
                    />
                    <Pagination.Last
                      onClick={() => loadData(paging.totalPages - 1)}
                    />
                  </>
                )}
              </Pagination>
            </Row>
          )}
        </>
      )}
    </Container>
  );
};

export default AppointmentList;
