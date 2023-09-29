import React from "react";
import { useParams } from "react-router-dom";
import { toast } from "../../../helpers/functions/swal";
import { getTransactionById } from "../../../api/transaction-service";
import { useEffect } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import Loading from "../../common/loading/loading";
import { useState } from "react";

const TransactionDetail = () => {
  const [transaction, setTransaction] = useState({});
  const [loading, setLoading] = useState(false);
  const { transactionId } = useParams();
  const [patient, setPatient] = useState({})

  const loadData = async () => {
    setLoading(true);
    try {
      const response = await getTransactionById(transactionId);
      setTransaction(response.data);
      setPatient(response.data.patient)
      console.log(response);
    } catch (error) {
      toast(error.response.data.message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <Row>
          <Col>
            <Table striped bordered hover>
              <tbody>
                <tr>
                  <td width="25%">Hasta</td>
                  <td>
                  {patient.firstName +
                      " " +
                      patient.lastName}
                  </td>
                </tr>
                <tr>
                  <td>Ödeme yöntemi</td>
                  <td>{transaction.payment}</td>
                </tr>
                <tr>
                  <td>Ödeme</td>
                  <td>{transaction.receivable}</td>
                </tr>
                <tr>
                  <td>Borç</td>
                  <td>{transaction.debt}</td>
                </tr>
                <tr>
                  <td>Ödeme ek bilgileri</td>
                  <td>{transaction.description}</td>
                </tr>
                <tr>
                  <td>Ödeme tarihi</td>
                  <td>{transaction.createAt}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default TransactionDetail;
