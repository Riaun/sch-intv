import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import EditCard from './EditCard'
import './ViewCard.css'

const ViewCard = (props) => {

  const [studs, setStuds] = useState([])
  const [isEdit, setIsEdit] = useState(false)
 
  const handleEditClick = (e) => {
    e.preventDefault()
    setIsEdit(!isEdit)
  }
  useEffect(() => {
    setTimeout(() => {
      setStuds(props.students)
    }, 400);
  }, [])
  
  return (
    <div className='viewCard'>
      <div className='viewCard__card'>
        {
          studs && studs.map(student => {
            console.log(student.name)
            return( 
          <div className='viewCard__info'>
            <h3 className='viewCard__name'>{student.name}</h3>
            <h3 className='viewCard__roll'>Roll: {student.roll} </h3>
          </div>)
          }
          )
        }
        <div className='viewCard__info-date'>
          <div className='viewCard__innerDate'>
            <h3 className='viewCard__date'>{props.date}</h3>
            <h3 className='viewCard__time'>Time: {props.stime} - {props.etime}</h3>
          </div>
          <div className='viewCard__select'>
            <Button onClick={handleEditClick}>Edit</Button>
          </div>
        </div>
      </div>
      {isEdit && <EditCard getNI={props.getNI} setNI={props.setNI} id={props.id} students={studs}/>}
    </div>
  )
}

export default ViewCard
