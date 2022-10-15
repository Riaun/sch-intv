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
  
  const check = () => {
    if (rolls.length < 2) {
      alert("Participants must be > 2");
      return false
    }
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



    // const fetchInterviews = async () => {
    //   const response = db.collection('interviews')
    //   await response.get().then(data => {
    //     setInterviews(data.docs.map(item => ({
    //       date: item.data().date,
    //       endTime: item.data().endTime,
    //       rolls: item.data().rolls,
    //       startTime: item.data().startTime
    //   })))
    //   })
    // }
    // fetchInterviews()
  }

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
    if (check() == false) {
      return 
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