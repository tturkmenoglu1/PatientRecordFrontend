import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { Container, Form, InputGroup, Row } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { getPatients } from "../../../api/patience-service";

const columns = [
    {
      name: "firstName",
      selector: (row) => row.firstName,
      sortable: true,
    },
    {
      name: "lastName",
      selector: (row) => row.lastName,
      sortable: true,
    },
  ];

const PatientList = () => {
    const [patients, setPatients] = useState([]);
    const navigate = useNavigate();


    const loadData = async () => {
        try {
          const resp = await getPatients();
          setPatients(resp.data);
        } catch (err) {
          console.log(err);
        } finally {
        }
    };
    
    useEffect(() => {
        loadData(0);
        // eslint-disable-next-line
      }, []);

  return (
    <DataTable
        columns={columns}
          data={patients}
      >
          
      </DataTable>
  )
}

export default PatientList