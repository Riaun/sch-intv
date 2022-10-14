import React, { useEffect, useState } from 'react'
import ViewCard from './ViewCard'
import './ViewPage.css'
import { db } from '..'

const ViewPage = () => {
  const [interviews, setInterviews] = useState([])

  useEffect(() => {
    var interviews = []
    var newIntvs = []

    const fetchName = async (roll) => {
      const response = db.collection('students').doc(roll)
      const d = await response.get()
      return d.data().name
    } 


    const fetchInterviews = async () => {
      const response = db.collection('interviews')
      await response.get().then(data => {
        data.docs.forEach(interview => {
          interviews.push(interview.data())
        })
        interviews.forEach(interview => {
          interview.students = []
          interview.rolls.forEach(roll => {
            const n = fetchName(roll)
            n.then(name => {
              interview.students.push({"name": name, "roll": roll})
            })
          })
          newIntvs.push(interview)
        })
       setInterviews(newIntvs)
        
      })
      
    }
   fetchInterviews()
  }, [])
  
  return (
    <div className='viewPage'>
      {interviews.map(interview => 
        <ViewCard students={interview.students} stime={interview.startTime}etime={interview.endTime} date={interview.date}/>
      )}
    </div>
  )
}

export default ViewPage