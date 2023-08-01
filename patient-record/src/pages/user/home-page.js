import React from 'react'
import UserTemplate from '../../templates/user-template'
import { Card, Col, Container , Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <UserTemplate>
      <Container>
        <Row className="g-4">
          <Col md={6}>
              <Card>
                <Card.Title>
                  Hastalar
                </Card.Title>
                647
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
      </UserTemplate>
  )
}

export default HomePage 