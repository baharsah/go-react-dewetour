// import bootstrap from 'bootstrap'
import React , {useEffect} from 'react'
import {Container , Card} from "react-bootstrap"
import GaransiImg from '../assets/garansi.svg'
import OppaKorea from '../assets/oppakorea.svg'
import Agent from '../assets/agent.svg'
import Support from '../assets/support.svg'
import AOS from 'aos';
import 'aos/dist/aos.css';

function StaticContainer() {

  useEffect(() => {
    AOS.init();
  }, [])
  return (
    <Container className='d-flex justify-content-evenly mt-n1' style={{marginTop : "-60px"}}>
    <Card  data-aos="fade-down" style={{ width: '18rem' }}>
      <Card.Body className='pb-5'>
        {/* <Card.Title>Card Title</Card.Title> */}
        <Card.Subtitle className="mb-2 d-flex text-muted mt-3">
          <img className='mx-auto' src={GaransiImg} alt="" width={"50%"} height={"50%"} srcset="" />
        </Card.Subtitle>
        <Card.Text className='text-center fw-bold pt-5'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Card.Text>
        <Card.Text className='text-center fw-normal text-muted'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Card.Text>
        {/* <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link> */}
      </Card.Body>
    </Card>
    <Card  data-aos="fade-up" style={{ width: '18rem' }}>
      <Card.Body className='pb-5'>
        {/* <Card.Title>Card Title</Card.Title> */}
        <Card.Subtitle className="mb-2 d-flex text-muted mt-3">
          <img className='mx-auto' src={OppaKorea} alt="" width={"50%"} height={"50%"} srcset="" />
        </Card.Subtitle>
        <Card.Text className='text-center fw-bold pt-5'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Card.Text>
        <Card.Text className='text-center fw-normal text-muted'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Card.Text>
        {/* <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link> */}
      </Card.Body>
    </Card>
    <Card  data-aos="fade-right" style={{ width: '18rem' }}>
      <Card.Body className='pb-5'>
        {/* <Card.Title>Card Title</Card.Title> */}
        <Card.Subtitle className="mb-2 d-flex text-muted mt-3">
          <img className='mx-auto' src={Agent} alt="" width={"50%"} height={"50%"} srcset="" />
        </Card.Subtitle>
        <Card.Text className='text-center fw-bold pt-5'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Card.Text>
        <Card.Text className='text-center fw-normal text-muted'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Card.Text>
        {/* <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link> */}
      </Card.Body>
    </Card>
    <Card  data-aos="fade-left" style={{ width: '18rem' }}>
      <Card.Body className='pb-5'>
        {/* <Card.Title>Card Title</Card.Title> */}
        <Card.Subtitle className="mb-2 d-flex text-muted mt-3">
          <img className='mx-auto' src={Support} alt="" width={"50%"} height={"50%"} srcset="" />
        </Card.Subtitle>
        <Card.Text className='text-center fw-bold pt-5'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Card.Text>
        <Card.Text className='text-center fw-normal text-muted'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Card.Text>
        {/* <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link> */}
      </Card.Body>
    </Card>
    </Container>
  )
}

export default StaticContainer