
import CustomNavbar from './components/navbar'
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes ,Route } from 'react-router-dom';
import Home from './components/Home'
import DetailTour from './components/DetailTour'
import PaymentPending from './components/PaymentPending';
import Profile from './components/Profile';
import IncTrx from './components/IncTrx';




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
