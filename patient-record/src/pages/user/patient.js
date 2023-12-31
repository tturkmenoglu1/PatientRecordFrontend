import React from 'react'
import PatientList from '../../components/user/patient/patient-list'
import UserTemplate from '../../templates/user-template'

const Patient = () => {
  return (
    <UserTemplate>
      <PatientList/>
    </UserTemplate>
  )
}

export default Patient