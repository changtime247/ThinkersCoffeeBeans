import React from 'react'
import { Nav } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  return (
    <Nav className='justify-content-center mb-4'>
      <Nav.Item className='links-color-black'>
        {step1 ? (
          <LinkContainer to='/login'>
            <Nav.Link>{userInfo ? 'Signed in' : 'Sign In'}</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>{userInfo ? 'Signed in' : 'Sign In'}</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item className='links-color-black'>
        {step2 ? (
          <LinkContainer to='/shipping'>
            <Nav.Link>Shipping</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Shipping</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item className='links-color-black'>
        {step3 ? (
          <LinkContainer to='/payment'>
            <Nav.Link>Payment</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Payment</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item className='links-color-black'>
        {step4 ? (
          <LinkContainer to='/placeOrder'>
            <Nav.Link>Place Order</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Place Order</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  )
}
export default CheckoutSteps
