import React from 'react'
import Header from '../components/user/common/header/Header'
import Footer from '../components/user/common/footer/Footer'

const UserTemplate = ({children}) => {
  return (
    <div>
      <Header/>
        {children}
      <Footer/>
    </div>
  )
}

export default UserTemplate
