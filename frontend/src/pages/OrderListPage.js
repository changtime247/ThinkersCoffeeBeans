import React, { useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listAllOrders } from '../actions/orderActions'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

const OrderListPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const orderListAll = useSelector((state) => state.orderListAll)
  const { loading, error, orders } = orderListAll

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listAllOrders())
    } else {
      navigate('/login')
    }
  }, [dispatch, navigate, userInfo])

  return (
    <>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table
          variant='light'
          striped
          bordered
          hover
          responsive
          className='table-sm'
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>EMAIL</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>SHIPPED</th>
              <th>DETAILS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              return (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user && order.user.name}</td>
                  <td>
                    <a href={`mailto:${order.user.email}`}>
                      {order.user.email}
                    </a>
                  </td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      moment(order.paidAt).format('MM/DD/YY, h:mma')
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isShipped ? (
                      moment(order.shippedOn).format('MM/DD/YY, h:mma')
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td className='d-flex justify-content-evenly'>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button variant='outline-primary' className='btn-sm'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      )}
    </>
  )
}
export default OrderListPage
