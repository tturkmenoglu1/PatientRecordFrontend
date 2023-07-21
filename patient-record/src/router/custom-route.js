import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from '../pages/user/home-page'
import Appointment from '../pages/user/appointment'
import Patience from '../pages/user/patience'
import Transaction from '../pages/user/transaction'
import NotFoundPage from "../pages/common/not-found-page"

const CustomRoutes = () => {
  return (
      <BrowserRouter>
          <Routes>
              <Route path='/'>
                  <Route index element={HomePage} />
                  <Route path='appointment' element={Appointment}/>
                  <Route path='patience' element={Patience}/>
                  <Route path='transaction' element={Transaction}/>
              </Route>

              <Route path='*' element={<NotFoundPage/>}/>
        </Routes>
      </BrowserRouter>
  )
}

export default CustomRoutes