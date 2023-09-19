import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from '../pages/user/home-page'
import Patient from '../pages/user/patient'
import Transaction from '../pages/user/transaction'
import NotFoundPage from "../pages/common/not-found-page"
import NewPatient from '../pages/user/new-patient-page'
import LoginPage from '../pages/common/login-page'
import NewAppointmentPage from '../pages/user/new-appointment-page'
import AppointmentPage from '../pages/user/appointment-page'
import AppointmentDetailPage from '../pages/user/appointment-details-page'

const CustomRoutes = () => {
  return (
      <BrowserRouter>
          <Routes>
              <Route path='/'>
                  <Route index element={<LoginPage />} />
                  <Route path='home' element={<HomePage/>} />
                  <Route path='appointment'>
                    <Route index element={<AppointmentPage />} />
                    <Route path=':appointmentId' element={<AppointmentDetailPage />} />
                  </Route>
                  <Route path='new-appointment' element={<NewAppointmentPage />} />
                  <Route path='new-patient' element={<NewPatient/>} />
                  <Route path='patient' element={<Patient/>}/>
                  <Route path='transaction' element={<Transaction/>}/>
              </Route>

              <Route path='*' element={<NotFoundPage/>}/>
        </Routes>
      </BrowserRouter>
  )
}

export default CustomRoutes