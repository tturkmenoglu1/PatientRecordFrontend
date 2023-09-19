import React from 'react'
import { useState } from 'react';
import { getAppointmentById } from '../../../api/appointment-service';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Container, Row, Table } from 'react-bootstrap';
import Loading from '../../common/loading/loading';
import { formatDateTime } from '../../../helpers/functions/date-time';

const AppointmentDetail = () => {
    const [appointment, setAppointment] = useState({});
    const { appointmentId } = useParams();
    const [loading, setLoading] = useState(true)

    const loadData = async () => {
        try {
            const resp = await getAppointmentById(appointmentId);
            const content = resp.data;
            setAppointment(content);
        } catch (error) {
            
        }
        setLoading(false)
    }

    useEffect(() => {
        loadData();
    
    }, [])
    

  return (
      <Container>
          {loading ? (
              <Loading />
          ) : (
                  <>

                  <Row>
                  
                      <Col>
                          <Table striped bordered hover>
                              <tbody>
                                  <tr>
                                      <td width="25%">Hasta</td>
                                      <td>{appointment.patient.firstName + " " + appointment.patient.lastName}</td>
                                  </tr>
                                  <tr>
                                      <td>Randevu Günü</td>
                                      <td>{formatDateTime(appointment.appointmentDate)}</td>
                                  </tr>
                                  <tr>
                                      <td>Randevu Konusu</td>
                                      <td>{appointment.about}</td>
                                  </tr>
                              </tbody>
                          </Table>
                      </Col>
                  </Row>

                  <Row>
                      <Col>
                          <Table striped bordered hover>
                              <tbody>
                                  <tr>
                                      <td width="25%">Isim</td>
                                      <td>{appointment.patient.firstName}</td>
                                  </tr>
                                  <tr>
                                      <td>Soy isim</td>
                                      <td>{appointment.patient.lastName}</td>
                                  </tr>
                                  <tr>
                                      <td>Milliyet</td>
                                      <td>{appointment.patient.nationality.nationality}</td>
                                  </tr>
                                  <tr>
                                      <td>Telefon Numarası</td>
                                      <td>{appointment.patient.phoneNumber}</td>
                                  </tr>
                              </tbody>
                          </Table>
                      </Col>
                  </Row>
                </>
              )}
    </Container>
  )
}

export default AppointmentDetail