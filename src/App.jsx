import React , {useState , useContext , useEffect} from 'react'
import CustomNavbar from './components/navbar'
import Footer from './components/Footer';
import Home from './components/Home'
import { BrowserRouter as Router, Routes ,Route } from 'react-router-dom';

import DetailTour from './components/DetailTour'
import PaymentPending from './components/PaymentPending';
import Profile from './components/Profile';
import IncTrx from './components/IncTrx';
import { UserContext } from './components/context/userProvider'; 
import { API, setAuthToken } from './config/api';
import { useNavigate } from 'react-router-dom';

// init token on axios every time the app is refreshed






function App() {

  var [loading, setIsloading] = useState(true)



var   navigate = useNavigate()

const [ state, dispatch ] = useContext(UserContext);

  

useEffect(() => {

  
  if (localStorage.getItem('token')) {
    setAuthToken(localStorage.getItem("token"));
    setIsloading(false)
  }else{
    setIsloading(false)
  }

  // Redirect Auth
  if (state.isLogin === false) {
    // navigate('/auth');
  } else {
    if (state.user.status === 1) {

    } else if (state.user.status === 0) {
    
    }
  }
}, [state]);



const checkUser = async () => {
  try {
    const response = await API.get('/check-auth');

    // If the token incorrect
    console.log("Status" , response)



    if(response?.data.data.code == 401){
      console.log("respon unautoriuzed")
      setIsloading(false)
      return dispatch({
        type: 'AUTH_ERROR',
      });

    }
    if (response?.data.data.code == 404) {
      setIsloading(false)
      return dispatch({
        type: 'AUTH_ERROR',
      });
      
    }

   

    // Get user data
    let payload = response.data.data;
    
    // Get token from local storage
    payload.token = localStorage.getItem("token");

    // Send data to useContext
    dispatch({
      type: 'USER_SUCCESS',
      payload,
    });
    setIsloading(false)
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  if (localStorage.getItem("token") != null) {
    checkUser();
  }
}, []);


  return (

     loading ?   <img style={ {margin : 300} }  className="scale-up-center"src="https://3.bp.blogspot.com/-WqX6Ng-AgmE/XWcsn3C5HaI/AAAAAAAADeE/qY_OeWR2zf0N0o7TVOI0Sx8v60ohQP1NgCLcBGAs/s1600/1567036546540.jpg" alt="" srcset="" />
     : <>


    <CustomNavbar></CustomNavbar>
    <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/detail/:id" element={<DetailTour />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/trx" element={<IncTrx />}></Route>
        
      </Routes>
    <Footer></Footer>
    {/* css module and scss modeling */}
    {/* PR for react cards */}
    {/* footer  */}
    {/* add router */}


    </>
    

  )
}

export default App
