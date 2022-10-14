import { Button } from '@mui/material'
import React from 'react'
import './ViewCard.css'

const ViewCard = (props) => {

  return (
    <div className='viewCard'>
      {console.log(props.students)}
      {
        props.students.map(student =>   
        <div className='viewCard__info'>
          <h3 className='viewCard__name'>{student.name}</h3>
          <h3 className='viewCard__roll'>Roll: {student.roll} </h3>
        </div>
        )
      }
      <div className='viewCard__info'>
        <h3 className='viewCard__date'>{props.date}</h3>
        <h3 className='viewCard__time'>Time: {props.stime} - {props.etime}</h3>
      </div>
      <div className='viewCard__select'>
        <Button>Edit</Button>
      </div>
    </div>
  )
}

export default ViewCard
