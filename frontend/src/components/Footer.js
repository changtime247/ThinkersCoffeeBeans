import React from 'react'
import { Container, Row, Col, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Footer = () => {
  return (
    <footer className='py-3 bg-white'>
      <Container>
        <Row>
          <Col className='d-flex justify-content-center py-3 gap-3'>
            <LinkContainer to='/aboutUs' className='border-right'>
              <Nav.Link className='nav-links-spacer'>
                About us &nbsp;&nbsp;
              </Nav.Link>
            </LinkContainer>
            <span>&copy; 2022 Thinker's Coffee Beans</span>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
