import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  ButtonGroup,
  Spinner,
  Badge,
  Container,
  Card,
  Alert,
} from "react-bootstrap";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { question, toast } from "../../../helpers/functions/swal";

const NewPatient = () => {
  return (
    <Container fluid className="product-new">
      <Form>
          <Row className="mt-5">
            <Col xl={3} lg={3} md={4} sm={4} className="like-active mb-3">
              <Form.Check
              />

              <Form.Check
                label="New Product"
              />
              <Form.Check
                label="Featured"
              />
            </Col>
            <Col xl={9} lg={9} md={8} sm={8}>
              <Row className="row-cols-1 row-cols-md-1">
                <Form.Group as={Col} className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                  />
                  <Form.Control.Feedback type="invalid">
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
            </Col>
         </Row>
      </Form>
    </Container>
  );
};

export default NewPatient;
