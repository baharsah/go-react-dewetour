import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function CardGroupTour(props) {
  return (
    <Card className='mb-5 pt-3 ps-3 pe-3' style={{width : '30%' , height : '30%'}}>
    <p className='text-end position-absolute top-0 end-0 mt-4 me-1 pe-4 fw-bold bg-white ps-2 pe-2 pt-2 pb-2 rounded'>{props.slot}</p>
  <Card.Img variant="top" src={props.image} ></Card.Img>
  <Card.Title className={'mt-3 fw-bold'} style={{width : '100%'}}><Link style={{textDecoration : 'none' , color : 'black'}} to={'/detail/' + props.id}>{props.desc}</Link></Card.Title>
    <Card.Body className="d-flex justify-content-between">
      <Card.Title className='text-warning fw-bold'>IDR {props.price}</Card.Title>
      <Card.Text  className='text-secondary text-capitalize'>
        {props.dest}
      </Card.Text>
    </Card.Body>
  </Card>
  )
}

export default CardGroupTour