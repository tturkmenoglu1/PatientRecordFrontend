import React, { useEffect, useState } from 'react'
import { Card, Col, Container , Row } from 'react-bootstrap'
import { getStatistics } from '../../../../api/database-service'

const MainMenu = () => {
  const [statistics, setStatistics] = useState({});


  const loadData = async () => {
    try {
      const response = await getStatistics();
      setStatistics(response.data);
    } catch (error) {
      
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
              <Card>
                <Card.Title>
                  Hastalar
                </Card.Title>
                {statistics.patientCount}
              </Card>
          </Col>
          <Col md={6}>
              <Card>
                <Card.Title>
                  Hesap Bakiye
                </Card.Title>
                6146447
              </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default MainMenu