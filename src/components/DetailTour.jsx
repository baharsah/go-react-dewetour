import React from 'react'
import { Row , Col , Placeholder , Button} from 'react-bootstrap'
import { Container , Modal} from 'react-bootstrap'
import ImageExpo from './ImageExpo'
import ImgCalendar from '../assets/mi/calendar.svg'
import ImgHotel from '../assets/mi/hotel.svg'
import ImgMeal from '../assets/mi/meal.svg'
import ImgTime from '../assets/mi/time.svg'
import ImgPlane from '../assets/mi/plane.svg'
import { Form } from 'react-bootstrap'
import DataDetail from '../dummy/data'
import { useState } from 'react'
import { useParams ,useNavigate} from 'react-router'



function DetailTour() {

  const navi = useNavigate()

 const  onExitStatus = () => {
  navi('/tour/pending')
 }

  const {id} = useParams()

 const  [data , modData]  = useState(DataDetail)
 var [counter , setCounter] = useState(1)
 const [show, setShow] = useState(false);

 const handleClose = () => setShow(false);
 const handleShow = () => setShow(true);

 function book(){

 }
 function c(x) {
  x = x.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x))
      x = x.replace(pattern, "$1,$2");
  return x;
 }

 var incrementalValue = ()=> {
  if (data[id].avail == counter) {setCounter(data[id].avail) } else { setCounter (counter + 1) } 
 }
 
 var decrementalValue = ()=> {
  if (counter == 1) {setCounter(1) } else { setCounter (counter - 1) } 
  
 }
  return (
    <>
    {/* <Container style={{height : "50px"}}></Container> */}
    <Container className='mt-5 pt-5 ms-5 ps-5'>
      {/* Whitespaces */}
    </Container>
    <ImageExpo destination={data[0].destination} title={data[id].tourName}>

    </ImageExpo>
    <Container className='mt-5 mb-5'>
    
        <h3 className=' fw-bold mb-4'>Information Trip</h3>
        <Row>
          <Col>
            <h5 className='text-muted'>Accomodation</h5> 
            <p> <img src={ImgHotel} alt="" /> {data[id].accomodation}</p>        
         
          </Col>
          <Col>
          <h5 className='text-muted'>Transportation</h5> 
          <p> <img src={ImgPlane} alt="" /> {data[id].transportation}</p>        

          </Col>
          <Col>
          <h5 className='text-muted'>Eat</h5> 
          <p> <img src={ImgMeal} alt="" /> {data[id].eatenary}</p>        
   
          </Col>
          <Col>
          <h5 className='text-muted'>Duration</h5> 
          <p> <img src={ImgTime} alt="" /> {data[id].duration}</p>         
          </Col>
          <Col>
          <h5 className='text-muted'>Date Trip</h5> 
          <p> <img src={ImgCalendar} alt="" /> {data[id].startDate}</p>        
          </Col>
        </Row>
        <Row>
          <Col>
          <h3>Description</h3>
          <p className='text-muted'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi omnis, 
          laudantium nulla voluptas doloremque molestias quod pariatur laboriosam. 
          Nam, dignissimos ratione reiciendis mollitia sed eveniet pariatur eum laborum deleniti quos.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio, atque. 
          Ratione perspiciatis numquam ut suscipit illum minima corrupti eveniet sed facilis nihil obcaecati laborum neque, 
          labore corporis consequuntur,
           praesentium vitae!</p>
          </Col>
        </Row>
        <Row className='border-bottom mb-3'>
          <Col>
          <h3><span className='text-warning'>{c(data[id].price)} </span> / Person</h3>
          </Col>
          <Col xl>&nbsp;</Col>
          <Col xl>&nbsp;</Col>
          {/* <Col xl>&nbsp;</Col> */}
          {/* <Col xl>&nbsp;</Col> */}

          <Col xl={3}>
              <div className="input-group">
                <span className="input-group-prepend">
                    <Button onClick={decrementalValue} type="button" className="btn btn-warning btn-number rounded-end" >
                        <span className="fa fs-5 fw-bold fa-minus"> - </span>
                    </Button>
                </span>
                <Form.Control type="text"  style={{backgroundColor : 'white' , border : 'none'}} name="quant[1]" className=" form-control-plaintext text-center h2 form-control input-number" value={counter} readOnly ></Form.Control>
                <span className="input-group-append">
                    <Button onClick={incrementalValue} type="button" className="btn btn-warning btn-number rounded-end">
                        <span className="fa fs-5 fa-plus fw-bold "> + </span>
                    </Button>
                </span>
            </div>
          </Col>
        </Row>
        <Row className='border-bottom mb-3'>
          <Col>
          <h3>Total</h3>
          </Col>
          <Col xl>&nbsp;</Col>
          <Col xs>
          <h3 className='text-warning'>{c(data[id].price * counter)}</h3>
          </Col>
        </Row>
        <Row className='flex-row-reverse'>
          <Col md={{ span: 1, offset: 1 }}>
          <Button variant="warning" onClick={handleShow} className="fs-5 text-uppercase text-white me-3 fw-bold pt-2 pb-2 ps-5 pe-5">book</Button>
          </Col>
        </Row>
    </Container>
    <Modal show={show} onHide={handleClose} onExit={onExitStatus}>
        <Modal.Body>Order berhasil! silahkan <b>sentuh atau klik apa saja pada tampilan ini </b>untuk pergi ke bukti bayar anda</Modal.Body>

      </Modal>
    </>
  )
}

export default DetailTour