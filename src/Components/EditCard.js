import { Button } from '@mui/material'
import React, { useState } from 'react'
import { db } from '..'
import './EditCard.css'

const EditCard = (props) => {
  const [sTime, setSTime] = useState()
  const [eTime, setETime] = useState()
  const [date, setDate] = useState()


  const check = () => {
    
      const start = new Date(date+"T"+sTime+":00Z")
      const end = new Date(date+"T"+eTime+":00Z")
      if(start < Date.now()) {
        alert("Date must be in future")
        return false
      }
  
      if (end < start) {
        alert ("End must be after start")
        return false
      }
  }

  const updateStartTime =(e) => {
    setSTime(e.target.value)
  }
  const updateEndTime = (e) => {
    setETime(e.target.value)
  }
  const updateDate =(e) => {
    setDate(e.target.value)
  }

  const handleDelete = (e) => {
    e.preventDefault()
    db.collection('interviews').doc(props.id).delete().then(() => {
        alert("Interview Deleted Succesfully")
        props.deleteIntv(props.id)
    }).catch((err) => {
        alert("Error Deleting Interview: " + err)
    })
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    if (check() == false) {
      return
    }
    db.collection('interviews').doc(props.id).update({
      "startTime": sTime,
      "endTime": eTime,
      "date": date
    }).then(() => {
      alert("Interview updated successfully")
      props.updateItem({
        "startTime": sTime,
        "endTime": eTime,
        "date": date
      }, props.id)
  }).catch((e) => alert("Error while updating: " + e))
  }


  return (
    <div className='editCard'>
        <div className='editCard__edit'>
            Select Date:
            <input className='editCard__date' type='date' onChange={updateDate}/>
            
            <div className='editCard__time'>
            <div className='editCard__time-box'>
                Select Start Time:
                <input type='time' onChange={updateStartTime}/>
            </div>
            <div className='editCard__time-box'>
                Select End Time:
                <input type='time' onChange={updateEndTime} />
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