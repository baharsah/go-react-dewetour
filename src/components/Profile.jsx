import React , {useContext , useEffect} from 'react'
import { Container , Row , Col , Button} from 'react-bootstrap'
import Img from '../assets/bs/profile.png'
import PaymentPending from './PaymentPending'
import {UserContext} from './context/userProvider'
import {useNavigate} from 'react-router-dom' 
import { API } from '../config/api'
import {useQuery} from 'react-query'






function Profile() {


         

          // ambil data profile

          let {data : profile } = useQuery("profileCache" , async () => { 


             const response =  await API.get(`/users/${user.user.id}`)


             if(user?.isLoading && !user?.isLogin) {navigate('/') } 

            return response.data.data   
           })

          

          // lempar data profile disini 
          const [user , dispatch] = useContext(UserContext)

          // TODO : is user come from
      
          
              console.log("ini user context" , user)
              const navigate = useNavigate()
      
          
            
                useEffect(() => {
      
      
      
            
      
                } ,[])
    

    
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
                    <h4>Nama : {profile?.name}</h4>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                    <h4>Surel : {profile?.email}</h4>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                    <h4>Place : {profile?.address}</h4>
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
    { profile?.Transactions.map((a ,b) => <PaymentPending key={b} position={'profile'} datatrx={a}></PaymentPending>)
    
}
    
    </>
  )
}

export default Profile