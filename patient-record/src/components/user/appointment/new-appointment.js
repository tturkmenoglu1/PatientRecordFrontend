import { useFormik } from "formik";
import React, { useEffect } from "react";
import * as Yup from "yup";
import { addAppointment } from "../../../api/appointment-service";
import { toast } from "../../../helpers/functions/swal";
import { useState } from "react";
import { getPatients } from "../../../api/patience-service";
import {
  Button,
  ButtonGroup,
  Col,
  Form,
  Container,
  Row,
  Spinner,
} from "react-bootstrap";
import {
  combineDateAndTime,
  getCurrentDate,
} from "../../../helpers/functions/date-time";

const NewAppointment = () => {
  const [loading, setLoading] = useState(false);
  const [patientIdData, setpatientIdData] = useState([]);

  const loadData = async () => {
    try {
      const patientResp = await getPatients();
      setpatientIdData(patientResp.data);
    } catch (error) {
      toast(error.response.data.message, "error");
    }
  };

  const initialValues = {
    patientId: "",
    appointmentDay: "",
    appointmentTime: "",
    about: "",
  };

  const validationSchema = Yup.object({
    patientId: Yup.number().required("Hasta seçin"),
    appointmentDay: Yup.string().required("Tarih belirtin"),
    appointmentTime: Yup.string().required("Zaman belirtin"),
    about: Yup.string().max(2000, "maksimum 2000 karakter"),
  });

  const onSubmit = async (values) => {
    const { appointmentDay, appointmentTime, about, patientId } = values;

    const dto = {
      patientId,
      appointmentDate: combineDateAndTime(appointmentDay, appointmentTime),
      about,
    };

    setLoading(true);
    try {
      const response = await addAppointment(dto);
      toast("Randevu kaydedildi", "success");
      console.log(response);
      formik.resetForm();
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

  useEffect(() => {
    loadData();
  }, []);

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
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Randevu tarihi</Form.Label>
              <Form.Control
                type="date"
                min={getCurrentDate}
                {...formik.getFieldProps("appointmentDay")}
                isValid={
                  formik.touched.appointmentDay && !formik.errors.appointmentDay
                }
                isInvalid={
                  formik.touched.appointmentDay &&
                  !!formik.errors.appointmentDay
                }
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.appointmentDay}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group>
              <Form.Label>Randevu Zamani</Form.Label>
              <Form.Control
                type="time"
                step={900}
                min="7:00"
                max="21:00"
                {...formik.getFieldProps("appointmentTime")}
                isValid={
                  formik.touched.appointmentTime &&
                  !formik.errors.appointmentTime
                }
                isInvalid={
                  formik.touched.appointmentTime &&
                  !!formik.errors.appointmentTime
                }
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.appointmentTime}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row className="row-cols-1 row-cols-md-1">
          <Form.Group as={Col} className="mb-3">
            <Form.Label>Randevu Konusu</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              {...formik.getFieldProps("about")}
              isValid={formik.touched.about && !formik.errors.about}
              isInvalid={formik.touched.about && !!formik.errors.about}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.about}
            </Form.Control.Feedback>
          </Form.Group>
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

export default NewAppointment;
