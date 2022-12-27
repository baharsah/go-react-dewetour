import React from 'react'
import { Container  , Row , Col} from 'react-bootstrap'
import axios from 'axios'
import { Button } from 'bootstrap'

function IncTrx() {


  return (
    
      <>
      
      <Container className='mt-5 pt-5 ms-5 ps-5'>
      {/* Whitespaces */}
    </Container>
    <Container className='m-5'>
    <h3>Latest added Trips</h3>
    
    {/* if youre think loop, idk */}

    <Row>
    <Col>#</Col>
    <Col>User</Col>
    <Col>Trip to</Col>
    <Col>Trf Assets</Col>
    <Col>Status</Col>
    <Col>Action</Col>

    </Row>

  


          <Row >
          <Col>1</Col>
          <Col>Lebah Berantem</Col>
          <Col>Bali</Col>
          <Col>s3cloud-cgk.baharsah.my.id/assets/noap/sq/e.jpg&t=223</Col>
          <Col>
           <p className={'text-success'}>Success</p>
          </Col>
          <Col>Action</Col>
      
          </Row>


          <Row>
          <Col>1</Col>
          <Col>Lebah Berantem</Col>
          <Col>Bali</Col>
          <Col>s3cloud-cgk.baharsah.my.id/assets/noap/sq/e.jpg&t=223</Col>
          <Col>
           <p className={'text-success'}>Success</p>
          </Col>
          <Col>Action</Col>
      
          </Row>

<Row>
<Col>1</Col>
<Col>Lebah Berantem</Col>
<Col>Bali</Col>
<Col>s3cloud-cgk.baharsah.my.id/assets/noap/sq/e.jpg&t=223</Col>
<Col>
 <p className={'text-success'}>Success</p>
</Col>
<Col>Action</Col>

</Row>

<Row>
<Col>1</Col>
<Col>Lebah Berantem</Col>
<Col>Bali</Col>
<Col>s3cloud-cgk.baharsah.my.id/assets/noap/sq/e.jpg&t=223</Col>
<Col>
 <p className={'text-success'}>Success</p>
</Col>
<Col>Action</Col>

</Row>

<Row>
<Col>1</Col>
<Col>Lebah Berantem</Col>
<Col>Bali</Col>
<Col>s3cloud-cgk.baharsah.my.id/assets/noap/sq/e.jpg&t=223</Col>
<Col>
 <p className={'text-success'}>Success</p>
</Col>
<Col>Action</Col>

</Row>

<Row>
<Col>1</Col>
<Col>Lebah Berantem</Col>
<Col>Bali</Col>
<Col>s3cloud-cgk.baharsah.my.id/assets/noap/sq/e.jpg&t=223</Col>
<Col>
 <p className={'text-success'}>Success</p>
</Col>
<Col>Action</Col>

</Row>

<Row>
<Col>1</Col>
<Col>Lebah Berantem</Col>
<Col>Bali</Col>
<Col>s3cloud-cgk.baharsah.my.id/assets/noap/sq/e.jpg&t=223</Col>
<Col>
 <p className={'text-success'}>Success</p>
</Col>
<Col>Action</Col>

</Row>


    </Container>


    </>

  )
}

export default IncTrx