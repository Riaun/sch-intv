import React, { useEffect, useState } from 'react'
import './BodyRight.css'
import BodyCard from './BodyCard'
import { Button } from '@mui/material'
import { db } from '..'


const BodyRight = () => {
  const [rolls, setRolls] = useState([])
  const [sTime, setSTime] = useState()
  const [eTime, setETime] = useState()
  const [date, setDate] = useState()
  const [students, setStudents] = useState([])
 

  useEffect(() => {
    const fetchStudents = async () => {
      const response = db.collection('students')
      await response.get().then(data => {
        setStudents(data.docs.map(item => ({
          name: item.data().name,
          roll: item.data().roll
      })))
      })
      
    }
   fetchStudents()
   
  }, [])
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    console.log(rolls)
    console.log(sTime)
    console.log(eTime)
    console.log(date)
    var data = {
      "rolls": rolls,
      "startTime": sTime,
      "endTime": eTime,
      "date": date
    }
    db.collection("interviews").add(data)
    .then(() => {
      alert('Interview Scheduled Succesfully')
    })
    .catch((e) => {
      alert("Error scheduling interview: " + e)
    })
  }
  const getRolls = () => {
    return rolls
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
 
  return (
    <div className ='bodyRight'>
      
     
       {    students.map(student =><BodyCard name={student.name}
            roll={student.roll}
            setRolls={setRolls}
            getRolls={getRolls} />)}
    
      
        
    
        Select Date:
        <input className='bodyRight__date' type='date' onChange={updateDate}/>
        
        <div className='bodyRight__time'>
          <div className='bodyRight__time-box'>
            Select Start Time:
            <input type='time' onChange={updateStartTime} />
          </div>
          <div className='bodyRight__time-box'>
            Select End Time:
            <input type='time' onChange={updateEndTime}/>
          </div>

        </div>
         
        <Button className='bodyRight__button' onClick={handleSubmit}>Create Interview</Button>
    </div> 
  )
}

export default BodyRight