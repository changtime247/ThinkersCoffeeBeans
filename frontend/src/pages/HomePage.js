import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader.js'
import Message from '../components/Message.js'
import Product from '../components/Product.js'
import CustomPagination from '../components/CustomPagination.js'
import { listProducts } from '../actions/productActions.js'
import Splash from '../components/Splash.js'

export const HomePage = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const search = params.search
  const pageNumber = params.pageNumber || 1
  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(search, pageNumber))
  }, [dispatch, search, pageNumber])

  return (
    <>
      <Splash></Splash>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <div className='flipItContainer' style={{ background: '#fcfcfc' }}>
            <div className='flipIt'>
              <p>
                <span>p</span>
                <span>r</span>
                <span>o</span>
                <span>d</span>
                <span>u</span>
                <span>c</span>
                <span>t</span>
                <span>s</span>
              </p>
            </div>
          </div>
          <Row className='d-flex g-0 my-0'>
            {products.map((product) => (
              <Col
                sm={12}
                md={6}
                lg={6}
                xl={3}
                key={product._id}
                className='py-0'
              >
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <CustomPagination
            pages={pages}
            page={page}
            search={search ? search : ''}
          ></CustomPagination>
        </>
      )}
    </>
  )
}
