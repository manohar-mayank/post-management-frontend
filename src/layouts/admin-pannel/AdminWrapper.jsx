import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

const AdminWrapper = () => {
  return (
    <div style={{display: "flex", flexDirection: "column"}}>
        <Navbar/>
      <div style={{display: "flex", flexDirection: 'row', width: "100%"}}>
        <div style={{width: "20%"}}><Sidebar/></div>
        <div style={{width: "78%", padding: 4}}><Outlet/></div>
      </div>
    </div>
  )
}

export default AdminWrapper
