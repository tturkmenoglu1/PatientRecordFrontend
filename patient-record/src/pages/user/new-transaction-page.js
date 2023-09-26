import React from 'react'
import UserTemplate from '../../templates/user-template'
import NewTransaction from '../../components/user/transaction/new-transaction'

const NewTransactionPage = () => {
  return (
      <UserTemplate>
          <NewTransaction/>
    </UserTemplate>
  )
}

export default NewTransactionPage