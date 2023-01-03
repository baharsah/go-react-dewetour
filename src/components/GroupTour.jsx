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
import Draggable from "react-draggable";


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

    // console.log("helo" , response) 

      if (response.status == 200){
        setCtryUpdateStatus(true)
      }else{
        throw new Error(response.status)
      }
    }catch(e){

      setCtryUpdateStatus(false)
      

    }
  }

  let {data : trips , status , refetch : refetchtrip} = useQuery("tripsCache"  , async () => {


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

  // trip area 

  const [showAddTrip, setShowAddTrip] = useState(false);

  const handleAddTripClose = () => { setShowAddTrip(false) }
  const handleAddTripOpen = () => setShowAddTrip(true);

  const [fs , hfs] = useState(true)
  var handlefs = () => { handleAddTripClose() ;  hfs(!fs) ; handleAddTripOpen()}

  var [dataTrip , setDataTrip] = useState({})

  // submitting data 

  var onSetData = (event) => { 

    
    console.log("cacad")

    if (event.target.name === 'images') {
      setDataTrip({...dataTrip, [event.target.name]: event.target.files});
    }else{
      setDataTrip({...dataTrip, [event.target.name]: event.target.value});

    }
  }

  var onSubmitData = (evt) => {
    evt.preventDefault();
    console.log("halo")
      console.log("halo " , dataTrip)
    //  const formData = new FormData();
    //  formData.append(dataTrip);
    //  console.log("formData " , formData)
    // kirim data disini dengan multipart form file


const formData = new FormData();

for (let i = 0; i < dataTrip['images'].length; i++) {
  formData.append('images', dataTrip['images'][i]);
}


for (let key in dataTrip) {


    if(key !== 'images'){

  formData.append(key, dataTrip[key]);

  
}


}


    API.post('trip' , formData  , 
    {
      headers: {'Content-Type': 'multipart/form-data'}
    }
    
    )

    handleAddTripClose() 
    refetchtrip()

        
  }

  
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

const addCountry = (country) => {

API.post('country' ,  { Country: country})

// handleCountryClose()
refetch()

    
}

  //  stateData.map((a , b)=> {console.log(a,b)})

  return (
    <>

    

    <h1 className={'text-center mt-5 mb-5'}>Group Tour {(state?.user.is_admin == 1 ) &&<><Button onClick={handleAddTripOpen} className="m-1" style={ {align : 'center' }}>Add Trip</Button><Button onClick={setCountryShow} style={ {align : 'center' }}>Country Editor</Button></> }</h1>
    {/* Trip Modal  */}
    

    <Modal fullscreen={fs} show={showAddTrip} onHide={handleAddTripClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Trip</Modal.Title>
        </Modal.Header>
        <Modal.Body>
      <form onSubmit={onSubmitData}>

          {/* <img src={'https://3.bp.blogspot.com/-WqX6Ng-AgmE/XWcsn3C5HaI/AAAAAAAADeE/qY_OeWR2zf0N0o7TVOI0Sx8v60ohQP1NgCLcBGAs/s1600/1567036546540.jpg'} alt="" /> */}
        <Form.Group className="mb-3">
          <Form.Label htmlFor="disabledTextInput">Trip Name</Form.Label>
          <Form.Control name='title' onChange={onSetData} id="disabledTextInput" placeholder="" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="disabledSelect">Country</Form.Label>
          <Form.Select id="disabledSelect" onChange={onSetData} name='country_id'>
            
            { kountries?.map((a) => <option value={a.IDCountries}>{a.Country}</option>  )}
            {/* <option>Disabled select</option> */}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="disabledTextInput">Accomodation</Form.Label>
          <Form.Control id="disabledTextInput" onChange={onSetData} name="accomodation" placeholder="" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="disabledTextInput">Destination name</Form.Label>
          <Form.Control id="disabledTextInput" onChange={onSetData} name="destination_name" placeholder="" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="disabledTextInput">Transportation</Form.Label>

          <Form.Control id="disabledTextInput" name="transportation" onChange={onSetData} placeholder="" />
        </Form.Group>

          <Form.Group className="mb-3">
          <Form.Label htmlFor="disabledTextInput">Eat</Form.Label>
          <Form.Control id="disabledTextInput" onChange={onSetData} name="eat" placeholder="" />
        </Form.Group>

          <Form.Group className="mb-3">
          <Form.Label htmlFor="disabledTextInput" className="fw-bold fs-3">Duration</Form.Label>
          <br/>
          <Form.Label >Day</Form.Label>

          <Form.Control id="disabledTextInput" type='number' htmlFor="disabledTextInput" onChange={onSetData} name="day" placeholder="" />
          <Form.Label htmlFor="disabledTextInput">Night</Form.Label>

          <Form.Control id="disabledTextInput"  type='number' onChange={onSetData} name='night' placeholder="" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="disabledTextInput">Date Trip</Form.Label>

          <Form.Control id="disabledTextInput" type='datetime-local' onChange={onSetData} name='date_trip' placeholder="" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="disabledTextInput" >Price</Form.Label>

          <Form.Control id="disabledTextInput" type='number' name='price' onChange={onSetData} placeholder="" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="disabledTextInput" >Quota</Form.Label>

          <Form.Control id="disabledTextInput" type='number' name='qty' onChange={onSetData} placeholder="" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description</Form.Label>
        <Form.Control name='description' onChange={onSetData} as="textarea" rows={3} />
      </Form.Group>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Images</Form.Label>
        <Form.Control type="file" name='images' onChange={onSetData} multiple />

      </Form.Group>
      <Form.Group className="mb-3">
      <Button variant="primary" type='submit'>
            Save Changes
          </Button>
      </Form.Group>
      </form>

        {/* <Button type="submit">Submit</Button> */}
    {/* </Form> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleAddTripClose}>
            Close
          </Button>
          <Button variant="warning" onClick={handlefs}>
            Togel Fullskren
          </Button>
        </Modal.Footer>
      </Modal>
      
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
        <Form onSubmit={(e) => { e.preventDefault() ; addCountry(e.target.elements.Country.value) ; refetch() ; e.target.elements.Country.value = null} }>
          <Form.Group>
          <Form.Control className='m-3'
          name={"Country"}
        />
          </Form.Group>
      <Button variant="primary" type='submit' className='m-3'>Submit</Button>

          </Form>
            
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
      <CardGroupTour data={a} countries={kountries} images={a.ImageTrips} image={  a.ImageTrips[0].URL} slot={`0/${a.Quantity}`} id={a.ID} price={c(a.Price)} dest={a.destinationName} desc={a.Title}></CardGroupTour>
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