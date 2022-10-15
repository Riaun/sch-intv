import { Button } from '@mui/material'
import React from 'react'
import { db } from '..'
import './EditCard.css'

const EditCard = (props) => {

  const handleDelete = (e) => {
    e.preventDefault()
    db.collection('interviews').doc(props.id).delete().then(() => {
        alert("Interview Deleted Succesfully")
    }).catch((err) => {
        alert("Error Deleting Interview: " + err)
    })
    var intvs = props.getNI()
    props.setNI(intvs.filter(i => i.id != props.id))
    
  }
  const handleUpdate = (e) => {
    e.preventDefault()

  }
  return (
    <div className='editCard'>
        <div className='editCard__edit'>
            Select Date:
            <input className='editCard__date' type='date'/>
            
            <div className='editCard__time'>
            <div className='editCard__time-box'>
                Select Start Time:
                <input type='time'  />
            </div>
            <div className='editCard__time-box'>
                Select End Time:
                <input type='time' />
            </div>
          </div>
        </div>
        <div className='editCard__buttons'>
            <Button onClick={handleDelete}>Delete</Button>
            <Button onClick={handleUpdate}>Update</Button>
        </div>
    </div>
  )
}

export default EditCard