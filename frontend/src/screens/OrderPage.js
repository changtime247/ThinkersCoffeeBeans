import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, Card, ListGroup, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { getOrderDetails, payOrder, shipOrder } from '../actions/orderActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { PayPalButton } from 'react-paypal-button-v2'
import { ORDER_PAY_RESET, ORDER_SHIP_RESET } from '../constants/orderConstants'
import { addDecimals } from '../utils/helpers'
import moment from 'moment'

const OrderPage = ({ id }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id: orderId } = useParams()
  const [sdkReady, setSdkReady] = useState(false)

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails
  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay
  const orderShip = useSelector((state) => state.orderShip)
  const { loading: loadingShip, success: successShip } = orderShip

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    }
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.setAttribute(
        'src',
        `https://www.paypal.com/sdk/js?client-id=${clientId}`
      )
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    if (!order || successPay || successShip || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_SHIP_RESET })
      dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
    // eslint-disable-next-line
  }, [dispatch, order, orderId, successPay, successShip, userInfo])

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult))
  }

  const shipHandler = (paymentResult) => {
    dispatch(shipOrder(order))
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h1>
        {order.isPaid && 'Thank you! Your order has been successfully paid!'}
      </h1>
      <Row>
        <Col md={7}>
          <ListGroup variant='flush'>
            {order.isPaid && (
              <ListGroup.Item>
                <Row>
                  <h2>Confirmation</h2>
                </Row>
                <Row>
                  <Col xs={2}>
                    <strong>Order #:</strong>
                  </Col>
                  <Col>{order._id}</Col>
                </Row>
              </ListGroup.Item>
            )}
            <ListGroup.Item>
              <Row>
                <h2>Shipping</h2>
              </Row>
              <Row>
                <Col xs={2}>
                  <strong>Name: </strong>
                </Col>
                <Col>{order.user.name}</Col>
              </Row>
              <Row>
                <Col xs={2}>
                  <strong>Email: </strong>
                </Col>
                <Col>
                  <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                </Col>
              </Row>
              <Row>
                <Col xs={2}>
                  <strong>Address: </strong>
                </Col>
                <Col>
                  {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                  {order.shippingAddress.postalCode},{' '}
                  {order.shippingAddress.country}
                </Col>
              </Row>
              {order.isShipped ? (
                <Message variant='success'>
                  Shipped on{' '}
                  {moment(order.shippedOn).format('MMM Do YY, h:mm:ss a')}
                </Message>
              ) : (
                <Message variant='danger'>
                  Not Shipped.{' '}
                  {order.isPaid &&
                    'Thank you for your purchase. Please allow up 24 hours for your order to ship.'}
                </Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <h2>Payment Method</h2>
              </Row>

              <Row>
                <Col xs={2}>
                  <strong>Method: </strong>
                </Col>
                <Col> {order.paymentMethod}</Col>
              </Row>

              {order.isPaid ? (
                <Message variant='success'>
                  Paid on {moment(order.paidAt).format('MMM Do YY, h:mm:ss a')}
                </Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty.</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${addDecimals(item.price)} = $
                          {addDecimals(item.qty * item.price)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={5}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col xs={4}>Items</Col>
                  <Col>${addDecimals(order.itemsPrice)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col xs={4}>Shipping</Col>
                  <Col>${addDecimals(order.shippingPrice)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col xs={4}>Tax</Col>
                  <Col>${addDecimals(order.taxPrice)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col xs={4}>
                    <h5>Total</h5>
                  </Col>
                  <Col>
                    <h5>${addDecimals(order.totalPrice)}</h5>
                  </Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && order.user._id === userInfo._id && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    ></PayPalButton>
                  )}
                </ListGroup.Item>
              )}
              {loadingShip && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isShipped && (
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={shipHandler}
                    >
                      Mark as shipped
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}
export default OrderPage
