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
  const [intvs, setIntvs] = useState([])
 

  const fetchInterviews = async () => {
    const response = db.collection('interviews')
    await response.get().then(data => {
      setIntvs(data.docs.map(i => i.data()))
    })
  }

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
   fetchInterviews()
   
  }, [])
  
  const check = () => {
    if (rolls.length < 2) {
      alert("Participants must be > 2");
      return false
    }
    if (rolls.length > 5) {
      alert("Participants must be < 5");
      return false
    }
    if (!sTime) {
      alert("Start time is required")
      return false
    }
    if (!eTime) {
      alert("End Time is required")
      return false
    }
    if (!date) {
      alert("Date is required")
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


    const isAvailable = () => {
      var available = true
      for (let index = 0; index < rolls.length; index++) {
        const roll = rolls[index];
        console.log(intvs)
        intvs.forEach(intv => {
          intv.rolls.forEach(r => {
            if (roll === r) {
              console.log("ISAVA: " + roll + ":" + r)
              const intvSDate = new Date(intv.date + "T" + intv.startTime + ":00Z")
              const intvEDate = new Date(intv.date + "T" + intv.endTime + ":00Z")
              if ((start < intvEDate && start > intvSDate) || (end < intvEDate && end > intvSDate)) {
                available = false
                alert("Student with Roll No. " + roll + "is not available during selected time period")
              }
            }
          })  
        })
      }
      
      return available
    }
    return isAvailable()
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
    if (check() === false) {
      return 
    }
    db.collection("interviews").add(data)
    .then(() => {
      alert('Interview Scheduled Succesfully')
    })
    .catch((e) => {
      alert("Error scheduling interview: " + e)
    })
    setIntvs([...intvs, data])
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
      
     
       {  students ? students.map(student =><BodyCard name={student.name} roll={student.roll} setRolls={setRolls} getRolls={getRolls} />): <p>No Students Found</p> }

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