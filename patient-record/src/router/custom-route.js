import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from '../pages/user/home-page'
import Appointment from '../pages/user/appointment'
import Patient from '../pages/user/patient'
import Transaction from '../pages/user/transaction'
import NotFoundPage from "../pages/common/not-found-page"
import NewPatient from '../pages/user/new-patient-page'
import LoginPage from '../pages/common/login-page'

const CustomRoutes = () => {
  return (
      <BrowserRouter>
          <Routes>
              <Route path='/'>
                  <Route index element={<LoginPage />} />
                  <Route path='home' element={<HomePage/>} />
                  <Route path='appointment' element={<Appointment />} />
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