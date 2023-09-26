import React from 'react'
import { useState } from 'react';
import { Container, Form, FormLabel, ToggleButton, ToggleButtonGroup } from 'react-bootstrap'

const NewTransaction = () => {

  const [payment, setPayment] = useState(null);

  const handleOptionChange = (e) => {
    setPayment(e.target.value);
  };

  return (
    <Container>
      <Form>
        <div className="mb-3">
          <FormLabel className="form-check-label">
            <input
              type="radio"
              name="paymentOption"
              value="CREDIT_CARD"
              checked={payment === "CREDIT_CARD"}
              onChange={handleOptionChange}
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
              value="CASH"
              checked={payment === "CASH"}
              onChange={handleOptionChange}
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
              value="TRANSFER"
              checked={payment === "TRANSFER"}
              onChange={handleOptionChange}
              className="form-check-input"
            />
            Transfer
          </FormLabel>
        </div>
      </Form>
      <p>Seçilen Seçenek: {payment}</p>
    </Container>
  );
}

export default NewTransaction