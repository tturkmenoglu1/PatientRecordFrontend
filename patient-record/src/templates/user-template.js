import React from 'react'
import Header from '../components/user/common/header/header.js'
import { Col, Row } from 'react-bootstrap'
import Sidebar from '../components/user/common/sidebar/sidebar.js'

const UserTemplate = ({children}) => {
  return (
    <div>
      <Header />
      <Row>
        <Col lg={3} xxl="2" className='p-0'>
          <Sidebar/>
        </Col>
        <Col lg={9} xxl="10" className='p-5'>
          {children}
        </Col>
      </Row>
    </div>
  )
}

export default UserTemplate
