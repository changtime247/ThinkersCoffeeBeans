import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Row,
  Col,
  ListGroup,
  Image,
  Button,
  Card,
  Container,
} from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'
import { addDecimals } from '../utils/helpers'

const CartPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }
  const checkoutHandler = (id) => {
    navigate('/login/?redirect=/shipping')
    window.location.reload(true)
  }
  const increase = ({ product, countInStock, qty }) => {
    qty += 1
    qty <= countInStock && dispatch(addToCart(product, Number(qty)))
  }
  const decrease = ({ product, qty }) => {
    qty -= 1
    qty > 0 && dispatch(addToCart(product, Number(qty)))
  }

  return (
    <Container>
      <h1>Shopping Cart</h1>
      <Row id='cart-page-row'>
        <Col>
          {cartItems.length === 0 ? (
            <Message>
              Your cart is empty. <Link to='/'>Go back.</Link>
            </Message>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row className='cart-items'>
                    <Col xs={8} md={3}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        fluid
                        rounded
                      ></Image>
                    </Col>
                    <Col xs={4} md={2}>
                      <Container>
                        <Row>
                          <Button
                            variant='outline-primary'
                            type='button'
                            onClick={() => increase(item)}
                          >
                            <i className='fa fa-plus'></i>
                          </Button>
                        </Row>
                        <Row>
                          <h2 id='cart-page-p'>{item.qty}</h2>
                        </Row>
                        <Row>
                          <Button
                            variant='outline-primary'
                            type='button'
                            onClick={() => decrease(item)}
                          >
                            <i className='fa fa-minus'></i>
                          </Button>
                        </Row>
                      </Container>
                    </Col>
                    <Col xs={6} md={4}>
                      <h4>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </h4>
                    </Col>
                    <Col xs={3} md={2}>
                      <h5>${addDecimals(item.qty * item.price)}</h5>
                    </Col>
                    <Col xs={2} md={1}>
                      <Button
                        type='button'
                        variant='danger'
                        className='btn-sm'
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className='fa fa-trash'></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
      </Row>
      <Row md={2} className='justify-content-md-end'>
        <Col>
          <Card bg='success' className='mb-5'>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col xs={4}>Total items:</Col>
                  <Col>
                    {cartItems.reduce((acc, item) => +acc + +item.qty, 0)} item
                    {cartItems.reduce((acc, item) => +acc + +item.qty, 0) > 1 &&
                      's'}
                  </Col>
                </Row>
                <Row>
                  <Col xs={4}>Subtotal:</Col>
                  <Col>
                    $
                    {addDecimals(
                      cartItems.reduce(
                        (acc, item) => acc + item.qty * item.price,
                        0
                      )
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col className='d-flex justify-content-end'>
                    <span style={{ color: '#029acf' }}>
                      Free shipping for orders $50+
                    </span>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  variant={
                    cartItems.length ? 'outline-success' : 'outline-danger'
                  }
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed to checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default CartPage
