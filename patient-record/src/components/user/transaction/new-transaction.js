import { useFormik } from "formik";
import React from "react";
import { useState } from "react";
import * as Yup from "yup";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Form,
  FormLabel,
  Row,
  Spinner,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getPatients } from "../../../api/patience-service";
import { addTransaction } from "../../../api/transaction-service";
import { toast } from "../../../helpers/functions/swal";

const NewTransaction = () => {
  const [loading, setLoading] = useState(false);
  const [patientIdData, setpatientIdData] = useState([]);
  const navigate = useNavigate();

  const loadData = async () => {
    setLoading(true);
    try {
      const patientResp = await getPatients();
      setpatientIdData(patientResp.data);
    } catch (error) {
      toast(error.response.data.message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);


  const initialValues = {
    patientId: "",
    payment: "CASH",
    receivable: "",
    debt: "",
    description: "",
  };

  const validationSchema = Yup.object({
    patientId: Yup.number().required("Hasta seçin"),
    payment: Yup.string(),
    receivable: Yup.number(),
    debt: Yup.number(),
    description: Yup.string(),
  });

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await addTransaction(values);
      toast("İşlem kaydedildi", "success");
      console.log(response);
    } catch (error) {
      toast(error.response.data.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <Container>
      <Form noValidate onSubmit={formik.handleSubmit}>
        <Row>
          <Col lg={2}>
            <div className="mb-3">
              <FormLabel className="form-check-label">
                <input
                  type="radio"
                  name="paymentOption"
                  value={formik.values.payment}
                  checked={formik.values.payment === "CREDIT_CARD"}
                  onChange={(e)=>formik.setFieldValue("payment","CREDIT_CARD")}
                  className="form-check-input"
                />
                Kredi Kartı
              </FormLabel>
            </div>
            <div className="mb-3">
              <FormLabel className="form-check-label">
                <input
                  type="radio"
                  name="paymentOption"
                  value={formik.values.payment}
                  checked={formik.values.payment === "CASH"}
                  onChange={(e)=>formik.setFieldValue("payment","CASH")}
                  className="form-check-input"
                />
                Nakit
              </FormLabel>
            </div>
            <div className="mb-3">
              <FormLabel className="form-check-label">
                <input
                  type="radio"
                  name="paymentOption"
                  value={formik.values.payment}
                  checked={formik.values.payment === "TRANSFER"}
                  onChange={(e)=>formik.setFieldValue("payment","TRANSFER")}
                  className="form-check-input"
                />
                Transfer
              </FormLabel>
            </div>
          </Col>

          <Col lg={10}>
            <Form.Group>
              <Form.Label>Hasta Seçin</Form.Label>
              <Form.Select
                name="number"
                className="mb-2 mt-2"
                {...formik.getFieldProps("patientId")}
                isValid={formik.touched.patientId && !formik.errors.patientId}
                isInvalid={
                  formik.touched.patientId && !!formik.errors.patientId
                }
              >
                <option>Hasta</option>
                {patientIdData.map((option) => {
                  return (
                    <option className="py-2" value={option.id} key={option.id}>
                      {option.firstName + " " + option.lastName}
                    </option>
                  );
                })}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {formik.errors.patientId}
              </Form.Control.Feedback>
            </Form.Group>

            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Ödeme</Form.Label>
                  <Form.Control
                    type="number"
                    {...formik.getFieldProps("receivable")}
                    isValid={
                      formik.touched.receivable && !formik.errors.receivable
                    }
                    isInvalid={
                      formik.touched.receivable && !!formik.errors.receivable
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.receivable}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group>
                  <Form.Label>Borç</Form.Label>
                  <Form.Control
                    type="number"
                    {...formik.getFieldProps("debt")}
                    isValid={formik.touched.debt && !formik.errors.debt}
                    isInvalid={formik.touched.debt && !!formik.errors.debt}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.debt}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Hesap ek bilgileri</Form.Label>
                  <Form.Control
                    type="text"
                    {...formik.getFieldProps("description")}
                    isValid={formik.touched.description && !formik.errors.description}
                    isInvalid={formik.touched.description && !!formik.errors.description}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.description}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
          </Col>
        </Row>
        <ButtonGroup className="mt-5">
          <Button variant="primary" type="submit">
            {loading && <Spinner animation="border" size="sm" />} Create
          </Button>
        </ButtonGroup>
      </Form>
    </Container>
  );
};

export default NewTransaction;
