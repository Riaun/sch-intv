import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './ViewCard.css'

const ViewCard = (props) => {


  // 13 september 11:00 pm kantatoli near mangal tower


  
  return (
    <div className='viewCard'>
      {
        props.students && props.students.map(student =>   {
          console.log(student.name)
          return( 
        <div className='viewCard__info'>
          <h3 className='viewCard__name'>{student.name}</h3>
          <h3 className='viewCard__roll'>Roll: {student.roll} </h3>
        </div>)
        }
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
