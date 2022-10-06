import { Card, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import aboutImg from '../assets/about-us.jpg'

function AboutUsPage() {
  return (
    <Container>
      <div className='flipItContainer'>
        <div className='flipIt'>
          <p>
            <span>A</span>
            <span>b</span>
            <span>o</span>
            <span>u</span>
            <span>t</span>
            <span>&nbsp;</span>
            <span>u</span>
            <span>s</span>
          </p>
        </div>
      </div>
      <Card className='rounded py-2 px-3' id='about-us'>
        <Row>
          <Col lg={6}>
            <Card.Img fluid rounded src={aboutImg}></Card.Img>
          </Col>
          <Col>
            <p className='lead text-center'>
              Thinker's was founded on a belief that coffee should be fresh and
              ethical. We roast premium coffee beans in small batches because
              freshly roasted coffee always taste great. And we source coffee
              beans from around the world in a humane and socially responsible
              way. We love engaging in conversation about fair trade or about
              roasting techniques. Whatever your choice of topic, we think you
              will enjoy our coffee.
              <Link xs={2} to='/' className='btn btn-outline-primary mt-4'>
                Back home
              </Link>
            </p>
          </Col>
        </Row>
      </Card>
    </Container>
  )
}

export default AboutUsPage
