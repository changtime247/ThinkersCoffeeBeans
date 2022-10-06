import React from 'react'
import { Card, Row } from 'react-bootstrap'
import splashImage from '../assets/splashImage.jpg'

const Splash = () => {
  return (
    <Row className='d-flex justify-content-xs-center mx-1' id='splash'>
      <Card>
        <Card.Body>
          <Card.Img src={splashImage} alt='coffee beans'></Card.Img>
          <Card.Title className='text-center'>
            <div className='flipItContainer'>
              <div className='flipIt'>
                <p>
                  <span className='spinIt' style={{ '--i': 1 }}>
                    T
                  </span>
                  <span className='spinIt' style={{ '--i': 2 }}>
                    h
                  </span>
                  <span className='spinIt' style={{ '--i': 3 }}>
                    o
                  </span>
                  <span className='spinIt' style={{ '--i': 4 }}>
                    u
                  </span>
                  <span className='spinIt' style={{ '--i': 5 }}>
                    g
                  </span>
                  <span className='spinIt' style={{ '--i': 6 }}>
                    h
                  </span>
                  <span className='spinIt' style={{ '--i': 7 }}>
                    t
                  </span>
                  <br />
                  <span className='spinIt' style={{ '--i': 1 }}>
                    f
                  </span>
                  <span className='spinIt' style={{ '--i': 3 }}>
                    u
                  </span>
                  <span className='spinIt' style={{ '--i': 4 }}>
                    l
                  </span>
                  <span className='spinIt' style={{ '--i': 6 }}>
                    l
                  </span>
                  <span className='spinIt' style={{ '--i': 7 }}>
                    y
                  </span>
                  <br />
                  <span className='spinIt' style={{ '--i': 1 }}>
                    R
                  </span>
                  <span className='spinIt' style={{ '--i': 2 }}>
                    o
                  </span>
                  <span className='spinIt' style={{ '--i': 3 }}>
                    a
                  </span>
                  <span className='spinIt' style={{ '--i': 4 }}>
                    s
                  </span>
                  <span className='spinIt' style={{ '--i': 5 }}>
                    t
                  </span>
                  <span className='spinIt' style={{ '--i': 6 }}>
                    e
                  </span>
                  <span className='spinIt' style={{ '--i': 7 }}>
                    d
                  </span>
                  <br />
                  <span className='spinIt' style={{ '--i': 1 }}>
                    C
                  </span>
                  <span className='spinIt' style={{ '--i': 2 }}>
                    o
                  </span>
                  <span className='spinIt' style={{ '--i': 4 }}>
                    f
                  </span>
                  <span className='spinIt' style={{ '--i': 5 }}>
                    f
                  </span>
                  <span className='spinIt' style={{ '--i': 6 }}>
                    e
                  </span>
                  <span className='spinIt' style={{ '--i': 7 }}>
                    e
                  </span>
                </p>
              </div>
            </div>
          </Card.Title>
          <Card.Text className='text-center margin-x-auto width-n'>
            Enjoy a cup of our freshly roasted single-origin or special blend
            coffees sourced from around the world to brew the way you like.
            <br />
            Not just for the taste. Our coffee also offers some impressive brain
            benefits.
          </Card.Text>
        </Card.Body>
      </Card>

      {/* <Col className='hero-media-container'> */}
      {/* <img src={splashImage} alt='wooden table' className='main-img' /> */}
      {/* <Image src={splashImage} fluid roundedCircle id='splashImage'></Image> */}
      {/* <Image src={splashImage2} className='accent-img'></Image> */}
      {/* <img
          src={splashImage2}
          alt='woodworker at work'
          className='accent-img'
        /> */}
      {/* </Col> */}
    </Row>
  )
}

export default Splash
