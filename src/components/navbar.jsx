import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import NavbarBG from '../assets/e.png';
import Icn from '../assets/Icon.png';
import React, { useState , useEffect , useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Profile from '../assets/bs/profile.png'
import { Dropdown , Alert } from 'react-bootstrap';
import { BsFillCaretUpFill as CaretUp } from "react-icons/bs";
import { registerUser , checkUser, checkAuth, isAdmin} from '../modules/axios';
import { useMutation } from 'react-query';

import { API } from '../config/api';
import { UserContext } from './context/userProvider';
import DropdownProfile from './DropdownProfile';


const CustomNavbar = 
() => {

  const [state , dispatch] = useContext(UserContext)

  // navigation helper

  const nav = useNavigate()

  //switchto

  const switchToRegister = () => {
    setShowSignin(false)
    setShowSignup(true)
  }
  const switchToLogin = () => {
    setShowSignin(true)
    setShowSignup(false)

  }

var [message , setMessage] = useState(null)
var [profile , updateProfile] = useState(null)

  // const nav = useNavigate()
  const [showSignin, setShowSignin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleCloseSignin = () => setShowSignin(false);
  const handleCloseSignup = () => setShowSignup(false);
  const handleShowSignin = () => setShowSignin(true);
  const handleShowSignup = () => setShowSignup(true);


const [signinData , setSigninData] = useState(); 

const updateSigninData = e => {
  // e.preventDefault()
  setSigninData({...signinData,
    [e.target.name]: e.target.value
})
}


console.log(state.user)

const submitSigninData = useMutation(async (e) => {
  e.preventDefault();
  try {

    // Configuration Content-type
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    // Data body
    const body = JSON.stringify(signinData);

    // Insert data user to database
    const response = await API.post('/login', body, config);

    if (response?.status === 200) {

      dispatch({
        type : "LOGIN_SUCCESS" , 
        payload : response.data.data
      })

      updateProfile(response.data.data)
      setShowSignin(false)

      console.log(state.user.is_admin)

      

      if(response.data.data.is_admin === 1) {

        // aksi render dropdown untuk admin disini 
      
      }else{

        // aksi render dropdown untuk user disini 

      }

    }

    // Handling response here
  } catch (error) {
    const alert = (
      <Alert variant="danger" className="py-1">
        response.data.message
      </Alert>
    );
    setMessage(alert);
    console.log(error);
  }
})

const [signupData , setSignupData] = useState(); 

const updateSignupData = e => {
  // e.preventDefault()
  console.log('registerEventType')

  setSignupData({...signupData,
    [e.target.name]: e.target.value
})
}

const submitSignupData = useMutation(async (e)  => {
  try {
    e.preventDefault();

    // Configuration Content-type
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    // Data body
    const body = JSON.stringify(signupData);

    // Insert data user to database
    const response = await API.post('/register', body, config);

    // Notification
    if (response.status == 200) {
      const alert = (
        <Alert variant="success" className="py-1">
          Success
        </Alert>
      );

      setMessage(alert)
      await setTimeout(() => {

      } , 1000)
     setMessage(null)
        console.log("Switcher must be there")

    } else {
      const alert = (
        <Alert variant="danger" className="py-1">
          {response.data.message}
        </Alert>
      );
      setMessage(alert);
    }
  } catch (error) {
    const alert = (
      <Alert variant="danger" className="py-1">
        <h1>Pendaftaran gagal</h1>
        
      </Alert>
    );
    setMessage(alert);
    console.log(error);
  }

})

// console.log(e)






return  <Navbar className='fixed-top' variant="dark" style={ { backgroundRepeat: "no-repeat"  , objectFit : "cover" , backgroundSize : "100%" ,  backgroundImage : `url(${NavbarBG})`} } >
<Container>
  <Navbar.Brand href="#home">
    <Link to='/'><img width="75%" height="75%" src={Icn}></img></Link>
  </Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="me-auto">
    </Nav>
  
  
  {  (state.isLogin == false ) &&<div>
    <Button variant="warning" onClick={handleShowSignin} className="me-3 fw-bold pt-2 pb-2 ps-2 pe-2">Login</Button>
    <Button className="fw-bold pt-2 pb-2 ps-2 pe-2" onClick={handleShowSignup} variant="outline-warning">Signup</Button>
  </div> }

   { (state.isLogin == true) &&<DropdownProfile sig={setSigninData} profile={state.user}>
    <div className="rounded-circle border border-warning" >
        <img src={Profile} className="rounded-circle" width="50px" height="50px" />
      </div>
    </DropdownProfile>
}
  
  
        
  </Navbar.Collapse>
</Container>



{/* area modal */}


<Modal show={showSignin} onHide={handleCloseSignin}>
            <h1 className='text-center mt-3'>Signin</h1>
   

        <Modal.Body>
          {message}
          <form onSubmit={(e) => submitSigninData.mutate(e)} method="post">
          <Form.Group  className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name='email'
                placeholder="name@example.com"
                onChange={updateSigninData}
                // autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="password"
                name='password' 
                onChange={updateSigninData}
                className=''
              />
            </Form.Group>
            <div className="d-grid gap-2">
            <Button variant="warning" type="submit" className=" fw-bold pt-2 pb-2 ps-2 pe-2 text-white">Signin</Button>
            </div>
          </form>
        <p>Kamu belum daftar? <a onClick={switchToRegister}>Klik sini dong!</a></p>

        </Modal.Body>

      </Modal>
<Modal show={showSignup} onHide={handleCloseSignup}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {message}
        <form onSubmit={(e) => submitSignupData.mutate(e)}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. Asep Knalpot"
                name='name' 
                className=''
                onChange={updateSignupData}
              />
            </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name='email'
                placeholder="name@example.com"
                onChange={updateSignupData}
                // autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="password"
                name='password' 
                onChange={updateSignupData}

                className=''
              />
              
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="+62"
                name='phone' 
                onChange={updateSignupData}
                className=''
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Address</Form.Label>
        <Form.Control
         as="textarea" 
         rows={3} 
         name="address"
         onChange={updateSignupData}
         />
      </Form.Group>
            <div className="d-grid gap-2">
            <Button variant="warning" type='submit' className=" fw-bold pt-2 pb-2 ps-2 pe-2 text-white">Signup</Button>
            </div>
          </form>
        <p>Kamu udah daftar? <a onClick={switchToLogin}>Klik sini dong!</a></p>

        </Modal.Body>
      </Modal>
</Navbar>

}





export default CustomNavbar ; 