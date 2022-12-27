import BG from '../assets/bg.png'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {Button , Container} from 'react-bootstrap';
import anime from "animejs/lib/anime.es.js";


import React , { useEffect , useState} from 'react'




function SearchableContainer() {


  const [ searchStatus , changesearchStatus ] = useState(false)




  // creatinng clickable popup
  useEffect(() => {

    var textWrapper = document.querySelector('.ml13');
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    
     anime.timeline({loop: true})
    .add({
      targets: '.ml13 .letter',
      translateY: [100,0],
      translateZ: 0,
      opacity: [0,1],
      easing: "easeOutExpo",
      duration: 1400,
      delay: (el, i) => 300 + 30 * i
    }).add({
      targets: '.ml13 .letter',
      translateY: [0,-100],
      opacity: [1,0],
      easing: "easeInExpo",
      duration: 1200,
      delay: (el, i) => 100 + 30 * i
    });

   } , [])


   var  searchToggle = ()=> { 


    if( !searchStatus ){

      changesearchStatus(true)


    }else{

      changesearchStatus(false)

    }


    }






  return (
    <Container fluid style={ {   backgroundRepeat: "no-repeat"  , objectFit : "cover" , backgroundSize : "100%" , backgroundImage : `url(${BG})` }}  >
{/* <div style={{ width : "100%" , height : '100%' , position : 'absolute' , zIndex : 1 ,   objectFit : "cover" , backgroundSize : "100%" , backgroundImage : `url(${BGBackdrop})` }}>&nbsp;</div> */}
  <div style={{padding : "90px" }}>
  <h1 className='fw-bold fs-extra' style={ {color : "white" } }>Explore</h1>
  <h1 className='fw-light ml13' style={ { color : "white" } }>Your amazing trip today</h1>
  <div style={{padding : "30px"}}>

  <Form.Label className="fs-4" style={{color : "white"}}  htmlFor="basic-url">Search your pace</Form.Label>
  <InputGroup className="mb-3">
    <Form.Control className='fs-3 fw-bold' onFocus={searchToggle} onBlur={searchToggle} id="basic-url" aria-describedby="basic-addon3" />
    <Button variant="warning" className='fw-bold fs-3' style={{ color : "white" , padding : "20px"}} id="button-addon2">
      Search
    </Button>
  </InputGroup>
  {searchStatus && 
  <Container className="rounded p-3 search-target" style={ {backgroundColor : "white" , opacity : 1 , position : "absolute" , zIndex : 300} }>
    <h1 className="text-center">  Hallo </h1>
  </Container>
}


</div>
  </div>
</Container>
  )
}

export default SearchableContainer



