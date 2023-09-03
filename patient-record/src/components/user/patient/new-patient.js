import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
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
import { addPatient } from "../../../api/patience-service";
import { question, toast } from "../../../helpers/functions/swal";
import DatePicker from "react-datepicker";
import ReactInputMask from "react-input-mask-next";

const NewPatient = () => {
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();


  const initialValues = {
    groupName: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    birthPlace: "",
    gender: "",
    email: "",
    phoneNumber: "",
    address: "",
    complain: "",
    story: "",
    treat: "",
    medicine: "",
    advice: ""
  };


  const validationSchema = Yup.object({
      firstname: Yup.string()
      .required("Lütfen isim girin")
      .min(3, "En az 3 karakterli olması lazım")
      .max(30, "En fazla 30 karakterli olması lazım"),
      lastname: Yup.string() 
      .required("Lütfen soy isim girin")
      .min(3, "En az 3 karakterli olması lazım")
      .max(30, "En fazla 30 karakterli olması lazım"),
      birthDate: Yup.number().required("Please enter stock amount"),
      birthPlace: Yup.string().max(30, "En fazla 30 karakterli olması lazım"),
      email: Yup.string().max(100, "En fazla 100 karakterli olması lazım"),
      phoneNumber: Yup.string().max(15, "En fazla 15 karakterli olması lazım"),
      address: Yup.string().max(100, "En fazla 100 karakterli olması lazım"),
      complain: Yup.string().max(500, "En fazla 500 karakterli olması lazım"),
      story: Yup.string().max(3500, "En fazla 3500 karakterli olması lazım"),
      treat: Yup.string().max(300, "En fazla 300 karakterli olması lazım"),
      medicine: Yup.string().max(100, "En fazla 100 karakterli olması lazım"),
      advice: Yup.string().max(500, "En fazla 500 karakterli olması lazım"),
      gender: Yup.boolean(),
  });


  const onSubmit = async (values) => {
    setUpdating(true);
    try {
      await addPatient(values);
      toast("Hasta kaydedildi", "success");
      navigate(-1);
    } catch (err) {
      const message = err.response ? err.response.data.message : err;
      toast(message, "error");
    } finally {
      setUpdating(false);
    }
  };



  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });





  return (
    <Container fluid className="patient-new">
      <Form>
          <Row className="mt-5">
          <Col xl={2} lg={2} md={4} sm={4} className="like-active mb-3">
            <Form.Check label="Erkek"/>
          </Col>



            <Col xl={5} lg={5} md={4} sm={4}>
              <Row className="row-cols-1 row-cols-md-1">
                <Form.Group as={Col} className="mb-3">
                  <Form.Label>İsim</Form.Label>
                  <Form.Control
                  type="text"
                    {...formik.getFieldProps("firstName")}
                    isValid={formik.touched.firstName && !formik.errors.firstName}
                    isInvalid={formik.touched.firstName && !!formik.errors.firstName}
                  />
                <Form.Control.Feedback type="invalid">
                {formik.errors.firstName}
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
                  type="text"
                    {...formik.getFieldProps("lastName")}
                    isValid={formik.touched.lastName && !formik.errors.lastName}
                    isInvalid={formik.touched.lastName && !!formik.errors.lastName}
                  />
                <Form.Control.Feedback type="invalid">
                {formik.errors.lastName}
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
          

          

          <ButtonGroup className="mt-5">
          <Button
                variant="primary"
                type="submit"
              >
                {updating && <Spinner animation="border" size="sm" />} Create
              </Button>
            </ButtonGroup>

         </Row>
      </Form>
    </Container>
  );
};

export default NewPatient;
