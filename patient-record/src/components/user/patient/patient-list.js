import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { Container, Form, InputGroup, Row } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

const columns = [
    {
      name: "Subject",
      selector: (row) => row.subject,
      sortable: true,
    },
    {
      name: "Visitor",
      selector: (row) => row.name,
      sortable: true,
    },
  ];

const PatientList = () => {
  return (
    <DataTable
        columns={columns}
        
      />
  )
}

export default PatientList