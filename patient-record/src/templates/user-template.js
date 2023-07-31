import React from 'react'
import Header from '../components/user/common/header/header.js'

const UserTemplate = ({children}) => {
  return (
    <div>
      <Header/>
        {children}
    </div>
  )
}

export default UserTemplate
