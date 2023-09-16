import { Form, useFormik } from 'formik'
import React, { useEffect } from 'react'
import * as Yup from "yup";
import { addAppointment } from '../../../api/appointment';
import { toast } from '../../../helpers/functions/swal';
import { useState } from 'react';
import { getPatients } from '../../../api/patience-service';
import { Button, ButtonGroup, Col, Container, Row, Spinner } from 'react-bootstrap';

const NewAppointment = () => {
  const [loading, setLoading] = useState(false);
  const [patientIdData, setpatientIdData] = useState([])

  const loadData = async () => {
    try {
      const patientResp = await getPatients();
      setpatientIdData(patientResp.data);
    } catch (error) {
      toast(error.response.data.message, "error")
    }
  }

  const initialValues = {
    patientId: "",
    // appointmentDate: "",
    // about: "",
  }

  const validationSchema = Yup.object({
    patientId: Yup.number().required("Hasta seçin"),
    // appointmentDate: Yup.string().required("Tarih belirtin"),
    // about: Yup.string().max(2000,"maksimum 2000 karakter"),
  });

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await addAppointment(values);
      toast("Randevu kaydedildi", "success");
      console.log(response)
    } catch (error) {
      toast(error.response.data.message, "error");
    }finally {
      setLoading(false);
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })

  useEffect(() => {
    loadData();

  }, [])
  

  return (
    <Container fluid>
      <Form noValidate onSubmit={formik.handleSubmit}>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Hasta Seçin</Form.Label>
              <Form.Select
                  name="number"
                  className="mb-2 mt-2"
                  {...formik.getFieldProps("patientId")}
                  isValid={
                    formik.touched.patientId && !formik.errors.patientId
                  }
                  isInvalid={
                    formik.touched.patientId && !!formik.errors.patientId
                  }
              >
                <option>Hasta</option>
                {patientIdData.map((option) => {
                  return (
                    <option value={option.id} key={option.id}>
                      {option.firstName + " "+ option.lastName}
                    </option>
                  )
                })} 
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                  {formik.errors.patientId}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <ButtonGroup className="mt-5">
              <Button
                variant="primary"
                type="submit">
                {loading && <Spinner animation="border" size="sm" />} Create
              </Button>
            </ButtonGroup>
        </Row>
      </Form>
    </Container>
  )
}

export default NewAppointment