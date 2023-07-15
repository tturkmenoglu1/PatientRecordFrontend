import React from 'react'
import Header from '../components/user/common/header/header.js'
import Footer from '../components/user/common/footer/footer.js'

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
