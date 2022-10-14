import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Card, Button, Form } from 'react-bootstrap'
import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { addToCart } from '../actions/cartActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'

const ProductPage = () => {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  let params = useParams()
  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const {
    error: errorProductReview,
    loading: loadingProductReview,
    success: successProductReview,
  } = productReviewCreate

  useEffect(() => {
    if (successProductReview) {
      setRating(0)
      setComment('')
    }
    if (!product._id || product._id !== params.id) {
      dispatch(listProductDetails(params.id))
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
    // eslint-disable-next-line
  }, [dispatch, params, successProductReview, comment])

  const addToCartHandler = () => {
    dispatch(addToCart(product._id, qty))
    navigate(`/cart/${params.id}?qty=${qty}`)
  }
  const submitHandler = (e) => {
    e.preventDefault()
    rating &&
      comment &&
      dispatch(createProductReview(params.id, { rating, comment }))
    window.location.reload()
  }

  const increase = (countInStock) => {
    setQty((oldAmount) => {
      let tempAmount = oldAmount + 1
      if (tempAmount > countInStock) {
        tempAmount = countInStock
      }
      return tempAmount
    })
  }
  const decrease = (countInStock) => {
    setQty((oldAmount) => {
      let tempAmount = oldAmount - 1
      if (tempAmount < 1) {
        tempAmount = 1
      }
      return tempAmount
    })
  }

  return (
    <>
      <Link className='btn btn-outline-primary my-3' to='/'>
        Go back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={6}>
              <ListGroup className='md-py-3 mt-1'>
                <ListGroup.Item>
                  <div className='flipItContainer'>
                    <div className='flipIt productPage-flipIt'>
                      <p>Description</p>
                    </div>
                  </div>
                  <h3 className='my-0 text-center'>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  ></Rating>
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item className='py-4'>
                  {product.description}
                </ListGroup.Item>
              </ListGroup>
              <ListGroup className='py-3'>
                <div className='flipItContainer'>
                  <div className='flipIt productPage-flipIt'>
                    <p>Reviews</p>
                  </div>
                </div>
                {product.reviews.length === 0 && (
                  <Message>No reviews yet. Be the first to review!</Message>
                )}
                <ListGroup variant='flush'>
                  {product.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating} />
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
                  {!product.reviews.some(
                    (rev) => rev.user === userInfo?._id
                  ) && (
                    <ListGroup.Item>
                      <h2>Write a review</h2>
                      {successProductReview && (
                        <Message variant='success'>
                          Review submitted successfully
                        </Message>
                      )}
                      {loadingProductReview && <Loader />}
                      {errorProductReview && (
                        <Message variant='danger'>{errorProductReview}</Message>
                      )}
                      {userInfo ? (
                        <Form onSubmit={submitHandler}>
                          <Form.Group>
                            <Form.Label>Rating</Form.Label>
                            <Form.Control
                              as='select'
                              value={rating}
                              onChange={(e) => setRating(e.target.value)}
                            >
                              <option value=''>Select...</option>
                              <option value='5'>Excellent</option>
                              <option value='4'>Very Good</option>
                              <option value='3'>Good</option>
                              <option value='2'>Fair</option>
                              <option value='1'>Poor</option>
                            </Form.Control>
                          </Form.Group>
                          <Form.Group className='mt-2' controlId='comment'>
                            <Form.Label>Comment</Form.Label>
                            <Form.Control
                              as='textarea'
                              placeholder='Select a rating and share your review'
                              row='3'
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                            ></Form.Control>
                          </Form.Group>
                          <Button
                            disabled={loadingProductReview}
                            className='mt-2'
                            type='submit'
                            variant='outline-primary'
                          >
                            Submit
                          </Button>
                        </Form>
                      ) : (
                        <Message>
                          Please <Link to='/login'>sign in</Link> to share a
                          review
                        </Message>
                      )}
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </ListGroup>
            </Col>
            <Col
              md={{ order: 'last' }}
              xs={{ order: 'first' }}
              className='my-3'
            >
              <Card>
                <Card.Img
                  className='my-4'
                  src={product.image}
                  alt={product.name}
                ></Card.Img>
                <ListGroup>
                  <ListGroup.Item className='list-group-item-custom'>
                    <Row>
                      <Col xs={3}>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item className='list-group-item-custom'>
                    <Row>
                      <Col xs={3}>Stock:</Col>
                      <Col>
                        {product.countInStock < 20
                          ? `${product.countInStock} left in stock`
                          : product.countInStock > 0
                          ? 'In Stock'
                          : 'Out of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item className='list-group-item-custom'>
                      <Row>
                        <Col xs={3}>Qty: </Col>
                        <Col>
                          <Row>
                            <Col xs={3}>
                              <Button
                                variant='outline-primary'
                                className='margin-x-auto'
                                type='button'
                                onClick={() => decrease(product.countInStock)}
                              >
                                -
                              </Button>
                            </Col>
                            <Col align='center'>
                              <h2>{qty}</h2>
                            </Col>
                            <Col xs={3}>
                              <Button
                                variant='outline-primary'
                                className='margin-x-auto'
                                type='button'
                                onClick={() => increase(product.countInStock)}
                              >
                                +
                              </Button>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      variant='outline-success'
                      className='btn-block'
                      type='button'
                      disabled={product.countInStock < 1}
                      onClick={addToCartHandler}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}></Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ProductPage
