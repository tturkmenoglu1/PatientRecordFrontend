import React from "react";
import { useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { deletePatientById, getPatientById } from "../../../api/patience-service";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Row,
  Table,
} from "react-bootstrap";
import { question, toast } from "../../../helpers/functions/swal";
import { useEffect } from "react";
import Loading from "../../common/loading/loading";

const PatientDetail = () => {
  const [patient, setPatient] = useState({});
  const { patientId } = useParams();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

  const loadData = async () => {
    try {
      const resp = await getPatientById(patientId);
      setPatient(resp.data);
      console.log(resp.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
    };
    

    const handleDeletePatient = () => {
        question("Hastayı silmek istediğinize emin misiniz?", "İşlem geri alınamaz!").then(
            (result) => {
                if (result.isConfirmed) {
                    deletePatient();
                }
            }
        )
    }

    const deletePatient = async () => {
        try {
            await deletePatientById(patientId)
            toast("Hasta silindi", "success");
            navigate(-1);
        } catch (error) {
            toast(error.response.data.message, "error");
        }
    }

    

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Row>
            <Col>
              <Table striped bordered hover>
                <tbody>
                  <tr>
                    <td width="25%">İsim</td>
                    <td>{patient.firstName}</td>
                  </tr>
                  <tr>
                    <td>Soy isim</td>
                    <td>{patient.lastName}</td>
                  </tr>
                  <tr>
                    <td>Telefon Numarası</td>
                    <td>{patient.phoneNumber}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{patient.email}</td>
                  </tr>
                  <tr>
                    <td>Adres</td>
                    <td>{patient.address}</td>
                  </tr>
                  <tr>
                    <td>Cinsiyet</td>
                    <td>{patient.gender.gender}</td>
                  </tr>
                  <tr>
                    <td>Milliyet</td>
                    <td>{patient.nationality.nationality}</td>
                  </tr>
                  <tr>
                    <td>Doğum tarihi</td>
                    <td>{patient.birthDate}</td>
                  </tr>
                  <tr>
                    <td>Doğum yeri</td>
                    <td>{patient.birthPlace}</td>
                  </tr>
                  <tr>
                    <td>Şikayet</td>
                    <td>{patient.complain}</td>
                  </tr>
                  <tr>
                    <td>Hikayesi</td>
                    <td>{patient.story}</td>
                  </tr>
                  <tr>
                    <td>Yapılan tedaviler</td>
                    <td>{patient.treat}</td>
                  </tr>
                  <tr>
                    <td>Verilen İlaçlar</td>
                    <td>{patient.medicine}</td>
                  </tr>
                  <tr>
                    <td>Tavsiyeler</td>
                    <td>{patient.advice}</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
          <ButtonGroup>
            <Button className="me-4" variant="danger" onClick={handleDeletePatient}>Hastayı Sil</Button>
            <Button as={Link} to={`/patient/${patient.id}/update`}>
              Hastayı Güncelle
            </Button>
          </ButtonGroup>
        </>
      )}
    </Container>
  );
};

export default PatientDetail;
