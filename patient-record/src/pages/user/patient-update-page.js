import React from "react";
import UserTemplate from "../../templates/user-template";
import PatientUpdate from "../../components/user/patient/patient-update";

const PatientUpdatePage = () => {
  return (
    <UserTemplate>
      <PatientUpdate />
    </UserTemplate>
  );
};

export default PatientUpdatePage;
