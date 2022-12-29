import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import NavbarBG from '../assets/e.png';
import Icn from '../assets/Icon.png';
import React, { useState , useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Profile from '../assets/bs/profile.png'
import { Dropdown , Alert } from 'react-bootstrap';
import { BsFillCaretUpFill as CaretUp } from "react-icons/bs";
import { registerUser , checkUser, checkAuth, isAdmin} from '../modules/axios';
import { useMutation } from 'react-query';

import { API } from '../config/api';


const CustomNavbar = 
() => {

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

    // Handling response here
  } catch (error) {
    const alert = (
      <Alert variant="danger" className="py-1">
        Failed
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
    if (response.data.status === 'success...') {
      const alert = (
        <Alert variant="success" className="py-1">
          Success
        </Alert>
      );
      setMessage(alert);
      setForm({
        name: '',
        email: '',
        password: '',
      });
    } else {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed
        </Alert>
      );
      setMessage(alert);
    }
  } catch (error) {
    const alert = (
      <Alert variant="danger" className="py-1">
        Failed
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
  
  
    <Button variant="warning" onClick={handleShowSignin} className="me-3 fw-bold pt-2 pb-2 ps-2 pe-2">Login</Button>
    <Button className="fw-bold pt-2 pb-2 ps-2 pe-2" onClick={handleShowSignup} variant="outline-warning">Signup</Button>
  
  
        
  </Navbar.Collapse>
</Container>



{/* area modal */}


<Modal show={showSignin} onHide={handleCloseSignin}>
            <h1 className='text-center mt-3'>Signin</h1>
   

        <Modal.Body>
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
                name='pass' 
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