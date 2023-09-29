import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/user/home-page";
import Patient from "../pages/user/patient";
import NotFoundPage from "../pages/common/not-found-page";
import NewPatient from "../pages/user/new-patient-page";
import LoginPage from "../pages/common/login-page";
import NewAppointmentPage from "../pages/user/new-appointment-page";
import AppointmentPage from "../pages/user/appointment-page";
import AppointmentDetailPage from "../pages/user/appointment-details-page";
import PatientDetailPage from "../pages/user/patient-detail-page";
import PatientUpdatePage from "../pages/user/patient-update-page";
import NewTransactionPage from "../pages/user/new-transaction-page";
import TransactionListPage from "../pages/user/transaction-list-page";
import TransactionDetailPage from "../pages/user/transaction-detail-page";

const CustomRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<LoginPage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="appointment">
            <Route index element={<AppointmentPage />} />
            <Route path="new" element={<NewAppointmentPage />} />
            <Route path=":appointmentId" element={<AppointmentDetailPage />} />
          </Route>
          <Route path="patient">
            <Route index element={<Patient />} />
            <Route path="new" element={<NewPatient />} />
            <Route path=":patientId" element={<PatientDetailPage />} />
            <Route path=":patientId/update" element={<PatientUpdatePage />} />
          </Route>
          <Route path="transaction">
            <Route index element={<TransactionListPage />} />
            <Route path="new" element={<NewTransactionPage />} />
            <Route path=":transactionId" element={<TransactionDetailPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default CustomRoutes;
