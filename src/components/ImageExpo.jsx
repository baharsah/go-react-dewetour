import React from 'react'
import { Container , Row , Col} from 'react-bootstrap'
import Img1 from '../assets/tu/img1.png'
import Img2 from '../assets/tu/img2.png'
import Img3 from '../assets/tu/img3.png'
import Img4 from '../assets/tu/img4.png'

const ImageExpo = (props) => {
  return (
    <Container>
    <Row>
    <Col className='col-md-auto'>
      <h1 className='mt-1 fw-bold display-1'> {props.title}</h1>
      
      </Col>
    </Row>
    <Row>
    <Col className='col-lg-2'>
      <p className='text-muted fs-3'>{props.destination}</p>
      </Col>
    </Row>
    <Row className="">
      <Col className='col-md-auto'>
      <img src={Img1} alt="" />
      </Col>
    </Row>
    <Row className='mt-3'>
    <Col className='col-md-auto'>
      <img src={Img2} alt=""/>
      </Col>
      <Col className='col-md-auto'>
      <img  src={Img3} alt="" />
      </Col>        
      <Col className='col-md-auto'>
      <img  src={Img4} alt="" />
      </Col>
    </Row>
  </Container>
  )
}

export default ImageExpo