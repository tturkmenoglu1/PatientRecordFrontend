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
import DatePicker from "react-datepicker";
import ReactInputMask from "react-input-mask-next";

const NewPatient = () => {
  return (
    <Container fluid className="patient-new">
      <Form>
          <Row className="mt-5">
          <Col xl={2} lg={2} md={4} sm={4} className="like-active mb-3">
            <Form.Check
              label="Erkek"
            />
            <Form.Check
              label="Kadın"
                  />
          </Col>
          



            <Col xl={5} lg={5} md={4} sm={4}>
              <Row className="row-cols-1 row-cols-md-1">
                <Form.Group as={Col} className="mb-3">
                  <Form.Label>İsim</Form.Label>
                  <Form.Control
                  />
                  <Form.Control.Feedback type="invalid">
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group>
                <Form.Label>Doğum Yeri</Form.Label>
                  <Form.Control
                    type="text"
                  />
                </Form.Group>
            </Row>
            <Row>
                <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                   type="email"
                 />
                </Form.Group>
              </Row>
          </Col>




          <Col xl={5} lg={5} md={4} sm={4}>
              <Row className="row-cols-1 row-cols-md-1">
                <Form.Group as={Col} className="mb-3">
                  <Form.Label>Soy isim</Form.Label>
                  <Form.Control
                  />
                  <Form.Control.Feedback type="invalid">
                  </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row>
              <Form.Group>
              <Form.Label>Doğum tarihi</Form.Label>
                <Form.Control
                  type="text"
                  as={ReactInputMask}
                  mask="99-99-9999"
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group>
              <Form.Label>Telefon numarası</Form.Label>
              <Form.Control
                 type="text"
                 as={ReactInputMask}
                 mask="(999)-999-9999"
              />
              </Form.Group>
              
            </Row>
          </Col>





          <Col xl={12} lg={12} md={12} sm={12}>
              <Row className="row-cols-1 row-cols-md-1">
                <Form.Group as={Col} className="mb-3">
                <Form.Label>Adres</Form.Label>
                <Form.Control as="textarea" rows={2} />
                </Form.Group>
              </Row>
              <Row className="row-cols-1 row-cols-md-1">
                <Form.Group as={Col} className="mb-3">
                <Form.Label>Şikayet</Form.Label>
                <Form.Control as="textarea" rows={3} />
                </Form.Group>
            </Row>
            <Row className="row-cols-1 row-cols-md-1">
                <Form.Group as={Col} className="mb-3">
                <Form.Label>Hikayesi</Form.Label>
                <Form.Control as="textarea" rows={3} />
                </Form.Group>
            </Row>
            <Row className="row-cols-1 row-cols-md-1">
                <Form.Group as={Col} className="mb-3">
                <Form.Label>Yapılan tedavi</Form.Label>
                <Form.Control as="textarea" rows={3} />
                </Form.Group>
            </Row>
            <Row className="row-cols-1 row-cols-md-1">
                <Form.Group as={Col} className="mb-3">
                <Form.Label>Verilen ilaç</Form.Label>
                <Form.Control as="textarea" rows={3} />
                </Form.Group>
            </Row>
            <Row className="row-cols-1 row-cols-md-1">
                <Form.Group as={Col} className="mb-3">
                <Form.Label>Tavsiyeler</Form.Label>
                <Form.Control as="textarea" rows={3} />
                </Form.Group>
              </Row>
          </Col>
          


         </Row>
      </Form>
    </Container>
  );
};

export default NewPatient;
