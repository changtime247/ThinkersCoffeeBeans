import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import CheckoutSteps from '../components/CheckoutSteps'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { USER_PROFILE_UPDATE_RESET } from '../constants/userConstants'

const ShippingPage = () => {
  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const userProfileUpdate = useSelector((state) => state.userProfileUpdate)
  const { success } = userProfileUpdate
  const [address, setAddress] = useState(user.address || '')
  const [city, setCity] = useState(user.city || '')
  const [postalCode, setPostalCode] = useState(user.postalCode || '')
  const [country, setCountry] = useState(user.country || '')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_PROFILE_UPDATE_RESET })
        dispatch(getUserDetails('profile'))
      } else {
        setAddress(user.address)
        setCity(user.city)
        setPostalCode(user.postalCode)
        setCountry(user.country)
      }
    }
  }, [dispatch, navigate, user, userInfo, success])

  const submitHandler = async (e) => {
    e.preventDefault()
    await dispatch(
      updateUserProfile({
        id: user._id,
        address,
        city,
        postalCode,
        country,
      })
    )
    navigate('/payment')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader></Loader>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address' className='py-2'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='city' className='py-2'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter city'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='postalCode' className='py-2'>
          <Form.Label>Postal code</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter postal code'
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='country' className='py-2'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter country'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Button
          type='null'
          variant={user.address ? 'outline-success' : 'outline-primary'}
          className='my-2'
        >
          {user.address ? 'Confirm' : 'Continue'}
        </Button>
      </Form>
    </FormContainer>
  )
}
export default ShippingPage
