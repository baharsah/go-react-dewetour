import React , {useContext , useState} from 'react'
import { Card , Button , Modal , Form} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { UserContext } from './context/userProvider';
import { useQuery } from 'react-query';
import { API } from '../config/api';


function CardGroupTour(props) {
  // ambil data kountri disini



  var [state , dispatch] = useContext(UserContext)


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  




  return (
<>
<Card className='mb-5 pt-3 ps-3 pe-3' style={{width : '30%' , height : '30%'}}>
    <p className='text-end position-absolute top-0 end-0 mt-4 me-1 pe-4 fw-bold bg-white ps-2 pe-2 pt-2 pb-2 rounded'>{props.slot} {(state?.user.is_admin == 1 ) &&<><Button className="m-1" variant="danger" style={ {align : 'center' }}>Delete</Button><Button variant="primary" onClick={handleShow} style={ {align : 'center' }}>Edit</Button></> }</p>
  <Card.Img variant="top" src={props.image} ></Card.Img>
  <Card.Title className={'mt-3 fw-bold'} style={{width : '100%'}}><Link style={{textDecoration : 'none' , color : 'black'}} to={'/detail/' + props.id}>{props.desc}</Link></Card.Title>
    <Card.Body className="d-flex justify-content-between">
      <Card.Title className='text-warning fw-bold'>IDR {props.price}</Card.Title>
      <Card.Text  className='text-secondary text-capitalize'>
        {props.dest}
      </Card.Text>
    </Card.Body>
  </Card>

  {/* Edit Area */}



      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Trip </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Judul Trip</Form.Label>
              <Form.Control
                type="text"
                placeholder="Judul Trip"
                value={props.data.Title}
              
              />
              <Form.Label>Negara</Form.Label>

                  <Form.Select aria-label="Default select example">

                  
                   { 
                   
                   props.countries?.map((a , b) => { return<option value={a.IDCountries}>{a.Country}</option>})
                   
                     }
                
    </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

  
</>
  )
}

export default CardGroupTour