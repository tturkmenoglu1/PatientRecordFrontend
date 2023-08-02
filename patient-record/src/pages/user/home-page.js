import React from 'react'
import UserTemplate from '../../templates/user-template'
import { Card, Col, Container , Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import MainMenu from '../../components/user/common/main-menu/main-menu'

const HomePage = () => {
  return (
    <UserTemplate>
        <MainMenu/>
      </UserTemplate>
  )
}

export default HomePage 