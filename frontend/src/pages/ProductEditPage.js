import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProductDetails, updateProduct } from '../actions/productActions'
import FormContainer from '../components/FormContainer'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

const ProductEditPage = () => {
  const { id: productId } = useParams()
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [price, setPrice] = useState(0)
  const [category, setCategory] = useState('')
  const [roast, setRoast] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)
  const [errorMessageShownAll, setErrorMessageShownAll] = useState(null)
  const [errorMessageShownPrice, setErrorMessageShownPrice] = useState(null)
  const errorMessageShownAllDiv = errorMessageShownAll ? (
    <span className='errorMessageShownPrice'>{errorMessageShownAll}</span>
  ) : (
    ''
  )
  const errorMessageShownPriceDiv = errorMessageShownPrice ? (
    <span className='errorMessageShownPrice'>{errorMessageShownPrice}</span>
  ) : (
    ''
  )

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails
  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      navigate('/admin/productList')
    } else {
      if (!product || !product.name || product._id !== productId) {
        dispatch(listProductDetails(productId))
      } else {
        setName(product.name)
        setImage(product.image)
        setPrice(product.price)
        setCategory(product.category)
        setRoast(product.roast)
        setCountInStock(product.countInStock)
        setDescription(product.description)
      }
    }
  }, [dispatch, product, productId, navigate, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    if (
      !name ||
      name === 'Name' ||
      !image ||
      !price ||
      !category ||
      category === 'Category' ||
      !roast ||
      roast === 'Roast' ||
      !countInStock ||
      !description ||
      description === 'Description'
    ) {
      setErrorMessageShownAll('Please fill out all fields with valid entries.')
    } else if (
      !price.toString().includes('.') ||
      price.toString().split`.`[1].length !== 2
    ) {
      setErrorMessageShownPrice('(Please enter a valid price.)')
    } else {
      dispatch(
        updateProduct({
          _id: productId,
          name,
          image,
          price,
          category,
          roast,
          countInStock,
          description,
        })
      )
    }
  }
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const { data } = await axios.post('/api/upload', formData, config)
      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  return (
    <>
      <Link to='/admin/productList' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit product</h1>
        {errorMessageShownAllDiv}
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form className='forms-font-size' onSubmit={submitHandler}>
            <Form.Group controlId='name' className='py-2'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='price' className='py-2'>
              <Form.Label>Price {errorMessageShownPriceDiv}</Form.Label>
              <Form.Control
                type='number'
                variant='danger'
                placeholder="Enter price with decimals and without '$' (ex: 19.99)"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='image' className='py-2'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.Control
                type='file'
                // id='image-file'
                // custom
                label='Choose file'
                onChange={uploadFileHandler}
              ></Form.Control>
              {uploading && <Loader />}
            </Form.Group>
            <Form.Group controlId='roast' className='py-2'>
              <Form.Label>Roast</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter roast'
                value={roast}
                onChange={(e) => setRoast(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='countInStock' className='py-2'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter countInStock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='category' className='py-2'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='description' className='py-2'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as='textarea'
                rows='10'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type='submit' variant='dark' className='my-2'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}
export default ProductEditPage
