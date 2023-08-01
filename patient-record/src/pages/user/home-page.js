import React from 'react'
import UserTemplate from '../../templates/user-template'
import { Card, Col, Container , Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <UserTemplate>
      <Container>
        <Row className="g-4">
          <Col sm={6} md={4}>
              <Card>
                <Card.Title>
                  "Patients"
                </Card.Title>
                647
              </Card>
          </Col>
        </Row>
      </Container>
      </UserTemplate>
  )
}

export default HomePage 