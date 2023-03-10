import React from 'react'
import { Row , Col , Placeholder , Button} from 'react-bootstrap'
import { useQuery } from 'react-query'
import { Container , Modal} from 'react-bootstrap'
import ImageExpo from './ImageExpo'
import ImgCalendar from '../assets/mi/calendar.svg'
import ImgHotel from '../assets/mi/hotel.svg'
import ImgMeal from '../assets/mi/meal.svg'
import ImgTime from '../assets/mi/time.svg'
import ImgPlane from '../assets/mi/plane.svg'
import { Form } from 'react-bootstrap'
import DataDetail from '../dummy/data'
import { useState , useEffect , useContext} from 'react'
import { useParams ,useNavigate} from 'react-router'
import anime from "animejs/lib/anime.es.js"
import {API} from "../config/api"
import {UserContext} from './context/userProvider';
import moment from 'moment/moment'






function DetailTour() {

  var [state , dispatch] = useContext(UserContext)

useEffect(() => {
  //change this to the script source you want to load, for example this is snap.js sandbox env
  const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
  //change this according to your client-key
  const myMidtransClientKey = import.meta.env.VITE_MDTRNS_CLIENT_KEY;

  let scriptTag = document.createElement("script");
  scriptTag.src = midtransScriptUrl;
  // optional if you want to set script attribute
  // for example snap.js have data-client-key attribute
  scriptTag.setAttribute("data-client-key", myMidtransClientKey);

  document.body.appendChild(scriptTag);
  return () => {
    document.body.removeChild(scriptTag);
  };
}, []);

  const {id} = useParams()


  let {isFetching , data : trip , status} = useQuery("tripCache"  , async () => {


    const response =  await API.get( `/trip/${id}`)
    return response.data.data
  })

   // console.log(trips)
   if (status === 'success') {
    console.log("ini data" , trip)

    // return <div>{data.name}</div>;
  }


  useEffect(() => {



    anime({
      targets: '.animation',
      scale : [0 ,1],
      // opacity : [0 , 1] ,
      easing: 'easeInOutQuad', 
      duration : 300
      
    });
    
  } , [])
  const navi = useNavigate()

 const  onExitStatus = () => {
  navi('/tour/pending')
 }

//  counter datetime 

const from = new Date(trip?.FromDate);
const to = new Date(trip?.ToDate);

const diffTime = Math.abs(to - from);
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
const diffNights = diffDays - 1;

document.body.scrollTop = 0;

//  const  [data , modData]  = useState(DataDetail)
 var [counter , setCounter] = useState(1)
 const [show, setShow] = useState(false);

 const handleClose = () => setShow(false);
 const handleShow = async() => {
  const response = await API.post("/transaction" ,{counterQty : counter , userId : state.user.id , tripId : parseInt(id) });

  const token = response?.data.data.token;
  
  window.snap.pay(token, {
    onSuccess: function (result) {
      /* You may add your own implementation here */
      console.log(result);
      history.push("/profile");
    },
    onPending: function (result) {
      /* You may add your own implementation here */
      console.log(result);
      history.push("/profile");
    },
    onError: function (result) {
      /* You may add your own implementation here */
      console.log(result);
    },
    onClose: function () {
      /* You may add your own implementation here */
      alert("you closed the popup without finishing the payment");
    },
  });
 };

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
  if (trip?.Quota == counter) {setCounter(trip?.Quota) } else { setCounter (counter + 1) } 
 }
 
 var decrementalValue = ()=> {
  if (counter == 1) {setCounter(1) } else { setCounter (counter - 1) } 
  
 }
 if(isFetching){

  return(<>
  <Container className='mt-5 pt-5 ms-5 ps-5'>
  {/* Whitespaces */}
</Container>
  <img style={ {margin : 300} }  className="scale-up-center"src="https://3.bp.blogspot.com/-WqX6Ng-AgmE/XWcsn3C5HaI/AAAAAAAADeE/qY_OeWR2zf0N0o7TVOI0Sx8v60ohQP1NgCLcBGAs/s1600/1567036546540.jpg" alt="" srcset="" />
  </>)
 }else{


  return (
    <div className='animation'>
    {/* <Container style={{height : "50px"}}></Container> */}
    <Container className='mt-5 pt-5 ms-5 ps-5'>
      {/* Whitespaces */}
    </Container>
    <ImageExpo images={trip?.ImageTrips} destination={trip?.destinationName} title={trip?.Title}>

    </ImageExpo>
    <Container className='mt-5 mb-5'>
    
        <h3 className=' fw-bold mb-4'>Information Trip</h3>
        <Row>
          <Col>
            <h5 className='text-muted'>Accomodation</h5> 
            <p> <img src={ImgHotel} alt="" /> {trip?.Accomodation}</p>        
         
          </Col>
          <Col>
          <h5 className='text-muted'>Transportation</h5> 
          <p> <img src={ImgPlane} alt="" /> {trip?.Transportation}</p>        

          </Col>
          <Col>
          <h5 className='text-muted'>Eat</h5> 
          <p> <img src={ImgMeal} alt="" /> {trip?.Eatenary}</p>        
   
          </Col>
          <Col>
          <h5 className='text-muted'>Duration</h5> 
          <p> <img src={ImgTime} alt="" /> {diffNights} Hari {diffDays} Malam</p>         
          </Col>
          <Col>
          <h5 className='text-muted'>Date Trip</h5> 
          <p> <img src={ImgCalendar} alt="" /> {moment(trip?.FromDate).format('DD MMMM YYYY HH:mm [WIB]') }</p>        
          </Col>
        </Row>
        <Row>
          <Col>
          <h3>Description</h3>
          <p className='text-muted'>{trip?.Description}</p>
          </Col>
        </Row>
        <Row className='border-bottom mb-3'>
          <Col>
          <h3><span className='text-warning'>{c(trip?.Price)} </span> / Person</h3>
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
          <h3 className='text-warning'>{c(trip?.Price * counter)}</h3>
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
    </div>
  )
}
 }
 

export default DetailTour