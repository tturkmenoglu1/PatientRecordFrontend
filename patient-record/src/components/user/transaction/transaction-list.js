import React, { Fragment } from 'react'
import { getAllTransactionByPage } from '../../../api/transaction-service';
import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from '../../../helpers/functions/swal';
import { Card, Col, Container, Pagination, Row } from 'react-bootstrap';
import Loading from '../../common/loading/loading';
import { Link } from 'react-router-dom';

const TransactionList = () => {
  const [transactionList, setTransactionList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paging, setPaging] = useState({});

  const loadData = async (page) => {
    setLoading(true);
    try {
      const response = await getAllTransactionByPage(page);
      console.log(response)
      const {content, totalPages, pageable} = response.data
      setTransactionList(content);
      setPaging({ totalPages, pageNumber: pageable.pageNumber });
    } catch (error) {
      toast(error.response.data.message, "error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  
  }, [])
  

  return (
    <Container>
      {loading ? (
        <Loading/>
      ) : (
          <>
            {transactionList.map((transaction, i) => (
              <Link to={`/transaction/${transaction.id}`} key={i}>
                <Card className='mb-3'>
                  <Row>
                    <Col>
                      <Card.Title>
                       {transaction.patient.firstName + " " + transaction.patient.lastName}
                      </Card.Title>
                    </Col>
                  </Row>
                </Card>
              </Link>
            ))}
            {paging.totalPages > 1 && (
              <Row className='mt-5 justify-content-center'>
                <Pagination className='pagination'>
                  {paging.pageNumber > 0 && (
                    <>
                      <Pagination.First onClick={() => loadData(0)} />
                      <Pagination.Prev onClick={()=>loadData(paging.pageNumber-1)}/>
                    </>
                  )}
                  {paging.pageNumber > 2 && (
                  <Pagination.Ellipsis
                    onClick={() => loadData(paging.pageNumber - 2)}
                  />
                )}
                {[...Array(paging.totalPages)].map((item, index) => (
                  <Fragment key={index}>
                    {index === paging.pageNumber && (
                      <Pagination.Item active>{index + 1}</Pagination.Item>
                    )}
                    {index !== paging.pageNumber &&
                      index >= Math.max(0, paging.pageNumber - 1) &&
                      index <=
                        Math.min(
                          paging.totalPages - 1,
                          paging.pageNumber + 1
                        ) && (
                        <Pagination.Item
                          key={index}
                          onClick={() => loadData(index)}
                        >
                          {index + 1}
                        </Pagination.Item>
                      )}
                  </Fragment>
                ))}
                {paging.pageNumber < paging.totalPages - 3 && (
                  <Pagination.Ellipsis
                    onClick={() => loadData(paging.pageNumber + 2)}
                  />
                )}
                {paging.pageNumber < paging.totalPages - 1 && (
                  <>
                    <Pagination.Next
                      onClick={() => loadData(paging.pageNumber + 1)}
                    />
                    <Pagination.Last
                      onClick={() => loadData(paging.totalPages - 1)}
                    />
                  </>
                )}
                </Pagination>
              </Row>
            )}
          </>
      )
      }
    </Container>
  )
}

export default TransactionList