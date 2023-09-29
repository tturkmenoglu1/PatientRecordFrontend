import React from "react";
import UserTemplate from "../../templates/user-template";
import TransactionDetail from "../../components/user/transaction/transaction-detail";

const TransactionDetailPage = () => {
  return (
    <UserTemplate>
      <TransactionDetail />
    </UserTemplate>
  );
};

export default TransactionDetailPage;
