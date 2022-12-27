import React from 'react'
import { Container , Row , Col , Button} from 'react-bootstrap'
import Img from '../assets/bs/profile.png'
import PaymentPending from './PaymentPending'

function Profile() {
  return (
    <>
        <Container className='mt-5 pt-5 ms-5 ps-5'>
      {/* Whitespaces */}
    </Container>


    <Container className={"m-5 p-5 bg-white border border-5 rounded-3"}>
    <Row id="profile">
        <Col>
            <Container>
                <Row>
                    <Col>
                    <h1>Personal Info</h1>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                    <h4>Nama : Arisu Lutfikahana Baharsah</h4>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                    <h4>Surel : l2phika.flower@baharsah.my.id</h4>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                    <h4>Tel : +62 888-9090901</h4>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                    <h4>Place : Logged in from Another World</h4>
                    </Col>
                </Row>
            </Container>
        </Col>
        <Col xs={4}>
        <img src={Img} alt="" width={300} height={300} />
        <Button variant="warning" className=" mt-3 fs-5 text-uppercase text-white me-2 fw-bold pt-2 pb-2 ps-3 pe-3">Change Photo Profile</Button>
        </Col>
    </Row>
    </Container>

    <PaymentPending position={'profile'}></PaymentPending>
    
    </>
  )
}

export default Profile