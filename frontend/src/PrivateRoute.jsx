
 import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate,Navigate } from 'react-router-dom'

 
 const PrivateRoute = ({children}) => {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const allState=useSelector((Store)=>Store)

    let token=localStorage.getItem("Buycartoken")

    if(allState.loginReducer.loginStatus || token){
        return children
    }

    return <Navigate to="/signin" />
   
 }
 
 export default PrivateRoute