import React from 'react'
import TransactionList from '../../components/user/transaction/transaction-list'
import UserTemplate from '../../templates/user-template'

const TransactionListPage = () => {
  return (
    <UserTemplate>
      <TransactionList/>
    </UserTemplate>
  )
}

export default TransactionListPage