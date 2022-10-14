import React, { useState } from 'react'
import './Body.css'
import BodyRight from './BodyRight'
import Sidebar from './Sidebar'
import ViewPage from './ViewPage'

const Body = () => {
  const [currentPage, setcurrentPage] = useState('home')
  return (
    <div className='body'>
       <Sidebar setcurrentPage={setcurrentPage}/>
       {currentPage === 'home' ? <BodyRight /> : <ViewPage />}   
    </div>
  )
}

export default Body