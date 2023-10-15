import React, { useEffect, useState } from 'react'
import { Card, Col, Container , Row } from 'react-bootstrap'
import { getStatistics } from '../../../../api/database-service'
import "./main-menu.scss"
import { Link } from 'react-router-dom'
import { getCurrentDate } from '../../../../helpers/functions/date-time'
import { toast } from '../../../../helpers/functions/swal'

const MainMenu = () => {
  const [statistics, setStatistics] = useState({});


  const loadData = async () => {
    try {
      const todaysTime = parseInt(getCurrentDate());
      const response = await getStatistics(todaysTime);
      setStatistics(response.data);
      console.log(todaysTime)
    } catch (error) {
      toast(error.response.data.message, "error");
    }
  }

  useEffect(() => {
    loadData();
  
  }, [])

  return (
      <div>
          <Container>
        <Row className="g-4">
          <Col md={6}>
              <Card as={Link} to={"/patient"}>
                <Card.Title>
                  Hastalar
                </Card.Title>
                {statistics.patientCount}
              </Card>
          </Col>
          <Col md={6}>
              <Card as={Link} to={"/transaction"}>
                <Card.Title>
                  Hesap Bakiye
                </Card.Title>
                {statistics.balance}
              </Card>
          </Col>
          <Col>
            <Card>
              <Card.Title>
                Bugünkü Randevular
              </Card.Title>

            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default MainMenu