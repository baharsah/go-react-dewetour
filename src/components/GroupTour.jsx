import { useState , useContext } from 'react'
import  Img1 from '../assets/bs/img1.png'
import  Img2 from '../assets/bs/img2.png'
import  Img3 from '../assets/bs/img3.png'
import  Img4 from '../assets/bs/img4.png'
import  Img5 from '../assets/bs/img5.png'
import  Img6 from '../assets/bs/img6.png'
import CardGroupTour from './CardGroupTour'
import {API} from "../config/api"
import { useQuery} from 'react-query'
import {Button , Modal , InputGroup , Form , Container , Row , Col} from 'react-bootstrap'
import { UserContext } from './context/userProvider';


function GroupTour() {

  // perintah edit disini



  var [state , dispatch] = useContext(UserContext)

  const [ctryUpdateStatus ,setCtryUpdateStatus] = useState(null)
  const [ctryDeleteStatus, setCtryDeleteStatus] = useState(null)
  const [ctryEditCount , setCtryEditCount] = useState(0)

  const resetCtryStatus = () => {
    setCtryDeleteStatus(null)
    setCtryUpdateStatus(null)
    setCtryEditCount(0)
  } 
  // perintah edit disini

  var updateDataCountry = async (id , country) => {
    try{
    response = await API.patch(`/country/${id}` ,{
      Country : country
    })

    console.log("helo" , response) 

      if (response.status == 200){
        setCtryUpdateStatus(true)
      }else{
        throw new Error(response.status)
      }
    }catch(e){

      setCtryUpdateStatus(false)
      

    }
  }

  let {data : trips , status} = useQuery("tripsCache"  , async () => {


    const response =  await API.get("/trips")
    return response.data.data
  })


  let {data : kountries , refetch} = useQuery(`kountriCache`  , async () => {



    const response =  await API.get("/country")
    return response.data.data
  })

  const [showCountry, setCountryShow] = useState(false);

  const handleCountryClose = () => { setCountryShow(false); resetCtryStatus() }
  const handleCountryShow = () => setCountryShow(true);

  
  // console.log(trips)
  if (status === 'success') {
    // console.log("ini data" , trips)

    // return <div>{data.name}</div>;
  }
  

   function c(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}


  //  stateData.map((a , b)=> {console.log(a,b)})

  return (
    <>

    

    <h1 className={'text-center mt-5 mb-5'}>Group Tour {(state?.user.is_admin == 1 ) &&<><Button className="m-1" style={ {align : 'center' }}>Add Trip</Button><Button onClick={setCountryShow} style={ {align : 'center' }}>Country Editor</Button></> }</h1>
    {/* Country Editor  */}

    <Modal show={showCountry} onHide={handleCountryClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Countries</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
          {kountries?.map((a) =>       {

            
  
          
          return <Form onSubmit={(e) => { e.preventDefault() ; updateDataCountry( a.IDCountries ,   e.target.elements.Country.value) ; refetch() ; e.target.elements.Country.value = null} }><InputGroup className="mb-3">
        <Form.Control
          name={"Country"}
          placeholder={a.Country}
        />
        <Button variant="primary" type="submit" id="button-addon2">
          Edit
        </Button>
        {/* delete request by id button */}
        <Button variant="danger"  id="button-addon2">
          Delete
        </Button>
      </InputGroup></Form>}
       )}
      </Row>
      <Row>
      <Button variant="warning">Add Country Field</Button>
      </Row>
      </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCountryClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCountryClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    <div className='d-flex ms-5 me-5 flex-wrap justify-content-around'>
      {/* card */}

      {
           trips?.map((a , b) => {
            return (
      <CardGroupTour data={a} countries={kountries} images={a.ImageTrips} image={a.ImageTrips[0].URL} slot={`0/${a.Quantity}`} id={a.ID} price={c(a.Price)} dest={a.destinationName} desc={a.Title}></CardGroupTour>
            )
       })
      }
      {/* <CardGroupTour image={Img1} slot='10/20' price='3.000.000' dest='bali' desc='lorem ipsum dolor sit amet description'></CardGroupTour>
      <CardGroupTour image={Img2} slot='10/20' price='3.000.000' dest='bali' desc='lorem ipsum dolor sit amet description'></CardGroupTour>
      <CardGroupTour image={Img3} slot='10/20' price='3.000.000' dest='bali' desc='lorem ipsum dolor sit amet description'></CardGroupTour>
      <CardGroupTour image={Img4} slot='10/20' price='3.000.000' dest='bali' desc='lorem ipsum dolor sit amet description'></CardGroupTour>
      <CardGroupTour image={Img5} slot='10/20' price='3.000.000' dest='bali' desc='lorem ipsum dolor sit amet description'></CardGroupTour>
    <CardGroupTour image={Img6} slot='10/20' price='3.000.000' dest='bali' desc='lorem ipsum dolor sit amet description'></CardGroupTour> */}
    {/* <Card className='mb-5' style={{width : '30%' , height : '30%'}}>
    <Card.Img variant="top" src={Img1} />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
    
    <Card className='mb-5' style={{width : '30%' , height : '30%'}}>
    <Card.Img variant="top" src={Img2} />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
    <Card className='mb-5' style={{width : '30%' , height : '30%'}}>
    <Card.Img variant="top" src={Img3} />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
    <Card className='mb-5' style={{width : '30%' , height : '30%'}}>
    <Card.Img variant="top" src={Img4} />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
    <Card className='mb-5' style={{width : '30%' , height : '30%'}}>
    <Card.Img variant="top" src={Img5} />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card> */}
    </div>
    </>

  )
}

export default GroupTour