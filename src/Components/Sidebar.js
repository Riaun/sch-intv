import React from 'react'
import './Sidebar.css'

const Sidebar = (props) => {
  return (
    <div className ='sidebar'>
        <div className='sidebar__homeBtn' onClick={() => props.setcurrentPage('home')}>Home</div>
        <div className='sidebar__viewBtn' onClick={() => props.setcurrentPage('view')}>View</div>
    </div>
  )
}

export default Sidebar