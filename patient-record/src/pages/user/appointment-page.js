import React from 'react'
import UserTemplate from '../../templates/user-template'
import AppointmentList from '../../components/user/appointment/appointment-list'

const AppointmentPage = () => {
  return (
    <UserTemplate>
      <AppointmentList/>
    </UserTemplate>
  )
}

export default AppointmentPage