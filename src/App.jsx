import React , {useContext} from 'react'
import CustomNavbar from './components/navbar'
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes ,Route } from 'react-router-dom';
import Home from './components/Home'
import DetailTour from './components/DetailTour'
import PaymentPending from './components/PaymentPending';
import Profile from './components/Profile';
import IncTrx from './components/IncTrx';
import { UserContext } from './components/context/userProvider'; 
import { useContext } from 'react'

const [state, dispatch] = useContext(UserContext);


useEffect(() => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  // Redirect Auth
  if (state.isLogin === false) {
    navigate('/auth');
  } else {
    if (state.user.status === 'admin') {
      // navigate('/product-admin');
    } else if (state.user.status === 'customer') {
      navigate('/');
    }
  }
}, [state]);


const checkUser = async () => {
  try {
    const response = await API.get('/check-auth');

    // If the token incorrect
    if (response.status === 404) {
      return dispatch({
        type: 'AUTH_ERROR',
      });
    }

    // Get user data
    let payload = response.data.data.user;
    // Get token from local storage
    payload.token = localStorage.token;

    // Send data to useContext
    dispatch({
      type: 'USER_SUCCESS',
      payload,
    });
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  if (localStorage.token) {
    checkUser();
  }
}, []);




function App() {

  return (
 
    <>
    <Router>

    <CustomNavbar></CustomNavbar>
    <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/detail/:id" element={<DetailTour />}></Route>
        <Route path="/tour/pending" element={<PaymentPending />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/trx" element={<IncTrx />}></Route>
        
      </Routes>
    <Footer></Footer>
    {/* css module and scss modeling */}
    {/* PR for react cards */}
    {/* footer  */}
    {/* add router */}
    </Router>

    </>

  )
}

export default App
