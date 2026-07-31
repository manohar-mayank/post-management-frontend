import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Cookies from 'js-cookie'

const AdminProtected = () => {
const token = Cookies.get("token")
const user = JSON.parse(Cookies.get("user"));

console.log("protected", token, user)
const isAuthenticate = token && user.role === "admin"
  return (
    isAuthenticate ? <Outlet/> : <Navigate to="/login"/>
  )
}

export default AdminProtected
