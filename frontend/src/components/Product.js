import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const Product = ({ product }) => {
  return (
    <Card className='p-3 text-center' rounded='true' key={product.id}>
      <Link to={`/product/${product._id}`}>
        <Card.Img
          src={product.image}
          variant='top'
          className='card-image-standardize-size'
        />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='h5' id='product-card-title'>
            <strong>
              {product.name.slice(0, 20)}
              {Number(product.name.length) > 20 ? '...' : ''}
            </strong>
          </Card.Title>
        </Link>
        <Card.Text as='div'>
          <Rating value={product.rating} />
          <div>{product.numReviews} reviews</div>
        </Card.Text>
        <Card.Text as='h5' className='my-0'>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product