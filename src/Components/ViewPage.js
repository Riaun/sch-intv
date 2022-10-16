import React, { useEffect, useState } from 'react'
import ViewCard from './ViewCard'
import './ViewPage.css'
import { db } from '..'

const ViewPage = () => {
  const [interviews, setInterviews] = useState([])
  const [names, setNames] = useState([]) // ns = [[n1,n2], [n3,n4,n5]] 
  const [newIntv, setNewIntv] = useState([])

  const deleteItem = (id) => {
    console.log("delete func called...")
    setNewIntv(newIntv.filter(intv => intv.id !== id))
    console.log("new intvs: " + newIntv)
  }
  const updateItem = (obj, id) => {
    setNewIntv(newIntv.map(intv => {
      if (intv.id === id) {
        intv.startTime = obj.startTime
        intv.endTime = obj.endTime
        intv.date = obj.date
      }
      return intv
    }))
  }

  useEffect(() => {
    const fetchInterviews = async () => {
      const response = db.collection('interviews')
      await response.get().then(data => {
        setInterviews(data.docs.map(item => ({
          id: item.id,
          date: item.data().date,
          endTime: item.data().endTime,
          rolls: item.data().rolls,
          startTime: item.data().startTime
      })))
      })
    }
   fetchInterviews()
  }, [])

  useEffect(() => {
    const fetchName = async (roll) => {
      const d = await db.collection('students').doc(roll).get()
      return d.data().name
    } 
    if (interviews) {
      var ns = []
      interviews.forEach(interview => {
        var r = []
        interview.rolls.forEach(roll => {
          const n = fetchName(roll)
          n.then(name => {
            r.push({"name": name, "roll": roll})
          })
        })
        ns.push(r) //
      })
     setNames(ns)
    }
  }, [interviews])

  useEffect(() => {
    if (interviews && names) {
      var ni = []
      for (let index = 0; index < interviews.length; index++) {
        var obj = interviews[index]
        obj.students = names[index]
        ni.push(obj)
      }
      setNewIntv(ni)
    }
  }, [names])
  
  return (
    <div className='viewPage'>
      {newIntv ? newIntv.map(interview => <ViewCard deleteIntv={deleteItem} updateItem={updateItem} id={interview.id} students={interview.students} stime={interview.startTime} etime={interview.endTime} date={interview.date}/>) : <p>No Interviews Found</p> }
    </div>
  )
}

export default ViewPage