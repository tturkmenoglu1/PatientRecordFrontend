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
  Container,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { addPatient, getPatientById, updatePatient } from "../../../api/patience-service";
import { question, toast } from "../../../helpers/functions/swal";
import ReactInputMask from "react-input-mask-next";
import { getGendersOption } from "../../../api/gender-service";
import { getNationsOption } from "../../../api/nationality-service";

const PatientUpdate = () => {
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [genderIdData, setGenderIdData] = useState([])
  const [nationalityIdData, setNationalityIdData] = useState([])

  const loadData = async () => {
    try {
      const resp = await getPatientById(patientId);
      const genderResp = await getGendersOption();
      const nationResp = await getNationsOption();
      setGenderIdData(genderResp.data);
      setNationalityIdData(nationResp.data);
      setInitialValues({
        ...resp.data,
        nationalityId: resp.data.nationality.id,
        genderId: resp.data.gender.id,
      });
    } catch (err) {
      toast(err.response.data.message, "error");
    } finally {
      setLoading(false);
    }
  };


  const [initialValues, setInitialValues] = useState({
    nationalityId: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    birthPlace: "",
    genderId: "",
    email: "",
    phoneNumber: "",
    address: "",
    complain: "",
    story: "",
    treat: "",
    medicine: "",
    advice: "",
  });


  const validationSchema = Yup.object({
      firstName: Yup.string()
      .required("Lütfen isim girin")
      .min(3, "En az 3 karakterli olması lazım")
      .max(30, "En fazla 30 karakterli olması lazım"),
      lastName: Yup.string() 
      .required("Lütfen soy isim girin")
      .min(3, "En az 3 karakterli olması lazım")
      .max(30, "En fazla 30 karakterli olması lazım"),
      birthDate: Yup.string(),
      birthPlace: Yup.string().max(30, "En fazla 30 karakterli olması lazım"),
      email: Yup.string().max(100, "En fazla 100 karakterli olması lazım"),
      phoneNumber: Yup.string().max(15, "En fazla 15 karakterli olması lazım"),
      address: Yup.string().max(100, "En fazla 100 karakterli olması lazım"),
      complain: Yup.string().max(500, "En fazla 500 karakterli olması lazım"),
      story: Yup.string().max(3500, "En fazla 3500 karakterli olması lazım"),
      treat: Yup.string().max(300, "En fazla 300 karakterli olması lazım"),
      medicine: Yup.string().max(100, "En fazla 100 karakterli olması lazım"),
      advice: Yup.string().max(500, "En fazla 500 karakterli olması lazım"),
  });


  const onSubmit = async (values) => {
    setUpdating(true);
    try {
      const response = await updatePatient(patientId, values);
      toast("Hasta kaydedildi", "success");
      console.log(response);
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
    enableReinitialize: true,

  });

  useEffect(() => {
    loadData();
  }, [])
  


  return (
    <Container>
      <Form noValidate onSubmit={formik.handleSubmit}>
          <Row>
          <Col xl={2} lg={2} md={4} sm={4} className="like-active">
          <Form.Group as={Col} className="mb-3">
            <Form.Label>Cinsiyet</Form.Label>
              <Form.Select
                  name="number"
                  className="mb-2 mt-2"
                  {...formik.getFieldProps("genderId")}
                  isValid={
                    formik.touched.genderId && !formik.errors.genderId
                  }
                  isInvalid={
                    formik.touched.genderId && !!formik.errors.genderId
                  }
              >
                <option value="">Cinsiyet Seçin</option>
                {genderIdData.map((option) => {
                  return (
                    <option className="py-2" value={option.id} key={option.id}>
                      {option.gender}
                    </option>
                  );
                })}
              </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.genderId}
                </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} className="mb-3">
            <Form.Label>Milliyet</Form.Label>
              <Form.Select
                name="number"
                className="mb-2 mt-2"
                  {...formik.getFieldProps("nationalityId")}
                  isValid={
                    formik.touched.nationalityId && !formik.errors.nationalityId
                  }
                  isInvalid={
                    formik.touched.nationalityId && !!formik.errors.nationalityId
                  }
              >
            <option value="">Milliyet Seçin</option>
            {nationalityIdData.map((option) => {
              return (
                <option className="py-2" value={option.id} key={option.id}>
                  {option.nationality}
                </option>
              );
            })}
            </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.nationalityId}
                </Form.Control.Feedback>
          </Form.Group>
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
                  {...formik.getFieldProps("birthPlace")}
                    isValid={formik.touched.birthPlace && !formik.errors.birthPlace}
                    isInvalid={formik.touched.birthPlace && !!formik.errors.birthPlace}
                  />
                <Form.Control.Feedback type="invalid">
                {formik.errors.birthPlace}
                </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row>
                <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  {...formik.getFieldProps("email")}
                    isValid={formik.touched.email && !formik.errors.email}
                    isInvalid={formik.touched.email && !!formik.errors.email}
                  />
                <Form.Control.Feedback type="invalid">
                {formik.errors.email}
                </Form.Control.Feedback>
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
                  mask="9999-99-99"
                  {...formik.getFieldProps("birthDate")}
                    isValid={formik.touched.birthDate && !formik.errors.birthDate}
                    isInvalid={formik.touched.birthDate && !!formik.errors.birthDate}
                  />
                <Form.Control.Feedback type="invalid">
                {formik.errors.birthDate}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group>
              <Form.Label>Telefon numarası</Form.Label>
              <Form.Control
                 type="text"
                 as={ReactInputMask}
                  mask="(999)-999-9999"
                  {...formik.getFieldProps("phoneNumber")}
                  isValid={formik.touched.phoneNumber && !formik.errors.phoneNumber}
                    isInvalid={formik.touched.phoneNumber && !!formik.errors.phoneNumber}
                  />
                <Form.Control.Feedback type="invalid">
                {formik.errors.phoneNumber}
                </Form.Control.Feedback>
              </Form.Group>
              
            </Row>
          </Col>





          <Col xl={12} lg={12} md={12} sm={12}>
              <Row className="row-cols-1 row-cols-md-1">
                <Form.Group as={Col} className="mb-3">
                <Form.Label>Adres</Form.Label>
                <Form.Control as="textarea" rows={2} 
                  {...formik.getFieldProps("address")}
                isValid={formik.touched.address && !formik.errors.address}
                    isInvalid={formik.touched.address && !!formik.errors.address}
                  />
                <Form.Control.Feedback type="invalid">
                {formik.errors.address}
                </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="row-cols-1 row-cols-md-1">
                <Form.Group as={Col} className="mb-3">
                <Form.Label>Şikayet</Form.Label>
                <Form.Control as="textarea" rows={3} 
                  {...formik.getFieldProps("complain")}
                isValid={formik.touched.complain && !formik.errors.complain}
                    isInvalid={formik.touched.complain && !!formik.errors.complain}
                  />
                <Form.Control.Feedback type="invalid">
                {formik.errors.complain}
                </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="row-cols-1 row-cols-md-1">
                <Form.Group as={Col} className="mb-3">
                <Form.Label>Hikayesi</Form.Label>
                <Form.Control as="textarea" rows={3} 
                  {...formik.getFieldProps("story")}
                isValid={formik.touched.story && !formik.errors.story}
                    isInvalid={formik.touched.story && !!formik.errors.story}
                  />
                <Form.Control.Feedback type="invalid">
                {formik.errors.story}
                </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="row-cols-1 row-cols-md-1">
                <Form.Group as={Col} className="mb-3">
                <Form.Label>Yapılan tedavi</Form.Label>
                <Form.Control as="textarea" rows={3} 
                  {...formik.getFieldProps("treat")}
                isValid={formik.touched.treat && !formik.errors.treat}
                    isInvalid={formik.touched.treat && !!formik.errors.treat}
                  />
                <Form.Control.Feedback type="invalid">
                {formik.errors.treat}
                </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="row-cols-1 row-cols-md-1">
                <Form.Group as={Col} className="mb-3">
                <Form.Label>Verilen ilaç</Form.Label>
                <Form.Control as="textarea" rows={3} 
                  {...formik.getFieldProps("medicine")}
                isValid={formik.touched.medicine && !formik.errors.medicine}
                    isInvalid={formik.touched.medicine && !!formik.errors.medicine}
                  />
                <Form.Control.Feedback type="invalid">
                {formik.errors.medicine}
                </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="row-cols-1 row-cols-md-1">
                <Form.Group as={Col} className="mb-3">
                <Form.Label>Tavsiyeler</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3} 
                  {...formik.getFieldProps("advice")}
                    isValid={formik.touched.advice && !formik.errors.advice}
                    isInvalid={formik.touched.advice && !!formik.errors.advice}
                  />
                <Form.Control.Feedback type="invalid">
                {formik.errors.advice}
                </Form.Control.Feedback>
                </Form.Group>
              </Row>
          </Col>
          

          

          <ButtonGroup className="mt-5">
              <Button
                variant="primary"
                type="submit">
                {updating && <Spinner animation="border" size="sm" />} Güncelle
              </Button>
            </ButtonGroup>

         </Row>
      </Form>
    </Container>
  );
};


export default PatientUpdate